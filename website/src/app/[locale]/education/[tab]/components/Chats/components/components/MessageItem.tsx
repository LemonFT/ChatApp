import { HeartIcon } from "@/assets/images/svg";
import styles from "@/styles/pages/chat.module.scss";
import { MessageType } from "@/types/constants/message";
import Image from "next/image";
import { memo, ReactElement, useCallback, useState } from "react";
import ReactEmojiForm from "../ReactEmojiForm";

function ItemMessage ({ typeRender, message }: { typeRender: {
    type: 'image-description' | 'message';
    author: boolean;
}, message: MessageType }) {
    const [showReactEmojis, setShowReactEmojis] = useState<boolean>(false);
    const [reactEmojis, setReactEmojis] = useState<string | ReactElement>('');
    const handleUpdateStatusReactEmojis = () => {
        setShowReactEmojis(!showReactEmojis)
    };
    const addReactEmojis = useCallback((emoji: string) => {
        setReactEmojis(emoji);
        handleUpdateStatusReactEmojis();
    }, [handleUpdateStatusReactEmojis, setReactEmojis]);

    return (
        <>
            {
                typeRender.type === 'message' &&
                <div className={`${styles.boxMessage} ${typeRender.author ? 'items-end' : 'items-start'} flex flex-col justify-center gap-[3px] w-full min-h-[44px] mb-[16px]`}>
                    <div className={`${styles.message} ${typeRender.author ? 'bg-[#5B96F7]' : 'bg-white'} relative max-w-[300px] w-[max-content] min-h-[44px] px-[20px] py-[12px] rounded-[12px]`}>
                        <span className={`${typeRender.author ? 'text-white' : 'text-[#696969]'} max-w-[300px] break-words text-[14px] mango600`}>{message.message}</span>
                        <span className={`${typeRender.author ? 'left-[5px]' : 'right-[5px]'} absolute bottom-[-18px] mango600 text-[12px] leading-[16px] text-[#888888] `}>{message.timeSend}</span>
                        <div className={`${styles.reactMessBox} ${typeRender.author ? 'justify-start' : 'justify-end'} flex items-center w-full mt-[2px]`}>
                            <button onClick={() => { handleUpdateStatusReactEmojis() }} className={`${styles.reactMess} cursor-pointer w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center`}>
                                {reactEmojis !== '' ? reactEmojis : <HeartIcon props={''} />}
                            </button>
                            {showReactEmojis && <ReactEmojiForm props={{
                                author: typeRender.author,
                                addReactEmojis: addReactEmojis,
                            }} />}
                        </div>
                    </div>
                </div>
            }
            {
                typeRender.type === 'image-description' &&
                <div className={`${styles.boxMessage} ${typeRender.author ? 'items-end' : 'items-start'} flex flex-col justify-center gap-[3px] w-full min-h-[44px] mb-[16px]`}>
                    <div className={`${styles.messageDescription} ${typeRender.author ? 'bg-[#5B96F7]' : 'bg-white'} relative flex flex-col justify-start items-start gap-[8px] max-w-[300px] w-[max-content] min-h-[44px] px-[20px] py-[12px] rounded-[12px]`}>
                        <Image src={message.image ?? ''} alt={''} width={200} height={180} className={`rounded-[12px]`} />
                        <span className={`${typeRender.author ? 'text-white' : 'text-[#696969]'} max-w-[300px] break-words text-[14px] mango600 text-[#696969]`}>{message.message}</span>
                        <span className={`${typeRender.author ? 'left-[5px]' : 'right-[5px]'} absolute bottom-[-18px] mango600 text-[12px] leading-[16px] text-[#888888]`}>{message.timeSend}</span>
                        <div className={`${styles.reactMessBox} ${typeRender.author ? 'justify-start' : 'justify-end'} flex items-center w-full mt-[2px]`}>
                            <button onClick={() => { handleUpdateStatusReactEmojis() }} className={`${styles.reactMess} cursor-pointer w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center`}>
                                {reactEmojis !== '' ? reactEmojis : <HeartIcon props={''} />}
                            </button>
                            {showReactEmojis && <ReactEmojiForm props={{
                                author: typeRender.author,
                                addReactEmojis: addReactEmojis,
                            }} />}
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default memo(ItemMessage);
