import { PointOnline } from '@/assets/images/svg';
import { handleImageError } from '@/helpers/logic';
import styles from '@/styles/pages/chat.module.scss';
import Image from 'next/image';
function UserChat() {
    return ( 
        <div className={`${styles.userChat} flex justify-start items-center gap-[15px] w-[320px] h-[80px] px-[16px] py-[15px] rounded-[15px] cursor-pointer bg-white hover:bg-[#5795fa] active:bg-[#508ef3]`}>
            <div className={`${styles.avatar} relative flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white`}>
                <Image onError={(e) => { handleImageError(e) }} src={'https://th.bing.com/th/id/OIP.jXK1O0Jmm3_1zTYt5isKWQHaKq?rs=1&pid=ImgDetMain'} loading='lazy' width={48} height={48} alt='' unoptimized={true} className={`w-[48px] h-[48px] object-cover  rounded-full`} />
                <span className='absolute right-[2px] bottom-[2px]'><PointOnline props /></span>
            </div>
            <div className={`${styles.message} flex flex-1 flex-col justify-center items-start gap-[4px] `}>
                <h3 className={`${styles.author} text-[#030303] mango800 text-[16px] leading-[22px]`}>QuocLam</h3>
                <span className={`${styles.message} text-[#7C7C7D] mango600 text-[14px] leading-[20px]`}>Xin chao ban!</span>
            </div>
            <div className={`${styles.info} flex flex-col justify-center items-end gap-[10px]`}>
                <span className={`${styles.timeSend} text-[#686768] w-[30px] mango500 text-[12px]`}>9:07</span>
                <span className={`${styles.numberNewMessage} flex justify-center items-center w-[18px] h-[18px] rounded-full text-center bg-[#5B96F7] text-white mango700 text-[10px] leading-[13.7px]`}>2</span>
            </div>
        </div>
     );
}

export default UserChat;