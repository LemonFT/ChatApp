'use client'
import { PhoneIcon, PointOnline, SearchGrayIcon, VideoCallIcon } from "@/assets/images/svg";
import { handleImageError } from "@/helpers/logic";
import styles from "@/styles/pages/chat.module.scss";
import Image from "next/image";
import ChatBox from "./components/ChatBoxContainer";
import Messages from "./components/MessageContainer";
function ChatContainer() {
    return (
        <div className={`${styles.chatContainer} relative flex flex-col justify-start items-start w-[636px] h-full min-h-screen border-r-ccc bg-[#F8FAFF]`}>
            <div className={`${styles.infoUserReceived} w-full h-[80px] flex justify-between items-center px-[30px] py-[16px] border-b-ccc`}>
                <div className={`${styles.left} flex justify-start items-center gap-[17px]`}>
                    <div className={`${styles.avatar} relative flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white`}>
                        <Image onError={(e) => { handleImageError(e) }} src={'https://th.bing.com/th/id/OIP.jXK1O0Jmm3_1zTYt5isKWQHaKq?rs=1&pid=ImgDetMain'} loading='lazy' width={48} height={48} alt='' unoptimized={true} className={`w-[48px] h-[48px] object-cover  rounded-full`} />
                        <span className='absolute right-[2px] bottom-[2px]'><PointOnline props /></span>
                    </div>
                    <div className={`${styles.nameAndStatus}`}>
                        <h3 className={`${styles.name} mango800 text-[16px] leading-[22px] text-[#000000]`}>
                            QuocLam
                        </h3>
                        <span className={`${styles.status} mango600 text-[14px] leading-[20px] text-[#696969]`}>
                            Online
                        </span>
                    </div>
                </div>
                <div className={`${styles.right} flex justify-end items-center gap-[40px]`}>
                    <span className="cursor-pointer"><VideoCallIcon props={''} /></span>
                    <span className="cursor-pointer"><PhoneIcon props={''} /></span>
                    <span className="cursor-pointer"><SearchGrayIcon props={''} /></span>
                </div>
            </div>
            <Messages />
            <ChatBox />
        </div>
    );
}

export default ChatContainer;