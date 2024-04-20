package com.fullStack.expenseTracker.exceptions;

public class CategoryAlreadyExistsException extends Exception{

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}
