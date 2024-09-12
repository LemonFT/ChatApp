package com.ft.education.server.service.serviceinterface;

import com.ft.education.server.mapping.Response;
import com.ft.education.server.model.User;

/**
 * @author lemonftdev
 */
public interface UserServiceInterface {
    Response verifycationEmail(String email);

    Response compareVerifyCode(User user);

    Response register(User user);

    Response login(User user);

    Response refreshToken(String token);
}
