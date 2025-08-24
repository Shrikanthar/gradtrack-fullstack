
import React, { useState } from 'react'

export default function ApplicationForm({ onSubmit }) {
  const [form, setForm] = useState({
    company: '', role: '', location: '', status: 'applied', source: '', notes: ''
  })

  function update(k, v) { setForm({ ...form, [k]: v }) }

  function submit(e) {
    e.preventDefault()
    onSubmit(form)
    setForm({ company: '', role: '', location: '', status: 'applied', source: '', notes: '' })
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
      <input placeholder="Company" value={form.company} onChange={e => update('company', e.target.value)} required />
      <input placeholder="Role" value={form.role} onChange={e => update('role', e.target.value)} required />
      <input placeholder="Location" value={form.location} onChange={e => update('location', e.target.value)} />
      <select value={form.status} onChange={e => update('status', e.target.value)}>
        <option value="applied">applied</option>
        <option value="interview">interview</option>
        <option value="offer">offer</option>
        <option value="rejected">rejected</option>
        <option value="hired">hired</option>
      </select>
      <input placeholder="Source (e.g., careers, LinkedIn)" value={form.source} onChange={e => update('source', e.target.value)} />
      <textarea placeholder="Notes" value={form.notes} onChange={e => update('notes', e.target.value)} rows={3} />
      <button type="submit">Add</button>
    </form>
  )
}
