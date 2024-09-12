import styles from '@/styles/pages/chat.module.scss';
import { memo, useEffect, useRef } from 'react';
interface TypeProps {
    author?: boolean,
    addReactEmojis: (emoji: string) => void,
}
function ReactEmojiForm({ props }: { props: TypeProps }) {
    const { author, addReactEmojis } = props;
    const emojiFormRef = useRef<HTMLDivElement>(null);
    const handleEmojiSelect = (emoji: string) => {
        addReactEmojis(emoji)
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiFormRef.current && !emojiFormRef.current.contains(event.target as Node)) {
                handleEmojiSelect('')
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    return (
        <div ref={emojiFormRef} className={`${styles.reactEmojiForm} ${author ? 'left-[-210px]' : 'right-[-210px]'} absolute bottom-[5px] flex justify-center items-center gap-[3px] w-[max-content] h-[42px] rounded-full px-[10px] py-[5px] bg-white`}>
            {['❤️', '😆', '😥', '😮', '😡'].map((emoji: any, index: number) => (
                <span
                    className='text-[21px] cursor-pointer m-[5px] hover:scale-[1.2]'
                    style={{transition: 'all .1s ease-in-out'}}
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
}

export default memo(ReactEmojiForm);