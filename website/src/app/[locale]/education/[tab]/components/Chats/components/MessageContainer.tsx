'use client'
import { ArrowDown } from "@/assets/images/svg";
import { _useDebounce, checkElementInViewPort } from "@/helpers/logic";
import { useAppSelector } from "@/stores/hooks";
import { getMessages } from "@/stores/slices/messageSlice";
import styles from "@/styles/pages/chat.module.scss";
import { MessageType } from "@/types/constants/message";
import { UserTypeGet } from "@/types/constants/user";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ItemMessage from "./components/MessageItem";

function Messages() {
    const dispatch = useDispatch();
    const allMessages = useAppSelector((state) => state.message.userMessState);
    const scrollBottomRef = useRef<HTMLDivElement | null>(null);
    const [showButtonScrollBottom, setShowButtonScrollBottom] = useState<boolean>(false);
    const GetTypeRender = (userQuery: UserTypeGet, message: MessageType): {
        type: 'image-description' | 'message';
        author: boolean;
    } => {
        if (message.image && message.message) {
            return {
                type: 'image-description',
                author: message.userSendId === userQuery.id
            };
        } else {
            return {
                type: 'message',
                author: message.userSendId === userQuery.id
            };
        }
    };

    const checkElementInViewPortDebounce = _useDebounce(() => {
        setShowButtonScrollBottom(!checkElementInViewPort(scrollBottomRef))
    }, 50);

    const scrollBottom = (delay: number) => {
        setTimeout(() => {
            scrollBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }, delay);
    }

    const renderedMessages = useMemo(() => {
        return allMessages && allMessages[0]?.messages?.map((chatMessage: MessageType, id: number) => {
            return <ItemMessage key={id} typeRender={GetTypeRender(allMessages[0].userQuery, chatMessage)} message={chatMessage} />;
        });
    }, [allMessages]);

    useEffect(() => {
        dispatch(getMessages({}));
    }, [dispatch]);

    useEffect(() => {
        scrollBottom(500);
    }, [allMessages]);


    return (
        <div
            onScroll={() => {
                checkElementInViewPortDebounce();
            }}
            className={`${styles.messages} overflow-y-auto scroll-bar flex-1 w-full px-[20px] bg-[#F0F4FA]`}
            style={{ maxHeight: 'calc(100vh - 170px)' }}
        >
            <div className="relative w-full h-[20px] bg-transparent"> </div>
            {
                renderedMessages
            }
            {
                showButtonScrollBottom && <button
                    onClick={() => {
                        scrollBottom(100);
                    }}
                    className={`${styles.btnScrollBottom} absolute flex justify-center items-center bottom-[100px] left-[50%] translate-x-[-50%] w-[25px] h-[25px] rounded-full bg-white active:bg-gray-300 text-[black]`}>
                    <ArrowDown props={'text-20px'} />
                </button>
            }
            <div ref={scrollBottomRef} className="relative w-full h-[20px] bg-transparent"> </div>
        </div>
    )
}
export default Messages;