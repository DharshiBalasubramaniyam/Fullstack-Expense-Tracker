package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget findByUserIdAndMonthAndYear(long userId, int month, long year);
}
