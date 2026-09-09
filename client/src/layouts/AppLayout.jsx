import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Users, CreditCard, Layers3, Settings, LayoutDashboard, LogOut, Bell, Search, Sparkles } from 'lucide-react';

const nav = [
  { to:'/dashboard', label:'Dashboard', icon:LayoutDashboard },
  { to:'/analytics', label:'Analytics', icon:BarChart3 },
  { to:'/customers', label:'Customers', icon:Users },
  { to:'/transactions', label:'Transactions', icon:CreditCard },
  { to:'/offerings', label:'Offerings', icon:Layers3 },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('insight_user') || '{}');

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><span>InsightHub</span></div>
        <div className="workspace"><span className="dot"></span><div><small>Workspace</small><b>Acme Intelligence</b></div></div>
        <nav>
          <div className="nav-label">MAIN</div>
          {nav.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} className={({isActive})=>isActive?'nav-item active':'nav-item'}><Icon size={18}/><span>{label}</span></NavLink>)}
          <div className="nav-label settings-label">SYSTEM</div>
          <NavLink to="/settings" className={({isActive})=>isActive?'nav-item active':'nav-item'}><Settings size={18}/><span>Settings</span></NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card"><span>Plan</span><b>Growth Pro</b><small>68% of usage</small><div className="progress"><i style={{width:'68%'}}/></div></div>
          <button className="logout" onClick={logout}><LogOut size={17}/> Sign out</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={17}/><input placeholder="Search anything..." /></div>
          <div className="top-actions"><button className="icon-btn"><Bell size={18}/><i></i></button><div className="profile"><div className="avatar">{(user.name||'AM').split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><b>{user.name||'Admin'}</b><span>{user.role||'Administrator'}</span></div></div></div>
        </header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}
