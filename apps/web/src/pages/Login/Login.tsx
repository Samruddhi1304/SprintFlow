import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";
import {
    LoginFormSchema,
    type LoginFormData,
} from "./Login.type";
import { useLoginMutation } from "../../store/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "sonner";


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
    });

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap();
            dispatch(
                setCredentials({
                    accessToken: response.accessToken,
                }),
            );
            toast.success("Login successful");
        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <main className={styles.login}>
            <section className={styles.loginCard}>
                <div className={styles.header}>
                    <span className={styles.badge}>SprintFlow</span>

                    <h1>Welcome back</h1>

                    <p>Sign in to continue managing your projects.</p>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
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

                        <div className={styles.passwordWrapper}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                            />

                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

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
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <p className={styles.register}>
                    Don't have an account?{" "}
                    <a href="/register">Get Started</a>
                </p>
            </section>
        </main>
    );
};

export default Login;