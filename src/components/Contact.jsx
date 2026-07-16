import { useState, useEffect } from 'react';

export default function Contact() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="section" id="contact">
        <div className="contact-wrap reveal">
          <div className="contact-big">
            Let's<br />
            <span className="grad">Build Together</span>
          </div>
          <p className="contact-sub">
            Open to internships, entry-level roles in software development, ML engineering, or data analysis. Always happy to collaborate on interesting projects.
          </p>

          <div className="contact-links">
            <a href="mailto:itsmearundasofficial@gmail.com" className="contact-link">
              <i className="fas fa-envelope" style={{ width: 32, height: 32, background: 'var(--grad)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#000' }} />
              <div>
                <div className="cl-label">Email</div>
                <div className="cl-val">itsmearundasofficial@gmail.com</div>
              </div>
            </a>
            <a href="tel:+917736908820" className="contact-link">
              <i className="fas fa-phone" style={{ width: 32, height: 32, background: 'var(--grad2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#000' }} />
              <div>
                <div className="cl-label">Phone</div>
                <div className="cl-val">+91-7736908820</div>
              </div>
            </a>
            <a href="https://wa.me/917736908820" target="_blank" rel="noreferrer" className="contact-link">
              <i className="fab fa-whatsapp" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#25d366,#128c7e)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#fff' }} />
              <div>
                <div className="cl-label">WhatsApp</div>
                <div className="cl-val">+91-7736908820</div>
              </div>
            </a>
            <a href="https://github.com/itsmearundas" target="_blank" rel="noreferrer" className="contact-link">
              <i className="fab fa-github" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#24292e,#3a3f47)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#fff' }} />
              <div>
                <div className="cl-label">GitHub</div>
                <div className="cl-val">@itsmearundas</div>
              </div>
            </a>
            <a href="https://leetcode.com/itsmearundas" target="_blank" rel="noreferrer" className="contact-link">
              <i className="fas fa-code" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#f89f1b,#f6a623)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#fff' }} />
              <div>
                <div className="cl-label">LeetCode</div>
                <div className="cl-val">@itsmearundas</div>
              </div>
            </a>
            <a href="https://instagram.com/itsmearundas" target="_blank" rel="noreferrer" className="contact-link">
              <i className="fab fa-instagram" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#fff' }} />
              <div>
                <div className="cl-label">Instagram</div>
                <div className="cl-val">@itsmearundas</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/itsmearundas-kunnel" target="_blank" rel="noreferrer" className="contact-link">
              <i className="fab fa-linkedin-in" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#0077B5,#0a95da)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', color: '#fff' }} />
              <div>
                <div className="cl-label">LinkedIn</div>
                <div className="cl-val">itsmearundas-kunnel</div>
              </div>
            </a>
          </div>
{/* 
          <a href="/assets/Arun_Das_Resume.pdf" download className="btn-fill" style={{ display: 'inline-flex', gap: 10 }}>
            <i className="fas fa-download" /> Download Full Resume
          </a> */}
        </div>
      </section>

      <footer>
        <div className="footer-logo">Arun<span>Das</span></div>
        <div className="footer-clock">
          <i className="fas fa-clock" style={{ marginRight: 6, color: 'var(--orange)' }} />
          IST {time}
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Arun Das. All rights reserved.</div>
      </footer>
    </>
  );
}
