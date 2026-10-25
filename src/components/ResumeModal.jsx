import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { resumes } from '../data/resumes';

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="resume-overlay" onClick={onClose}>
      <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Download resume" onClick={e => e.stopPropagation()}>
        <button className="resume-close" onClick={onClose} aria-label="Close"><i className="fas fa-xmark" /></button>
        <div className="resume-title">Download Resume</div>
        <p className="resume-sub">Pick the version that fits the role.</p>
        <div className="resume-list">
          {resumes.map(r => (
            <a key={r.id} href={r.file} download={r.downloadName} className="resume-item" onClick={onClose}>
              <span className="resume-ico"><i className={r.icon} /></span>
              <span className="resume-txt">
                <strong>{r.label}</strong>
                <small>{r.desc}</small>
              </span>
              <i className="fas fa-download resume-dl" />
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
