import React from 'react';
import { useEffect,useState } from 'react';
import { Search, Users, Eye } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function Customers(){
 const [rows,setRows]=useState([]),[search,setSearch]=useState(''),[status,setStatus]=useState('All'),[selected,setSelected]=useState(null);
 useEffect(()=>{api.get('/customers',{params:{search,status}}).then(r=>setRows(r.data))},[search,status]);
 async function open(id){const {data}=await api.get(`/customers/${id}`);setSelected(data)}
 return <div><PageHeader title="Customers" subtitle="Understand the people and organizations behind your growth." action={<button className="primary"><Users size={16}/> Add customer</button>}/>
 <section className="panel table-panel"><div className="filters"><div className="filter-search"><Search size={17}/><input placeholder="Search customers..." value={search} onChange={e=>setSearch(e.target.value)}/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option><option>Lead</option></select></div><div className="table-scroll"><table><thead><tr><th>Customer</th><th>Company</th><th>Segment</th><th>Status</th><th>Lifetime value</th><th></th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><div className="person"><span className="person-avatar">{x.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span><div><b>{x.name}</b><small>{x.email}</small></div></div></td><td>{x.company}</td><td>{x.segment}</td><td><StatusBadge value={x.status}/></td><td><b>${Number(x.lifetime_value).toLocaleString()}</b></td><td><button className="row-btn" onClick={()=>open(x.id)}><Eye size={15}/></button></td></tr>)}</tbody></table></div></section>
 {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}>×</button><span className="eyebrow">CUSTOMER PROFILE</span><h2>{selected.customer.name}</h2><p>{selected.customer.company} · {selected.customer.segment}</p><div className="profile-stats"><div><small>Lifetime value</small><b>${Number(selected.customer.lifetime_value).toLocaleString()}</b></div><div><small>Status</small><b>{selected.customer.status}</b></div></div><h3>Recent transactions</h3>{selected.transactions.slice(0,5).map(t=><div className="modal-row" key={t.id}><span>{t.offering}</span><b>${Number(t.amount).toLocaleString()}</b></div>)}</div></div>}
 </div>
}
