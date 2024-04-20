package com.fullStack.expenseTracker.exceptions;

public class UserVerificationFailedException extends Exception{

    public UserVerificationFailedException(String message) {
        super(message);
    }
}
