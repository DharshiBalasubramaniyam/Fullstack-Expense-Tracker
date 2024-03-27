package com.fullStack.expenseTracker.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionTypeId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ETransactionType transactionTypeName;


    public TransactionType(ETransactionType transactionTypeName) {
        this.transactionTypeName = transactionTypeName;
    }
}
