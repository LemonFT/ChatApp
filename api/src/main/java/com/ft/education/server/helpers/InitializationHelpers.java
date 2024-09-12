package com.ft.education.server.helpers;

import java.sql.Timestamp;
import java.util.Random;
import java.util.UUID;

/**
 * @author lemonftdev
 */
public class InitializationHelpers {

    public static final int MAX_ITERATIONS = 6;

    public static String randomString() {
        return UUID.randomUUID().toString()
                + new Timestamp(System.currentTimeMillis()).getTime();
    }

    public static String uniqueNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < MAX_ITERATIONS; i++) {
            sb.append(random.nextInt(10));
        }
        String uniqN = sb.toString();
        return uniqN;
    }

}
