package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.requests.CategoryRequestDto;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.exceptions.CategoryAlreadyExistsException;
import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.CategoryServiceLogicException;
import com.fullStack.expenseTracker.exceptions.TransactionTypeNotFoundException;
import com.fullStack.expenseTracker.models.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {

    ResponseEntity<ApiResponseDto<?>> getCategories();

    boolean existsCategory(int id);

    Category getCategoryById(int id) throws CategoryNotFoundException;

    ResponseEntity<ApiResponseDto<?>> addNewCategory(CategoryRequestDto categoryRequestDto)
            throws TransactionTypeNotFoundException, CategoryServiceLogicException, CategoryAlreadyExistsException;

    ResponseEntity<ApiResponseDto<?>> updateCategory(int categoryId, CategoryRequestDto categoryRequestDto)
            throws CategoryNotFoundException, TransactionTypeNotFoundException, CategoryServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> enableOrDisableCategory(int categoryId) throws CategoryServiceLogicException, CategoryNotFoundException;
}
