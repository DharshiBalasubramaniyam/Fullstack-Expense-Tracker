package com.fullStack.expenseTracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long budgetId;
    long userId;
    double amount;
    int month;
    long year;

    public Budget(long userId, double amount, int month, long year) {
        this.userId = userId;
        this.amount = amount;
        this.month = month;
        this.year = year;
    }
}
