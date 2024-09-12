'use client'
import { LoaderDashed, LoaderLine, SearchIcon, SortTypeChat } from "@/assets/images/svg";
import styles from "@/styles/pages/chat.module.scss";
import UserChat from "./components/UserChat";
function ListChat() {
    return (
        <div className={`${styles.listChat} flex flex-col justify-start items-start bg-[#F8FAFF] border-r-ccc w-[384px] h-full min-h-screen px-[30px] py-[35px]`}>
            <div className={`${styles.title} flex justify-between items-center w-full h-[50px] mb-[31px]`}>
                <h1 className={`text-[25px] mango800`}>Chats</h1>
                <span className={`flex justify-center items-center`}><LoaderDashed props={'loader-speed'} /></span>
            </div>
            <label htmlFor="searchUserChat" className={`${styles.searchBox} flex justify-start items-center gap-[12px] w-[327px] h-[50px] px-[18px] py-[13px] mb-[39px] rounded-[20px] bg-[#EAF2FE]`}>
                <span className={`w-[24px] h-[24px] cursor-pointer`}><SearchIcon props={''} /></span>
                <input id="searchUserChat" className={`w-full h-full bg-transparent outline-none mango600 text-[#709CE6] placeholder:text-[#709CE6] placeholder:text-[16px]`} type="text" placeholder="Search" />
                <span className={`w-[24px] h-[24px] cursor-pointer`} onClick={() => {
                    alert('ok')
                }} ><SortTypeChat props={''} /></span>
            </label>
            <span className="w-full h-[1px] border-ccc"></span>
            <div className={`${styles.boxChats} overflow-y-auto pl-[3px] pr-[22px] pt-[10px] pb-[15px] scroll-bar `} style={{ maxHeight: 'calc(100vh - 240px)' }}>
                <div className={`${styles.pinned} mb-[27px]`}>
                    <h3 className={`${styles.pinnedTitle} mb-[23px] mango700 text-[#676667] text-[16px]`}>Pinned</h3>
                    <div className={`${styles.listPinned} flex flex-col justify-start items-start gap-[18px]`} >
                        <UserChat />
                        <UserChat />
                        <UserChat />
                    </div>
                </div>
                <div className={`${styles.allChats} `}>
                    <h3 className={`${styles.allChatsTitle} mb-[23px] mango700 text-[#676667] text-[16px]`}>Other</h3>
                    <div className={`${styles.listAllChats} flex flex-col justify-start items-start gap-[18px]`}>
                        <UserChat />
                        <UserChat />
                        <UserChat />
                    </div>
                </div>
            </div>
            <span className="w-full h-[1px] border-ccc"></span>
        </div>
    );
}

export default ListChat;