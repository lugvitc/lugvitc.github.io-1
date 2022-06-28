import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/home';
import Events from './pages/events/events';

import TopBar from './components/topBar/topBar';
import Dock from './components/dock/dock';
import LearnLinux from './pages/learnLinux/learnLinux';
import { useEffect, useRef, useState } from 'react';

export default function App() {
    const pages = [
        {
            title: 'Home',
            link: '/',
            component: <Home />
        },
        {
            title: 'Events',
            link: '/events',
            component: <Events />
        },
        {
            title: 'Learn Linux',
            link: '/learn-linux',
            component: <LearnLinux />
        }
    ];

    const [mainTopMargin, setMainTopMargin] = useState('0');

    const topBarRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setMainTopMargin(`${topBarRef.current.clientHeight}px`);
        });
    });

    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <TopBar refer={topBarRef} topBarLinks={pages} />
                            <main
                                style={{
                                    marginTop: mainTopMargin,
                                    minHeight: `calc(100vh - ${mainTopMargin})`
                                }}
                                id='content'
                            >
                                <Dock />
                                <div className='terminals'>
                                    <Outlet />
                                </div>
                            </main>
                        </>
                    }
                >
                    {pages.map((page, index) =>
                        page.link === '/' ? (
                            <Route key={index} index element={page.component} />
                        ) : (
                            <Route
                                key={index}
                                path={page.link}
                                element={page.component}
                            />
                        )
                    )}
                </Route>
            </Routes>
        </HashRouter>
    );
}

