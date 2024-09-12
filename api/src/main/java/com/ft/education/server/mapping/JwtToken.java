package com.ft.education.server.mapping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author lemonftdev
 */

@Getter
@Setter
@AllArgsConstructor
@ToString
public class JwtToken {
    private String accessToken;
    private String refreshToken;
}
