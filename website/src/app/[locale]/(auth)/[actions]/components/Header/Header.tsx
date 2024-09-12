"use client"
import { DarkIcon, LightIcon, TranslateIcon } from "@/assets/images/svg";
import Button from "@/components/Button";
import { showModal } from "@/helpers/interfaces";
import { changeThemeApi } from "@/server/other";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { changeTheme } from "@/stores/slices/themeSlice";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import styles from "../../../../../../styles/pages/auth.module.scss";
const initialState = {
    message: '',
    status: '',
}
function Header() {
    const t = useTranslations('Auth');
    const currentLanguage = useLocale();
    const currentPath = usePathname();
    const router = useRouter();
    const themeRef = useRef<HTMLInputElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const theme = useAppSelector((state) => state.theme.name);
    const dispatch = useAppDispatch();
    const [state, formAction] = useFormState(changeThemeApi, initialState)

    const handleChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(changeTheme({ name: newTheme }));
        if (themeRef.current && btnRef.current) {
            themeRef.current.value = newTheme;
            btnRef.current.click();
        }
    }

    const handleLanguageChange = () => {
        showModal({
            icon: <TranslateIcon props={'text-[30px]'} />,
            title: `${t('you_want_to_switch_to')} ${currentLanguage === 'vi' ? t('english') : t('vietnamese')}?`,
            textSelectedOne: t('close'),
            textSelectedTwo: `${t('switching_to')} ${currentLanguage === 'vi' ? t('english') : t('vietnamese')}`,
            onSelectedTwo: () => {
                if (currentPath.includes('/vi/')) {
                    const newPath = currentPath.replace('/vi/', `/en/`);
                    router.replace(newPath);
                } else {
                    const newPath = currentPath.replace('/en/', '/vi/');
                    router.replace(newPath);
                }
            }
        })
    }

    return (
        <>
            <Button link='/login' text={t('login')} className='btn-primary w-[150px]' typeNavi={'replace'} />
            <Button link='/register' text={t('register')} className='btn-normal w-[150px] mr-[10px]' typeNavi={'replace'} />
            <form action={formAction} className="hidden">
                <input type='text' name='theme' className="hidden" ref={themeRef} />
                <button ref={btnRef} type="submit" className="hidden"></button>
            </form>
            <Button
                icon={theme === 'light' ? <LightIcon props={'text-[30px] text-white'} /> : <DarkIcon props={'text-[30px] text-black'} />}
                className={`${styles.themes} w-[46px] !rounded-[5px] btn-normal !bg-transparent`}
                onclick={handleChangeTheme}
            />
            <Button
                text={currentLanguage}
                icon={<TranslateIcon props={'text-[30px]'} />}
                className={`${styles.languages} !rounded-[5px] w-[100px] btn-normal uppercase !bg-transparent`}
                onclick={handleLanguageChange}
            />
        </>
    );
}

export default Header;