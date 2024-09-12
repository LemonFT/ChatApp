import Button from '@/components/Button';
import { useFormStatus } from 'react-dom';
import styles from '../../../../../../styles/pages/auth.module.scss';
function ButtonLogin({props}: any) {
    const {t} = props;
    const formStatus = useFormStatus();
    return (
        <div className={`${styles.btnLogin} submit w-[350px] flex justify-center items-center`}>
            <Button
                    type='submit'
                    text={t('login')}
                    className="btn btn-primary w-full mt-[50px]"
                    loading={formStatus.pending}
                />
        </div>
    );
}

export default ButtonLogin;