package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.BudgetRequest;
import com.fullStack.expenseTracker.expections.UserNotFoundException;
import com.fullStack.expenseTracker.expections.UserServiceLogicException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface BudgetService {
    ResponseEntity<ApiResponseDto<?>> createBudget(BudgetRequest budgetRequest) throws UserNotFoundException, UserServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> getBudgetByMonth(long userId, int month, long year) throws UserServiceLogicException;

}
