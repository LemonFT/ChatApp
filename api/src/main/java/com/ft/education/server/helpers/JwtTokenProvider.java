package com.ft.education.server.helpers;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.ft.education.server.mapping.JwtToken;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * @author lemonftdev
 */
@Component
public class JwtTokenProvider {
    public static boolean isTokenValid(String jwt) {
        try {
            Dotenv env = Dotenv.configure().load();
            String keySecret = env.get("SECRET_KEY");
            Key secretKey = Keys.hmacShaKeyFor(keySecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public static String createJwt(long id, String identifier, String email,
            boolean refresh) {
        Dotenv env = Dotenv.configure().load();
        String keySecret = env.get("SECRET_KEY");
        Key secretKey = Keys.hmacShaKeyFor(keySecret.getBytes());
        long duration = refresh ? 30L : 15L;
        Instant expirationInstant = Instant.now().plus(duration, ChronoUnit.MINUTES);
        Date expirationDate = Date.from(expirationInstant);
        String jwtToken = Jwts.builder()
                .claim("id", id)
                .claim("identifier", identifier)
                .claim("email", email)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(expirationDate)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
        return jwtToken;
    }

    public static JwtToken getTokens(long id, String identifier, String email) {
        String accessToken = createJwt(id, identifier, email, false);
        String refreshToken = createJwt(id, identifier, email, true);
        return new JwtToken(accessToken, refreshToken);
    }

    public static Claims decodeJwt(String jwt) {
        Dotenv env = Dotenv.configure().load();
        String keySecret = env.get("SECRET_KEY");
        Key secretKey = Keys.hmacShaKeyFor(keySecret.getBytes());
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt);

        return claimsJws.getBody();
    }

    public static JwtToken refreshTokens(String jwt) {
        System.err.println("refresh token start");
        Dotenv env = Dotenv.configure().load();
        String keySecret = env.get("SECRET_KEY");
        Key secretKey = Keys.hmacShaKeyFor(keySecret.getBytes());
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt);
        Claims claims = claimsJws.getBody();
        int id = claims.get("id", Integer.class);
        String code = claims.get("identifier", String.class);
        String email = claims.get("email", String.class);
        return new JwtToken(createJwt(id, code, email, false), createJwt(id, code, email, true));
    }

    public String getUsernameFromToken(String jwt) {
        Dotenv env = Dotenv.configure().load();
        String keySecret = env.get("SECRET_KEY");
        Key secretKey = Keys.hmacShaKeyFor(keySecret.getBytes());
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt);
        return claimsJws.getBody().get("uname", String.class);
    }
}
