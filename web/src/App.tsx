import { HelmetProvider } from "react-helmet-async";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HelmetProvider>
                <Router>
                    <Index>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                            <Route path="/500" element={<ErrorPage />} />

                            <Route path="/" element={<Dashboard />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/mail" element={<MailBox />} />
                            <Route path="/monitor" element={<Monitor />} />
                            <Route path="/repository" element={<Repository />} />
                            <Route path="/star" element={<Star />} />
                            <Route path="/project" element={<Project />} />
                            <Route path="/me" element={<ToMe />} />
                            <Route path="/my" element={<I />} />
                            {/* 可以添加更多路由 */}
                        </Routes>
                    </Index>
                </Router>
            </HelmetProvider>
        </ThemeProvider>
    );
}

export default App;
