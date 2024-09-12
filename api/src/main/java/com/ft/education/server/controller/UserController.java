package com.ft.education.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ft.education.server.mapping.Response;
import com.ft.education.server.model.User;
import com.ft.education.server.service.serviceinterface.UserServiceInterface;

/**
 * @author lemonftdev
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserServiceInterface userServiceInterface;

    @PostMapping("/verifycation-email")
    public ResponseEntity<?> verifycationEmail(@RequestBody User user) {
        Response res = userServiceInterface.verifycationEmail(user.getEmail());
        System.err.println(res);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/compare-code")
    public ResponseEntity<?> compareVerifycode(@RequestBody User user) {
        Response res = userServiceInterface.compareVerifyCode(user);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Response res = userServiceInterface.register(user);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Response res = userServiceInterface.login(user);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, Object> payload) {
        Response res = userServiceInterface.refreshToken((String) payload.get("token"));
        return ResponseEntity.ok().body(res);
    }
}
