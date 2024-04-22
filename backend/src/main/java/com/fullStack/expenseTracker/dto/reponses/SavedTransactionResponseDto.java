package com.fullStack.expenseTracker.dto.reponses;

import com.fullStack.expenseTracker.enums.ETransactionFrequency;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class SavedTransactionResponseDto {
    private long planId;

    private int transactionType;

    private String categoryName;

    private double amount;

    private String description;

    @Enumerated(EnumType.STRING)
    private ETransactionFrequency frequency;

    private String dueInformation;
}
