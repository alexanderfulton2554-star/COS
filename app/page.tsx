import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  HeartHandshake,
  HouseHeart,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

const services = [
  { title: "Residential care", description: "A safe, welcoming environment with support shaped around each person.", icon: HouseHeart, tone: "bg-rose-100 text-rose-700" },
  { title: "Person-centred support", description: "Daily routines, wellbeing, and independence are treated with dignity and respect.", icon: HeartHandshake, tone: "bg-emerald-100 text-emerald-700" },
  { title: "Qualified care teams", description: "Experienced people, clear standards, and thoughtful communication with families.", icon: Stethoscope, tone: "bg-sky-100 text-sky-700" },
];

const recruitmentRoles = [
  "Care Worker · 6135",
  "Senior Care Worker · 6136",
  "Registered Nurse · 2231",
  "Social Worker · 2461",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8f6] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="relative min-h-[560px] overflow-hidden bg-slate-900 px-6 py-8 text-white sm:px-10 lg:px-14">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.92)_0%,rgba(15,23,42,.7)_42%,rgba(15,23,42,.16)_100%),url('https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
            <div className="relative z-10 flex h-full min-h-[500px] flex-col">
              <div className="flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-bold text-sky-700 shadow-sm">COS</div><div><p className="text-[10px] uppercase tracking-[0.24em] text-sky-100">Care Organisation</p><p className="font-semibold">System</p></div></Link>
                <Link href="/login" className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">Portal sign in</Link>
              </div>
              <div className="mt-auto max-w-2xl pb-4 pt-20">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100 backdrop-blur-sm"><BadgeCheck className="h-3.5 w-3.5" /> Caring with confidence</div>
                <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">A welcoming place to live, work, and feel cared for.</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">COS supports safe, person-centred care and the people who make it possible across the UK care sector.</p>
                <div className="mt-8 flex flex-wrap gap-3"><Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-sky-50">Explore opportunities <ArrowRight className="h-4 w-4" /></Link><Link href="#services" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Discover our care</Link></div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-12">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Our approach</p><h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Care that feels personal, dependable, and human.</h2><p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Every person has their own story, preferences, and ambitions. Our care approach brings together capable teams, clear records, and meaningful relationships so people can live with dignity.</p></div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><InfoRow icon={Users} title="People first" detail="Support shaped around individual needs" /><InfoRow icon={ShieldCheck} title="Trusted standards" detail="Clear, accountable care processes" /><InfoRow icon={BriefcaseBusiness} title="Strong teams" detail="A workplace built for development" /></div>
          </div>
        </div>

        <section id="services" className="py-14"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">What we provide</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Support for every stage of care.</h2></div><a href="#contact" className="text-sm font-semibold text-sky-700 hover:text-sky-600">Talk to our team <ArrowRight className="ml-1 inline h-4 w-4" /></a></div><div className="mt-7 grid gap-4 md:grid-cols-3">{services.map(({ title, description, icon: Icon, tone }) => <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></div>)}</div></section>

        <section className="rounded-[30px] bg-sky-900 px-6 py-8 text-white shadow-xl shadow-slate-300/30 sm:px-10 sm:py-10"><div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Join our care community</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Build a meaningful career in UK care.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-sky-100">We assist with enquiries for eligible vacancies, subject to successful recruitment, role availability, and applicable UK immigration requirements.</p><Link href="/register" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sky-900 hover:bg-sky-50">Start an application <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-3 sm:grid-cols-2">{recruitmentRoles.map((role) => <div key={role} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white">{role}</div>)}<div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-sky-100 sm:col-span-2">Planned start date: 5 October 2026, subject to successful recruitment.</div></div></div></section>

        <section id="contact" className="flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Contact and support</p><h2 className="mt-2 text-2xl font-semibold text-slate-900">Ready to take the next step?</h2><p className="mt-2 text-sm text-slate-600">Sign in to your portal or begin your application today.</p></div><div className="flex flex-wrap gap-3"><Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Phone className="h-4 w-4" /> Portal sign in</Link><Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500">Apply now <ArrowRight className="h-4 w-4" /></Link></div></section>
        <p className="border-t border-slate-200 py-6 text-xs leading-5 text-slate-500">Sponsorship and dependant eligibility are subject to applicable UK immigration requirements. No employment or sponsorship outcome is guaranteed until recruitment and eligibility checks are complete.</p>
      </section>
    </main>
  );
}

function InfoRow({ icon: Icon, title, detail }: { icon: typeof Users; title: string; detail: string }) { return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm"><Icon className="h-5 w-5" /></div><div><p className="text-sm font-semibold text-slate-900">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div></div>; }
