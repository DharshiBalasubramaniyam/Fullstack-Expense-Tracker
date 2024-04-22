package com.fullStack.expenseTracker.dto.requests;

import com.fullStack.expenseTracker.enums.ETransactionFrequency;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class SavedTransactionRequestDto {
    private long userId;

    private int categoryId;

    private double amount;

    private String description;

    @Enumerated(EnumType.STRING)
    private ETransactionFrequency frequency;

    private LocalDate upcomingDate;

}
