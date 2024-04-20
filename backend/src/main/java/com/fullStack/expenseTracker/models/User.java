package com.fullStack.expenseTracker.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min=3, max = 20)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @Size(max = 64)
    private String verificationCode;

    private Date verificationCodeExpiryTime;

    private boolean enabled;

    private String profileImgUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User(String username, String email, String password, String verificationCode, Date verificationCodeExpiryTime, boolean enabled, Set<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
        this.verificationCodeExpiryTime = verificationCodeExpiryTime;
        this.enabled = enabled;
        this.roles = roles;
    }

}
