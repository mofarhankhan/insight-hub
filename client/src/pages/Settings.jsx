import React from 'react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function Settings(){
 const [saved,setSaved]=useState(false);
 return <div><PageHeader title="Settings" subtitle="Configure your workspace preferences and account."/>
 <div className="settings-grid"><section className="panel settings-panel"><div className="panel-head"><div><h3>Profile</h3><p>Basic information about your account.</p></div></div><div className="form-grid"><label>Full name<input defaultValue="Aarav Mehta"/></label><label>Email<input defaultValue="admin@insighthub.local"/></label><label>Role<input defaultValue="Administrator" disabled/></label><label>Workspace<input defaultValue="Acme Intelligence"/></label></div><button className="primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),1800)}}>Save changes</button>{saved&&<span className="saved">Changes saved</span>}</section>
 <section className="panel settings-panel"><div className="panel-head"><div><h3>Notifications</h3><p>Choose which events should reach you.</p></div></div><Toggle title="Weekly intelligence report" text="Receive a summary every Monday" checked/><Toggle title="Growth alerts" text="Get notified when metrics change significantly" checked/><Toggle title="Product updates" text="Occasional news about InsightHub" /></section>
 <section className="panel settings-panel"><div className="panel-head"><div><h3>Security</h3><p>Account protection and session controls.</p></div></div><div className="security-row"><div><b>Password</b><span>Last changed 32 days ago</span></div><button className="secondary">Change password</button></div><div className="security-row"><div><b>Active sessions</b><span>1 browser session</span></div><button className="secondary">Manage</button></div></section></div></div>
}
function Toggle({title,text,checked=false}){const [on,setOn]=useState(checked);return <div className="toggle-row"><div><b>{title}</b><span>{text}</span></div><button className={on?'toggle on':'toggle'} onClick={()=>setOn(!on)}><i/></button></div>}
