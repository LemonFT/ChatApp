package com.ft.education.server.mapping;

import java.util.Properties;

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
public class Response {
    private int status;
    private String message;
    private Properties res;
}
