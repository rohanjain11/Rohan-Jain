import { SITE } from '../data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
          <div>© {currentYear} {SITE.name}</div>
          <div>
            <a href={`mailto:${SITE.emailPrimary}`}>{SITE.emailPrimary}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
