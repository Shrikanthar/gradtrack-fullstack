
import React, { useEffect, useState } from 'react'
import ApplicationForm from './components/ApplicationForm.jsx'
import ApplicationList from './components/ApplicationList.jsx'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
const API_KEY = 'devkey'

export default function App() {
  const [apps, setApps] = useState([])
  const [stats, setStats] = useState(null)
  const [filters, setFilters] = useState({ status: '', company: '', q: '' })

  async function fetchApps() {
    const qs = new URLSearchParams()
    if (filters.status) qs.set('status', filters.status)
    if (filters.company) qs.set('company', filters.company)
    if (filters.q) qs.set('q', filters.q)
    const res = await fetch(`${API_BASE}/applications?${qs.toString()}`, { headers: { 'x-api-key': API_KEY }})
    setApps(await res.json())
  }

  async function fetchStats() {
    const res = await fetch(`${API_BASE}/stats/summary`, { headers: { 'x-api-key': API_KEY }})
    setStats(await res.json())
  }

  useEffect(() => { fetchApps(); fetchStats(); }, [filters])

  async function addApplication(payload) {
    await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify(payload)
    })
    await fetchApps(); await fetchStats()
  }

  async function removeApplication(id) {
    await fetch(`${API_BASE}/applications/${id}`, { method: 'DELETE', headers: { 'x-api-key': API_KEY }})
    await fetchApps(); await fetchStats()
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <h1>GradTrack</h1>
      <p style={{ marginTop: -8, color: '#555' }}>Track graduate job applications • Full‑stack demo (FastAPI + React)</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <h3>Add Application</h3>
          <ApplicationForm onSubmit={addApplication} />
        </div>
        <div>
          <h3>Filters</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            <input placeholder="Company" value={filters.company} onChange={e => setFilters({ ...filters, company: e.target.value })} />
            <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option value="">Any status</option>
              <option value="applied">applied</option>
              <option value="interview">interview</option>
              <option value="offer">offer</option>
              <option value="rejected">rejected</option>
              <option value="hired">hired</option>
            </select>
            <input placeholder="Search (company/role/notes)" value={filters.q} onChange={e => setFilters({ ...filters, q: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setFilters({ status: '', company: '', q: '' })}>Clear Filters</button>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Applications</h3>
        <ApplicationList items={apps} onDelete={removeApplication} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Stats</h3>
        {stats ? (
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 12 }}>
              <strong>Total:</strong> {stats.total}
            </div>
            <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 12 }}>
              <strong>By Status:</strong> {Object.entries(stats.by_status || {}).map(([k,v]) => `${k}:${v}`).join('  ')}
            </div>
            <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 12 }}>
              <strong>By Company:</strong> {Object.entries(stats.by_company || {}).map(([k,v]) => `${k}:${v}`).join('  ')}
            </div>
          </div>
        ) : <em>No stats yet.</em>}
      </section>
    </div>
  )
}
