import { EmojiIcon, LinkIcon, SendIcon } from "@/assets/images/svg";
import { containsNonWhitespaceCharacters } from "@/helpers/logic";
import { sendMessages } from "@/stores/slices/messageSlice";
import styles from "@/styles/pages/chat.module.scss";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

function ChatBox() {
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setInputValue(inputValue + emojiObject.emoji);
    };
    const sendMessage = () => {
        if(containsNonWhitespaceCharacters(inputValue) && fileRef){
            dispatch(sendMessages({
                userSendId: 1,
                userReceiveId: 2,
                message: inputValue,
                timeSend: new Date().toLocaleTimeString('ja-JP', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }))
        }
        setInputValue('');
        setEmojiPickerOpen(false);
    }

    return (
        <div className={`${styles.chatBox} flex justify-between items-center gap-[20px] py-[20px] px-[24px] w-full h-[85px]`}>
            <div className={`${styles.chatInput} w-full px-[19px] py-[9px] flex-1 flex justify-start items-center gap-[18px] bg-[#EAF2FE] rounded-[10px]`}>
                <button type="button" onClick={() => {
                    fileRef.current?.click();
                }}
                    className={`${styles.link} w-[30px] cursor-pointer`}
                >
                    <LinkIcon props={''} />
                    <input ref={fileRef} type="file" id="file" className="hidden" />
                </button>
                <input id="searchUserChat"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    className={`w-full h-full flex-1 bg-transparent outline-none mango600 text-[#709CE6] placeholder:text-[#709CE6] placeholder:text-[16px]`}
                    type="text" placeholder="Write a message ..."
                />
                <div className={`${styles.emoji} relative w-[30px] cursor-pointer`}>
                    {isEmojiPickerOpen && (
                        <div className={`emoji-picker absolute top-[-450px] right-[30px]`}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    <span onClick={() => { setEmojiPickerOpen(!isEmojiPickerOpen) }}>
                        <EmojiIcon props={''} />
                    </span>
                </div>
            </div>
            <button
                onClick={() => {
                    sendMessage();
                }}
                className={`w-[48px] h-[48px] flex justify-center items-center rounded-[12px] bg-[#5B96F7]`}
            >
                <SendIcon props={''} />
            </button>
        </div>
    )

}

export default ChatBox;