import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

const getCookie = (key: string): (string | null) => {
    const cookieStore = cookies();
    return cookieStore.get(key)?.value ?? null;
}

const hasCookies = (key: string): boolean => {
    const cookieStore = cookies()
    return cookieStore.has(key);
}

const expiredCheck = (token: string): boolean => {
    const currentTimePlus = Date.now() + 10000;
    if (token) {
        const expiredTime = jwtDecode(token).exp;
        if (expiredTime && expiredTime * 1000 > currentTimePlus) {
            return true;
        }
    }
    return false;
}

const setCookie = ({
    key,
    value,
    path,
    httpOnly = true,
    secure = false,
    maxAge = null,
    expires,
}: {
    key: string;
    value: string;
    path: string;
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number | null;
    expires?: Date;
}) => {
    const options: any = {
        path,
        httpOnly,
        secure,
    };

    if (maxAge !== null) {
        options.maxAge = maxAge;
    }

    if (expires) {
        options.expires = expires;
    }else {
        options.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }

    cookies().set(key, value, options);
};


function encryptString(plaintext: string, secretKey: string) {
    return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
}

function decryptString(ciphertext: string, secretKey: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function compareString(plaintext: string, hashedValue: string, secretKey: string) {
    const decryptedValue = decryptString(hashedValue, secretKey);
    return plaintext === decryptedValue;
}

export { compareString, decryptString, encryptString, expiredCheck, getCookie, hasCookies, setCookie };

