import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillGroups } from '../data/skills';

/* ── Tooltip ── */
function SkillTag({ skill, accentColor }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const hasProjects = skill.projects && skill.projects.length > 0;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={() => hasProjects && setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => hasProjects && setShow(s => !s)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: '.78rem', fontWeight: skill.highlight ? 600 : 400,
          padding: '7px 16px', borderRadius: '100px',
          border: `1px solid ${skill.highlight ? accentColor + '40' : 'rgba(255,255,255,.07)'}`,
          background: skill.highlight ? accentColor + '12' : 'rgba(255,255,255,.03)',
          color: skill.highlight ? accentColor : 'var(--muted)',
          cursor: hasProjects ? 'pointer' : 'default',
          transition: 'all .2s',
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
        {hasProjects && (
          <span style={{
            fontSize: '.52rem', fontWeight: 700,
            background: accentColor + '30',
            color: accentColor,
            borderRadius: '50%', width: 16, height: 16,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {skill.projects.length}
          </span>
        )}
      </div>

      {show && hasProjects && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(8,9,22,.97)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${accentColor}30`,
          borderRadius: 16,
          padding: '14px 16px',
          minWidth: 230,
          maxWidth: 290,
          zIndex: 300,
          boxShadow: `0 20px 60px rgba(0,0,0,.7), 0 0 0 1px ${accentColor}15`,
          pointerEvents: 'auto',
        }}>
          <div style={{
            position: 'absolute', bottom: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `6px solid rgba(8,9,22,.97)`,
          }} />
          <div style={{
            fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em',
            textTransform: 'uppercase', color: accentColor, marginBottom: 10,
          }}>
            Used in {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
          </div>
          {skill.projects.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/project/${p.id}`)}
              style={{
                display: 'flex', gap: 8, padding: '6px 0',
                borderBottom: '1px solid rgba(255,255,255,.04)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                background: p.id === 'innerforge' ? '#a855f7' : p.id === 'credit-default' ? '#06b6d4' : '#ff6b35',
              }} />
              <div>
                <div style={{ fontSize: '.7rem', color: 'var(--text)', fontWeight: 500 }}>{p.title}</div>
                <div style={{ fontSize: '.62rem', color: 'var(--muted)', marginTop: 2, lineHeight: 1.5 }}>{p.where}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Group card ── */
function GroupCard({ group, accentColor, delayMs }) {
  return (
      <div
        className="scrolly-card reveal bento-card"
        style={{
            '--span': group.cols || 4,
            padding: "36px 34px",
            position: "relative",
            overflow: "visible",
            transitionDelay: `${delayMs}ms`,
        }}
    >

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: group.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', color: '#000', flexShrink: 0,
          boxShadow: `0 10px 28px ${accentColor}35`,
        }}>
          <i className={group.icon} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--display)', fontSize: '1.25rem',
            fontWeight: 700, color: 'var(--white)', letterSpacing: '-.01em',
          }}>{group.name}</div>
          <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 4 }}>
            {group.skills.length} skills · {group.skills.filter(s => s.highlight).length} used in projects
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {group.skills.map(s => (
          <SkillTag key={s.name} skill={s} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
}

const accents = ['#ff6b35', '#06b6d4', '#a855f7', '#06ffa5'];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="sec-label">Technical Skills</div>
      <div className="sec-title">What I <span>Build With</span></div>
      <p style={{
        fontSize: '.82rem', color: 'var(--muted)', marginBottom: 40,
        maxWidth: 520, fontStyle: 'italic', lineHeight: 1.75,
      }}>
        Hover any <span style={{ color: 'var(--orange)', fontStyle: 'normal', fontWeight: 600 }}>highlighted</span> skill to see exactly which project uses it and where.
      </p>

      <div className="bento-grid gap-lg">
        {skillGroups.map((group, i) => (
          <GroupCard
            key={group.name}
            group={group}
            accentColor={accents[i % accents.length]}
            delayMs={Math.min(i * 130, 400)}
          />
        ))}
      </div>
    </section>
  );
}