package com.fullStack.expenseTracker.factories;

import com.fullStack.expenseTracker.services.RoleService;
import com.fullStack.expenseTracker.exceptions.RoleNotFoundException;
import com.fullStack.expenseTracker.enums.ERole;
import com.fullStack.expenseTracker.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleFactory {
    @Autowired
    RoleService roleService;

    public Role getInstance(String role) throws RoleNotFoundException {
        if (role.equals("admin")) {
            return roleService.findByName(ERole.ROLE_ADMIN);
        }
        else if (role.equals("user")){
            return roleService.findByName(ERole.ROLE_USER);
        }
        throw new RoleNotFoundException("Invalid role name: " + role);
    }

}
