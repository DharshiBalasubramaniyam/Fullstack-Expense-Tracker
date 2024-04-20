package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.enums.ApiResponseStatus;
import com.fullStack.expenseTracker.dto.reponses.TransactionsMonthlySummaryDto;
import com.fullStack.expenseTracker.repository.TransactionRepository;
import com.fullStack.expenseTracker.services.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class ReportServiceImpl implements ReportService {

    @Autowired
    TransactionRepository transactionRepository;

    @Override
    public ResponseEntity<ApiResponseDto<?>> getTotalByTransactionTypeAndUser(Long userId, int transactionTypeId, int month, int year) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        transactionRepository.findTotalByUserAndTransactionType(userId, transactionTypeId, month, year)
                )
        );
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getTotalNoOfTransactionsByUser(Long userId,  int month, int year) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        transactionRepository.findTotalNoOfTransactionsByUser(userId, month, year)
                )
        );
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getTotalExpenseByCategoryAndUser(String email, int categoryId, int month, int year) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        transactionRepository.findTotalByUserAndCategory(email, categoryId, month, year)
                )
        );
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getMonthlySummaryByUser(String email) {
        List<Object[]> result = transactionRepository.findMonthlySummaryByUser(email);

        List<TransactionsMonthlySummaryDto> transactionsMonthlySummary = result.stream()
                .map(data -> new TransactionsMonthlySummaryDto(
                        (int) data[0],
                        (double) data[1],
                        (double) data[2]
                )).toList();

        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        transactionsMonthlySummary
                )
        );
    }
}
