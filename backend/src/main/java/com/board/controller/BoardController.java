package com.board.controller;

import com.board.domain.Board;
import com.board.dto.board.BoardPageResponse;
import com.board.dto.board.BoardRequest;
import com.board.dto.board.BoardResponse;
import com.board.dto.file.FileRequest;
import com.board.dto.file.FileResponse;
import com.board.service.BoardService;
import com.board.service.FileService;
import com.board.service.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/*
1.  - 처음 게시글 전체 요청 할 때 시작 인덱스 0, 페이지당 게시글 개수 N 요청후
	- JPA 내 전체 COUNT 호출 후 결과값과 함께 0,1,2,...,N개 게시글 리턴
	-> 현재 /board/list 접근시 findAll 호출
	-> 인자로 pageable 넣게 적절히 변환 필요
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;
    private final FileService fileService;
    private final FileUtils fileUtils;

    /* 게시물 전체 조회
    검색 조건 현재 Like 사용. 변경 필요. */
    @GetMapping("/list")
    public ResponseEntity<BoardPageResponse> titleSearch(@RequestParam(value = "title", defaultValue = "") String title, @RequestParam ("page") int startIdx, @RequestParam ("pageSize") int size){
        BoardPageResponse boardPageResponse = boardService.findByTitle(title, startIdx, size);
        return new ResponseEntity<>(boardPageResponse, HttpStatus.OK);
    }

    /* 게시물 id를 기준으로 상세 조회 -> 게시물과 댓글 함께 조회 */
    @GetMapping("/list/{id}")
    public ResponseEntity<BoardResponse> getDetail(@PathVariable Long id) {
        Optional<BoardResponse> boardDTO = boardService.getBoardDetail(id);
        return boardDTO.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    /* 게시물 등록 */
    @PostMapping
    public ResponseEntity<BoardResponse> board(@RequestBody BoardRequest boardRequest) throws Exception {
        Board board = boardService.register(boardRequest);
        BoardResponse boardResponse = BoardResponse.builder()
                .id(board.getId())
                .username(board.getUser().getUsername())
                .title(board.getTitle())
                .content(board.getContent())
                .modifiedAt(board.getModifiedAt())
                .createdAt(board.getCreatedAt())
                .build();
        return new ResponseEntity<>(boardResponse, HttpStatus.OK);
    }

    /* 게시물 업데이트 */
//    @PutMapping("/edit/{id}")
//    public ResponseEntity<Boolean> updateBoard(@PathVariable Long id, @RequestBody BoardRequest boardRequest) throws Exception {
//        boolean isUpdated = boardService.update(id, boardRequest);
//        if (isUpdated) {
//            return new ResponseEntity<>(true, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//        }
//    }

    /* 게시물 삭제 */
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<Long> delete(@PathVariable Long boardId) {
        // 삭제할 파일 조회
        List<FileResponse> allFileByIds = fileService.findAllFileByBoardId(boardId);

        //파일 삭제 (from disk)
        fileUtils.deleteFiles(allFileByIds);
        //파일 삭제 (from database)
        boardService.delete(boardId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /* 게시물 등록 파일첨부 때문에 MultipartFile을 쓰는걸로 
    *  게시물 등록시 파일첨부는 선택사항이기에 (required = false) 옵션 줌
    * */
    @PostMapping(value="/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BoardResponse> createPost(@RequestPart(required = false) MultipartFile[] files,
                                                    @RequestParam("username") String username,
                                                    @RequestParam("title") String title,
                                                    @RequestParam("content") String content) throws Exception {
        BoardRequest boardRequest = new BoardRequest();
        boardRequest.setTitle(title);
        boardRequest.setUsername(username);
        boardRequest.setContent(content);
        Board register = boardService.register(boardRequest);
        if(files !=null){
            List<MultipartFile> fileList = Arrays.stream(files).toList();
            List<FileRequest> file = fileUtils.uploadFiles(fileList);
            fileService.saveFiles(register, file);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /* 게시물 첨부파일 다운로드 */
    @GetMapping("/{boardId}/files/{fileId}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long boardId, @PathVariable Long fileId) {
        FileResponse file = fileService.findFileById(fileId);
        Resource resource = fileUtils.readFileAsResource(file);
        try {
            String filename = URLEncoder.encode(file.getOriginalName(), "UTF-8");
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=\"" + filename + "\";")
                    .header(HttpHeaders.CONTENT_LENGTH, file.getSize() + "")
                    .body(resource);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("filename encoding failed : " + file.getOriginalName());
        }
    }

    //파일 첨부 있는 게시물 업데이트////////////////////////////////////////////////////////////////////////////////
    @PutMapping(value="/edit/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BoardResponse> updatePost(@PathVariable Long id,
                                                    @RequestPart(required = false) MultipartFile[] changeFiles,
                                                    @RequestPart(required = false) MultipartFile[] newFiles,
                                                    @RequestParam(value = "removeItem", required = false) List<Long> removeItem,
                                                    @RequestParam("username") String username,
                                                    @RequestParam("title") String title,
                                                    @RequestParam("content") String content) throws Exception {
        BoardRequest boardRequest = new BoardRequest();
        boardRequest.setTitle(title);
        boardRequest.setUsername(username);
        boardRequest.setContent(content);
        Board register = boardService.update(id, boardRequest);
        if(removeItem != null ){
            List<FileResponse> allFileByIds = fileService.findAllFileByIds(removeItem);
            //파일 삭제 (from disk)
            fileUtils.deleteFiles(allFileByIds);
            //파일 삭제 (from database)
            fileService.deleteIds(removeItem);
        }

        if(changeFiles!=null) {
            List<MultipartFile> fileList = Arrays.stream(changeFiles).toList();
            List<FileRequest> file = fileUtils.uploadFiles(fileList);
            fileService.saveFiles(register, file);
        }

        if(newFiles !=null){
            List<MultipartFile> fileList = Arrays.stream(newFiles).toList();
            List<FileRequest> file = fileUtils.uploadFiles(fileList);
            fileService.saveFiles(register, file);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
