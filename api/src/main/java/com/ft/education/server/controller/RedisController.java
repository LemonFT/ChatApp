package com.ft.education.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ft.education.server.service.RedisService;

@Controller
@RequestMapping("/redis")
public class RedisController {

    private static final Logger logger = LoggerFactory.getLogger(RedisController.class);

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RedisService redisService;

    @PostMapping("/set")
    public ResponseEntity<String> set() {
        try {
            String key = "exampleKey";
            String value = "exampleValue";
            logger.info("Setting key '{}' with value '{}'", key, value);
            redisService.set(key, value);
            return ResponseEntity.status(HttpStatus.OK).body("Key-value pair set successfully.");
        } catch (Exception e) {
            logger.error("Error setting key-value pair", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error setting key-value pair.");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> get() {
        try {
            String key = "exampleKey";
            Object value = redisService.getRedis("exampleKey");
            if (value != null) {
                logger.info("Retrieved key '{}' with value '{}'", key, value);
                return ResponseEntity.status(HttpStatus.OK).body(value);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Key not found.");
            }
        } catch (Exception e) {
            logger.error("Error retrieving key-value pair", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving key-value pair.");
        }
    }
}
