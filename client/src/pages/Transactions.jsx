import React from 'react';
import { useEffect,useState } from 'react';
import { Search, Download } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function Transactions(){
 const [rows,setRows]=useState([]),[search,setSearch]=useState(''),[status,setStatus]=useState('All');
 useEffect(()=>{api.get('/transactions',{params:{search,status}}).then(r=>setRows(r.data))},[search,status]);
 return <div><PageHeader title="Transactions" subtitle="Review every transaction flowing through the intelligence layer." action={<button className="secondary"><Download size={16}/> Export CSV</button>}/>
 <section className="panel table-panel"><div className="filters"><div className="filter-search"><Search size={17}/><input placeholder="Search customer, offering or method..." value={search} onChange={e=>setSearch(e.target.value)}/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Completed</option><option>Pending</option><option>Refunded</option></select></div><div className="table-scroll"><table><thead><tr><th>ID</th><th>Customer</th><th>Offering</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>#TX-{String(x.id).padStart(4,'0')}</td><td><b>{x.customer}</b></td><td>{x.offering}</td><td><b>${Number(x.amount).toLocaleString()}</b></td><td>{x.payment_method}</td><td><StatusBadge value={x.status}/></td><td>{new Date(x.transaction_date).toLocaleDateString()}</td></tr>)}</tbody></table></div></section></div>
}
