package com.fullStack.expenseTracker.expections;

public class TransactionTypeNotFoundException extends Exception{

    public TransactionTypeNotFoundException(String message) {
        super(message);
    }
}
