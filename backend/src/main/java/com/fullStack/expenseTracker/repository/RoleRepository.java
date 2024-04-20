package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.enums.ERole;
import com.fullStack.expenseTracker.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
    boolean existsByName(ERole name);
}