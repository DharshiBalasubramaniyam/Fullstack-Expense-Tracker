package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.UserService;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.SignUpRequestDto;
import com.fullStack.expenseTracker.expections.UserAlreadyExistsException;
import com.fullStack.expenseTracker.expections.UserNotFoundException;
import com.fullStack.expenseTracker.expections.UserServiceLogicException;
import com.fullStack.expenseTracker.expections.UserVerificationFailedException;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/mywallet/auth")
public class SignUpController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<?>> registerUser(@RequestBody @Valid SignUpRequestDto signUpRequestDto)
            throws MessagingException, UnsupportedEncodingException, UserAlreadyExistsException, UserServiceLogicException {
        return userService.save(signUpRequestDto);
    }

    @GetMapping("/signup/verify")
    public ResponseEntity<ApiResponseDto<?>> verifyUserRegistration(@Param("code") String code)
            throws UserVerificationFailedException {
        return userService.verifyRegistrationVerification(code);
    }

    @GetMapping("/signup/resend")
    public ResponseEntity<ApiResponseDto<?>> resendVerificationCode(@Param("email") String email)
            throws UserNotFoundException, MessagingException, UnsupportedEncodingException, UserServiceLogicException {
        return userService.resendVerificationCode(email);
    }

}