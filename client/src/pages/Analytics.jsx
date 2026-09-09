import { useEffect,useState } from 'react';
import { BarChart3, TrendingUp, UsersRound, Layers3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

export default function Analytics(){
 const [data,setData]=useState(null);
 useEffect(()=>{api.get('/analytics/overview').then(r=>setData(r.data))},[]);
 if(!data) return <div className="loading">Loading analytics...</div>;
 return <div><PageHeader title="Analytics" subtitle="Explore performance patterns and business intelligence." action={<button className="primary">Export report</button>}/>
 <div className="stat-strip"><div><BarChart3/><span>Revenue intelligence</span><b>+18.6%</b></div><div><TrendingUp/><span>Average growth</span><b>+9.4%</b></div><div><UsersRound/><span>Customer segments</span><b>{data.customers.length}</b></div><div><Layers3/><span>Active offerings</span><b>{data.offerings.length}</b></div></div>
 <section className="panel chart-panel"><div className="panel-head"><div><h3>Offering revenue performance</h3><p>Revenue by productized service</p></div></div><div className="chart"><ResponsiveContainer width="100%" height={330}><BarChart data={data.offerings} margin={{left:10,right:10}}><XAxis dataKey="name" angle={-18} textAnchor="end" height={70} axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="revenue" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div></section>
 <div className="dashboard-grid lower"><section className="panel"><div className="panel-head"><div><h3>Customer segments</h3><p>Audience composition</p></div></div><div className="segment-list">{data.customers.map((x,i)=><div className="segment" key={x.segment}><div className="seg-head"><b>{x.segment}</b><span>{x.count} customers</span></div><div className="progress"><i style={{width:`${Math.min(100,x.count*4)}%`}}/></div><small>Avg. value ${Number(x.avg_value).toLocaleString()}</small></div>)}</div></section><section className="panel"><div className="panel-head"><div><h3>Top offerings</h3><p>Highest revenue contributors</p></div></div><div className="rank-list">{data.offerings.slice(0,6).map((x,i)=><div className="rank" key={x.name}><span>0{i+1}</span><div><b>{x.name}</b><small>{x.category} · {x.units} units</small></div><strong>${Number(x.revenue).toLocaleString()}</strong></div>)}</div></section></div>
 </div>
}
