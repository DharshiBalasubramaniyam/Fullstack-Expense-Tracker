package com.fullStack.expenseTracker.dto.reponses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDto {

    private Long transactionId;

    private int categoryId;

    private String categoryName;

    private int transactionType;

    private String description;

    private double amount;

    private LocalDate date;

    private String userEmail;

}
