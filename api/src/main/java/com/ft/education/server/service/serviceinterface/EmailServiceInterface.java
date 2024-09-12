package com.ft.education.server.service.serviceinterface;

/**
 * @author lemonftdev
 */
public interface EmailServiceInterface {
    /**
     * Gửi email đến một địa chỉ cụ thể với chủ đề và nội dung xác định.
     *
     * @param to             Địa chỉ email của người nhận.
     * @param subject        Chủ đề của email.
     * @param messageContent Nội dung của email.
     * @return code nếu email được gửi thành công, ngược lại là ''.
     */
    String sendVerifycationEmailCode(String to);
}