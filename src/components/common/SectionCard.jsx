import React from 'react'

export default function SectionCard({ title, children }) {
  return (<section style={{maxWidth: 900, margin: '2rem auto', padding: '1rem 1.25rem', border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff'}}>
      <h1 style={{marginTop: 0}}>{title}</h1>
      <div>{children}</div>
    </section>)
}
