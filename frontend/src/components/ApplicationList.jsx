
import React from 'react'

export default function ApplicationList({ items, onDelete }) {
  if (!items?.length) return <em>No applications yet. Add one above.</em>
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {items.map(it => (
        <div key={it.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{it.company}</strong>
            <button onClick={() => onDelete(it.id)}>Delete</button>
          </div>
          <div><em>{it.role}</em> — {it.location || 'N/A'}</div>
          <div>Status: <strong>{it.status}</strong> • Source: {it.source || 'N/A'}</div>
          {it.notes && <div style={{ color: '#444' }}>Notes: {it.notes}</div>}
        </div>
      ))}
    </div>
  )
}
