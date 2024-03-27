package com.fullStack.expenseTracker.expections;

public class CategoryAlreadyExistsException extends Exception{

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}
