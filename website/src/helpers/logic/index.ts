import noAvatar from "@/assets/images/user.default.png";
import { len_verify_emails, value_otp_default_v1 } from "@/constants/others";
import { StaticImageData } from 'next/image';
import { RefObject } from "react";

export const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
};
export const isNumberHasLen = (value: string, lenAllow: number) => {
    const regex = new RegExp(`^\\d{${lenAllow}}$`);
    return regex.test(value) && value.length === lenAllow;
};
export const validateFormatDefaultOtp = (otp: string) => {
    return !otp.includes(value_otp_default_v1) && otp.length === len_verify_emails;
};
export const clearCharactersNotSupported = (input: string) => {
    const regex = /[^a-z0-9_\-!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/g;
    const cleanedInput = input?.replace(regex, '');
    return cleanedInput;
};
export const containsNonWhitespaceCharacters = (input: string) => {
    const regex = /\S/;
    return regex.test(input);
};
export const removeAllWhitespace = (input: string) => {
    const regex = /\s+/g;
    return input.replace(regex, '');
};
export const _useDebounce = (fucntion: Function, delay: number = 1000) => {
    let _idFunctional: any = null;
    return (...args: any[]) => {
        clearTimeout(_idFunctional);
        _idFunctional = setTimeout(() => fucntion(...args), delay);
    };
}
export const navigateUrlWithWindow = (url: string, type: 'push' | 'replace') => {
    if (type === 'push') {
        window.history.pushState({}, '', url);
    } else {
        window.history.replaceState({}, '', url);
    }
}

export const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackSrc: string | StaticImageData = noAvatar
) => {
    e.currentTarget.src = typeof fallbackSrc === 'string' ? fallbackSrc : fallbackSrc.src;
};

export const checkElementInViewPort = (elementRef: RefObject<Element>): boolean => {
    if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    } 
    return false; 
};