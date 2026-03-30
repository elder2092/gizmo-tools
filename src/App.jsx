import { useState } from "react";

// ═══════════════════════════════════════
// SHARED CONSTANTS
// ═══════════════════════════════════════
const C = {
  NAVY: "#1e2b5e", RED: "#c8102e", GOLD: "#e8b84b", DARK: "#0d1220",
  SURF: "#131b2e", SURF2: "#1a2540", BORD: "#1e2f4a", TEXT: "#94a3c0",
  BRIGHT: "#e2e8f8", DIM: "#3a4a6a", GREEN: "#22c55e", AMBER: "#f59e0b",
  TEAL: "#0ea5e9", PURPLE: "#a855f7",
};

// Shared components
function Card({ children, color = C.BORD, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.SURF, border: `1px solid ${C.BORD}`, borderLeft: `3px solid ${color}`, marginBottom: 4, cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}
function Tag({ label, color }) {
  return <span style={{ fontSize: 9, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "3px 8px", background: `${color}15`, color, border: `1px solid ${color}30`, whiteSpace: "nowrap" }}>{label}</span>;
}
function SectionHead({ text, color = C.RED }) {
  return <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color, padding: "12px 0 8px", borderBottom: `1px solid ${C.BORD}`, marginBottom: 8 }}>{text}</div>;
}
function SearchBox({ value, onChange, placeholder }) {
  return <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", background: C.SURF, border: `1px solid ${C.BORD}`, color: C.BRIGHT, fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", marginBottom: 12 }} />;
}
function RuleBox({ title, color, children }) {
  return <div style={{ marginTop: 16, padding: "18px", background: C.SURF, border: `1px solid ${C.BORD}`, borderLeft: `3px solid ${color}` }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color, marginBottom: 12 }}>{title}</div>{children}</div>;
}

// ═══════════════════════════════════════
// TOOL 1: CRM CHEAT SHEET
// ═══════════════════════════════════════
const crmData = [
  { cat: "Real Estate", crms: [
    { name: "GoHighLevel (GHL)", level: "green", verdict: "YES — your home turf", zapier: true, api: true, notes: "Your primary build platform. Native webhooks, full API, Zapier via LeadConnector." },
    { name: "Follow Up Boss", level: "green", verdict: "YES — strong integration", zapier: true, api: true, notes: "250+ integrations, excellent Zapier support, full API with webhooks. Very popular with US teams." },
    { name: "KVCore / Inside Real Estate", level: "amber", verdict: "YES with scoping", zapier: true, api: true, notes: "Has Zapier and API. Common with larger teams. Some features locked to premium tiers." },
    { name: "Chime", level: "amber", verdict: "YES with scoping", zapier: true, api: true, notes: "API available, Zapier exists. Position as enhancement, not replacement." },
    { name: "BoomTown", level: "amber", verdict: "YES but limited bridge", zapier: true, api: true, notes: "API and Zapier available. Focus on the operational layer they don't cover." },
    { name: "CINC", level: "amber", verdict: "YES with Zapier", zapier: true, api: false, notes: "Zapier via webhooks. No direct public API." },
    { name: "KW Command", level: "red", verdict: "AVOID — mandated CRM", zapier: false, api: false, notes: "Closed ecosystem. KW agents required to use it. Do NOT target KW brokerages." },
    { name: "eXp Realty (Cloze)", level: "red", verdict: "AVOID — free CRM", zapier: false, api: false, notes: "eXp provides CRM free. Hard to justify managed service when baseline cost is zero." },
    { name: "Salesforce", level: "green", verdict: "YES — huge opportunity", zapier: true, api: true, notes: "Full API, excellent Zapier. Many brokerages pay $150/user and use 10% of it." },
    { name: "HubSpot", level: "green", verdict: "YES — excellent", zapier: true, api: true, notes: "Best-in-class API and Zapier. Free tier means many have it but never configured it." },
  ]},
  { cat: "UK Estate Agency", crms: [
    { name: "Reapit (Foundations)", level: "amber", verdict: "YES with scoping", zapier: false, api: true, notes: "Open API. No native Zapier. Integration requires API work or Make." },
    { name: "Jupix", level: "amber", verdict: "YES but limited", zapier: false, api: true, notes: "API available but limited. May need GHL alongside for automation." },
    { name: "Alto (Zoopla)", level: "amber", verdict: "YES — scope carefully", zapier: false, api: true, notes: "API exists but Zoopla-ecosystem focused." },
  ]},
  { cat: "Aesthetics", crms: [
    { name: "Pabau", level: "amber", verdict: "YES — Kezia's core", zapier: true, api: true, notes: "UK's leading aesthetics CRM. Zapier + API. Kezia should know this inside out." },
    { name: "Cliniko", level: "green", verdict: "YES — good integration", zapier: true, api: true, notes: "Strong API and Zapier. Popular UK/Australia." },
    { name: "Jane App", level: "green", verdict: "YES — good integration", zapier: true, api: true, notes: "Popular practice management. Good Zapier and API." },
  ]},
  { cat: "Mortgage", crms: [
    { name: "Encompass (ICE)", level: "red", verdict: "Bridge only", zapier: false, api: true, notes: "LOS not CRM. Don't manage it. Your bridge service READS status and PUSHES updates." },
    { name: "Total Expert", level: "amber", verdict: "YES — add what's missing", zapier: true, api: true, notes: "Strong on compliance, weak on referral partner automation." },
    { name: "Shape Software", level: "green", verdict: "YES — straightforward", zapier: true, api: true, notes: "Popular with independent brokers. Good Zapier. Often underutilised." },
  ]},
  { cat: "Home Services", crms: [
    { name: "ServiceTitan", level: "green", verdict: "YES — major opportunity", zapier: true, api: true, notes: "Dominant platform. Most businesses use 30% of it." },
    { name: "Jobber", level: "green", verdict: "YES — easy", zapier: true, api: true, notes: "Popular with smaller contractors. Great Zapier." },
    { name: "Housecall Pro", level: "green", verdict: "YES — easy", zapier: true, api: true, notes: "Growing mid-size platform. Good Zapier." },
  ]},
  { cat: "PI Law", crms: [
    { name: "Clio (Grow + Manage)", level: "green", verdict: "YES — excellent", zapier: true, api: true, notes: "Leading legal CRM. Strong Zapier and API. Most firms buy it and never configure it." },
    { name: "Lawmatics", level: "green", verdict: "YES — strong", zapier: true, api: true, notes: "Legal-specific. Good automation focus. Often bought but never configured." },
    { name: "LeadDocket", level: "amber", verdict: "YES with scoping", zapier: true, api: true, notes: "PI-specific intake. Zapier available." },
  ]},
  { cat: "Financial Advisory", crms: [
    { name: "Redtail CRM", level: "amber", verdict: "YES — core advisory CRM", zapier: true, api: true, notes: "Most widely used in independent advisory. Strong contacts, weak automation." },
    { name: "Wealthbox", level: "green", verdict: "YES — good", zapier: true, api: true, notes: "Growing RIA-focused. Clean interface, good API and Zapier." },
  ]},
];

function CRMCheatSheet() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = crmData.map(cat => ({ ...cat, crms: cat.crms.filter(c => (filter === "all" || c.level === filter) && (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))) })).filter(cat => cat.crms.length > 0);
  const totals = { green: crmData.flatMap(c => c.crms).filter(c => c.level === "green").length, amber: crmData.flatMap(c => c.crms).filter(c => c.level === "amber").length, red: crmData.flatMap(c => c.crms).filter(c => c.level === "red").length };

  return (<div>
    <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
      <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.GREEN }}>{totals.green}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Say YES</span></div>
      <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.AMBER }}>{totals.amber}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Scope it</span></div>
      <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.RED }}>{totals.red}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Avoid</span></div>
    </div>
    <SearchBox value={search} onChange={setSearch} placeholder="Search CRM..." />
    <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
      {[{ k: "all", l: "All", c: C.TEXT }, { k: "green", l: "Easy", c: C.GREEN }, { k: "amber", l: "Moderate", c: C.AMBER }, { k: "red", l: "Avoid", c: C.RED }].map(f =>
        <button key={f.k} onClick={() => setFilter(f.k)} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "7px 12px", border: `1px solid ${filter === f.k ? f.c : C.BORD}`, background: filter === f.k ? `${f.c}15` : "transparent", color: filter === f.k ? f.c : C.DIM, cursor: "pointer" }}>{f.l}</button>
      )}
    </div>
    {filtered.map((cat, i) => <div key={i}><SectionHead text={cat.cat} />{cat.crms.map((crm, j) => <CRMCard key={j} crm={crm} />)}</div>)}
    <RuleBox title="Quick Phrases" color={C.GOLD}>
      {[
        { q: "GREEN platform:", a: "\"Absolutely — we work with that regularly. We'd connect your existing system to our automation layer.\"" },
        { q: "AMBER platform:", a: "\"Yes, we can work with that. I'll scope the integration as part of the free audit.\"" },
        { q: "RED platform:", a: "\"I want to be upfront — that has some integration limitations. Let me look at your specific setup in the audit.\"" },
        { q: "No CRM yet:", a: "\"That's the easiest scenario. We build the entire system from scratch. You'll be operational within 14 days.\"" },
      ].map((item, i) => <div key={i} style={{ marginBottom: 12 }}><div style={{ fontSize: 11, color: C.GOLD, fontWeight: 600, marginBottom: 3 }}>{item.q}</div><div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6, fontStyle: "italic" }}>{item.a}</div></div>)}
    </RuleBox>
  </div>);
}

function CRMCard({ crm }) {
  const [open, setOpen] = useState(false);
  const lc = crm.level === "green" ? C.GREEN : crm.level === "amber" ? C.AMBER : C.RED;
  return (
    <Card color={lc} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: C.BRIGHT }}>{crm.name}</div>
          <div style={{ fontSize: 12, color: lc, fontWeight: 600, marginTop: 2 }}>{crm.verdict}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {crm.zapier && <Tag label="Zapier" color={C.GREEN} />}
          {crm.api && <Tag label="API" color={C.GOLD} />}
        </div>
      </div>
      {open && <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "12px 16px", background: `${C.DARK}80`, fontSize: 13, color: C.TEXT, lineHeight: 1.7 }}>{crm.notes}</div>}
    </Card>
  );
}

// ═══════════════════════════════════════
// TOOL 2: OBJECTION HANDLER
// ═══════════════════════════════════════
const objections = [
  { cat: "Price & Budget", color: C.RED, items: [
    { q: "It's too expensive.", freq: "Very Common", a: "Let me show you the maths: if your average deal is worth $9,000 and we recover even 3 extra deals this year, that's $27,000 against a $9,000–$18,000 annual retainer. The question isn't whether you can afford it — it's whether you can afford to keep losing those deals.", follow: "Would it help if I showed you exactly how many leads your current system is missing?", rule: "Reframe price as ROI. Never defend the price — attack the cost of inaction." },
    { q: "We don't have the budget right now.", freq: "Common", a: "Totally fair. What's your average deal value? Most clients find the retainer pays for itself within 30–60 days. But I respect that timing matters.", follow: "Would it make sense to run the free audit now so the numbers are ready when budget opens up?", rule: "Acknowledge. Plant the seed with the free audit. Never push against genuine budget issues." },
    { q: "Can you do it cheaper?", freq: "Common", a: "I could reduce scope — but I wouldn't want to give you a half-built system. What I can offer is founding client pricing — 30% off the setup fee in exchange for feedback and a testimonial at 90 days.", follow: "Does the founding client offer change the equation?", rule: "Never discount the retainer. Offer founding pricing on setup fees only." },
    { q: "Someone on Fiverr can do this cheaper.", freq: "Occasional", a: "For a one-time build, that might work. But who monitors automations next month? Who onboards your new hire? Who sends you the report showing which leads converted? The setup is 20% of the value. Ongoing management is the other 80%.", follow: "Have you tried outsourcing this before?", rule: "Don't compete on setup price. Compete on ongoing outcomes." },
  ]},
  { cat: "\"I Can Do It Myself\"", color: C.GOLD, items: [
    { q: "Why can't I just do this myself?", freq: "Very Common", a: "You absolutely could — if you had 10–15 hours a week of dedicated operational time. The reason 50% of CRM implementations fail isn't that business owners aren't smart enough — it's that they don't have the time. You run the business. We run the system behind it.", follow: "What percentage of your CRM features do you think your team uses today?", rule: "Never make them feel incapable. Position as time-and-expertise multiplication." },
    { q: "We already have someone handling our CRM.", freq: "Common", a: "That's great. Is that their full-time role, or alongside other responsibilities? Having a dedicated external team frees that person up to focus on what they were hired to do.", follow: "Would it be worth running the free audit to see if there are gaps?", rule: "Don't attack their internal person. Position as support, not replacement." },
    { q: "Our CRM already has automation built in.", freq: "Common", a: "It does — and that's exactly the problem we solve. 76% of sales teams don't use most features. The automation exists. But someone has to build, configure, test, train, and maintain it. That's not a software problem — it's an operational one.", follow: "When was the last time someone audited which automations are actually running?", rule: "Agree. Then pivot to the gap between having features and using them." },
  ]},
  { cat: "Trust & Credibility", color: C.TEAL, items: [
    { q: "You're a new company.", freq: "Very Common", a: "Fair question. We're new as a company, but the methodology isn't. Businesses that respond within 60 seconds convert at 391% higher rates. These aren't our numbers — they're industry research. That's why we offer founding client pricing — you get a discount, we build case studies.", follow: "Would it help if I showed you the system live?", rule: "Don't apologise for being new. Lean into the data. Founding pricing turns it into an advantage." },
    { q: "Can I speak to a current client?", freq: "Common", a: "Not yet — we're onboarding founding clients right now. What I can do is show you the live demo and let you test the automations yourself. And at 90 days, you'll be the reference I point future clients to.", follow: "Let me show you the demo — would 20 minutes this week work?", rule: "Be honest. Turn the gap into an opportunity — they get to be first." },
    { q: "What if I want to cancel?", freq: "Common", a: "Month-to-month. No long-term contract. You keep everything we built — every automation, dashboard, sequence. It's all yours. I'd rather earn your business every month than lock you in.", follow: "Does month-to-month work for you?", rule: "Remove all risk. Month-to-month is a strength, not a weakness." },
  ]},
  { cat: "Timing", color: C.GREEN, items: [
    { q: "We're too busy right now.", freq: "Very Common", a: "Being busy is exactly when you need this most — that's when leads fall through the cracks. The 42-hour average response time doesn't pause because you're busy.", follow: "What if we started with just the 30-minute audit?", rule: "Show that busy IS the problem the service solves." },
    { q: "I need to think about it.", freq: "Very Common", a: "Of course. Can I ask: what specifically do you want to think through? Is it pricing, scope, or something else? I'd rather address it now than have it sit unanswered.", follow: "Would it help if I sent the proposal with the specific ROI numbers?", rule: "Never accept without asking what they need to think about. The real objection is hiding." },
    { q: "We just changed CRM systems.", freq: "Occasional", a: "That's actually one of the best times to bring us in. The first 90 days is when adoption either succeeds or fails — 50% fail in that window. We make sure yours doesn't.", follow: "Which system did you move to? I can tell you where most businesses get stuck.", rule: "New CRM is an opportunity, not a blocker." },
  ]},
  { cat: "Scope & Fit", color: C.PURPLE, items: [
    { q: "We're too small for this.", freq: "Common", a: "Our service is actually designed for businesses your size. The big enterprises have internal ops teams. It's the 5–50 person businesses that need this most. Our Starter tier is $750/month.", follow: "How many leads do you get per month?", rule: "Small businesses are the core market." },
    { q: "We don't really use our CRM.", freq: "Very Common", a: "That's exactly why we exist. 76% of teams don't use most features. We build the system around how your team actually works and manage everything so adoption is automatic.", follow: "What would change if every lead got a response within 60 seconds, 24/7?", rule: "Low CRM usage is your #1 buying signal, not a disqualifier." },
    { q: "What CRM do you recommend?", freq: "Common", a: "We're platform-agnostic — we work with whatever you're already on. If you don't have one, we build from scratch on a platform purpose-built for your industry.", follow: "What are you using today?", rule: "Platform-agnostic positioning is a major differentiator." },
  ]},
  { cat: "The Hard Ones", color: C.RED, items: [
    { q: "My business is different.", freq: "Common", a: "Every business feels unique. But operationally, every relationship-driven business faces the same four failures: slow lead response, poor CRM adoption, no systematic follow-up, and no owner visibility. The framework works across all of them.", follow: "What's the one operational thing that keeps you up at night?", rule: "Validate their uniqueness. Then show the universal pattern." },
    { q: "I had a bad experience before.", freq: "Occasional", a: "I'm sorry to hear that. That's why we structured Gizmo differently — month-to-month, ongoing management, monthly reporting. Our business model depends on your results month after month.", follow: "Would you share what went wrong? I want to make sure we don't repeat it.", rule: "Don't dismiss it. Show how Gizmo is structurally different." },
    { q: "I need to check with my partner.", freq: "Very Common", a: "Absolutely. Would it be helpful if I joined a quick call with both of you? A 15-minute conversation removes weeks of back-and-forth.", follow: "When are you next speaking with them?", rule: "Always offer to join the second conversation." },
  ]},
];

function ObjectionHandler() {
  const [search, setSearch] = useState("");
  const filtered = objections.map(cat => ({ ...cat, items: cat.items.filter(item => search === "" || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())) })).filter(cat => cat.items.length > 0);
  return (<div>
    <SearchBox value={search} onChange={setSearch} placeholder="Search objections..." />
    {filtered.map((cat, i) => <div key={i} style={{ marginBottom: 20 }}><SectionHead text={cat.cat} color={cat.color} />{cat.items.map((item, j) => <ObjectionCard key={j} item={item} color={cat.color} />)}</div>)}
    <RuleBox title="Golden Rules" color={C.RED}>
      {["Never argue. Acknowledge, then redirect.", "The real objection is rarely the first one stated.", "Always have a next step ready — audit, demo, proposal.", "Price objections are ROI objections in disguise.", "'I need to think about it' means you haven't found the real concern.", "Month-to-month is your weapon. It removes risk."].map((r, i) =>
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: C.TEXT, lineHeight: 1.5 }}><span style={{ color: C.RED, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13 }}>{String(i+1).padStart(2,"0")}</span>{r}</div>
      )}
    </RuleBox>
  </div>);
}

function ObjectionCard({ item, color }) {
  const [open, setOpen] = useState(false);
  const fc = item.freq === "Very Common" ? C.RED : C.AMBER;
  return (
    <Card color={color} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 10 }}>
        <div style={{ flex: 1, fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: C.BRIGHT }}>"{item.q}"</div>
        <Tag label={item.freq} color={fc} />
      </div>
      {open && <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "14px 16px", background: `${C.DARK}80` }}>
        <div style={{ fontSize: 9, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.GREEN, marginBottom: 6 }}>Your Response</div>
        <div style={{ fontSize: 14, color: C.BRIGHT, lineHeight: 1.75, fontStyle: "italic", marginBottom: 14 }}>"{item.a}"</div>
        <div style={{ fontSize: 9, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.TEAL, marginBottom: 6 }}>Follow-up</div>
        <div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6, marginBottom: 14 }}>{item.follow}</div>
        <div style={{ padding: "8px 12px", background: `${C.GOLD}08`, borderLeft: `2px solid ${C.GOLD}40`, fontSize: 12, color: C.GOLD, fontStyle: "italic" }}>💡 {item.rule}</div>
      </div>}
    </Card>
  );
}

// ═══════════════════════════════════════
// TOOL 3: ROI CALCULATOR
// ═══════════════════════════════════════
const verticals = [
  { id: "re", name: "US Real Estate", icon: "🏠", color: C.RED,
    fields: [{ k: "avgDeal", l: "Avg commission ($)", d: 9108 }, { k: "leadsPerMonth", l: "Leads per month", d: 50 }, { k: "retainer", l: "Gizmo retainer ($/mo)", d: 1000 }],
    calc: v => { const lost = Math.round(v.leadsPerMonth * 0.51); const recovered = Math.round(lost * 0.1 * 10) / 10; const rev = Math.round(recovered * v.avgDeal); const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Leads uncontacted/mo", v: lost, c: C.RED }, { l: "Deals recovered/mo", v: recovered, c: C.AMBER }, { l: "Revenue recovered/mo", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual recovery", v: `$${annual.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `With ${v.leadsPerMonth} leads/month, ~${lost} go uncontacted. Recovering 10% = ${recovered} extra deals at $${v.avgDeal.toLocaleString()} = $${rev.toLocaleString()}/month against a $${v.retainer.toLocaleString()} retainer.` }; }
  },
  { id: "uk", name: "UK Estate Agency", icon: "🇬🇧", color: C.GOLD,
    fields: [{ k: "avgFee", l: "Avg fee per sale (£)", d: 8500 }, { k: "leadsPerMonth", l: "Portal enquiries/mo", d: 60 }, { k: "retainer", l: "Gizmo retainer (£/mo)", d: 850 }],
    calc: v => { const ooh = Math.round(v.leadsPerMonth * 0.42); const recovered = Math.round(ooh * 0.1 * 10) / 10; const rev = Math.round(recovered * v.avgFee); const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Out-of-hours enquiries/mo", v: ooh, c: C.RED }, { l: "Sales recovered/mo", v: recovered, c: C.AMBER }, { l: "Revenue recovered/mo", v: `£${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual recovery", v: `£${annual.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `£${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `42% of your ${v.leadsPerMonth} enquiries arrive outside hours — ${ooh} going unacknowledged. Recovering 10% = ${recovered} extra sales at £${v.avgFee.toLocaleString()} = £${rev.toLocaleString()}/month.` }; }
  },
  { id: "aes", name: "Aesthetics", icon: "💉", color: C.PURPLE,
    fields: [{ k: "avgTx", l: "Avg treatment value (£/$)", d: 400 }, { k: "patients", l: "Patient database", d: 500 }, { k: "retainer", l: "Retainer ($/mo)", d: 600 }],
    calc: v => { const extra = Math.round(v.patients * 0.1 / 12); const rev = extra * v.avgTx; const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Additional patients/mo", v: extra, c: C.AMBER }, { l: "Additional revenue/mo", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `10% retention improvement on ${v.patients} patients = ${extra} additional visits/month at $${v.avgTx} = $${rev.toLocaleString()}/month.` }; }
  },
  { id: "pi", name: "PI Law", icon: "⚖️", color: C.RED,
    fields: [{ k: "avgFee", l: "Avg attorney fee ($)", d: 14900 }, { k: "enquiries", l: "Enquiries/month", d: 100 }, { k: "convRate", l: "Current conversion (%)", d: 14 }, { k: "retainer", l: "Retainer ($/mo)", d: 1500 }],
    calc: v => { const current = Math.round(v.enquiries * v.convRate / 100); const improved = Math.round(v.enquiries * (v.convRate + 11) / 100); const extra = improved - current; const rev = extra * v.avgFee; const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Current clients/mo", v: current, c: C.TEXT }, { l: "Projected clients/mo", v: improved, c: C.GREEN }, { l: "Additional revenue/mo", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `Improving conversion from ${v.convRate}% to ${v.convRate + 11}% = ${extra} additional clients/month at $${v.avgFee.toLocaleString()} = $${rev.toLocaleString()}/month.` }; }
  },
  { id: "hs", name: "Home Services", icon: "🔧", color: C.AMBER,
    fields: [{ k: "customers", l: "Past customers", d: 500 }, { k: "contractVal", l: "Maintenance contract ($/yr)", d: 300 }, { k: "retainer", l: "Retainer ($/mo)", d: 750 }],
    calc: v => { const extra = Math.round(v.customers * 0.1); const rev = extra * v.contractVal; const cost = v.retainer * 12; return { stats: [{ l: "Additional contracts/yr", v: extra, c: C.AMBER }, { l: "Annual contract revenue", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((rev - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `10% recall improvement on ${v.customers} customers = ${extra} maintenance contracts at $${v.contractVal}/yr = $${rev.toLocaleString()} annual revenue.` }; }
  },
];

function ROICalculator() {
  const [sel, setSel] = useState("re");
  const vert = verticals.find(v => v.id === sel);
  const [vals, setVals] = useState(Object.fromEntries(vert.fields.map(f => [f.k, f.d])));
  const [showPitch, setShowPitch] = useState(false);

  const switchVert = (id) => { setSel(id); const v = verticals.find(x => x.id === id); setVals(Object.fromEntries(v.fields.map(f => [f.k, f.d]))); setShowPitch(false); };
  const result = vert.calc(vals);

  return (<div>
    <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
      {verticals.map(v => <button key={v.id} onClick={() => switchVert(v.id)} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "7px 12px", border: `1px solid ${sel === v.id ? v.color : C.BORD}`, background: sel === v.id ? `${v.color}15` : "transparent", color: sel === v.id ? v.color : C.DIM, cursor: "pointer", whiteSpace: "nowrap" }}>{v.icon} {v.name.split(" ")[0]}</button>)}
    </div>
    <Card color={vert.color}>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          {vert.fields.map(f => <div key={f.k} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: C.DIM, marginBottom: 4 }}>{f.l}</div>
            <input type="number" value={vals[f.k]} onChange={e => setVals({ ...vals, [f.k]: Number(e.target.value) || 0 })} style={{ width: "100%", padding: "10px 12px", background: C.DARK, border: `1px solid ${C.BORD}`, color: C.BRIGHT, fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, outline: "none" }} />
          </div>)}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "16px", background: `${C.DARK}60` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {result.stats.map((s, i) => <div key={i} style={{ padding: "10px", background: C.SURF, border: `1px solid ${C.BORD}` }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: C.DIM, marginTop: 3 }}>{s.l}</div>
          </div>)}
        </div>
        <button onClick={() => setShowPitch(!showPitch)} style={{ marginTop: 12, width: "100%", padding: "10px", background: `${vert.color}15`, border: `1px solid ${vert.color}30`, color: vert.color, fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, cursor: "pointer" }}>{showPitch ? "Hide" : "Show"} Pitch Script</button>
        {showPitch && <div style={{ marginTop: 10, padding: "14px", background: `${C.GREEN}08`, borderLeft: `2px solid ${C.GREEN}40`, fontSize: 14, color: C.BRIGHT, lineHeight: 1.75, fontStyle: "italic" }}>"{result.pitch}"</div>}
      </div>
    </Card>
    <RuleBox title="Key Stats to Memorise" color={C.GOLD}>
      {[{ s: "51%", t: "of leads never contacted" }, { s: "78%", t: "buy from first responder" }, { s: "42 hrs", t: "average response time" }, { s: "391%", t: "higher conversion within 60 seconds" }, { s: "50%", t: "of CRM implementations fail" }, { s: "$8.71", t: "return per $1 spent on CRM" }].map((s, i) =>
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "baseline" }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: C.RED, minWidth: 55, textAlign: "right" }}>{s.s}</span><span style={{ fontSize: 13, color: C.TEXT }}>{s.t}</span></div>
      )}
    </RuleBox>
  </div>);
}

// ═══════════════════════════════════════
// TOOL 4: COMPETITOR COMPARISON
// ═══════════════════════════════════════
const competitors = [
  { name: "GHL / White-Label Agencies", icon: "🏷️", color: C.AMBER, threat: "High", desc: "Rebrand GHL and sell access at $297–$497/mo. One-time setup, client runs it themselves.", diff: "We deliver results, not software. We manage monthly. We're platform-agnostic.", response: "They hand you a gym membership. We're your personal trainer who shows up every session.", oneliner: "They sell software. We deliver results." },
  { name: "Freelancers / Fiverr", icon: "💻", color: C.TEAL, threat: "Medium", desc: "One-off setup at $500–$3,000. No ongoing relationship or industry knowledge.", diff: "Setup is 20% of value. We manage the other 80%. We have accountability and reporting.", response: "Who monitors automations next month? Who onboards your new hire? Who sends the performance report?", oneliner: "They build it once. We run it forever." },
  { name: "In-House Hire", icon: "👤", color: C.PURPLE, threat: "Medium", desc: "Full-time CRM admin at $55,000–$90,000/year including benefits.", diff: "We cost a third. No training curve (14 days vs 3–6 months). No single point of failure.", response: "A full-time admin is $55K+/year. Our retainer is less than a third, you get a team, and we're operational in 14 days.", oneliner: "We cost a third and start in 14 days." },
  { name: "DIY", icon: "🔧", color: C.DIM, threat: "High", desc: "Owner watches YouTube and attempts to configure CRM themselves.", diff: "50% fail. Opportunity cost of owner's time. Every DIY setup degrades within 90 days.", response: "You're great at running your business. We're great at running the system behind it. 50% of DIY implementations fail.", oneliner: "Your time is worth more than CRM configuration." },
  { name: "CRM Software Company", icon: "🏢", color: C.RED, threat: "Low", desc: "Salesforce/HubSpot offer onboarding and customer success at $150–$300/hr.", diff: "They sell to millions. We manage for you. They teach you to fish. We fish for you.", response: "Their customer success team answers 'how do I' questions. They don't build your automations, monitor them monthly, or send you a performance report.", oneliner: "They sell to millions. We manage for you." },
  { name: "Marketing Agency", icon: "📣", color: C.GOLD, threat: "Medium", desc: "Run ads, build websites, generate leads. Some offer CRM setup as add-on.", diff: "We start where they stop. They generate leads. We convert them. We're complementary.", response: "Keep your agency for lead gen. We'll make sure every lead they generate actually converts. Your agency gets better results. Everyone wins.", oneliner: "They generate leads. We convert them." },
  { name: "Virtual Assistants", icon: "🌍", color: C.TEAL, threat: "Low", desc: "VAs at $5–$15/hr for manual CRM tasks.", diff: "A VA can't respond at 2am on Saturday within 60 seconds. Automation handles the 80%. VAs handle the 20%.", response: "We build the automation layer for the 80% and free your VA to focus on the 20% that genuinely needs a human.", oneliner: "Automation handles the 80%. Humans handle the 20%." },
];

function CompetitorComparison() {
  const [search, setSearch] = useState("");
  const filtered = competitors.filter(c => search === "" || c.name.toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <SearchBox value={search} onChange={setSearch} placeholder="Search competitors..." />
    {filtered.map((comp, i) => <CompCard key={i} comp={comp} />)}
    <RuleBox title="One-Sentence Positioning" color={C.RED}>
      {competitors.map((c, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, color: C.TEXT }}><span style={{ fontSize: 14 }}>{c.icon}</span><span><b style={{ color: C.BRIGHT }}>{c.name.split("/")[0]}:</b> {c.oneliner}</span></div>)}
    </RuleBox>
  </div>);
}

function CompCard({ comp }) {
  const [open, setOpen] = useState(false);
  const tc = comp.threat === "High" ? C.RED : comp.threat === "Medium" ? C.AMBER : C.GREEN;
  return (
    <Card color={comp.color} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 10 }}>
        <span style={{ fontSize: 20 }}>{comp.icon}</span>
        <div style={{ flex: 1 }}><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: C.BRIGHT }}>{comp.name}</div></div>
        <Tag label={`${comp.threat} Threat`} color={tc} />
      </div>
      {open && <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "14px 16px", background: `${C.DARK}80` }}>
        <div style={{ fontSize: 12, color: C.DIM, marginBottom: 10 }}><b style={{ color: C.TEXT }}>What they do:</b> {comp.desc}</div>
        <div style={{ fontSize: 12, color: C.TEXT, marginBottom: 10 }}><b style={{ color: C.GREEN }}>How Gizmo differs:</b> {comp.diff}</div>
        <div style={{ padding: "10px 14px", background: `${C.RED}08`, borderLeft: `2px solid ${C.RED}40`, fontSize: 14, color: C.BRIGHT, fontStyle: "italic", lineHeight: 1.7 }}>"{comp.response}"</div>
      </div>}
    </Card>
  );
}

// ═══════════════════════════════════════
// TOOL 5: PRICING REFERENCE
// ═══════════════════════════════════════
const priceTiers = [
  { name: "Starter", color: C.TEAL, us: "$750/mo", uk: "£500–£650/mo", setupUS: "$1,500", setupUK: "£700–£1,000", best: "Small operations, up to 15 people, single location.", includes: "Full build, 3 lead sources, core automations, monthly report, staff onboarding, email support.", howToSay: "Our Starter tier is $750/month with a $1,500 setup fee. Complete build, all core automations, and monthly reporting. Operational in 14 days." },
  { name: "Growth", color: C.RED, featured: true, us: "$1,000–$1,500/mo", uk: "£750–£1,000/mo", setupUS: "$2,000–$3,000", setupUK: "£1,200–£1,800", best: "Mid-size operations, 15–40 people, multiple lead sources.", includes: "Everything in Starter + owner dashboard, strategy calls, database campaigns, advanced automations, 48hr onboarding, priority support.", howToSay: "Our Growth tier is $1,000–$1,500/month with $2,000–$3,000 setup. Includes everything: dashboard, strategy calls, database campaigns. Most clients see ROI within 30–60 days." },
  { name: "Established", color: C.GOLD, us: "$1,500–$2,000/mo", uk: "£1,000–£1,400/mo", setupUS: "$3,000–$4,000", setupUK: "£1,800–£2,500", best: "Larger operations, 40+ people, multi-location, bridge service.", includes: "Everything in Growth + bridge service, custom API integrations, bi-weekly calls, dedicated account manager.", howToSay: "For your size, our Established tier at $1,500–$2,000/month includes the bridge service, custom integrations, bi-weekly calls, and a dedicated account manager." },
];

function PricingReference() {
  return (<div>
    {priceTiers.map((t, i) => <PriceCard key={i} tier={t} />)}
    <RuleBox title="Pricing Rules" color={C.RED}>
      {["Never discount the monthly retainer. Flex on setup fee (founding 30% off) or payment terms.", "Never quote before a discovery call. Anchor the range: '$750–$2,000/month depending on size.'", "Invoice within 30 MINUTES of verbal yes. Have Stripe templates ready.", "Founding discount: 30% off SETUP ONLY. First 3 clients per vertical.", "Free audit is your most powerful close — demonstrate expertise before pricing.", "Upsell timing: database reactivation at kickoff, bridge service once operational, tier upgrade at 90-day review."].map((r, i) =>
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, color: C.TEXT, lineHeight: 1.5 }}><span style={{ color: C.RED, fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>{String(i+1).padStart(2,"0")}</span>{r}</div>
      )}
    </RuleBox>
    <RuleBox title="The Anchor Phrase — Memorise This" color={C.GOLD}>
      <div style={{ fontSize: 15, color: C.BRIGHT, lineHeight: 1.75, fontStyle: "italic" }}>"Our retainers range from $750 to $2,000 per month depending on the size and complexity of your operation. The retainer typically pays for itself from recovered revenue within the first 30 to 60 days. Would it help if I showed you the maths with your specific numbers?"</div>
    </RuleBox>
  </div>);
}

function PriceCard({ tier }) {
  const [open, setOpen] = useState(false);
  return (
    <Card color={tier.color} onClick={() => setOpen(!open)} style={tier.featured ? { background: `linear-gradient(135deg, ${C.NAVY}, ${C.SURF})`, border: `1px solid ${tier.color}40` } : {}}>
      <div style={{ padding: "16px" }}>
        {tier.featured && <Tag label="Most Common" color={C.RED} />}
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.BRIGHT, marginTop: tier.featured ? 8 : 0 }}>{tier.name}</div>
        <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
          <div><div style={{ fontSize: 10, color: C.DIM, fontWeight: 700, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>US</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: tier.color }}>{tier.us}</div><div style={{ fontSize: 11, color: C.DIM }}>Setup: {tier.setupUS}</div></div>
          <div><div style={{ fontSize: 10, color: C.DIM, fontWeight: 700, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>UK</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: tier.color }}>{tier.uk}</div><div style={{ fontSize: 11, color: C.DIM }}>Setup: {tier.setupUK}</div></div>
        </div>
        <div style={{ fontSize: 12, color: C.TEXT, marginTop: 8 }}>{tier.best}</div>
      </div>
      {open && <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "14px 16px", background: `${C.DARK}80` }}>
        <div style={{ fontSize: 12, color: C.TEXT, lineHeight: 1.7, marginBottom: 12 }}><b style={{ color: C.GREEN }}>Includes:</b> {tier.includes}</div>
        <div style={{ padding: "10px 14px", background: `${tier.color}08`, borderLeft: `2px solid ${tier.color}40`, fontSize: 14, color: C.BRIGHT, fontStyle: "italic", lineHeight: 1.7 }}>"{tier.howToSay}"</div>
      </div>}
    </Card>
  );
}

// ═══════════════════════════════════════
// TOOL 6: JARGON GLOSSARY
// ═══════════════════════════════════════
const jargon = [
  { cat: "US Real Estate", icon: "🏠", color: C.RED, terms: [
    { t: "Brokerage", d: "The company that holds the broker license. Agents work under it. The broker/owner is your buyer.", c: "Always pitch to the broker, not individual agents." },
    { t: "MLS / IDX", d: "MLS = shared listing database. IDX = system that puts MLS listings on websites and generates buyer leads.", c: "IDX leads need to flow into CRM automatically. Core integration." },
    { t: "GCI", d: "Gross Commission Income — total commission before splits. Key revenue metric.", c: "Use GCI for ROI calculations." },
    { t: "Sphere / SOI", d: "Sphere of Influence — past clients, friends, contacts who may refer business.", c: "Database reactivation targets the sphere. Your biggest ROI pitch." },
    { t: "Under Contract", d: "Accepted offer, not yet closed. Triggers your transaction hub automation.", c: "This stage fires inspection, finance, and closing deadline automations." },
    { t: "DBPR", d: "Florida agency licensing real estate agents. Use DBPR lookup to research prospect agent counts.", c: "Search DBPR before your first call to any Florida brokerage." },
    { t: "Split / Cap", d: "Split = commission division (agent/brokerage). Cap = max an agent pays per year.", c: "Know the difference. Broker's split portion is their revenue per deal." },
  ]},
  { cat: "UK Estate Agency", icon: "🇬🇧", color: C.GOLD, terms: [
    { t: "Instruction", d: "UK equivalent of a 'listing'. When a vendor chooses your agency to sell.", c: "Always say 'instruction' not 'listing' with UK agents." },
    { t: "Vendor", d: "The property seller. NEVER say 'seller' to a UK agent.", c: "Critical: always say 'vendor'. Using US terminology marks you as an outsider." },
    { t: "Applicant", d: "A registered potential buyer.", c: "Applicant response time is your key metric. Out-of-hours response is your core pitch." },
    { t: "SSTC", d: "Sold Subject to Contract — offer accepted, legal process ongoing.", c: "Triggers your conveyancing progression automation." },
    { t: "Fall-Through", d: "Sale collapses before completion. ~30% rate in UK.", c: "Your system reduces fall-throughs by flagging stalled transactions early." },
    { t: "Rightmove / Zoopla", d: "The UK property portals. Rightmove dominates (~80%).", c: "Portal response time is your entire UK pitch." },
  ]},
  { cat: "Aesthetics", icon: "💉", color: C.PURPLE, terms: [
    { t: "Injectables", d: "Botox (3–4 month cycle) and fillers (6–18 month cycle).", c: "Recall intervals: Botox 12–16 weeks, fillers 6–12 months." },
    { t: "Recall / Rebooking", d: "Contacting patients when due for next treatment. <40% return within 12 months.", c: "Automated recall is Kezia's core pitch." },
    { t: "Consultation", d: "Initial assessment. Many don't convert on the day.", c: "Your 21-day follow-up sequence converts the 'I'll think about it' patients." },
    { t: "Patient Journey", d: "Full cycle: enquiry → consultation → treatment → aftercare → recall → review.", c: "You build and manage the entire journey automation." },
    { t: "Pabau / Cliniko", d: "Main CRM platforms. Pabau dominates UK.", c: "Kezia should be expert-level in Pabau." },
  ]},
  { cat: "Mortgage", icon: "🏦", color: C.TEAL, terms: [
    { t: "Loan Officer (LO)", d: "Originates mortgage loans. Works with borrowers.", c: "LOs are end users. Brokers/branch managers are your buyers." },
    { t: "Pre-Approval", d: "Verified assessment with documentation. Stronger than pre-qual.", c: "Status updates should trigger notifications to referring realtor via bridge service." },
    { t: "Clear to Close (CTC)", d: "Underwriter approved. All conditions met. Green light.", c: "CTC notification to the realtor is one of the most valuable bridge automations." },
    { t: "LOS", d: "Loan Origination System (Encompass, Byte). NOT a CRM.", c: "Never touch the LOS. Your bridge reads from it and pushes notifications outward." },
  ]},
  { cat: "Home Services", icon: "🔧", color: C.AMBER, terms: [
    { t: "Maintenance Contract", d: "Annual contract for regular maintenance. Predictable recurring revenue.", c: "Automated recall converts one-time customers into contract holders. Core pitch." },
    { t: "Shoulder Season", d: "Slower periods between peak seasons (spring/fall for HVAC).", c: "Database reactivation during shoulder season fills the revenue gap." },
    { t: "ServiceTitan / Jobber", d: "Main field service platforms.", c: "Know which they're on. All integrate via Zapier." },
  ]},
  { cat: "PI Law", icon: "⚖️", color: C.RED, terms: [
    { t: "Intake", d: "Screening and signing new clients. Most critical PI function.", c: "Automated intake response is your #1 PI pitch. 7% conversion rate = 93% lost." },
    { t: "Contingency Fee", d: "Attorney fee = 33–40% of settlement. Only paid if they win.", c: "Average fee on car accident: ~$14,900. Use for ROI." },
    { t: "No-Show Rate", d: "20–40% of consultations don't show up.", c: "Automated reminders (24hr + 1hr SMS) dramatically reduce no-shows. Easy quick win." },
    { t: "Clio / Lawmatics", d: "Main legal CRM platforms.", c: "Most firms buy and never configure. Classic Gizmo opportunity." },
  ]},
  { cat: "Financial Advisory", icon: "📊", color: C.NAVY, terms: [
    { t: "AUM", d: "Assets Under Management. Primary revenue metric. Fee = 0.5–1.5% of AUM.", c: "ROI: retained AUM × fee rate = retained revenue." },
    { t: "RIA", d: "Registered Investment Advisor. Make their own tech decisions.", c: "RIAs are your target. They have CRM autonomy." },
    { t: "Great Wealth Transfer", d: "$50T+ transferring from Boomers to heirs.", c: "Heir engagement sequences are a powerful pitch." },
    { t: "Redtail / Wealthbox", d: "Main CRM platforms for independent advisors.", c: "Redtail: strong contacts, weak automation. Classic Gizmo opportunity." },
  ]},
];

function JargonGlossary() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const filtered = jargon.filter(j => activeCat === "all" || j.cat === activeCat).map(j => ({ ...j, terms: j.terms.filter(t => search === "" || t.t.toLowerCase().includes(search.toLowerCase()) || t.d.toLowerCase().includes(search.toLowerCase())) })).filter(j => j.terms.length > 0);
  return (<div>
    <SearchBox value={search} onChange={setSearch} placeholder="Search any term..." />
    <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
      <button onClick={() => setActiveCat("all")} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "6px 10px", border: `1px solid ${activeCat === "all" ? C.RED : C.BORD}`, background: activeCat === "all" ? `${C.RED}15` : "transparent", color: activeCat === "all" ? C.RED : C.DIM, cursor: "pointer" }}>All</button>
      {jargon.map(j => <button key={j.cat} onClick={() => setActiveCat(j.cat)} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "6px 10px", border: `1px solid ${activeCat === j.cat ? j.color : C.BORD}`, background: activeCat === j.cat ? `${j.color}15` : "transparent", color: activeCat === j.cat ? j.color : C.DIM, cursor: "pointer", whiteSpace: "nowrap" }}>{j.icon} {j.cat.split(" ")[0]}</button>)}
    </div>
    {filtered.map((j, i) => <div key={i} style={{ marginBottom: 16 }}><SectionHead text={`${j.icon} ${j.cat}`} color={j.color} />
      <div style={{ background: C.SURF, border: `1px solid ${C.BORD}`, borderTop: "none" }}>
        {j.terms.map((t, k) => <TermCard key={k} term={t} color={j.color} />)}
      </div>
    </div>)}
  </div>);
}

function TermCard({ term, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.BORD}`, cursor: "pointer", padding: open ? 0 : undefined }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 16px" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: C.BRIGHT, flex: 1 }}>{term.t}</div>
        <span style={{ fontSize: 11, color: C.DIM, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▶</span>
      </div>
      {open && <div style={{ padding: "0 16px 12px" }}>
        <div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.7, marginBottom: 6 }}>{term.d}</div>
        <div style={{ fontSize: 12, color, fontStyle: "italic", padding: "6px 10px", background: `${color}08`, borderLeft: `2px solid ${color}30`, lineHeight: 1.5 }}>💡 {term.c}</div>
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN APP SHELL
// ═══════════════════════════════════════
const tools = [
  { id: "crm", label: "CRM", icon: "🔗", component: CRMCheatSheet, title: "CRM Integration", subtitle: "Cheat Sheet" },
  { id: "obj", label: "Objections", icon: "🛡️", component: ObjectionHandler, title: "Objection", subtitle: "Handler" },
  { id: "roi", label: "ROI", icon: "📊", component: ROICalculator, title: "ROI", subtitle: "Calculator" },
  { id: "comp", label: "Competitors", icon: "⚔️", component: CompetitorComparison, title: "Competitor", subtitle: "Comparison" },
  { id: "price", label: "Pricing", icon: "💰", component: PricingReference, title: "Pricing", subtitle: "Quick Reference" },
  { id: "jargon", label: "Jargon", icon: "📖", component: JargonGlossary, title: "Industry Jargon", subtitle: "Glossary" },
];

export default function App() {
  const [active, setActive] = useState("crm");
  const tool = tools.find(t => t.id === active);
  const Component = tool.component;

  return (
    <div style={{ background: C.DARK, minHeight: "100vh", color: C.TEXT, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${C.DARK}; }
        input::placeholder { color: ${C.DIM}; }
        input[type=number]::-webkit-inner-spin-button { opacity: 1; }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.BORD}; }
      `}</style>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px 80px" }}>
        {/* Header */}
        <div style={{ padding: "24px 0 16px", borderBottom: `1px solid ${C.BORD}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: C.BRIGHT }}>GIZMO</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: C.RED }}>TOOLKIT</span>
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, color: C.BRIGHT, lineHeight: 1.1, letterSpacing: -0.5 }}>
            {tool.title} <span style={{ color: C.RED }}>{tool.subtitle}</span>
          </h1>
        </div>

        {/* Tool navigation */}
        <div style={{ display: "flex", gap: 4, padding: "12px 0", overflowX: "auto", borderBottom: `1px solid ${C.BORD}`, marginBottom: 16 }}>
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1,
              padding: "8px 12px", whiteSpace: "nowrap", cursor: "pointer",
              border: `1px solid ${active === t.id ? C.RED : C.BORD}`,
              background: active === t.id ? `${C.RED}15` : "transparent",
              color: active === t.id ? C.RED : C.DIM,
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Active tool */}
        <Component />

        {/* Footer */}
        <div style={{ marginTop: 32, textAlign: "center", padding: "16px 0", borderTop: `1px solid ${C.BORD}` }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 800, color: `${C.BRIGHT}15` }}>GIZMO</span>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 800, color: `${C.RED}25`, marginLeft: 6 }}>OPERATIONS</span>
          <div style={{ fontSize: 10, color: `${C.DIM}60`, marginTop: 4 }}>Internal Sales Toolkit · Not for distribution</div>
        </div>
      </div>
    </div>
  );
}
