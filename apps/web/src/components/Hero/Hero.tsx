import Button from "../Button/Button";
import styles from "./Hero.module.scss";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.badge}>
                    Built for modern development teams
                </span>

                <h1 className={styles.title}>
                    Plan better.
                    <span>
                        Build faster.
                    </span>
                </h1>

                <p className={styles.description}>
                    SprintFlow brings projects, sprints, tasks, and bugs together in one
                    focused workspace, so your team can spend less time managing work
                    and more time building.
                </p>

                <div className={styles.actions}>
                    <Button className={styles.primaryButton}>
                        Get Started
                    </Button>

                    <Button className={styles.secondaryButton}>
                        Explore SprintFlow
                    </Button>
                </div>

                <div className={styles.trust}>
                    <span>Projects</span>
                    <span>•</span>
                    <span>Sprints</span>
                    <span>•</span>
                    <span>Tasks</span>
                    <span>•</span>
                    <span>Bugs</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;