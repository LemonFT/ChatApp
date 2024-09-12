'use client'
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "@/assets/images/svg";
import Body from "@/components/Body";
import store from "@/stores";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

function StoreProvider({ props }: any) {
    const { children, messages, locale, themeCache, inter } = props;
    
    return (
        <Provider store={store}>
            <Body props={{
                children,
                messages,
                locale,
                themeCache,
                inter
            }} />
            <Toaster
                richColors={true}
                expand={false}
                position="bottom-right"
                toastOptions={{
                    className: 'toaster-toast',
                }}
                closeButton
                duration={30000}
                icons={{
                    success: <SuccessIcon props={'text-[26px]'} />,
                    warning: <WarningIcon props={'text-[26px]'} />,
                    info: <InfoIcon props={'text-[26px]'} />,
                    error: <ErrorIcon props={'text-[26px]'} />
                }}
            />
        </Provider>
    );
}

export default StoreProvider;