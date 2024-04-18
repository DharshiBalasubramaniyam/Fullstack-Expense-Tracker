package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ReportService {
    ResponseEntity<ApiResponseDto<?>> getTotalByTransactionTypeAndUser(Long userId, int transactionTypeId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getTotalNoOfTransactionsByUser(Long userId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getTotalExpenseByCategoryAndUser(String email, int categoryId, int month, int year);

    ResponseEntity<ApiResponseDto<?>> getMonthlySummaryByUser(String email);

}
