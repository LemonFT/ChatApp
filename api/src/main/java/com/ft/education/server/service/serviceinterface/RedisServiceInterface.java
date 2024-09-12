package com.ft.education.server.service.serviceinterface;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Interface for Redis operations.
 * Provides methods to interact with Redis, such as setting keys, retrieving
 * values, and managing hashes.
 * 
 * @author lemonftdev
 */
public interface RedisServiceInterface {

    /**
     * Sets the value for a specific key in Redis.
     *
     * @param key   the key to set
     * @param value the value to set
     */
    void set(String key, String value);

    /**
     * Sets the time to live (TTL) for a specific key in Redis.
     *
     * @param key  the key to set the TTL for
     * @param time the TTL in seconds
     */
    void setTimeToLive(String key, long time);

    /**
     * Sets a field in a hash stored at key in Redis.
     *
     * @param key   the key of the hash
     * @param field the field within the hash
     * @param value the value to set for the field
     */
    void hashSet(String key, String field, String value);

    /**
     * Checks if a field exists in a hash stored at key in Redis.
     *
     * @param key   the key of the hash
     * @param field the field to check
     * @return true if the field exists, false otherwise
     */
    boolean hashExists(String key, String field);

    /**
     * Retrieves the value associated with a key in Redis.
     *
     * @param key the key to retrieve the value for
     * @return the value associated with the key
     */
    Object getRedis(String key);

    /**
     * Retrieves all fields and values of a hash stored at key in Redis.
     *
     * @param key the key of the hash
     * @return a map containing all fields and values of the hash
     */
    public Map<String, Object> getField(String key);

    /**
     * Retrieves the value associated with a field in a hash stored at key in Redis.
     *
     * @param key   the key of the hash
     * @param field the field to retrieve the value for
     * @return the value associated with the field
     */
    Object hashGet(String key, String field);

    /**
     * Retrieves values associated with fields that have a specific prefix in a hash
     * stored at key in Redis.
     *
     * @param key         the key of the hash
     * @param fieldPrefix the prefix of the fields to retrieve
     * @return a list of values associated with the fields that have the specified
     *         prefix
     */
    List<Object> hashGetByField(String key, String fieldPrefix);

    /**
     * Retrieves the set of field prefixes in a hash stored at key in Redis.
     *
     * @param key the key of the hash
     * @return a set of field prefixes
     */
    Set<String> getFieldPrefixes(String key);

    /**
     * Deletes a key from Redis.
     *
     * @param key the key to delete
     */
    void delete(String key);

    /**
     * Deletes a field from a hash stored at key in Redis.
     *
     * @param key   the key of the hash
     * @param field the field to delete
     */
    void delete(String key, String field);

    /**
     * Deletes multiple fields from a hash stored at key in Redis.
     *
     * @param key   the key of the hash
     * @param field a list of fields to delete
     */
    void delete(String key, List<String> field);
}
