package com.fullStack.expenseTracker.exceptions;

public class CategoryNotFoundException extends Exception{
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
