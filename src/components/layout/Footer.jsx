import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (<footer role='contentinfo'>
      <nav role='navigation' aria-label='Hoofdmenu' style={{display:'flex',gap:'1rem',justifyContent:'center'}}>
        <Link to='/'>{t('pages.homeTitle','Home')}</Link>
        <Link to='/auto'>{t('pages.autoTitle','Auto')}</Link>
        <Link to='/contracten'>{t('pages.contractenTitle','Contracten')}</Link>
        <Link to='/gezondheid'>{t('pages.gezondheidTitle','Gezondheid')}</Link>
        <Link to='/huur'>{t('pages.huurTitle','Huur')}</Link>
        <Link to='/overheid'>{t('pages.overheidTitle','Overheid')}</Link>
      </nav>
    </footer>)
}
