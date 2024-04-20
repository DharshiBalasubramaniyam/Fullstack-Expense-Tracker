package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.exceptions.TransactionTypeNotFoundException;
import com.fullStack.expenseTracker.models.TransactionType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TransactionTypeService {
    List<TransactionType> getAllTransactions();

    boolean existsByTransactionTypeId(int transactionTypeId);

    TransactionType getTransactionById(int transactionTypeId) throws TransactionTypeNotFoundException;

}
