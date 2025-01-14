import { HelmetProvider } from "react-helmet-async";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider } from "@/components/layout/theme-provider.tsx";
import Index from "@/page";
import ErrorPage from "@/page/500";
import Dashboard from "@/page/dashboard";
import Account from "@/page/account";
import MailBox from "@/page/mailbox";
import Login from "@/page/login/index";
import Monitor from "@/page/monitor";
import Repository from "@/page/repository";
import Project from "@/page/repository/project.tsx";
import Star from "@/page/dashboard/star/index.tsx";
import ToMe from "@/page/interaction/uni-type-tome.tsx";
import I from "@/page/interaction/uni-type-i.tsx";
import OAuth2RedirectHandler from "@/utils/oauthredirecthandler";

import { useAuthStore } from '@/store/tokenStore';
import { useEffect, useState } from 'react';

function App() {
    const isAuthenticated = useAuthStore(state => !!state.token);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        setAuthChecked(true);
    }, [isAuthenticated]);

    if (!authChecked) {
        return null;
    }
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HelmetProvider>
                <Router>
                    <Index>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                            <Route path="/500" element={<ErrorPage />} />
                            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                            <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
                            <Route path="/mail" element={isAuthenticated ? <MailBox /> : <Navigate to="/login" />} />
                            <Route path="/monitor" element={isAuthenticated ? <Monitor /> : <Navigate to="/login" />} />
                            <Route path="/repository" element={isAuthenticated ? <Repository /> : <Navigate to="/login" />} />
                            <Route path="/star" element={isAuthenticated ? <Star /> : <Navigate to="/login" />} />
                            <Route path="/project" element={isAuthenticated ? <Project /> : <Navigate to="/login" />} />
                            <Route path="/me" element={isAuthenticated ? <ToMe /> : <Navigate to="/login" />} />
                            <Route path="/my" element={isAuthenticated ? <I /> : <Navigate to="/login" />} />
                            {/* 可以添加更多路由 */}
                        </Routes>
                    </Index>
                </Router>
            </HelmetProvider>
        </ThemeProvider>
    );
}

export default App;
