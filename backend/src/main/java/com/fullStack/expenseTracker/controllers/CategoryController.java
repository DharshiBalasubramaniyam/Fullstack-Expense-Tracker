package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.CategoryService;
import com.fullStack.expenseTracker.services.TransactionTypeService;
import com.fullStack.expenseTracker.dto.requests.CategoryRequestDto;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.exceptions.CategoryAlreadyExistsException;
import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.CategoryServiceLogicException;
import com.fullStack.expenseTracker.exceptions.TransactionTypeNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mywallet/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private TransactionTypeService transactionTypeService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> getAllCategories() {
        return categoryService.getCategories();
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> addNewCategory(@RequestBody @Valid CategoryRequestDto categoryRequestDto)
            throws CategoryServiceLogicException, TransactionTypeNotFoundException, CategoryAlreadyExistsException {
        return categoryService.addNewCategory(categoryRequestDto);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> updateCategory(@Param ("categoryId") int categoryId,
                                                            @RequestBody @Valid CategoryRequestDto categoryRequestDto)
            throws CategoryServiceLogicException, CategoryNotFoundException, TransactionTypeNotFoundException {
        return categoryService.updateCategory(categoryId, categoryRequestDto);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> disableOrEnableCategory(@Param ("categoryId") int categoryId)
            throws CategoryServiceLogicException, CategoryNotFoundException {
        return categoryService.enableOrDisableCategory(categoryId);
    }

}


