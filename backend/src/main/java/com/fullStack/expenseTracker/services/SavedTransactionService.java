package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.SavedTransactionRequestDto;
import com.fullStack.expenseTracker.exceptions.TransactionNotFoundException;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import com.fullStack.expenseTracker.exceptions.UserServiceLogicException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface SavedTransactionService {
    ResponseEntity<ApiResponseDto<?>> createSavedTransaction(SavedTransactionRequestDto requestDto) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> addSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> editSavedTransaction(long savedTransactionId, SavedTransactionRequestDto requestDto) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> deleteSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> skipSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getAllTransactionsByUser(long userId) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getAllTransactionsByUserAndMonth(long userId) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getSavedTransactionById(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;

}
