import { HeroHex } from "@/components/HeroHex";
import { HorizontalTrack } from "@/components/HorizontalTrack";
import { ChatTicks, MethodIcon, SocialIcon } from "@/components/Icons";
import { LitWords } from "@/components/LitWords";
import { Logo, LogoMark } from "@/components/Logo";
import { Tilt } from "@/components/Tilt";
import { VideoFeature } from "@/components/VideoFeature";
import { asset } from "@/lib/asset";
import { contact, exams, faq, featuredVideo, manifesto, method, platform, reviews, socials, topics } from "@/lib/data";

export default function Home() {
  const half = Math.ceil(topics.length / 2);
  const rhalf = Math.ceil(reviews.length / 2);
  const feedbackLink = `https://wa.me/905378734444?text=${encodeURIComponent("Merhaba, GNG Akademi hakkındaki yorumum:")}`;
  return (
    <>
      <HeroHex />

      {/* Konu şeridi */}
      <section className="marquee" aria-label="Konular">
        {[topics.slice(0, half), topics.slice(half)].map((row, i) => (
          <div key={i} className={`marquee-row ${i ? "marquee-row--rev" : ""}`}>
            <div className="marquee-track">
              {[...row, ...row].map((t, j) => (
                <span key={j} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Sınavlar: üst üste binen kartlar */}
      <section className="exams" id="sinavlar">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow reveal">Sınavlar</p>
            <h2 className="reveal reveal-d1">
              Hangi sınava <span className="grad">hazırlanıyorsun?</span>
            </h2>
            <p className="sec-lead reveal reveal-d2">Üç sınav, tek yöntem: konunun mantığını kur, soru tiplerini tanı, sınavda zamanı yönet.</p>
          </div>
          <div className="exam-stack">
            {exams.map((x, i) => (
              <article key={x.id} className={`exam-card stack-card tone-${x.tone}`} style={{ "--i": i } as React.CSSProperties}>
                <div className="exam-side">
                  <span className="exam-code">{x.code}</span>
                  <span className="exam-formula">{x.formula}</span>
                  <span className="exam-hex" aria-hidden="true" />
                </div>
                <div className="exam-body">
                  <p className="exam-level">{x.level}</p>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                  <ul className="exam-units">
                    {x.units.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                  <div className="exam-foot">
                    <span>Konu anlatımı</span>
                    <span>Soru çözümü</span>
                    <span>Birebir ders</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto: kelime kelime yanan metin */}
      <section className="manifesto">
        <div className="wrap">
          <p className="eyebrow reveal">Yaklaşım</p>
          <LitWords text={manifesto} className="manifesto-text" />
          <div className="manifesto-sign reveal">
            <LogoMark />
            <span>
              <b>Yusuf Gündoğan</b>
              <small>GNG Akademi · Matematik</small>
            </span>
          </div>
        </div>
      </section>

      {/* Videolar */}
      <section className="videos" id="videolar">
        <div className="wrap videos-grid">
          <div className="videos-copy">
            <p className="eyebrow reveal">YouTube · Yeni video</p>
            <h2 className="reveal reveal-d1">{featuredVideo.title}</h2>
            <p className="reveal reveal-d2">
              Çıkmış sorular tabletten, adım adım ve sesli anlatımla. Çözüm videoları YouTube kanalında ücretsiz; yenileri geldikçe burada.
            </p>
            <p className="videos-date reveal reveal-d2">Yayın: {featuredVideo.date}</p>
            <div className="videos-actions reveal reveal-d3">
              <a className="btn btn--yt" href={contact.subscribe} target="_blank" rel="noreferrer">
                <SocialIcon id="youtube" /> Abone ol
              </a>
              <a className="link-arrow" href={`https://youtu.be/${featuredVideo.id}`} target="_blank" rel="noreferrer">
                YouTube&apos;da aç →
              </a>
            </div>
          </div>
          <VideoFeature />
        </div>
        <div className="wrap channel reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/banner.png")} alt="GNG Akademi YouTube kanal kapağı" loading="lazy" />
        </div>
      </section>

      {/* Veli / öğrenci geri dönüşleri */}
      <section className="reviews" id="yorumlar">
        <div className="wrap reviews-head">
          <div className="sec-head">
            <p className="eyebrow reveal">Memnuniyet</p>
            <h2 className="reveal reveal-d1">
              Veliler ve öğrenciler <span className="grad">ne diyor?</span>
            </h2>
            <p className="sec-lead reveal reveal-d2">Derslerden sonra velilerden ve öğrencilerden gelen mesajlardan bazıları.</p>
          </div>
          <a className="btn btn--ghost reveal reveal-d2" href={feedbackLink} target="_blank" rel="noreferrer">
            <SocialIcon id="whatsapp" /> Yorumunu gönder
          </a>
        </div>
        <div className="reviews-rows">
          {[reviews.slice(0, rhalf), reviews.slice(rhalf)].map((row, i) => (
            <div key={i} className={`reviews-row ${i ? "reviews-row--rev" : ""}`}>
              <div className="reviews-track">
                {[...row, ...row].map((r, j) => (
                  <figure key={j} className={`bubble ${r.type === "Veli" ? "bubble--veli" : ""}`} aria-hidden={j >= row.length || undefined}>
                    <figcaption>
                      <span className="bubble-av">{r.name.charAt(0)}</span>
                      <span>
                        <b>{r.name}</b>
                        <small>
                          {r.type} · {r.exam}
                        </small>
                      </span>
                    </figcaption>
                    <blockquote>“{r.text}”</blockquote>
                    <span className="bubble-meta">
                      {r.result && <em className="bubble-result">{r.result}</em>}
                      <span>
                        <ChatTicks />
                      </span>
                    </span>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Yöntem: yatay kayan şerit */}
      <section className="method" id="yontem">
        <HorizontalTrack
          label="kaydırdıkça ilerle"
          head={
            <div className="method-head">
              <div>
                <p className="eyebrow">Yöntem</p>
                <h2>
                  Özel ders <span className="grad">nasıl ilerliyor?</span>
                </h2>
              </div>
              <p className="sec-lead">Beş adımda, sınav gününe kadar planlı bir yol.</p>
            </div>
          }
        >
          {method.map((m) => (
            <article key={m.n} className="step">
              <span className="step-n">{m.n}</span>
              <span className="step-icon">
                <MethodIcon id={m.icon} />
              </span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </HorizontalTrack>
      </section>

      {/* Platform tanıtımı */}
      <section className="platform" id="platform">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <p className="eyebrow reveal">
              <span className="soon">Yakında</span> GNG Akademi Platformu
            </p>
            <h2 className="reveal reveal-d1">
              Tüm dersler <span className="grad">tek yerde.</span>
            </h2>
            <p className="sec-lead reveal reveal-d2">Konu anlatımları ve soru çözümleri, sınavına göre sıralı. Kaldığın yerden devam et.</p>
          </div>
          <Tilt className="mock-wrap">
            <div className="mock">
              <div className="mock-bar">
                <i />
                <i />
                <i />
                <span>gngakademi · KPSS Matematik</span>
              </div>
              <div className="mock-body">
                <aside className="mock-list">
                  <p>Bölüm 2 · Sayılar</p>
                  {platform.lessons.map((l) => (
                    <div key={l.t} className={`mock-item is-${l.s}`}>
                      <span className="mock-ico" />
                      <span className="mock-t">{l.t}</span>
                      <span className="mock-d">{l.d}</span>
                    </div>
                  ))}
                </aside>
                <div className="mock-player">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(featuredVideo.thumb)} alt="" loading="lazy" />
                  <div className="mock-controls">
                    <span className="mock-progress">
                      <i />
                    </span>
                    <span>07:12 / 18:05</span>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
          <div className="platform-feats">
            {platform.features.map((f, i) => (
              <div key={f.title} className={`feat reveal reveal-d${i + 1}`}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="faq" id="sss">
        <div className="wrap faq-grid">
          <div className="sec-head">
            <p className="eyebrow reveal">SSS</p>
            <h2 className="reveal reveal-d1">
              Merak <span className="grad">edilenler</span>
            </h2>
            <p className="sec-lead reveal reveal-d2">
              Cevabını bulamadığın soru için <a className="link-arrow" href={contact.tel}>{contact.phone}</a> numarasından ulaşabilirsin.
            </p>
          </div>
          <div className="faq-list">
            {faq.map((f, i) => (
              <details key={f.q} className="faq-item reveal" name="sss" open={i === 0}>
                <summary>
                  {f.q}
                  <i />
                </summary>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim / kapanış */}
      <section className="cta" id="iletisim">
        <div className="cta-bg" aria-hidden="true">
          <span className="cta-hex" data-parallax="-0.12" />
          <span className="cta-hex cta-hex--2" data-parallax="0.08" />
        </div>
        <div className="wrap cta-in">
          <p className="eyebrow reveal">İletişim</p>
          <h2 className="reveal reveal-d1">
            İlk dersi <span className="grad">birlikte planlayalım.</span>
          </h2>
          <p className="sec-lead reveal reveal-d2">Sınavını, sınıfını ve uygun olduğun günleri yaz; sana uygun programı konuşalım.</p>
          <a className="cta-phone reveal reveal-d2" href={contact.tel}>
            {contact.phone}
          </a>
          <div className="cta-actions reveal reveal-d3">
            <a className="btn btn--wa" href={contact.whatsapp} target="_blank" rel="noreferrer">
              <SocialIcon id="whatsapp" /> WhatsApp&apos;tan yaz
            </a>
            <a className="btn btn--ghost" href={contact.tel}>
              <SocialIcon id="phone" /> Hemen ara
            </a>
          </div>
          <div className="socials">
            {socials.map((s, i) => (
              <a key={s.id} className={`social social--${s.id} reveal reveal-d${i + 1}`} href={s.href} target="_blank" rel="noreferrer">
                <span className="social-ico">
                  <SocialIcon id={s.id} />
                </span>
                <span>
                  <small>{s.label}</small>
                  <b>{s.handle}</b>
                </span>
                <span className="social-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-in">
          <Logo />
          <p>KPSS · YKS · LGS matematik özel ders ve video çözümler.</p>
          <a className="footer-phone" href={contact.tel}>
            {contact.phone}
          </a>
          <p className="footer-copy">© 2026 GNG Akademi · Yusuf Gündoğan</p>
        </div>
      </footer>
    </>
  );
}
