import '../../../../../../styles/global/no.scroll.scss';
import styles from '../../../../../../styles/pages/auth.module.scss';
import FormRegister from './FormRegister';
function RegisterPage() {

    return (
        <div className={`${styles.formRegister} w-full h-4/5 flex justify-center items-center mt-[30px]`}>
            <FormRegister />
        </div>
    );
}

export default RegisterPage;