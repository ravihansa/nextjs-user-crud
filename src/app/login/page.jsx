"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logInUser } from "@/services/api";
import { useAlerts } from '@/components/common/alertProvider';
import LogInForm from "@/components/user/logInForm";
import { useAuth } from '@/contexts/authContext';

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const { successAlert, errorAlert } = useAlerts();

    const handleLogIn = async (userCredentials) => {
        try {
            setLoading(true);
            const res = await logInUser(userCredentials);
            const data = await res.json();
            if (data.status) {
                successAlert(data.message);
                login(data.data?.accessToken);
                router.push('/users');
            } else {
                errorAlert(data.message || 'Login failed');
            }
        } catch (err) {
            errorAlert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LogInForm onLogIn={handleLogIn} loading={loading} />
    );
};

export default Login;
