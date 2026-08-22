import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../components/Button/Button";
import styles from "./Register.module.scss";
import {
    RegisterFormSchema,
    type RegisterFormData,
} from "./Register.type";
import { useRegisterMutation } from "../../store/api/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema),
    });

    const navigate= useNavigate();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerUser(data).unwrap();
            toast.success(response.message);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const [registerUser, { isLoading }] = useRegisterMutation();

    return (
        <main className={styles.register}>
            <section className={styles.registerCard}>
                <div className={styles.header}>
                    <span className={styles.badge}>SprintFlow</span>

                    <h1>Create your account</h1>

                    <p>Sign up to start managing your projects.</p>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name")}
                        />

                        {errors.name && (
                            <span className={styles.error}>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className={styles.submit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>

                <p className={styles.login}>
                    Already have an account?{" "}
                    <a href="/login">Sign In</a>
                </p>
            </section>
        </main>
    );
};

export default Register;