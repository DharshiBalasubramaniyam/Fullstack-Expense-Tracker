package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.enums.ERole;
import com.fullStack.expenseTracker.models.Role;
import com.fullStack.expenseTracker.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(ERole eRole) {
        return roleRepository.findByName(eRole)
                .orElseThrow(() -> new RuntimeException("Role is not found."));
    }
}
