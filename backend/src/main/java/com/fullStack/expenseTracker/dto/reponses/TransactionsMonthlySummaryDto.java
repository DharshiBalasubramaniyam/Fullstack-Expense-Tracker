package com.fullStack.expenseTracker.dto.reponses;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionsMonthlySummaryDto {

    private int month;

    private double total_expense;

    private double total_income;
}
