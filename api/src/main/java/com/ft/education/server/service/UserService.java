package com.ft.education.server.service;

import java.util.Optional;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.ft.education.server.helpers.JacksonSupport;
import com.ft.education.server.helpers.JwtTokenProvider;
import com.ft.education.server.helpers.RegexDataHelpers;
import com.ft.education.server.mapping.JwtToken;
import com.ft.education.server.mapping.Response;
import com.ft.education.server.model.User;
import com.ft.education.server.repository.UserRepository;
import com.ft.education.server.service.serviceinterface.UserServiceInterface;

import jakarta.transaction.Transactional;

/**
 * @author lemonftdve
 */
@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisService redisService;

    @Autowired
    JacksonSupport jacksonSupport;

    @Override
    public Response verifycationEmail(String email) {
        boolean emailExist = userRepository.existsByEmail(email);
        if (emailExist) {
            return new Response(419, "Email already exist", null);
        } else {
            String codeVerify = emailService.sendVerifycationEmailCode(email);
            if (!codeVerify.isEmpty()) {
                String userInfoTempory = jacksonSupport.convertObjectToString(new User(email, codeVerify));
                redisService.set(email, userInfoTempory);
                return new Response(200, "Verification email has been sent successfully", null);
            } else {
                return new Response(500, "Email doesn't exist", null);
            }
        }
    }

    @Override
    @Transactional(rollbackOn = { ClassCastException.class, Exception.class, DataAccessException.class })
    public Response compareVerifyCode(User user) {
        try {
            String userInfoTempory = (String) redisService.getRedis(user.getEmail());
            User userObject = jacksonSupport.convertStringToObject(userInfoTempory, User.class);
            if (user.getVerificationCode().equals(userObject.getVerificationCode())) {
                Properties ob = new Properties();
                ob.put("email", userObject.getEmail());
                ob.put("code", userObject.getVerificationCode());
                return new Response(200, "Verification code correct", null);
            } else {
                return new Response(400, "Verification code incorrect", null);
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new Response(400, "Verification code incorrect", null);
        }
    }

    @Override
    @Transactional(rollbackOn = { ClassCastException.class, Exception.class, DataAccessException.class })
    public Response register(User user) {
        try {
            redisService.delete(user.getEmail());
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(5)));
            User userRes = userRepository.save(user);
            Properties ob = new Properties();
            ob.put("id", user.getId());
            ob.put("email", userRes.getEmail());
            ob.put("code", userRes.getVerificationCode());
            ob.put("roleId", userRes.getRole().getId());
            ob.put("roleName", userRes.getRole().getName());
            return userRes != null ? new Response(200, "Register successfully", null)
                    : new Response(400, "Register failed", ob);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new Response(500, "Register failed", null);
        }
    }

    @Override
    @Transactional(rollbackOn = { ClassCastException.class, Exception.class, DataAccessException.class })
    public Response login(User user) {
        try {
            Optional<User> userFind = userRepository.findByEmail(user.getEmail());
            System.err.println(user.getPassword());
            System.err.println(userFind.get().getPassword());
            if (userFind.isPresent()
                    && RegexDataHelpers.validatorPassword(user.getPassword(), userFind.get().getPassword())) {
                JwtToken tokens = JwtTokenProvider.getTokens(userFind.get().getId(),
                        userFind.get().getIdentifier(),
                        userFind.get().getEmail());
                Properties ob = new Properties();
                ob.put("id", userFind.get().getId());
                ob.put("email", userFind.get().getEmail());
                ob.put("deviceToken", userFind.get().getDeviceToken() != null ? userFind.get().getDeviceToken() : "");
                ob.put("roleId", userFind.get().getRole().getId());
                ob.put("roleName", userFind.get().getRole().getName());
                ob.put("tokens", tokens);
                System.err.println(ob);
                return new Response(200, "Login successfully", ob);
            } else {
                return new Response(404, "Email or password is incorrect", null);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new Response(500, "Email or password is incorrect", null);
        }
    }

    @Override
    @Transactional(rollbackOn = { ClassCastException.class, Exception.class, DataAccessException.class })
    public Response refreshToken(String token) {
        try {
            JwtToken tokens = JwtTokenProvider.refreshTokens(token);
            Properties ob = new Properties();
            ob.put("tokens", tokens);
            return new Response(200, "Token refreshed successfully", ob);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new Response(403, "Authorization", null);
        }
    }

}
