import SideBar from "@/components/SideBar";
import ListChat from "./components/Chats/ListChat";
import ChatContainer from "./components/Chats/ChatContainer";

function Tab(props: any) {
    return (<div className="flex justify-start items-start">
        <SideBar />
        <div className={`flex justify-center items-start`}>
            <ListChat />
            <ChatContainer />
        </div>
    </div>);
}

export default Tab;