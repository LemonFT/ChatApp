package com.ft.education.server.helpers;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.security.crypto.bcrypt.BCrypt;

/**
 * @author lemonftdev
 */
public class RegexDataHelpers {
    public static boolean validatorEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

    public static boolean validatorLengthString(String str, int minLenght, int maxLength) {
        return str.length() >= minLenght && str.length() <= maxLength;
    }

    public static boolean validatorPassword(String password, String passwordEncoded) {
        return BCrypt.checkpw(password, passwordEncoded);
    }

}
