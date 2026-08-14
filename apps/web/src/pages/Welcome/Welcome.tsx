import Hero from '../../components/Hero/Hero';
import styles from './Welcome.module.scss'
const Welcome = () => {
    return (
        <main className={styles.welcome}>
            <Hero/>
        </main>
    );
};

export default Welcome;