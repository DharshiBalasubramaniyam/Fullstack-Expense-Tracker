package com.fullStack.expenseTracker.dto.reponses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class PageResponseDto<T> {

    T data;

    int totalNoOfPages;

    Long totalNoOfRecords;

}
