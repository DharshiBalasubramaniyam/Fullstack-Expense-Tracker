package com.fullStack.expenseTracker.dto.reponses;

import com.fullStack.expenseTracker.enums.ApiResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ApiResponseDto<T> {
    private ApiResponseStatus status;

    private HttpStatus httpStatus;

    private T response;

}
