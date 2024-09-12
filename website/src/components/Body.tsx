import StyledComponentsRegistry from "@/libs/antd.registry";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { changeTheme } from "@/stores/slices/themeSlice";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";

function Body({ props }: any) {
    const { children, messages, locale, themeCache, inter } = props;
    const theme = useAppSelector((state) => state.theme.name);
    const dispatch = useAppDispatch();
    useEffect(() => {    
        dispatch(changeTheme({ name: themeCache ? themeCache : 'light' }))
    }, [])
    return (
        <StyledComponentsRegistry>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className={`${inter.className} ${theme ?? 'light'}`}>
                    {children}
                </body>
            </NextIntlClientProvider>
        </StyledComponentsRegistry>
    );
}

export default Body;