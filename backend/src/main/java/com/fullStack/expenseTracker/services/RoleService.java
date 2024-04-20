package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.enums.ERole;
import com.fullStack.expenseTracker.models.Role;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {
    Role findByName(ERole eRole);
}