package com.board.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ErrorController {
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<List<ErrorObject>> badRequestHandler(MethodArgumentNotValidException exception){
        List<ErrorObject> errors = new ArrayList<>();
        for(FieldError error : exception.getBindingResult().getFieldErrors())
            errors.add(new ErrorObject(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
