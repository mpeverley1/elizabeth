import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Leaf,
  MapPin,
  Phone,
  Mail,
  Instagram,
  ExternalLink,
} from "lucide-react";
import leafCorner from "@/assets/images/leaf-corner.png";
import leafElement from "@/assets/images/leaf-element.png";
import fern1 from "@/assets/images/fern-leaf-1.png";
import fern2 from "@/assets/images/fern-leaf-2.png";
import fern3 from "@/assets/images/fern-leaf-3.png";
import yogaVideo from "@/assets/videos/yoga-park.mp4";
import paperHero from "@/assets/images/paper-grain-hero.png";
import yogaFlyer from "@assets/yoga_1769836440517.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Section = ({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      id={id}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      data-testid={`section-${id}`}
    >
      <div className="mb-8">
        <div
          className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-muted-foreground"
          data-testid={`text-eyebrow-${id}`}
        >
          <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <span>{eyebrow.toUpperCase()}</span>
        </div>
        <h2
          className="mt-3 font-serif text-3xl tracking-[-0.02em] sm:text-4xl"
          data-testid={`text-title-${id}`}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
};

function useParallaxVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        const offset = Math.min(120, y * 0.08);
        v.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

function CalendarEmbed() {
  // This is an embed-only mockup. True "blocking time" requires Google auth + Calendar API.
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const src = useMemo(() => {
    const base = "https://calendar.google.com/calendar/embed";
    const params = new URLSearchParams({
      height: "720",
      wkst: "1",
      bgcolor: "#f6f2ea",
      ctz: tz,
      mode: "WEEK",
      showPrint: "0",
      showTabs: "0",
      showTz: "0",
      showCalendars: "0",
      showTitle: "0",
    });
    return `${base}?${params.toString()}`;
  }, [tz]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div
        className="glass-panel overflow-hidden rounded-2xl"
        data-testid="panel-calendar"
      >
        <iframe
          title="Schedule"
          src={src}
          className="h-[720px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer"
          data-testid="iframe-calendar"
        />
      </div>

      <div className="glass-panel rounded-2xl p-5 sm:p-6" data-testid="panel-booking">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
            data-testid="icon-calendar"
          >
            <CalendarDays className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h3
              className="font-serif text-xl"
              data-testid="text-booking-title"
            >
              Request an appointment
            </h3>
            <p
              className="mt-1 text-sm text-muted-foreground"
              data-testid="text-booking-subtitle"
            >
              Choose a time that works for you. In this prototype, the calendar is a
              live embed—final booking will be connected when we add Google sign-in.
            </p>
          </div>
        </div>

        <Separator className="my-5" />

        <form className="grid gap-3" data-testid="form-booking">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="name"
              data-testid="label-name"
            >
              Name
            </label>
            <Input
              id="name"
              placeholder="Your name"
              data-testid="input-name"
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="email"
              data-testid="label-email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              data-testid="input-email"
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="message"
              data-testid="label-message"
            >
              Notes
            </label>
            <Textarea
              id="message"
              placeholder="Anything you'd like us to know (intentions, schedule preferences, etc.)"
              data-testid="input-notes"
              className="min-h-[110px]"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              className="rounded-xl"
              data-testid="button-submit-appointment"
              onClick={() => {
                // Mock interaction only
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Send request
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <a
              href="#contact"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              data-testid="link-contact"
            >
              Prefer to text/email instead?
            </a>
          </div>

          <p className="text-xs text-muted-foreground" data-testid="text-booking-note">
            Note: To truly block time in Google Calendar, well need to upgrade this
            prototype to a full app with Google authentication.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const videoRef = useParallaxVideo();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "About", href: "#about" },
    { label: "Schedule", href: "#schedule" },
    { label: "Blog", href: "#blog" },
    { label: "Past events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" data-testid="page-home">
      {/* Background Fern Sprinkles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
        <img src={fern1} className="absolute top-[10%] -left-10 w-32 rotate-45" alt="" />
        <img src={fern2} className="absolute top-[30%] -right-12 w-48 -rotate-12" alt="" />
        <img src={fern3} className="absolute bottom-[20%] left-[5%] w-40 rotate-[120deg]" alt="" />
        <img src={fern1} className="absolute top-[60%] right-[10%] w-24 -rotate-45" alt="" />
        <img src={fern2} className="absolute bottom-[5%] right-[20%] w-56 rotate-12" alt="" />
        <img src={fern3} className="absolute top-[45%] left-[15%] w-28 -rotate-90" alt="" />
      </div>

      <header
        className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55"
        data-testid="header"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            data-testid="link-home"
          >
            <span className="font-script text-2xl text-primary" data-testid="text-brand-script">
              Create
            </span>
            <span
              className="font-serif text-lg tracking-[0.18em]"
              data-testid="text-brand"
            >
              YOUR CALM
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" data-testid="nav">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                data-testid={`link-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </a>
            ))}
            <Button
              className="rounded-xl"
              data-testid="button-nav-cta"
              onClick={() => {
                document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/70 text-foreground shadow-sm"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Open menu"
            data-testid="button-menu"
          >
            <span className="text-sm" data-testid="text-menu">Menu</span>
          </button>
        </div>

        {menuOpen ? (
          <div className="md:hidden border-t border-border/60" data-testid="mobile-menu">
            <div className="mx-auto grid w-full max-w-6xl gap-2 px-4 py-3 sm:px-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <Button
                className="mt-1 rounded-xl"
                data-testid="button-mobile-cta"
                onClick={() => {
                  setMenuOpen(false);
                  document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top" data-testid="main">
        <section
          className="relative overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${paperHero})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/55 to-background" />
          </div>

          <video
            ref={videoRef}
            className="video-parallax absolute inset-0 h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            data-testid="video-hero"
            poster={paperHero}
            aria-label="Yoga in the park"
          >
            <source
              src={yogaVideo}
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/45 to-background" />

          <img
            src={fern1}
            alt=""
            className="leaf-corner -left-8 -top-10 h-44 w-44 rotate-12 sm:h-56 sm:w-56 opacity-80"
            data-testid="img-leaf-top"
          />
          <img
            src={fern2}
            alt=""
            className="leaf-corner -bottom-10 -right-8 h-44 w-44 -rotate-6 sm:h-56 sm:w-56 opacity-80"
            data-testid="img-leaf-bottom"
          />

          <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-sm"
                  data-testid="badge-hero"
                >
                  <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  Outdoor yoga   sound healing   all levels
                </div>

                <h1
                  className="mt-5 text-balance font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl"
                  data-testid="text-hero-title"
                >
                  Create your
                  <span className="ml-3 font-script text-primary" data-testid="text-hero-calm">
                    calm
                  </span>
                </h1>

                <p
                  className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
                  data-testid="text-hero-subtitle"
                >
                  A gentle, nature-forward practice designed for beginners and all
                  levelscome as you are, breathe, and reset.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="rounded-xl"
                    data-testid="button-hero-book"
                    onClick={() => {
                      document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Book an appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <a
                    href="#events"
                    className="inline-flex items-center justify-center rounded-xl border border-border/70 bg-background/55 px-4 py-2.5 text-sm text-foreground shadow-sm transition hover:bg-background/75"
                    data-testid="link-hero-events"
                  >
                    View past events
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                  {[
                    { k: "Beginner friendly", v: "Slow & supportive" },
                    { k: "Outdoors", v: "Sunset + trees" },
                    { k: "Donation based", v: "Pay what you can" },
                    { k: "Bring", v: "Mat + warm layers" },
                  ].map((it) => (
                    <div
                      key={it.k}
                      className="glass-panel rounded-2xl px-4 py-3"
                      data-testid={`card-hero-feature-${it.k.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="text-xs tracking-[0.14em] text-muted-foreground" data-testid={`text-feature-k-${it.k.toLowerCase().replace(/\s+/g, "-")}`}>
                        {it.k.toUpperCase()}
                      </div>
                      <div className="mt-1 font-medium" data-testid={`text-feature-v-${it.k.toLowerCase().replace(/\s+/g, "-")}`}>
                        {it.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  className="glass-panel overflow-hidden rounded-[28px]"
                  data-testid="card-hero-image"
                >
                  <img
                    src={yogaFlyer}
                    alt="Create Your Calm flyer"
                    className="h-full w-full object-cover"
                    data-testid="img-flyer"
                  />
                </div>
                <div
                  className="pointer-events-none absolute -bottom-5 -left-5 hidden h-24 w-24 rounded-[28px] bg-primary/10 blur-2xl sm:block"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -top-6 -right-6 hidden h-28 w-28 rounded-[28px] bg-accent/60 blur-2xl sm:block"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="A nature-first practice">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="glass-panel rounded-2xl p-6" data-testid="card-about">
              <p className="text-sm leading-relaxed text-muted-foreground" data-testid="text-about">
                Inspired by the calm typography and leaf elements in your flyer, this
                site blends warm paper tones, sage greens, and soft motion. Its built
                to help people discover sessions, browse past events, and request an
                appointment.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" data-testid="row-about-badges">
                {["Outdoor yoga", "Sound healing", "Breathwork", "Beginner-friendly"].map((t) => (
                  <Badge
                    key={t}
                    className="rounded-full bg-primary/10 text-primary hover:bg-primary/15"
                    data-testid={`badge-about-${t.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="glass-panel rounded-2xl p-6" data-testid="card-location">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary" data-testid="icon-location">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-medium" data-testid="text-location-title">Meet outside</div>
                  <div className="mt-1 text-sm text-muted-foreground" data-testid="text-location">
                    Mission Bay Basketball Courts<br />
                    3609 Corona Oriente Rd.
                  </div>
                </div>
              </div>
              <Separator className="my-5" />
              <div className="grid gap-2 text-sm" data-testid="list-location">
                <div className="flex items-center justify-between" data-testid="row-location-1">
                  <span className="text-muted-foreground">Best time</span>
                  <span>Golden hour</span>
                </div>
                <div className="flex items-center justify-between" data-testid="row-location-2">
                  <span className="text-muted-foreground">What to bring</span>
                  <span>Mat + layers</span>
                </div>
                <div className="flex items-center justify-between" data-testid="row-location-3">
                  <span className="text-muted-foreground">Energy</span>
                  <span>Gentle & grounded</span>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="schedule" eyebrow="Schedule" title="Find a time">
          <CalendarEmbed />
        </Section>

        <Section id="blog" eyebrow="Blog" title="Notes from the practice">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "How to prepare for outdoor yoga",
                desc: "Layers, hydration, and simple ways to stay warm while staying present.",
                tag: "Guide",
              },
              {
                title: "A beginners breathwork routine",
                desc: "A 5-minute reset you can do anywherebefore meetings, after school pickup, or at sunset.",
                tag: "Breath",
              },
              {
                title: "Sound healing: what to expect",
                desc: "A gentle overview of bowls, vibration, and how we keep the space supportive.",
                tag: "Sound",
              },
            ].map((p, i) => (
              <Card
                key={p.title}
                className="glass-panel group rounded-2xl p-6 transition hover:-translate-y-0.5"
                data-testid={`card-blog-${i}`}
              >
                <div className="flex items-center justify-between">
                  <Badge
                    className="rounded-full bg-accent/60 text-foreground"
                    data-testid={`badge-blog-${i}`}
                  >
                    {p.tag}
                  </Badge>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
                    data-testid={`icon-blog-${i}`}
                  />
                </div>
                <div className="mt-4 font-serif text-xl" data-testid={`text-blog-title-${i}`}>
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid={`text-blog-desc-${i}`}>
                  {p.desc}
                </p>
                <button
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                  data-testid={`button-blog-read-${i}`}
                  onClick={() => {
                    // Mock only
                    window.alert("This is a prototype blog card.");
                  }}
                >
                  Read more
                  <ExternalLink className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="events" eyebrow="Past events" title="Moments we've shared">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Create Your Calm • Outdoor Yoga",
                meta: "Saturday • 2pm • Donation based",
                place: "Mission Bay Courts",
              },
              {
                title: "Sunset Sound Bath",
                meta: "Friday • 6pm • Small group",
                place: "Park meadow",
              },
              {
                title: "Morning Flow & Tea",
                meta: "Sunday • 9am • Refreshments included",
                place: "Waterfront Park",
              }
            ].map((ev, i) => (
              <Card key={i} className="glass-panel overflow-hidden rounded-2xl" data-testid={`card-event-${i}`}>
                <div className="aspect-[4/3] bg-muted/30 p-8 flex items-center justify-center text-muted-foreground italic text-sm text-center">
                  Image from Google Photos Album
                </div>
                <div className="p-5">
                  <div className="font-serif text-lg">{ev.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{ev.meta}</div>
                  <div className="mt-2 text-sm text-primary flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {ev.place}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              className="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10"
              onClick={() => window.open("https://photos.google.com", "_blank")}
              data-testid="button-google-photos"
            >
              View Full Google Photos Album
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Reach out">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="glass-panel rounded-2xl p-6" data-testid="card-contact">
              <div className="grid gap-4" data-testid="contact-details">
                <div className="flex items-center gap-3" data-testid="row-contact-phone">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary" data-testid="icon-phone">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" data-testid="text-phone-label">Text</div>
                    <div className="text-sm text-muted-foreground" data-testid="text-phone">(555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" data-testid="row-contact-email">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary" data-testid="icon-email">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" data-testid="text-email-label">Email</div>
                    <div className="text-sm text-muted-foreground" data-testid="text-email">hello@createyourcalm.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" data-testid="row-contact-ig">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary" data-testid="icon-ig">
                    <Instagram className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" data-testid="text-ig-label">Instagram</div>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      data-testid="link-instagram"
                    >
                      @createyourcalm
                    </a>
                  </div>
                </div>

                <Separator />
                <p className="text-sm text-muted-foreground" data-testid="text-donations">
                  Donations: Venmo / Apple Pay / Cash / Zelle
                </p>
              </div>
            </Card>

            <Card className="glass-panel rounded-2xl p-6" data-testid="card-contact-form">
              <div className="font-serif text-xl" data-testid="text-contact-form-title">
                Send a message
              </div>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-contact-form-subtitle">
                This form is a UI prototypewe can wire it up when youre ready.
              </p>

              <form className="mt-5 grid gap-3" data-testid="form-contact">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="cname" data-testid="label-contact-name">
                    Name
                  </label>
                  <Input id="cname" placeholder="Your name" data-testid="input-contact-name" />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="cemail" data-testid="label-contact-email">
                    Email
                  </label>
                  <Input id="cemail" type="email" placeholder="you@example.com" data-testid="input-contact-email" />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="cmsg" data-testid="label-contact-message">
                    Message
                  </label>
                  <Textarea
                    id="cmsg"
                    className="min-h-[120px]"
                    placeholder="How can we help?"
                    data-testid="input-contact-message"
                  />
                </div>

                <Button
                  type="button"
                  className="mt-1 rounded-xl"
                  data-testid="button-contact-send"
                  onClick={() => window.alert("Message sent (prototype).")}
                >
                  Send
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </Section>

        <footer className="border-t border-border/60" data-testid="footer">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground sm:px-6 sm:flex-row sm:items-center sm:justify-between">
            <div data-testid="text-footer-left">
                {new Date().getFullYear()} Create Your Calm
            </div>
            <div className="flex items-center gap-4" data-testid="footer-links">
              <a href="#schedule" className="hover:text-foreground" data-testid="link-footer-schedule">
                Schedule
              </a>
              <a href="#contact" className="hover:text-foreground" data-testid="link-footer-contact">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
