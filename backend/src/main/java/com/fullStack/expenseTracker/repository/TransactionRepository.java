package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.dto.reponses.TransactionsMonthlySummaryDto;
import com.fullStack.expenseTracker.models.Transaction;
import com.fullStack.expenseTracker.models.TransactionType;
import com.fullStack.expenseTracker.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT t.*, c.category_id AS c_category_id, c.category_name AS c_category_name, " +
            "u.id AS u_id, u.email AS u_email, " +
            "tt.transaction_type_id AS tt_transaction_type_id, tt.transaction_type_name AS tt_transaction_type_name " +
            "FROM transaction t JOIN category c ON t.category_id = c.category_id JOIN users u ON t.user_id = u.id " +
            "JOIN transaction_type tt ON c.transaction_type_id = tt.transaction_type_id " +
            "WHERE u.email = :email and tt.transaction_type_name LIKE %:transactionType% and " +
            "(t.description LIKE %:searchKey% OR c.category_name LIKE %:searchKey%)", nativeQuery = true)
    Page<Transaction> findByUser(String email, Pageable pageable, String searchKey, String transactionType);

    @Query(value = "SELECT t.*, c.category_id AS c_category_id, c.category_name AS c_category_name, " +
            "u.id AS u_id, u.email AS u_email, " +
            "tt.transaction_type_id AS tt_transaction_type_id, tt.transaction_type_name AS tt_transaction_type_name " +
            "FROM transaction t JOIN category c ON t.category_id = c.category_id JOIN users u ON t.user_id = u.id " +
            "JOIN transaction_type tt ON c.transaction_type_id = tt.transaction_type_id " +
            "WHERE t.description LIKE %:searchKey% OR c.category_name LIKE %:searchKey% OR " +
            "tt.transaction_type_name LIKE %:searchKey% OR u.email LIKE %:searchKey%", nativeQuery = true)
    Page<Transaction> findAll(Pageable pageable, @Param("searchKey") String searchKey);


    @Query(value = "SELECT SUM(amount) FROM `transaction` t " +
            "JOIN users u ON t.user_id = u.id " +
            "JOIN category c ON t.category_id = c.category_id " +
            "JOIN transaction_type tt ON c.transaction_type_id = tt.transaction_type_id " +
            "WHERE u.id = :userId AND tt.transaction_type_id = :transactionTypeId " +
            "AND MONTH(t.date) = :month AND YEAR(t.date) = :year", nativeQuery = true)
    Double findTotalByUserAndTransactionType(@Param("userId") long userId,
                                             @Param("transactionTypeId") Integer transactionTypeId,
                                             @Param("month") int month,
                                             @Param("year") int year);

    @Query(value = "SELECT COUNT(*) FROM `transaction` t JOIN users u ON t.user_id = u.id " +
            "WHERE u.id = :userId AND MONTH(t.date) = :month AND YEAR(t.date) = :year", nativeQuery = true)
    Integer findTotalNoOfTransactionsByUser(@Param("userId") long userId, @Param("month") int month, @Param("year") int year);

    @Query(value = "SELECT SUM(amount) FROM `transaction` t " +
            "JOIN users u ON t.user_id = u.id " +
            "JOIN category c ON t.category_id = c.category_id " +
            "WHERE u.email = :email and c.category_id = :categoryId " +
            "AND MONTH(t.date) = :month AND YEAR(t.date) = :year", nativeQuery = true)
    Double findTotalByUserAndCategory(@Param("email") String email,
                                      @Param("categoryId") int categoryId,
                                      @Param("month") int month,
                                      @Param("year") int year);

    @Query(value = "SELECT " +
            "MONTH(t.date), " +
            "SUM(CASE WHEN tt.transaction_type_id = 1 THEN t.amount ELSE 0 END), " +
            "SUM(CASE WHEN tt.transaction_type_id = 2 THEN t.amount ELSE 0 END) " +
            "FROM transaction t " +
            "JOIN users u on t.user_id = u.id " +
            "JOIN category c on t.category_id = c.category_id " +
            "JOIN transaction_type tt on c.transaction_type_id = tt.transaction_type_id " +
            "WHERE u.email = :email and t.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH) " +
            "GROUP BY YEAR(t.date), MONTH(t.date)", nativeQuery = true)
    List<Object[]> findMonthlySummaryByUser(@Param("email") String email);
}