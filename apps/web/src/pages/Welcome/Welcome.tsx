import Hero from '../../components/Hero/Hero';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Welcome.module.scss'
const Welcome = () => {
    return (
        <main className={styles.welcome}>
            <Navbar/>
            <Hero/>
        </main>
    );
};

export default Welcome;