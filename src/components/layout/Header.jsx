import { Link } from 'react-router-dom'
import React from 'react'
import LanguageSelect from '@/components/common/LanguageSelect'

export default function Header() {
  return (<header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 1rem',borderBottom:'1px solid #e5e7eb',position:'sticky',top:0,background:'#fff',zIndex:10}}>
      <div style={{fontWeight:600}}><Link to='/'>Reminder App</Link></div>
      <LanguageSelect />
    </header>)
}
