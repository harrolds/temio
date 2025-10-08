import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

function beginInlineEdit(i, d) {
  setEditIndex(i);
  setDraft({ ...d });
} function saveInlineEdit() {
  if (editIndex === null || draft == null) return;
  updateAt(editIndex, draft);
  setEditIndex(null);
  setDraft(null);
} function cancelInlineEdit() {
  setEditIndex(null);
  setDraft(null);
} return (<div className='rr-home-grid'>
      <Link to='/auto' className='rr-tile'>{t('pages.autoTitle','Auto')}</Link>
      <Link to='/contracten' className='rr-tile'>{t('pages.contractenTitle','Contracten')}</Link>
      <Link to='/huur' className='rr-tile'>{t('pages.huurTitle','Huur')}</Link>
      <Link to='/gezondheid' className='rr-tile'>{t('pages.gezondheidTitle','Gezondheid')}</Link>
      <Link to='/overheid' className='rr-tile'>{t('pages.overheidTitle','Overheid')}</Link>
    </div>)
}
