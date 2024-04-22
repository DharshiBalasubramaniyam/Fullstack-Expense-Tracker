package com.fullStack.expenseTracker.models;

import com.fullStack.expenseTracker.enums.ETransactionFrequency;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SavedTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long planId;

    private long userId;

    private int transactionTypeId;

    private int categoryId;

    private double amount;

    private String description;

    @Enumerated(EnumType.STRING)
    private ETransactionFrequency frequency;

    private LocalDate upcomingDate;
}
