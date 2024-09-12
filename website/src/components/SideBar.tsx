'use client'
import { ChatIcon, DarkIcon, Electron, LightIcon, LoaderLine, NoteIcon, PhoneIcon, SettingsIcon, TranslateIcon, UsersIcon } from '@/assets/images/svg';
import { showModal } from '@/helpers/interfaces';
import { _useDebounce, handleImageError } from '@/helpers/logic';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { changeTheme } from '@/stores/slices/themeSlice';
import styles from '@/styles/components/sidebar.module.scss';
import { Switch } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Button from './Button';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SideBar() {
    const theme = useAppSelector((state) => state.theme.name);
    const [checkedSwitch, setCheckedSwitch] = useState<boolean>(cookies.get('theme') === 'dark');
    const [loadTheme, setLoadTheme] = useState<boolean>(false);
    const [turnOnAnimation, setTurnOnAnimation] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const stylesIcon = 'text-[28px] text-white'

    const t = useTranslations('Auth');
    const currentLanguage = useLocale();
    const currentPath = usePathname();
    const router = useRouter();

    const changeThemeFunc = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(changeTheme({ name: newTheme }))
        cookies.set('theme', newTheme, { path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
        const t = setTimeout(() => {
            setLoadTheme(false);
        }, 1300);
        return () => clearTimeout(t);
    };

    const changeThemeDebounce = _useDebounce(changeThemeFunc, 1000);

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

    useEffect(() => {
        setTimeout(() => {
            setTurnOnAnimation(true);
        }, 1000);
    }, [])

    useEffect(() => {
        if (loadTheme === true) {
            changeThemeDebounce();
        }
    }, [checkedSwitch])

    function SideBarItem({ props }: any) {
        const { icon, text, stylesIcon, stylesText } = props;
        return (
            <div className={`${styles.item} ${stylesIcon ?? ''} flex flex-col justify-center items-center w-full h-[50px] gap-[2px] px-[10px] py-[5px]`}>
                <div className={`${styles.icon} flex justify-center items-center w-full`}>
                    {icon}
                </div>
                <span className={`${stylesText ?? ''} opacity uppercase text-[10px] text-center`}>{text}</span>
            </div>
        )
    }
    return (
        <div className={`${styles.sidebar} relative flex flex-col justify-start items-center gap-[10px] min-w-[80px] min-h-[100vh] border-ccc bg-black overflow-hidden`}>
            <div className={`${styles.logo} flex justify-center items-center w-full min-w-[80px] h-[70px] border-b-ccc`}>
                <Electron props={'text-[40px] text-white'} />
            </div>
            <div className={`${styles.items} flex flex-col justify-start items-center gap-[10px] w-full mt-[10px]`}>
                {
                    [
                        { icon: <UsersIcon props={stylesIcon} />, text: 'Group' },
                        { icon: <ChatIcon props={stylesIcon} />, text: 'Message' },
                        { icon: <NoteIcon props={stylesIcon} />, text: 'Note' },
                    ].map((item, index) => (
                        <SideBarItem key={index} props={item} />
                    ))
                }
            </div>
            <div className={`${styles.setting} w-[70%] mx-auto my-[20px] py-[8px] border-t-ccc border-b-ccc`}>
                <SideBarItem props={{ icon: <SettingsIcon props={stylesIcon} />, text: 'Setting', stylesText: 'text-white' }} />
            </div>
            <div className={`${styles.theme} relative flex flex-col justify-center items-center w-full`}>
                <span className={`${styles.iconTheme} ${!turnOnAnimation ? 'opacity-0' : 'opacity-1'} flex justify-center items-center w-full py-[20px]`}>
                    {
                        <>
                            <span className={`${((theme === 'light' || !theme) ? styles.themeShow : styles.themeHide)} absolute`}>
                                <LightIcon props={'text-[30px] text-white'} />
                            </span>
                            <span className={`${(theme === 'dark' ? styles.themeShow : styles.themeHide)} absolute`}>
                                <DarkIcon props={'text-[40px] text-white'} />
                            </span>
                        </>
                    }
                </span>
                <span className='flex justify-center items-center w-full min-h-[20px] text-white'>
                    {
                        turnOnAnimation && theme &&
                        <span className={`${styles.textTheme} uppercase text-[10px] text-center`}>
                            {theme}
                        </span>
                    }
                </span>
                <span className='flex justify-center items-center gap-[5px] w-full mt-[8px]'>
                    {
                        !loadTheme &&
                        <Switch checked={theme === 'light'} onChange={() => {
                            setLoadTheme(true);
                            setCheckedSwitch(!checkedSwitch);
                        }} />
                    }
                    {loadTheme && <button className={`${styles.btnLoad} w-[44px] h-[22px] rounded-full border-ccc relative`}>
                        <LoaderLine props={`${!checkedSwitch ? 'right-0 top-0' : 'left-0 top-0'} transition-all-[.2s] text-[20px] text-white loader-speed absolute`} />
                    </button>}
                </span>
            </div>
            <Button
                type='button'
                className='bg-white text-black border-ccc h-[70px] w-[45px] px-[5px] rounded-[8px] mt-[20px] flex flex-col justify-center items-center gap-[3px] text-[13px] uppercase'
                icon={<TranslateIcon props={'text-[20px]'} />}
                text={currentLanguage}
                onclick={() => { handleLanguageChange(); }}
            />
            <div className={`${styles.avatar} absolute overflow-hidden bottom-0 left-0 w-full h-[80px] flex justify-center items-center`} >
                <Image alt='' src={''} onError={(e) => { handleImageError(e) }} className={`w-[50px] h-[50px] rounded-full border-ccc-2 object-cover `} />
            </div>
        </div>
    );
}

export default SideBar;