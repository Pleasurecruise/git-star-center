import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/tokenStore';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken } = useAuthStore();

    // 从URL中获取参数
    const getUrlParameter = (name: string): string => {
        name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        console.log('token:', token);
        try {
            setToken(token);
            navigate('/', { replace: true });
        } catch (error) {
            console.log('error:', error);
            navigate('/login', { state: { showErrorModal: true, error } });
        }
    }, [location, navigate, setToken]);

    return null;
};

export default OAuth2RedirectHandler;
