import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [email,setEmail] = useState('admin@insighthub.local');
  const [password,setPassword] = useState('Admin@123');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault(); setError('');
    try {
      const {data} = await api.post('/auth/login',{email,password});
      localStorage.setItem('insight_token',data.token);
      localStorage.setItem('insight_user',JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) { setError(err.response?.data?.message || 'Unable to sign in'); }
  }

  return <div className="login-page">
    <div className="login-decoration"><div className="orb one"></div><div className="orb two"></div><div className="login-grid"></div><div className="login-copy"><div className="brand light"><div className="brand-mark"><Sparkles size={18}/></div>InsightHub</div><h1>See the signal<br/>behind the <em>numbers.</em></h1><p>A focused intelligence workspace for teams that want to understand what is happening, why it matters, and where to go next.</p><div className="quote">“Clarity is the beginning of better decisions.”</div></div></div>
    <div className="login-panel"><div className="login-box"><div className="mobile-brand"><Sparkles size={18}/> InsightHub</div><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your workspace</h2><p>Use the demo account to explore the full dashboard.</p><form onSubmit={submit}><label>Email<div className="input"><Mail size={17}/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" /></div></label><label>Password<div className="input"><LockKeyhole size={17}/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" /></div></label>{error&&<div className="error">{error}</div>}<button className="primary wide">Sign in <ArrowRight size={17}/></button></form><div className="demo"><b>Demo credentials</b><span>admin@insighthub.local</span><span>Admin@123</span></div></div></div>
  </div>
}
