import { useEffect,useState } from 'react';
import { Layers3, TrendingUp, TrendingDown } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function Offerings(){
 const [rows,setRows]=useState([]);
 useEffect(()=>{api.get('/offerings').then(r=>setRows(r.data))},[]);
 return <div><PageHeader title="Offerings" subtitle="Monitor how each productized capability contributes to growth." action={<button className="primary"><Layers3 size={16}/> New offering</button>}/>
 <div className="offering-cards">{rows.slice(0,3).map(x=><div className="feature-card" key={x.id}><div className="feature-icon"><Layers3 size={19}/></div><span>{x.category}</span><h3>{x.name}</h3><b>${Number(x.revenue).toLocaleString()}</b><small><TrendingUp size={14}/> {x.growth}% growth</small></div>)}</div>
 <section className="panel table-panel"><div className="panel-head"><div><h3>All offerings</h3><p>Performance snapshot</p></div></div><div className="table-scroll"><table><thead><tr><th>Offering</th><th>Category</th><th>Units</th><th>Revenue</th><th>Growth</th><th>Status</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.name}</b></td><td>{x.category}</td><td>{x.units}</td><td><b>${Number(x.revenue).toLocaleString()}</b></td><td><span className={x.growth>=0?'growth-up':'growth-down'}>{x.growth>=0?<TrendingUp size={14}/>:<TrendingDown size={14}/>} {x.growth}%</span></td><td><StatusBadge value={x.status}/></td></tr>)}</tbody></table></div></section></div>
}
