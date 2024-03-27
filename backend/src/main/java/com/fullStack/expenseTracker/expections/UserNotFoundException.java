package com.fullStack.expenseTracker.expections;

public class UserNotFoundException extends Exception{

    public UserNotFoundException(String message) {
        super(message);
    }

}
