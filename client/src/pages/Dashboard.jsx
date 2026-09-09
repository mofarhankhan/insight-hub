import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowUpRight, DollarSign, Users, Target, Activity, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const [data,setData]=useState(null);
  useEffect(()=>{api.get('/analytics/dashboard').then(r=>setData(r.data)).catch(console.error)},[]);
  if(!data) return <div className="loading">Loading dashboard...</div>;
  const s=data.summary||{};
  const rev=data.revenue||[];
  const channels=data.channels||[];
  return <div>
    <PageHeader title="Good morning, Aarav" subtitle="Here’s what’s happening across your business today." action={<button className="secondary">Last 9 months <span>⌄</span></button>}/>
    <div className="kpi-grid">
      <KpiCard icon={<DollarSign size={18}/>} label="Total revenue" value={`$${Number(s.revenue||0).toLocaleString()}`} change="+12.8%" note="vs. previous period"/>
      <KpiCard icon={<Users size={18}/>} label="Active customers" value={Number(s.customers||0).toLocaleString()} change="+8.4%" note="net new accounts"/>
      <KpiCard icon={<Target size={18}/>} label="Conversion rate" value={`${s.conversion_rate||0}%`} change="+2.1%" note="vs. previous period"/>
      <KpiCard icon={<Activity size={18}/>} label="Completed sales" value={Number(s.completed_transactions||0).toLocaleString()} change="+14.2%" note="successful transactions"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-head"><div><h3>Revenue overview</h3><p>Monthly completed revenue</p></div><button className="dots"><MoreHorizontal size={18}/></button></div><div className="chart"><ResponsiveContainer width="100%" height={290}><AreaChart data={rev}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity={.22}/><stop offset="100%" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/><Tooltip formatter={v=>[`$${Number(v).toLocaleString()}`,'Revenue']}/><Area type="monotone" dataKey="value" strokeWidth={3} fill="url(#fill)" stroke="currentColor"/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel"><div className="panel-head"><div><h3>Acquisition channels</h3><p>Transaction distribution</p></div></div><div className="donut-wrap"><ResponsiveContainer width="100%" height={190}><PieChart><Pie data={channels} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={4}>{channels.map((_,i)=><Cell key={i}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="legend">{channels.map((x,i)=><div key={i}><span className={`legend-dot d${i}`}></span><span>{x.name}</span><b>{x.value}</b></div>)}</div></div></section>
    </div>
    <div className="dashboard-grid lower">
      <section className="panel table-panel"><div className="panel-head"><div><h3>Recent transactions</h3><p>Latest activity from your workspace</p></div><button className="text-btn">View all <ArrowUpRight size={15}/></button></div><div className="table-scroll"><table><thead><tr><th>Customer</th><th>Offering</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{data.recent.map(x=><tr key={x.id}><td><b>{x.customer}</b></td><td>{x.offering}</td><td>${Number(x.amount).toLocaleString()}</td><td><StatusBadge value={x.status}/></td><td>{new Date(x.transaction_date).toLocaleDateString()}</td></tr>)}</tbody></table></div></section>
      <section className="panel activity-panel"><div className="panel-head"><div><h3>Live activity</h3><p>Recent workspace events</p></div></div><div className="activity-list">{data.activity.map((x,i)=><div className="activity" key={x.id}><span className={`activity-icon ai${i%4}`}></span><div><b>{x.title}</b><p>{x.description}</p><small>{new Date(x.created_at).toLocaleDateString()}</small></div></div>)}</div></section>
    </div>
  </div>
}
