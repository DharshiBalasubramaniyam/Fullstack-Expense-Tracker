package com.fullStack.expenseTracker.exceptions;

public class TransactionTypeNotFoundException extends Exception{

    public TransactionTypeNotFoundException(String message) {
        super(message);
    }
}
