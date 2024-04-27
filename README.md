게시판 만들기 (Spring boot + React)

작업기간: 2023.09.23 ~ 2023.10.08 (17일) <br>
📑Repository: https://github.com/kmg97/react_sb_board <br>

React와 Spring boot를 활용한 SPA 게시판 프로젝트입니다. 아래와 같은 문제에 대해 고민하며 프로젝트를 진행했고, 최선의 해결책을 찾아서 코드를 작성했습니다. 

- 회원 인증/인가(JWT)
- N + 1 문제
- Entity 양방향 관계, JSON 직렬화 문제

📚목차
- [프로젝트 소개와 기능](#1-소개와-기능)
- [프로젝트 소개](#소개)
- [구현 기능](#구현기능)
- [프로젝트 구조 및 설계](#2-구조-및-설계)
- [DB 설계](#DB-설계)
- [API 설계](#API-설계)

- [기술 스택](#3-기술-스택)
- [백엔드](#Backend)
- [프론트엔드](#Frontend)

- [실행 화면](#4-실행-화면)
- [트러블 슈팅](#5-트러블-슈팅)

- [회고](#6-회고)
- [아쉬운 점](#1-아쉬운-점)
- [후기](#2-후기)


## 1. 소개와 기능
### 💬소개
> 지금까지 배운 것을 기반으로 SPA 방식의 프로젝트를 처음으로 구현해보았습니다. <br>
> 웹 프로그래밍의 기본 소양으로 여겨지는 게시판을 직접 만들어 보면서, 
> 효율적인 데이터 처리와 데이터 변환 등 다양한 개발 문제에 직면하고 해결책을 찾아갔습니다.

- CRUD + Rest API + SPA
- 개발 기간 : 2023.09.26 ~ 2023.10.06
- 참여 인원 : 1명

<br>

### 🛠️구현기능

**게시판 기능**

- 모든 게시글 및 특정 게시글 조회
- 게시글 검색 (제목, 내용, 작성자)
- 게시글 작성 [회원]
- 게시글 수정 [회원, 게시글 작성자] 
- 게시글 삭제 [회원, 게시글 작성자]

**댓글 기능**
- 댓글 조회
- 댓글 작성 [회원]
- 댓글 수정 [회원, 댓글 작성자]
- 댓글 삭제 [회원, 댓글 작성자]

**회원 기능 + JWT**
- 회원가입
- 로그인/로그아웃

<br>

## 2. 구조 및 설계
### 📦DB 설계

---
<img width="575" alt="DB-ERD" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/c9798662-118b-4219-85f9-c85ae1ba7e5f">

<br><br>

### 🛰️API 설계

---
<img width="575" alt="MemberAPI" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/67215652-9957-4cfc-b6a1-aa4274107410">
<img width="575" alt="CommentAPI" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/1a31d0b9-af51-4252-a7f4-0acbd9ab3499">
<img width="575" alt="MemberTable" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/68920bac-5e67-4498-90d3-e42a2fb8f438">

<br>

## 3. 기술 스택
### 📌Backend
| 기술                | 버전     |
|-------------------|--------|
| Spring Boot       | 3.1.4  |
| Spring Web        | 3.1.4  |
| Spring Security   | 3.1.4  |
| Spring Data Jpa   | 3.1.4  |
| Bean Validation   | 3.1.4  |
| JSON Web Token    | 0.11.5 |
| MySQL Connector J | 8.0.33 |

### 🎨Frontend
| 기술                  | 버전      |
|---------------------|---------|
| NodeJS              | 16.16.0 |
| React               | 18.2.0  |
| react-dom           | 18.2.0  |
| react-router        | 6.3.0   |
| react-router-dom    | 6.3.0   |
| react-scripts       | 5.0.1   |


+## 4. 실행 화면

- Main

<img width="575" alt="FrontEnd-Main" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/a9548981-be65-45b7-b5ad-df6b31b4f2f8">

- Join

<img width="575" alt="FrontEnd-Join" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/052fa53a-8960-4220-ba1c-9d157ca7004c">
<img width="575" alt="isExistEmail" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/ae3e91f7-86aa-400b-b893-f9d1e93a1aa2">
<img width="575" alt="Join" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/9019ec96-84bf-422f-9e3f-11f873b6418c">

- List

<img width="575" alt="FrontEnd-List" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/26f37693-ca39-43bf-a27f-bd9bcb0040bf">

- SearchList

<img width="575" alt="Search" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/8cef7570-dd74-447d-bfc3-f0ef6953b655">
<img width="575" alt="Searching" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/1150df97-45d1-40da-9309-cb95bab3ae97">

- BoardWrite

<img width="575" alt="Write" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/3b30e93d-5048-4cc1-9d8b-ba8a97f726a6">
<img width="575" alt="BoardWrite" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/3134d07f-4bc8-4988-8477-5e83cc31436d">

- BoardUpdate

<img width="575" alt="BoardUpdate" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/a9da3f31-996b-4a5c-9ec0-fa34486bed38">

- Details

<img width="575" alt="Details" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/f7472a0d-8092-46cc-aa43-7902076f5a9f">

- Details-login

<img width="575" alt="Details_login" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/f765780d-4333-4e35-b1d3-5acf31f53700">

- Comment

<img width="575" alt="CommentPaging" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/e89426d0-411c-4b24-b91c-4c9825d94c51">

- File-Download

<img width="575" alt="FileDownload" src="https://github.com/kimmingyu0/react_sb_board/assets/103105229/a4a4ba75-7d5d-4daf-b2b8-c123f13e7afa">

## 5. 트러블 슈팅🤔
### N + 1 해결 => JPQL

- 추후 보강 예정

## 6. 회고📝
### 1. 아쉬운 점

- 추후 보강 예정

### 2. 후기

- 추후 보강 예정
