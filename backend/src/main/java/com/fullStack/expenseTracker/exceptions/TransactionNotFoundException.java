package com.fullStack.expenseTracker.exceptions;

public class TransactionNotFoundException extends Exception{

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
