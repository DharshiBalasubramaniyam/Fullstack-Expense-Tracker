package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.TransactionRequestDto;
import com.fullStack.expenseTracker.expections.CategoryNotFoundException;
import com.fullStack.expenseTracker.expections.TransactionNotFoundException;
import com.fullStack.expenseTracker.expections.TransactionServiceLogicException;
import com.fullStack.expenseTracker.expections.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface TransactionService {


    ResponseEntity<ApiResponseDto<?>> addTransaction(TransactionRequestDto transactionRequestDto)
            throws UserNotFoundException, CategoryNotFoundException, TransactionServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getTransactionById(Long TransactionId)
            throws TransactionNotFoundException;

    ResponseEntity<ApiResponseDto<?>> updateTransaction(Long transactionId, TransactionRequestDto transactionRequestDto)
            throws TransactionNotFoundException, UserNotFoundException, CategoryNotFoundException, TransactionServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> deleteTransaction(Long transactionId) throws TransactionNotFoundException, TransactionServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getAllTransactions(int pageNumber, int pageSize, String searchKey) throws TransactionServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getTransactionsByUser(String email, int pageNumber, int pageSize, String searchKey, String sortField, String sortDirec, String transactionType) throws UserNotFoundException, TransactionServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getTotalIncomeOrExpense(Long userId, int transactionTypeId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getTotalNoOfTransactions(Long userId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getTotalByCategory(String email, int categoryId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getMonthlySummaryByUser(String email);
}
