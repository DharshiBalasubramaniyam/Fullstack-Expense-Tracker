package com.fullStack.expenseTracker.handlers;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.enums.ApiResponseStatus;
import com.fullStack.expenseTracker.exceptions.TransactionNotFoundException;
import com.fullStack.expenseTracker.exceptions.TransactionServiceLogicException;
import com.fullStack.expenseTracker.exceptions.TransactionTypeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TransactionExceptionHandler {
    @ExceptionHandler(value = TransactionServiceLogicException.class)
    public ResponseEntity<ApiResponseDto<String>> TransactionServiceLogicExceptionHandler(TransactionServiceLogicException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.BAD_REQUEST, exception.getMessage())
                );
    }

    @ExceptionHandler(value = TransactionNotFoundException.class)
    public ResponseEntity<ApiResponseDto<String>> TransactionNotFoundExceptionHandler(TransactionNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.NOT_FOUND, exception.getMessage())
                );
    }

    @ExceptionHandler(value = TransactionTypeNotFoundException.class)
    public ResponseEntity<ApiResponseDto<String>> TransactionTypeNotFoundExceptionHandler(TransactionTypeNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        new ApiResponseDto<>(ApiResponseStatus.FAILED, HttpStatus.NOT_FOUND, exception.getMessage())
                );
    }
}
