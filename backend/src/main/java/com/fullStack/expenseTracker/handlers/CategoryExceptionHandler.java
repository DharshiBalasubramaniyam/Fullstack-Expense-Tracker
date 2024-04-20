package com.fullStack.expenseTracker.handlers;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.enums.ApiResponseStatus;
import com.fullStack.expenseTracker.exceptions.CategoryAlreadyExistsException;
import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.CategoryServiceLogicException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CategoryExceptionHandler {

    @ExceptionHandler(value = CategoryNotFoundException.class)
    public ResponseEntity<ApiResponseDto<String>> CategoryNotFoundExceptionHandler(CategoryNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.NOT_FOUND, exception.getMessage())
                );
    }

    @ExceptionHandler(value = CategoryServiceLogicException.class)
    public ResponseEntity<ApiResponseDto<String>> CategoryServiceLogicExceptionHandler(CategoryServiceLogicException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.BAD_REQUEST, exception.getMessage())
                );
    }


    @ExceptionHandler(value = CategoryAlreadyExistsException.class)
    public ResponseEntity<ApiResponseDto<String>> categoryAlreadyExistsExceptionHandler(CategoryAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.CONFLICT, exception.getMessage())
                );
    }

}
