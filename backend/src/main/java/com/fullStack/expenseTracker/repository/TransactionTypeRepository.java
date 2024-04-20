package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.enums.ETransactionType;
import com.fullStack.expenseTracker.models.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransactionTypeRepository extends JpaRepository<TransactionType, Integer> {
    Optional<TransactionType> findById(int id);
    TransactionType findByTransactionTypeName(ETransactionType transactionTypeName);
    boolean existsByTransactionTypeName(ETransactionType transactionTypeName);
}
