import React from 'react';
export default function PageHeader({title, subtitle, action}) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{action && <div>{action}</div>}</div>
}
