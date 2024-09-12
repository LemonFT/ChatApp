package com.ft.education.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ft.education.server.model.User;

/**
 * @author lemonftdev
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their email.
     *
     * @param email
     * @return boolean, true if email exist, false if email doesn't exist
     */
    @Query(value = "select case when count(u) > 0 then true else false end from User u where u.email = ?1")
    boolean existsByEmail(String email);

    /**
     * Finds a user by their email.
     *
     * @param email
     * @return user, user if email exist, null if email doesn't exist
     */
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmail(String email);

}
