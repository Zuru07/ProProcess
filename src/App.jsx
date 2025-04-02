import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatSystem from './components/ChatSystem';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} toggleTheme={toggleTheme} />
      <main className="main-content">
        {activeTab === 'chat' && <ChatSystem />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

export default App;