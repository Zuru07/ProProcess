import React from 'react';

function Sidebar({ activeTab, setActiveTab, isCollapsed, toggleCollapse }) {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">

        {!isCollapsed && <h1>ProcessPro</h1>}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => setActiveTab('chat')}
          >
            <span className="icon">💬</span>
            {!isCollapsed && <span>Chat</span>}
          </li>
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="icon">📊</span>
            {!isCollapsed && <span>Dashboard</span>}
          </li>
        </ul>
      </nav>
      <button className="collapse-btn" onClick={toggleCollapse}>
        {isCollapsed ? '➡' : '⬅'}
      </button>
    </div>
  );
}

export default Sidebar;