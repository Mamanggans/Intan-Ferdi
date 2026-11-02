import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Flower2,
  Heart,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/wfuR4VpUerxC8v4n9?g_st=ac";
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const MUSIC_URL = asset("music/nadin-amizah-ah.mp3");
const QR_URL = asset("qr-location.png");
const WEDDING_DATE = new Date("2026-11-07T09:00:00+07:00").getTime();

type ImageAsset = {
  src: string;
  alt: string;
  className?: string;
};

const images: ImageAsset[] = [
  {
    src: asset("photos/hero.jpg"),
    alt: "Intan dan Ferdi berdiri bersama di tangga putih",
    className: "gallery-image--wide",
  },
  {
    src: asset("photos/proposal.jpg"),
    alt: "Momen lamaran Intan dan Ferdi",
    className: "gallery-image--tall",
  },
  {
    src: asset("photos/traditional.jpg"),
    alt: "Potret Intan dan Ferdi dalam busana adat",
    className: "gallery-image--portrait",
  },
  {
    src: asset("photos/portrait.jpg"),
    alt: "Intan dan Ferdi dalam suasana pemotretan",
    className: "gallery-image--portrait",
  },
  {
    src: asset("photos/sky-tall.jpg"),
    alt: "Intan dan Ferdi di antara langit dan awan",
    className: "gallery-image--tall",
  },
  {
    src: asset("photos/red-portrait.jpg"),
    alt: "Potret pasangan dalam balutan busana merah",
    className: "gallery-image--portrait",
  },
  {
    src: asset("photos/sky-vertical.jpg"),
    alt: "Ferdi dan Intan dalam foto editorial",
    className: "gallery-image--tall",
  },
  {
    src: asset("photos/family.jpg"),
    alt: "Momen kebersamaan pasangan",
    className: "gallery-image--portrait",
  },
];

const invitees = [
  "Keluarga Besar Alm. Samsidi Al Kadis",
  "Keluarga Besar Miska Al Wasim",
  "Keluarga Besar Alm. Hasan Basri",
  "Keluarga Besar Alm. Safri bin Salihun",
  "Oki Mabruri (Ketua RW 018 Babelan Kota)",
  "Sulistyono (Ketua RT 003/018)",
];

const giftAccounts = [
  { name: "Ferdiansyah", bank: "Bank Mandiri", number: "1660003283355" },
  { name: "Intan Chaerunisa", bank: "BCA", number: "6331341760" },
];

const story = [
  {
    index: "01",
    title: "Menjalin Hubungan",
    meta: "2019 — 22.12.2023",
    body: "Segala sesuatu telah tertulis dengan indah dalam rencana-Nya. Berawal dari teman organisasi, bertemu pada tahun 2019, siapa sangka pertemanan ini menjadi awal dari perjalanan panjang kami. Lalu, kami menjalin hubungan pada 22 Desember 2023.",
  },
  {
    index: "02",
    title: "Lamaran",
    meta: "05.04.2026",
    body: "Atas kehendak-Nya, serta restu dari Orang Tua dan Keluarga, kami melangsungkan lamaran pada tanggal 5 April 2026 dan kami pun mengadakan akad nikah. Alhamdulillah, perjalanan ini sampai pada akhirnya.",
  },
  {
    index: "03",
    title: "Resepsi Pernikahan",
    meta: "07.11.2026",
    body: "Kami bisa melakukan acara resepsi yang insyaAllah diadakan pada Sabtu, 7 November 2026. Dengan penuh syukur, kami menantikan kehadiran orang-orang terkasih untuk berbagi kebahagiaan bersama.",
  },
];

function getGuestName() {
  if (typeof window === "undefined") return "Tamu Undangan";
  const name = new URLSearchParams(window.location.search).get("to");
  return name?.trim() || "Tamu Undangan";
}

function useCountdown() {
  const [remaining, setRemaining] = useState(() => Math.max(WEDDING_DATE - Date.now(), 0));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(WEDDING_DATE - Date.now(), 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const totalSeconds = Math.floor(remaining / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      finished: remaining <= 0,
    };
  }, [remaining]);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function Countdown() {
  const countdown = useCountdown();
  const units = [
    [countdown.days, "Hari"],
    [countdown.hours, "Jam"],
    [countdown.minutes, "Menit"],
    [countdown.seconds, "Detik"],
  ] as const;

  return (
    <div className="countdown" aria-label="Hitung mundur menuju akad nikah">
      {countdown.finished ? (
        <p className="countdown-finished">Hari bahagia kami telah tiba</p>
      ) : (
        units.map(([value, label]) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-number">{label === "Hari" ? value : pad(value)}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))
      )}
    </div>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function FloralMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={`floral-mark ${inverted ? "floral-mark--inverted" : ""}`} aria-hidden="true">
      <span className="floral-line" />
      <Flower2 size={14} strokeWidth={1.2} />
      <span className="floral-line" />
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const guestName = getGuestName();

  useEffect(() => {
    document.body.classList.toggle("is-locked", !isOpen);
    return () => document.body.classList.remove("is-locked");
  }, [isOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openInvitation = () => {
    setIsOpen(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.42;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const copyAccount = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedAccount(number);
      window.setTimeout(() => setCopiedAccount(null), 1800);
    } catch {
      setCopiedAccount(null);
    }
  };

  return (
    <div className={`invitation-shell ${isOpen ? "is-open" : "is-closed"}`}>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="metadata" aria-label="Musik latar undangan" />
      <div className="ambient-orb ambient-orb--one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--two" aria-hidden="true" />

      {!isOpen && (
        <section className="cover-screen" aria-label="Sampul undangan">
          <div className="cover-image" role="img" aria-label={images[0].alt} style={{ backgroundImage: `url(${images[0].src})` }} />
          <div className="cover-vignette" />
          <div className="cover-inner">
            <p className="cover-kicker">The wedding of</p>
            <h1 className="cover-names">Intan <span>&</span> Ferdi</h1>
            <div className="cover-date"><span>07</span><i /> <span>11</span><i /> <span>26</span></div>
            <div className="cover-rule" />
            <p className="cover-greeting">Kepada Yth.<br /><strong>{guestName}</strong></p>
            <button className="open-button" onClick={openInvitation}>
              <span>Buka Undangan</span><ArrowUpRight size={17} strokeWidth={1.4} />
            </button>
            <p className="cover-note">Mohon maaf apabila ada kesalahan penulisan nama dan gelar.</p>
          </div>
          <div className="cover-bottom-mark"><FloralMark inverted /></div>
        </section>
      )}

      {isOpen && (
        <>
          <header className="site-header">
            <a href="#top" className="wordmark" onClick={closeMenu} aria-label="Kembali ke atas">
              <span>I</span><i>·</i><span>F</span>
            </a>
            <nav className={menuOpen ? "site-nav is-visible" : "site-nav"} aria-label="Navigasi undangan">
              <a href="#kisah" onClick={closeMenu}>Kisah</a>
              <a href="#acara" onClick={closeMenu}>Acara</a>
              <a href="#galeri" onClick={closeMenu}>Galeri</a>
              <a href="#gift" onClick={closeMenu}>Gift</a>
            </nav>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}>
              {menuOpen ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
            </button>
          </header>

          <button className={`music-toggle ${isPlaying ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={isPlaying ? "Jeda musik" : "Putar musik"} aria-pressed={isPlaying}>
            <span className="music-disc"><Music2 size={15} strokeWidth={1.4} /></span>
            <span className="music-copy"><strong>Music</strong><small>{isPlaying ? "Playing" : "Paused"}</small></span>
            {isPlaying ? <Pause size={14} strokeWidth={1.4} /> : <Play size={14} strokeWidth={1.4} />}
          </button>

          <main id="top">
            <section className="hero-section section-dark">
              <div className="hero-noise" aria-hidden="true" />
              <div className="hero-copy">
                <p className="eyebrow eyebrow--light"><span />The wedding of</p>
                <h1>Intan <em>&</em><br />Ferdi</h1>
                <p className="hero-date">Sabtu, 07 November 2026</p>
                <p className="hero-intro">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.</p>
                <a href="#profil" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={16} strokeWidth={1.2} /></a>
              </div>
              <div className="hero-photo-wrap">
                <div className="hero-photo-frame" />
                <img src={images[0].src} alt={images[0].alt} className="hero-photo" />
                <span className="hero-photo-caption">a new chapter begins</span>
              </div>
              <div className="hero-side-note">INTAN &amp; FERDI<br /><span>07 · 11 · 2026</span></div>
            </section>

            <section className="intro-section" id="profil">
              <div className="container intro-grid">
                <div className="intro-ornament" aria-hidden="true"><span>01</span><div /></div>
                <div className="intro-copy">
                  <p className="eyebrow"><span />A little note from us</p>
                  <h2>Two hearts,<br /><em>one beautiful</em><br />beginning.</h2>
                  <p className="body-copy">Tidak ada yang kebetulan dalam setiap pertemuan. Kami percaya, setiap langkah kecil yang membawa kami sampai di hari ini adalah bagian dari cerita indah yang telah Allah tuliskan.</p>
                </div>
                <div className="intro-image-block">
                  <img src={images[1].src} alt={images[1].alt} />
                  <div className="image-stamp"><Heart size={13} fill="currentColor" /><span>est. 2019</span></div>
                </div>
              </div>
            </section>

            <section className="countdown-section section-rose">
              <div className="container countdown-layout">
                <div>
                  <p className="eyebrow"><span />Counting every moment</p>
                  <h2>Menuju hari<br /><em>yang kami nanti.</em></h2>
                  <p className="countdown-caption">Akad nikah · 07 November 2026 · 09.00 WIB</p>
                </div>
                <Countdown />
              </div>
            </section>

            <section className="couple-section section-paper">
              <div className="container">
                <SectionLabel eyebrow="The couple" title="Dengan segala kerendahan hati" />
                <div className="couple-grid">
                  <article className="person-card">
                    <div className="person-image-wrap"><img src={images[2].src} alt={images[2].alt} /></div>
                    <div className="person-copy"><p className="person-role">Mempelai wanita</p><h3>Intan</h3><p>Putri ke-1 dari<br /><strong>Bapak Rasidi</strong><br />&amp; <strong>Ibu Sri Haryati, A.Md.kes.</strong></p></div>
                  </article>
                  <div className="couple-connector" aria-hidden="true"><span>I</span><Heart size={14} fill="currentColor" /><span>F</span></div>
                  <article className="person-card person-card--reverse">
                    <div className="person-image-wrap"><img src={images[3].src} alt={images[3].alt} /></div>
                    <div className="person-copy"><p className="person-role">Mempelai pria</p><h3>Ferdi</h3><p>Putra ke-3 dari<br /><strong>Alm. Bapak H. Des Adam</strong><br />&amp; <strong>Ibu Ita Subiyanti</strong></p></div>
                  </article>
                </div>
              </div>
            </section>

            <section className="story-section section-dark" id="kisah">
              <div className="story-watermark" aria-hidden="true">OUR<br />STORY</div>
              <div className="container story-inner">
                <SectionLabel eyebrow="Our story" title="Dari sebuah pertemanan" />
                <div className="story-list">
                  {story.map((item) => (
                    <article className="story-item" key={item.index}>
                      <div className="story-index">{item.index}</div>
                      <div className="story-content"><p className="story-meta">{item.meta}</p><h3>{item.title}</h3><p>{item.body}</p></div>
                      <ChevronRight className="story-arrow" size={18} strokeWidth={1.2} />
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="event-section section-paper" id="acara">
              <div className="container">
                <SectionLabel eyebrow="Save the date" title="Satu hari, dua momen" />
                <div className="event-grid">
                  <article className="event-card event-card--primary">
                    <div className="event-card-top"><span className="event-number">01</span><CalendarDays size={20} strokeWidth={1.2} /></div>
                    <p className="event-type">Akad Nikah</p>
                    <h3>Sabtu, 07<br />November 2026</h3>
                    <div className="event-details"><p><Clock3 size={14} />09.00 WIB</p><p><MapPin size={14} />Lapangan Voli Blok A</p><p className="event-address">Blk. A8-A9 No. 6-2, Babelan Kota, Kec. Babelan, Kab. Bekasi, Jawa Barat</p></div>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-link">Buka Google Maps <ArrowUpRight size={15} strokeWidth={1.4} /></a>
                  </article>
                  <article className="event-card event-card--accent">
                    <div className="event-card-top"><span className="event-number">02</span><Sparkles size={20} strokeWidth={1.2} /></div>
                    <p className="event-type">Resepsi Pernikahan</p>
                    <h3>Sabtu, 07<br />November 2026</h3>
                    <div className="event-details"><p><Clock3 size={14} />12.00 — 21.00 WIB</p><p><MapPin size={14} />Babelan Kota</p><p className="event-address">Blk. A8-A9 No.6-2, Babelan Kota, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610</p></div>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-link">Buka Google Maps <ArrowUpRight size={15} strokeWidth={1.4} /></a>
                  </article>
                </div>
                <div className="location-qr">
                  <div className="location-qr-copy">
                    <p className="eyebrow"><span />Location guide</p>
                    <h3>Scan untuk membuka<br /><em>Google Maps.</em></h3>
                    <p>Gunakan kamera ponsel untuk melihat petunjuk menuju lokasi akad dan resepsi kami.</p>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="qr-link">Buka link lokasi langsung <ArrowUpRight size={15} strokeWidth={1.4} /></a>
                  </div>
                  <div className="qr-image-shell"><img src={QR_URL} alt="QR code Google Maps lokasi akad dan resepsi Intan dan Ferdi" /></div>
                </div>
              </div>
            </section>

            <section className="gallery-section section-rose" id="galeri">
              <div className="container">
                <div className="gallery-heading"><SectionLabel eyebrow="Captured moments" title="Sedikit tentang kami" /><p>Potongan kecil dari perjalanan kami, sebelum melangkah ke babak yang baru.</p></div>
                <div className="gallery-grid">
                  {images.map((image, index) => <figure className={`gallery-item ${image.className ?? ""}`} key={image.src}><img src={image.src} alt={image.alt} loading={index > 2 ? "lazy" : "eager"} /><span>{String(index + 1).padStart(2, "0")}</span></figure>)}
                </div>
              </div>
            </section>

            <section className="gift-section section-paper" id="gift">
              <div className="container gift-layout">
                <div className="gift-intro">
                  <p className="eyebrow"><span />Wedding gift</p>
                  <h2>Doa dan kasih sayang<br /><em>adalah hadiah terindah.</em></h2>
                  <p>Apabila Bapak/Ibu/Saudara/i berkenan memberikan tanda kasih, dapat melalui rekening berikut.</p>
                </div>
                <div className="gift-cards">
                  {giftAccounts.map((account) => {
                    const isCopied = copiedAccount === account.number;
                    return (
                      <article className="gift-card" key={account.number}>
                        <div className="gift-card-top"><span className="gift-bank">{account.bank}</span><span className="gift-mark">{account.bank === "BCA" ? "BCA" : "mandiri"}</span></div>
                        <p className="gift-number">{account.number}</p>
                        <p className="gift-owner">a.n. <strong>{account.name}</strong></p>
                        <button className="copy-account" onClick={() => void copyAccount(account.number)}>
                          {isCopied ? <Check size={14} /> : <Copy size={14} />} {isCopied ? "Tersalin" : "Salin nomor rekening"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="invite-section section-paper">
              <div className="container invite-layout">
                <div className="invite-quote"><FloralMark /><p>“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.”</p><span>— QS. Ar-Rum: 21</span></div>
                <div className="invite-list"><p className="eyebrow"><span />Turut mengundang</p><h2>Kehadiran dan doa<br /><em>Anda adalah hadiah.</em></h2><ol>{invitees.map((name, index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span>{name}</li>)}</ol></div>
              </div>
            </section>

            <footer className="site-footer section-dark">
              <div className="footer-flourish" aria-hidden="true"><span /><Flower2 size={19} strokeWidth={1.1} /><span /></div>
              <p className="footer-kicker">With love &amp; gratitude</p>
              <h2>Intan <em>&</em> Ferdi</h2>
              <p className="footer-date">07 · 11 · 2026</p>
              <p className="footer-thanks">Terima kasih telah menjadi bagian dari cerita kami.<br />Sampai jumpa di hari bahagia.</p>
              <p className="footer-credit">Made with love for our forever</p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}
