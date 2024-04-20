package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.AuthService;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.ResetPasswordRequestDto;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import com.fullStack.expenseTracker.exceptions.UserServiceLogicException;
import com.fullStack.expenseTracker.exceptions.UserVerificationFailedException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/mywallet/auth/forgotPassword")
public class ForgotPasswordController {

    @Autowired
    private AuthService authService;

    @GetMapping("/verifyEmail")
    public ResponseEntity<ApiResponseDto<?>> verifyEmail(@Param("email") String email)
            throws UserNotFoundException, UserServiceLogicException {
        return authService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
    }

    @GetMapping("/verifyCode")
    public ResponseEntity<ApiResponseDto<?>> verifyCode(@Param("code") String code)
            throws UserVerificationFailedException, UserServiceLogicException {
        return authService.verifyForgotPasswordVerification(code);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<ApiResponseDto<?>> resetPassword(@RequestBody @Valid ResetPasswordRequestDto resetPasswordDto)
            throws UserNotFoundException, UserServiceLogicException {
        return authService.resetPassword(resetPasswordDto);
    }

    @GetMapping("/resendEmail")
    public ResponseEntity<ApiResponseDto<?>> resendEmail(@Param("email") String email)
            throws UserNotFoundException, UserServiceLogicException {
        return authService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
    }
}
