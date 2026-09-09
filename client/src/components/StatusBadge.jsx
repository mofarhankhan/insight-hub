export default function StatusBadge({value}) {
  const key = String(value).toLowerCase();
  return <span className={`status ${key.replace(/\s/g,'-')}`}><i></i>{value}</span>
}
