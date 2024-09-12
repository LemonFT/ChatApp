package com.ft.education.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author lemonftdev
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "user", indexes = {
        @Index(name = "idx_identifier", columnList = "identifier"),
        @Index(name = "idx_email", columnList = "email"),
        @Index(name = "idx_deviceToken", columnList = "deviceToken")
}, uniqueConstraints = @UniqueConstraint(columnNames = { "email", "password", "identifier" }))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true, columnDefinition = "VARCHAR(50)")
    private String identifier;

    @Column(unique = false, nullable = false, columnDefinition = "VARCHAR(100)")
    private String password;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(50)")
    private String email;

    @Column(unique = true)
    private String deviceToken;

    @Column(columnDefinition = "VARCHAR(10)")
    private String verificationCode;

    @Column(unique = false, nullable = true, columnDefinition = "VARCHAR(255)")
    private String avatar;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean hasLock = false;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean hasDelete = false;

    /**
     * Constructs a new User with the specified email and verification code.
     *
     * @param email            the email of the user
     * @param verificationCode the verification code for the user
     */
    public User(String email, String verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
    }
}
