import React from 'react';
export default function KpiCard({icon, label, value, change, positive=true, note}) {
  return <div className="kpi-card"><div className="kpi-top"><span className="kpi-icon">{icon}</span><span className={positive?'change positive':'change negative'}>{positive?'↗':'↘'} {change}</span></div><div className="kpi-label">{label}</div><div className="kpi-value">{value}</div>{note && <div className="kpi-note">{note}</div>}</div>
}
