package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.UserService;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.ResetPasswordRequestDto;
import com.fullStack.expenseTracker.expections.UserNotFoundException;
import com.fullStack.expenseTracker.expections.UserServiceLogicException;
import com.fullStack.expenseTracker.expections.UserVerificationFailedException;
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
    private UserService userService;

    @GetMapping("/verifyEmail")
    public ResponseEntity<ApiResponseDto<?>> verifyEmail(@Param("email") String email)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
    }

    @GetMapping("/verifyCode")
    public ResponseEntity<ApiResponseDto<?>> verifyCode(@Param("code") String code)
            throws UserVerificationFailedException, UserServiceLogicException {
        return userService.verifyForgotPasswordVerification(code);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<ApiResponseDto<?>> resetPassword(@RequestBody @Valid ResetPasswordRequestDto resetPasswordDto)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.resetPassword(resetPasswordDto);
    }

    @GetMapping("/resendEmail")
    public ResponseEntity<ApiResponseDto<?>> resendEmail(@Param("email") String email)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
    }
}
