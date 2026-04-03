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
// TOOL 1: VERTICAL PLAYBOOKS
// ═══════════════════════════════════════
const playbooks = [
  {
    id: "re", icon: "🏠", name: "US Real Estate", color: C.RED,
    idealClient: "Independent brokerage, 5–50 agents, owner is also producing agent. Using 2–3 tools simultaneously. Frustrated with lead fall-through.",
    painPoints: [
      "Leads from Zillow/Realtor.com going cold before anyone responds",
      "New agents take weeks to onboard onto systems",
      "Owner has no visibility into what's actually happening in the pipeline",
      "Past client database sitting dormant — no systematic follow-up",
      "Can't send Buyer Agreements from phone in the field",
      "Using BoldTrail, Follow Up Boss, AND AppFiles simultaneously",
    ],
    openingQuestions: [
      "How many leads do you get through Zillow or Realtor.com each month?",
      "What happens when a lead comes in at 11pm on a Saturday?",
      "When did someone last audit which of your automations are actually running?",
      "What's your average response time to a new inbound lead?",
      "How long does it take to onboard a new agent onto your systems?",
      "What CRMs are you currently paying for — and how many are you actually using?",
    ],
    killerStats: [
      { s: "78%", t: "of buyers go with the first agent to respond" },
      { s: "42 hrs", t: "average industry response time" },
      { s: "391%", t: "higher conversion if you respond within 60 seconds" },
      { s: "50%", t: "of CRM implementations fail within 90 days" },
      { s: "$9,108", t: "average US commission — one recovered deal pays for months" },
    ],
    bridge: "Every real estate client is also a mortgage opportunity. One conversation, two retainers. Position the bridge service: your agent gets notified of every milestone, their LO gets automatic status updates. Both sides win.",
    closingMove: "Run the free 30-min demo. Show the 60-second lead response live. Let them see it fire on their phone. That closes faster than any pitch.",
    watchOut: "KW agents — avoid. Closed ecosystem, no integration possible. eXp agents get a free CRM. Hard to sell against free.",
  },
  {
    id: "uk", icon: "🇬🇧", name: "UK Estate Agency", color: C.GOLD,
    idealClient: "Independent estate agency, 1–5 branches, owner-operated. On Rightmove and Zoopla. Frustrated with out-of-hours enquiry loss.",
    painPoints: [
      "Rightmove enquiries coming in at 9pm going unanswered until 9am",
      "30% fall-through rate with no early warning system",
      "Vendor updates being done manually by negotiators",
      "No systematic applicant follow-up after viewings",
      "Multiple Rightmove and Zoopla portals not consolidated",
      "No recall system for past vendors or applicants",
    ],
    openingQuestions: [
      "How many Rightmove enquiries do you get per month?",
      "What happens to enquiries that come in after 5:30pm?",
      "How do you keep vendors updated on progression?",
      "What's your current fall-through rate?",
      "Do you have a system for re-engaging past applicants?",
      "How long does it take a new negotiator to get up to speed on your systems?",
    ],
    killerStats: [
      { s: "42%", t: "of UK enquiries arrive outside office hours" },
      { s: "30%", t: "of UK sales fall through — early warning reduces this" },
      { s: "£8,500", t: "average fee per sale — one recovered sale = months of retainer" },
      { s: "76%", t: "of CRM features go unused by UK estate agency teams" },
    ],
    bridge: "UK estate agencies often refer mortgage brokers. Build the bridge: your agency gets a referral trigger automation, the broker gets automatic application status updates. Both pay retainers.",
    closingMove: "Show them the out-of-hours enquiry response live. Fire a test Rightmove enquiry after hours and show them the automated response landing in 60 seconds. That's the close.",
    watchOut: "Reapit agencies — API exists but complex. Scope carefully. Countrywide/Connells franchises — can't make their own tech decisions. Target independents only.",
  },
  {
    id: "aes", icon: "💉", name: "Aesthetics & Medical", color: C.PURPLE,
    idealClient: "Independent aesthetics clinic or medical spa, 1–3 practitioners. Kezia's primary vertical. Using Pabau or Cliniko. Frustrated with no-shows and lapsed patients.",
    painPoints: [
      "Patients booked for Botox 4 months ago never coming back",
      "20–40% no-show rate on consultations",
      "Enquiries from Instagram/Facebook going cold",
      "No system for requesting reviews after treatment",
      "Consultation leads who said 'I'll think about it' never followed up",
      "No recall system — purely reactive rebooking",
    ],
    openingQuestions: [
      "What percentage of your Botox patients rebook within 16 weeks?",
      "What happens when someone enquires via Instagram at 10pm?",
      "How do you follow up with consultation leads who don't convert on the day?",
      "When did you last run a reactivation campaign to lapsed patients?",
      "What's your current no-show rate for consultations?",
      "How many patients do you have in your database right now?",
    ],
    killerStats: [
      { s: "<40%", t: "of aesthetics patients return within 12 months without recall" },
      { s: "16 wks", t: "optimal Botox recall interval — almost no clinics hit this systematically" },
      { s: "30%", t: "revenue uplift from systematic recall programmes" },
      { s: "391%", t: "higher enquiry conversion within 60 seconds" },
    ],
    bridge: "Aesthetics clinics often refer clients to other wellness/beauty services. Build referral partner sequences into the system. Every referred client gets a welcome automation.",
    closingMove: "Show the patient journey automation end to end: enquiry → consultation booking → 21-day follow-up → treatment → aftercare → 12-week recall. Draw it on screen. They've never seen it visualised.",
    watchOut: "NHS clinics — heavily regulated, procurement is slow. Target private-pay clinics only. Avoid large franchise chains — they have mandated systems.",
  },
  {
    id: "mort", icon: "🏦", name: "Mortgage Broker", color: C.TEAL,
    idealClient: "Independent mortgage broker or small brokerage, 2–15 LOs. Has a referral relationship with at least one real estate agent. Frustrated with referral partner communication.",
    painPoints: [
      "Realtor partners not knowing where their client's loan stands",
      "Pre-approval leads going cold before follow-up",
      "No systematic referral partner nurture sequence",
      "Status updates being sent manually by LOs",
      "Past borrowers not being re-engaged at renewal time",
      "Leads from online applications sitting uncontacted for hours",
    ],
    openingQuestions: [
      "How many real estate agents are actively referring you right now?",
      "How do you keep referring agents updated on their client's loan status?",
      "What happens to a web lead that comes in on a Sunday afternoon?",
      "How do you stay in touch with past borrowers as their rate approaches renewal?",
      "How many LOs do you have and how do they manage their own pipelines?",
    ],
    killerStats: [
      { s: "70%", t: "of mortgage leads come from referral partners" },
      { s: "391%", t: "higher conversion if responded to within 60 seconds" },
      { s: "5–7x", t: "cheaper to re-engage a past borrower than acquire a new one" },
    ],
    bridge: "THIS IS THE BRIDGE PLAY. One sales call → two clients. If you're already talking to a real estate brokerage, bring the mortgage broker in as the sister retainer. Both get the bridge service. Realtor gets automatic loan status updates. Broker gets automatic referral sequences. High switching cost on both sides.",
    closingMove: "Draw the bridge on screen: Realtor sends client → LO gets lead → CTC fires notification back to realtor → realtor thanks broker → referral sequence re-engages the agent. They've never had this.",
    watchOut: "Never touch the LOS (Encompass, Byte). Your bridge reads from it and pushes outward. Never position as a replacement for their LOS — you work alongside it.",
  },
  {
    id: "hs", icon: "🔧", name: "Home Services", color: C.AMBER,
    idealClient: "HVAC, plumbing, electrical, or landscaping company. 3–20 technicians. On ServiceTitan or Jobber. Frustrated with seasonal revenue gaps and repeat customer loss.",
    painPoints: [
      "No system to re-engage past customers before competitors do",
      "One-time jobs not converting to maintenance contracts",
      "Shoulder season revenue gaps with no proactive outreach",
      "Review requests being done manually (or not at all)",
      "New job enquiries sitting unresponded during busy periods",
      "No visibility into which technicians are performing best",
    ],
    openingQuestions: [
      "How many past customers do you have in your database?",
      "What percentage of one-time jobs convert to maintenance contracts?",
      "How do you keep busy during shoulder season?",
      "What's your process for asking customers for reviews after a job?",
      "How quickly does someone respond to a new web enquiry?",
    ],
    killerStats: [
      { s: "5x", t: "cheaper to retain a customer than acquire a new one" },
      { s: "10%", t: "database reactivation rate = significant seasonal revenue" },
      { s: "78%", t: "of customers who get a fast response choose that provider" },
    ],
    bridge: "Home services clients often work alongside real estate agents (pre-sale repairs, new homeowner services). Build the referral sequence: real estate agent refers new homeowner → home services company gets an automatic introduction email.",
    closingMove: "Calculate the database reactivation number live: take their past customer count, apply 10% reactivation rate, multiply by maintenance contract value. Show them the number. Let the maths close it.",
    watchOut: "ServiceTitan is complex — scope the integration carefully. Avoid very small operators (1–2 person) — they won't have the volume to justify the retainer.",
  },
  {
    id: "pi", icon: "⚖️", name: "PI Law", color: C.RED,
    idealClient: "Personal injury law firm, 2–10 attorneys. High volume of inbound enquiries. Frustrated with intake conversion and no-show rates.",
    painPoints: [
      "Web and referral leads sitting uncontacted for hours",
      "20–40% consultation no-show rate costing thousands per month",
      "No systematic follow-up for leads who don't sign immediately",
      "Referral partners (doctors, chiropractors) not being nurtured",
      "Past clients not being asked for referrals systematically",
      "No visibility into which intake sources convert best",
    ],
    openingQuestions: [
      "What's your current intake-to-signed rate from inbound enquiries?",
      "How quickly does someone respond to a web enquiry at 8pm?",
      "What's your no-show rate for initial consultations?",
      "How do you nurture leads who don't sign on the first call?",
      "How do you stay in touch with referral partners — doctors, chiropractors?",
    ],
    killerStats: [
      { s: "7%", t: "average PI law firm intake conversion — 93% lost" },
      { s: "$14,900", t: "average attorney fee on car accident case" },
      { s: "40%", t: "consultation no-show rate without automated reminders" },
      { s: "391%", t: "higher conversion with sub-60-second response" },
    ],
    bridge: "PI firms get referrals from medical providers (chiropractors, urgent care). Build the referral partner sequence: provider refers patient → firm sends thank you + case update automation → provider stays in the loop → referrals increase.",
    closingMove: "Calculate the no-show recovery: if they see 50 consultations/month at 30% no-show rate, that's 15 lost. Automated reminders recover 50% = 7–8 extra signed clients/month at $14,900 = over $100K/year. Show that number.",
    watchOut: "Large firms (50+ attorneys) have in-house operations teams. Target mid-size firms. Avoid firms using Filevine as their primary system — deeply embedded and hard to bridge.",
  },
  {
    id: "fin", icon: "📊", name: "Financial Advisory", color: C.NAVY,
    idealClient: "Independent RIA or fee-based financial advisor, 1–5 advisors. $50M–$500M AUM. Frustrated with client retention and referral consistency.",
    painPoints: [
      "No systematic outreach to clients during market volatility",
      "Heir relationships not being built while client is still alive",
      "Referral partners (accountants, estate attorneys) not being nurtured",
      "Annual reviews being scheduled manually with no automation",
      "Prospect follow-up sequences non-existent",
      "No system to capture referrals from happy clients",
    ],
    openingQuestions: [
      "How do you typically reach out to clients during a market correction?",
      "Do you have a system for building relationships with your clients' adult children?",
      "How many accountants or estate attorneys are actively referring to you?",
      "How do you follow up with prospects who attend your seminars or webinars?",
      "What's your current client review scheduling process?",
    ],
    killerStats: [
      { s: "$50T+", t: "Great Wealth Transfer underway — heir relationships are critical" },
      { s: "1.0%", t: "of AUM average advisory fee — every retained client matters" },
      { s: "5x", t: "cheaper to retain a client than acquire a new one" },
      { s: "70%", t: "of heirs fire their parents' financial advisor" },
    ],
    bridge: "Financial advisors work alongside estate attorneys and accountants. Build the referral partner sequence: advisor refers client to attorney → attorney sends thank you + refers back → automated nurture keeps both relationships warm.",
    closingMove: "AUM retention is the angle: if they have $100M AUM at 1% = $1M revenue. Losing 5% of clients to heir transitions = $50K lost. Your system builds heir relationships systematically. Frame it as protecting their book.",
    watchOut: "Compliance-heavy environment. Never claim to automate anything client-facing without checking their compliance requirements. Position automation as relationship maintenance, not advice delivery.",
  },
];

function VerticalPlaybooks() {
  const [active, setActive] = useState("re");
  const [tab, setTab] = useState("pain");
  const pb = playbooks.find(p => p.id === active);

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {playbooks.map(p => (
          <button key={p.id} onClick={() => { setActive(p.id); setTab("pain"); }} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "7px 10px", border: `1px solid ${active === p.id ? p.color : C.BORD}`, background: active === p.id ? `${p.color}15` : "transparent", color: active === p.id ? p.color : C.DIM, cursor: "pointer", whiteSpace: "nowrap" }}>
            {p.icon} {p.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div style={{ background: C.SURF, border: `1px solid ${C.BORD}`, borderLeft: `3px solid ${pb.color}`, padding: "16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: pb.color, marginBottom: 6 }}>Ideal Client</div>
        <div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.7 }}>{pb.idealClient}</div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          { k: "pain", l: "Pain Points" },
          { k: "questions", l: "Opening Qs" },
          { k: "stats", l: "Key Stats" },
          { k: "bridge", l: "Bridge Play" },
          { k: "close", l: "Close" },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "6px 10px", border: `1px solid ${tab === t.k ? pb.color : C.BORD}`, background: tab === t.k ? `${pb.color}15` : "transparent", color: tab === t.k ? pb.color : C.DIM, cursor: "pointer" }}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === "pain" && (
        <div style={{ background: C.SURF, border: `1px solid ${C.BORD}`, padding: "16px" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.RED, marginBottom: 12 }}>Pain Points — Listen for These</div>
          {pb.painPoints.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: C.RED, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6 }}>{p}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "questions" && (
        <div style={{ background: C.SURF, border: `1px solid ${C.BORD}`, padding: "16px" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.TEAL, marginBottom: 12 }}>Opening Questions — Use These to Surface Pain</div>
          {pb.openingQuestions.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start", padding: "10px 14px", background: `${C.TEAL}08`, borderLeft: `2px solid ${C.TEAL}30` }}>
              <span style={{ color: C.TEAL, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>Q{i + 1}</span>
              <span style={{ fontSize: 13, color: C.BRIGHT, lineHeight: 1.6, fontStyle: "italic" }}>"{q}"</span>
            </div>
          ))}
        </div>
      )}

      {tab === "stats" && (
        <div style={{ background: C.SURF, border: `1px solid ${C.BORD}`, padding: "16px" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.GOLD, marginBottom: 12 }}>Stats to Drop in Conversation</div>
          {pb.killerStats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12, padding: "12px 14px", background: `${C.DARK}60`, border: `1px solid ${C.BORD}` }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: pb.color, minWidth: 60, textAlign: "right", flexShrink: 0 }}>{s.s}</span>
              <span style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.5 }}>{s.t}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "bridge" && (
        <div>
          <div style={{ padding: "16px", background: `${C.GOLD}08`, border: `1px solid ${C.GOLD}30`, borderLeft: `3px solid ${C.GOLD}`, marginBottom: 12 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.GOLD, marginBottom: 10 }}>🌉 The Bridge Play — Two Clients from One Conversation</div>
            <div style={{ fontSize: 14, color: C.BRIGHT, lineHeight: 1.75 }}>{pb.bridge}</div>
          </div>
          <div style={{ padding: "14px", background: `${C.RED}08`, border: `1px solid ${C.RED}30`, borderLeft: `3px solid ${C.RED}` }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.RED, marginBottom: 8 }}>Watch Out</div>
            <div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6 }}>{pb.watchOut}</div>
          </div>
        </div>
      )}

      {tab === "close" && (
        <div style={{ padding: "16px", background: `${C.GREEN}08`, border: `1px solid ${C.GREEN}30`, borderLeft: `3px solid ${C.GREEN}` }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.GREEN, marginBottom: 10 }}>🎯 The Closing Move</div>
          <div style={{ fontSize: 14, color: C.BRIGHT, lineHeight: 1.75 }}>{pb.closingMove}</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// TOOL 2: CRM CHEAT SHEET
// ═══════════════════════════════════════
const crmData = [
  { cat: "Real Estate", crms: [
    { name: "GoHighLevel (GHL)", level: "green", verdict: "YES — your home turf", zapier: true, api: true, notes: "Your primary build platform. Native webhooks, full API, Zapier via LeadConnector." },
    { name: "Follow Up Boss", level: "green", verdict: "YES — managed service on top", zapier: true, api: true, notes: "250+ integrations, excellent Zapier. Very popular with US teams. Position Gizmo as the operational layer that makes it actually work." },
    { name: "BoldTrail (kvCORE)", level: "amber", verdict: "YES — managed service on top", zapier: true, api: true, notes: "Heavy platform. Most agents use 20% of it. Position as: we make the 80% they're paying for actually work. Gizmo CRM can also replace it entirely for agents who want simplicity." },
    { name: "Chime", level: "amber", verdict: "YES with scoping", zapier: true, api: true, notes: "API available, Zapier exists. Position as enhancement, not replacement." },
    { name: "BoomTown", level: "amber", verdict: "YES but limited bridge", zapier: true, api: true, notes: "API and Zapier available. Focus on the operational layer they don't cover." },
    { name: "CINC", level: "amber", verdict: "YES with Zapier", zapier: true, api: false, notes: "Zapier via webhooks. No direct public API." },
    { name: "KW Command", level: "red", verdict: "AVOID — mandated CRM", zapier: false, api: false, notes: "Closed ecosystem. KW agents required to use it. Do NOT target KW brokerages." },
    { name: "eXp Realty (Cloze)", level: "red", verdict: "AVOID — free CRM", zapier: false, api: false, notes: "eXp provides CRM free. Hard to justify managed service when baseline is zero." },
    { name: "AppFiles", level: "green", verdict: "YES — we replace this", zapier: false, api: true, notes: "Transaction management and document storage. Gizmo replaces this with native document templates, mobile send flow, and e-signature. Key pitch: agents can send Buyer Agreements from their phone in 60 seconds." },
    { name: "Salesforce", level: "green", verdict: "YES — huge opportunity", zapier: true, api: true, notes: "Full API, excellent Zapier. Many brokerages pay $150/user and use 10% of it." },
    { name: "HubSpot", level: "green", verdict: "YES — excellent", zapier: true, api: true, notes: "Best-in-class API and Zapier. Free tier means many have it but never configured it." },
  ]},
  { cat: "UK Estate Agency", crms: [
    { name: "Reapit (Foundations)", level: "amber", verdict: "YES with scoping", zapier: false, api: true, notes: "Open API. No native Zapier. Integration requires API work or Make." },
    { name: "Jupix", level: "amber", verdict: "YES but limited", zapier: false, api: true, notes: "API available but limited. May need GHL alongside for automation." },
    { name: "Alto (Zoopla)", level: "amber", verdict: "YES — scope carefully", zapier: false, api: true, notes: "API exists but Zoopla-ecosystem focused." },
  ]},
  { cat: "Aesthetics", crms: [
    { name: "Pabau", level: "amber", verdict: "YES — core aesthetics CRM", zapier: true, api: true, notes: "UK's leading aesthetics CRM. Zapier + API. Know this inside out for aesthetics pitches." },
    { name: "Cliniko", level: "green", verdict: "YES — good integration", zapier: true, api: true, notes: "Strong API and Zapier. Popular UK/Australia." },
    { name: "Jane App", level: "green", verdict: "YES — good integration", zapier: true, api: true, notes: "Popular practice management. Good Zapier and API." },
  ]},
  { cat: "Mortgage", crms: [
    { name: "Encompass (ICE)", level: "red", verdict: "Bridge only — never manage", zapier: false, api: true, notes: "LOS not CRM. Don't manage it. Your bridge service READS status and PUSHES updates outward." },
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
    { name: "Redtail CRM", level: "amber", verdict: "YES — core advisory CRM", zapier: true, api: true, notes: "Most widely used in independent advisory. Strong contacts, weak automation. Classic Gizmo opportunity." },
    { name: "Wealthbox", level: "green", verdict: "YES — good", zapier: true, api: true, notes: "Growing RIA-focused. Clean interface, good API and Zapier." },
  ]},
];

function CRMCheatSheet() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = crmData.map(cat => ({ ...cat, crms: cat.crms.filter(c => (filter === "all" || c.level === filter) && (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))) })).filter(cat => cat.crms.length > 0);
  const totals = { green: crmData.flatMap(c => c.crms).filter(c => c.level === "green").length, amber: crmData.flatMap(c => c.crms).filter(c => c.level === "amber").length, red: crmData.flatMap(c => c.crms).filter(c => c.level === "red").length };

  return (
    <div>
      <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
        <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.GREEN }}>{totals.green}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Say YES</span></div>
        <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.AMBER }}>{totals.amber}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Scope it</span></div>
        <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.RED }}>{totals.red}</span><span style={{ fontSize: 11, color: C.DIM, marginLeft: 6 }}>Avoid</span></div>
      </div>
      <SearchBox value={search} onChange={setSearch} placeholder="Search CRM or platform..." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {[{ k: "all", l: "All", c: C.TEXT }, { k: "green", l: "Easy YES", c: C.GREEN }, { k: "amber", l: "Scope It", c: C.AMBER }, { k: "red", l: "Avoid", c: C.RED }].map(f =>
          <button key={f.k} onClick={() => setFilter(f.k)} style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "7px 12px", border: `1px solid ${filter === f.k ? f.c : C.BORD}`, background: filter === f.k ? `${f.c}15` : "transparent", color: filter === f.k ? f.c : C.DIM, cursor: "pointer" }}>{f.l}</button>
        )}
      </div>
      {filtered.map((cat, i) => <div key={i}><SectionHead text={cat.cat} />{cat.crms.map((crm, j) => <CRMCard key={j} crm={crm} />)}</div>)}
      <RuleBox title="Quick Phrases" color={C.GOLD}>
        {[
          { q: "GREEN platform:", a: "\"We work with that regularly. We'd connect your existing system to our automation layer — or migrate you to the Gizmo CRM if you want to simplify.\"" },
          { q: "AMBER platform:", a: "\"Yes, we can work with that. I'll scope the integration as part of the free demo.\"" },
          { q: "RED platform:", a: "\"I want to be upfront — that has some integration limitations. Let me understand your setup better before I commit.\"" },
          { q: "No CRM yet:", a: "\"That's the easiest scenario. We build your entire system on the Gizmo CRM from scratch. Operational in 14 days.\"" },
          { q: "AppFiles / doc tools:", a: "\"Gizmo replaces that entirely. You'll be able to send a Buyer Agreement from your phone in under 60 seconds.\"" },
        ].map((item, i) => <div key={i} style={{ marginBottom: 12 }}><div style={{ fontSize: 11, color: C.GOLD, fontWeight: 600, marginBottom: 3 }}>{item.q}</div><div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6, fontStyle: "italic" }}>{item.a}</div></div>)}
      </RuleBox>
    </div>
  );
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
// TOOL 3: OBJECTION HANDLER
// ═══════════════════════════════════════
const objections = [
  { cat: "Price & Budget", color: C.RED, items: [
    { q: "It's too expensive.", freq: "Very Common", a: "Let me show you the maths: if your average deal is worth $9,000 and we recover even 3 extra deals this year, that's $27,000 against a $9,000–$18,000 annual retainer. The question isn't whether you can afford it — it's whether you can afford to keep losing those deals.", follow: "Would it help if I showed you exactly how many leads your current system is missing?", rule: "Reframe price as ROI. Never defend the price — attack the cost of inaction." },
    { q: "We don't have the budget right now.", freq: "Common", a: "Totally fair. What's your average deal value? Most clients find the retainer pays for itself within 30–60 days. But I respect that timing matters.", follow: "Would it make sense to start with the free 14-day CRM trial now so you can see the system, and revisit managed services next quarter?", rule: "Offer the CRM trial as a lower-commitment entry point. Plant the managed services seed." },
    { q: "Can you do it cheaper?", freq: "Common", a: "I could reduce scope — but I wouldn't want to give you a half-built system. What I can offer is founding client pricing — locked in permanently as our rates increase. You get full service at launch rates.", follow: "Does the founding client offer change the equation?", rule: "Never discount the retainer. Offer founding pricing — permanent rate lock." },
    { q: "Someone on Fiverr can do this cheaper.", freq: "Occasional", a: "For a one-time build, that might work. But who monitors automations next month? Who onboards your new hire? Who sends you the report showing which leads converted? The setup is 20% of the value. Ongoing management is the other 80%.", follow: "Have you tried outsourcing this before?", rule: "Don't compete on setup price. Compete on ongoing outcomes." },
    { q: "I just want the CRM, not the managed service.", freq: "Common", a: "Perfect — we have a self-serve option. The Gizmo CRM starts at $49/month, 14-day free trial, no credit card. You get full access and run it yourself. Most clients start there and add managed services once they see what's possible.", follow: "Want me to send you the trial link right now?", rule: "Self-serve is a legitimate path. Don't push managed services if they're not ready." },
  ]},
  { cat: "\"I Can Do It Myself\"", color: C.GOLD, items: [
    { q: "Why can't I just do this myself?", freq: "Very Common", a: "You absolutely could — if you had 10–15 hours a week of dedicated operational time. The reason 50% of CRM implementations fail isn't that business owners aren't smart enough — it's that they don't have the time. You run the business. We run the system behind it.", follow: "What percentage of your CRM features do you think your team uses today?", rule: "Never make them feel incapable. Position as time-and-expertise multiplication." },
    { q: "We already have someone handling our CRM.", freq: "Common", a: "That's great. Is that their full-time role, or alongside other responsibilities? Having a dedicated external team frees that person up to focus on what they were hired to do.", follow: "Would it be worth a free demo to see if there are gaps?", rule: "Don't attack their internal person. Position as support, not replacement." },
    { q: "Our CRM already has automation built in.", freq: "Common", a: "It does — and that's exactly the problem we solve. 76% of sales teams don't use most features. The automation exists. But someone has to build, configure, test, train, and maintain it. That's not a software problem — it's an operational one.", follow: "When was the last time someone audited which automations are actually running?", rule: "Agree. Then pivot to the gap between having features and using them." },
  ]},
  { cat: "Competitor Objections", color: C.TEAL, items: [
    { q: "We already use BoldTrail.", freq: "Very Common", a: "BoldTrail is a great platform. Most teams use about 20% of what it can do. We're not a replacement — we're the operational layer that makes the other 80% actually work. Or if you want to simplify, the Gizmo CRM does everything BoldTrail does for CRM at a fraction of the cost.", follow: "What features of BoldTrail are you actually using day to day?", rule: "Never attack BoldTrail. Position alongside or as a simpler alternative." },
    { q: "We use Follow Up Boss.", freq: "Common", a: "Follow Up Boss is excellent for contact management. We work with it all the time. Gizmo is the managed service layer on top — we build and run the automations, sequences, and reporting that FUB is capable of but nobody has time to configure.", follow: "Who set up your current Follow Up Boss automations?", rule: "FUB is a partner, not a competitor. Sell the management layer on top." },
    { q: "We already pay for AppFiles.", freq: "Common", a: "AppFiles is fine for desktop document management. But can you send a Buyer Agreement from your phone in under 60 seconds? That's what we've built. One tap — contact, template, send. Signed document back in your CRM automatically.", follow: "What's your current process for sending documents when you're in the field?", rule: "The mobile send flow is the killer differentiator against AppFiles." },
    { q: "I can just use HubSpot / Salesforce free tier.", freq: "Occasional", a: "The free tier is a great starting point. Most businesses on the free tier use about 5% of what's available. We configure the full system — paid or free tier — and manage it ongoing. You get the results the software promises.", follow: "When was your HubSpot last properly configured?", rule: "Free CRM + Gizmo management is a legitimate and powerful pitch." },
  ]},
  { cat: "Trust & Credibility", color: C.TEAL, items: [
    { q: "You're a new company.", freq: "Very Common", a: "Fair question. We're new as a company, but the methodology isn't. Businesses that respond within 60 seconds convert at 391% higher rates. These aren't our numbers — they're industry research. That's why we offer founding client pricing — you get a permanent rate lock, we get a case study at 90 days.", follow: "Would it help if I showed you the system live?", rule: "Don't apologise for being new. Lean into the data. Founding pricing turns it into an advantage." },
    { q: "Can I speak to a current client?", freq: "Common", a: "Not yet — we're onboarding founding clients right now. What I can do is show you the live demo and let you test the automations yourself. And at 90 days, you'll be the reference I point future clients to.", follow: "Let me show you the demo — would 20 minutes this week work?", rule: "Be honest. Turn the gap into an opportunity — they get to be first." },
    { q: "What if I want to cancel?", freq: "Common", a: "Month-to-month. No long-term contract. You keep everything we built — every automation, dashboard, sequence. It's all yours. I'd rather earn your business every month than lock you in.", follow: "Does month-to-month work for you?", rule: "Remove all risk. Month-to-month is a strength, not a weakness." },
  ]},
  { cat: "Timing", color: C.GREEN, items: [
    { q: "We're too busy right now.", freq: "Very Common", a: "Being busy is exactly when you need this most — that's when leads fall through the cracks. The 42-hour average response time doesn't pause because you're busy.", follow: "What if we started with just the free demo — 30 minutes, no commitment?", rule: "Show that busy IS the problem the service solves." },
    { q: "I need to think about it.", freq: "Very Common", a: "Of course. Can I ask — what specifically do you want to think through? Is it pricing, scope, or something else? I'd rather address it now than have it sit unanswered.", follow: "Would it help if I sent the proposal with the specific ROI numbers for your business?", rule: "Never accept without asking what they need to think about. The real objection is hiding." },
    { q: "We just changed CRM systems.", freq: "Occasional", a: "That's actually one of the best times to bring us in. The first 90 days is when adoption either succeeds or fails — 50% fail in that window. We make sure yours doesn't.", follow: "Which system did you move to? I can tell you exactly where most businesses get stuck.", rule: "New CRM is an opportunity, not a blocker." },
  ]},
  { cat: "Scope & Fit", color: C.PURPLE, items: [
    { q: "We're too small for this.", freq: "Common", a: "Our CRM self-serve tier starts at $49/month. Our managed Starter tier is $750/month. We work with solo operators and small teams. The Starter tier is designed exactly for businesses your size.", follow: "How many leads do you get per month?", rule: "Small businesses are the core market. Lead with the $49 CRM if budget is tight." },
    { q: "We don't really use our CRM.", freq: "Very Common", a: "That's exactly why we exist. 76% of teams don't use most features. We build the system around how your team actually works and manage everything so adoption is automatic.", follow: "What would change if every lead got a response within 60 seconds, 24/7?", rule: "Low CRM usage is your #1 buying signal, not a disqualifier." },
    { q: "I just want the software, not the service.", freq: "Common", a: "Absolutely — start with the free 14-day trial of the Gizmo CRM. No credit card. Full access. If you want help setting it up or want us to run it, that option is always there.", follow: "I'll send you the trial link now.", rule: "Always have the self-serve option ready. It's the lowest-friction entry point." },
  ]},
  { cat: "The Hard Ones", color: C.RED, items: [
    { q: "My business is different.", freq: "Common", a: "Every business feels unique. But operationally, every relationship-driven business faces the same four failures: slow lead response, poor CRM adoption, no systematic follow-up, and no owner visibility. The framework works across all of them.", follow: "What's the one operational thing that keeps you up at night?", rule: "Validate their uniqueness. Then show the universal pattern." },
    { q: "I had a bad experience before.", freq: "Occasional", a: "I'm sorry to hear that. That's why we structured Gizmo differently — month-to-month, ongoing management, monthly reporting, and a 14-day free trial before you commit to anything. Our business model depends on your results month after month.", follow: "Would you share what went wrong? I want to make sure we don't repeat it.", rule: "Don't dismiss it. Show how Gizmo is structurally different." },
    { q: "I need to check with my partner.", freq: "Very Common", a: "Absolutely. Would it be helpful if I joined a quick call with both of you? A 15-minute conversation removes weeks of back-and-forth.", follow: "When are you next speaking with them?", rule: "Always offer to join the second conversation." },
  ]},
];

function ObjectionHandler() {
  const [search, setSearch] = useState("");
  const filtered = objections.map(cat => ({ ...cat, items: cat.items.filter(item => search === "" || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())) })).filter(cat => cat.items.length > 0);
  return (
    <div>
      <SearchBox value={search} onChange={setSearch} placeholder="Search objections..." />
      {filtered.map((cat, i) => <div key={i} style={{ marginBottom: 20 }}><SectionHead text={cat.cat} color={cat.color} />{cat.items.map((item, j) => <ObjectionCard key={j} item={item} color={cat.color} />)}</div>)}
      <RuleBox title="Golden Rules" color={C.RED}>
        {["Never argue. Acknowledge, then redirect.", "The real objection is rarely the first one stated.", "Always have a next step ready — trial, demo, or proposal.", "Price objections are ROI objections in disguise.", "'I need to think about it' means you haven't found the real concern.", "Month-to-month and free trial remove every risk objection.", "Self-serve CRM at $49 is your lowest-friction entry point."].map((r, i) =>
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: C.TEXT, lineHeight: 1.5 }}><span style={{ color: C.RED, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13 }}>{String(i + 1).padStart(2, "0")}</span>{r}</div>
        )}
      </RuleBox>
    </div>
  );
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
// TOOL 4: ROI CALCULATOR
// ═══════════════════════════════════════
const verticals = [
  { id: "re", name: "US Real Estate", icon: "🏠", color: C.RED,
    fields: [{ k: "avgDeal", l: "Avg commission ($)", d: 9108 }, { k: "leadsPerMonth", l: "Leads per month", d: 50 }, { k: "retainer", l: "Gizmo retainer ($/mo)", d: 1000 }],
    calc: v => { const lost = Math.round(v.leadsPerMonth * 0.51); const recovered = Math.round(v.leadsPerMonth * 0.1 * 10) / 10; const rev = Math.round(recovered * v.avgDeal); const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Leads uncontacted/mo", v: lost, c: C.RED }, { l: "Deals recovered/mo", v: recovered, c: C.AMBER }, { l: "Revenue recovered/mo", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual recovery", v: `$${annual.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `With ${v.leadsPerMonth} leads/month, ~${lost} go uncontacted. Recovering 10% = ${recovered} extra deals at $${v.avgDeal.toLocaleString()} = $${rev.toLocaleString()}/month against a $${v.retainer.toLocaleString()} retainer.` }; }
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
    calc: v => { const current = Math.round(v.enquiries * v.convRate / 100); const improved = Math.round(v.enquiries * (v.convRate + 11) / 100); const extra = improved - current; const rev = extra * v.avgFee; const annual = rev * 12; const cost = v.retainer * 12; return { stats: [{ l: "Current clients/mo", v: current, c: C.TEXT }, { l: "Projected clients/mo", v: improved, c: C.GREEN }, { l: "Additional revenue/mo", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((annual - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `Improving conversion from ${v.convRate}% to ${v.convRate + 11}% = ${extra} additional clients/month at $${v.avgFee.toLocaleString()} = $${rev.toLocaleString()}/month.` }; }
  },
  { id: "hs", name: "Home Services", icon: "🔧", color: C.AMBER,
    fields: [{ k: "customers", l: "Past customers", d: 500 }, { k: "contractVal", l: "Maintenance contract ($/yr)", d: 300 }, { k: "retainer", l: "Retainer ($/mo)", d: 750 }],
    calc: v => { const extra = Math.round(v.customers * 0.1); const rev = extra * v.contractVal; const cost = v.retainer * 12; return { stats: [{ l: "Additional contracts/yr", v: extra, c: C.AMBER }, { l: "Annual contract revenue", v: `$${rev.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((rev - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `10% recall improvement on ${v.customers} customers = ${extra} maintenance contracts at $${v.contractVal}/yr = $${rev.toLocaleString()} annual revenue.` }; }
  },
  { id: "fin", name: "Financial Advisory", icon: "📊", color: C.NAVY,
    fields: [{ k: "aum", l: "AUM ($M)", d: 100 }, { k: "feeRate", l: "Advisory fee (%)", d: 1 }, { k: "churnRisk", l: "Heir churn risk (%)", d: 5 }, { k: "retainer", l: "Retainer ($/mo)", d: 1000 }],
    calc: v => { const annualRev = v.aum * 1000000 * (v.feeRate / 100); const atRisk = Math.round(annualRev * (v.churnRisk / 100)); const cost = v.retainer * 12; const protected_ = Math.round(atRisk * 0.6); return { stats: [{ l: "Annual advisory revenue", v: `$${Math.round(annualRev).toLocaleString()}`, c: C.TEXT }, { l: "Revenue at heir-churn risk", v: `$${atRisk.toLocaleString()}`, c: C.RED }, { l: "Protected with Gizmo", v: `$${protected_.toLocaleString()}`, c: C.GREEN }, { l: "Annual Gizmo cost", v: `$${cost.toLocaleString()}`, c: C.TEXT }, { l: "ROI", v: `${Math.round(((protected_ - cost) / cost) * 100)}%`, c: C.GREEN }], pitch: `With $${v.aum}M AUM at ${v.feeRate}% = $${Math.round(annualRev).toLocaleString()} annual revenue. ${v.churnRisk}% heir-churn risk = $${atRisk.toLocaleString()} at risk. Gizmo's heir engagement sequences protect ~60% of that.` }; }
  },
];

function ROICalculator() {
  const [sel, setSel] = useState("re");
  const vert = verticals.find(v => v.id === sel);
  const [vals, setVals] = useState(Object.fromEntries(vert.fields.map(f => [f.k, f.d])));
  const [showPitch, setShowPitch] = useState(false);
  const switchVert = (id) => { setSel(id); const v = verticals.find(x => x.id === id); setVals(Object.fromEntries(v.fields.map(f => [f.k, f.d]))); setShowPitch(false); };
  const result = vert.calc(vals);

  return (
    <div>
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
        {[{ s: "78%", t: "buy from first responder" }, { s: "42 hrs", t: "average response time" }, { s: "391%", t: "higher conversion within 60 seconds" }, { s: "50%", t: "of CRM implementations fail" }, { s: "$8.71", t: "return per $1 spent on CRM" }, { s: "76%", t: "of CRM features go unused" }].map((s, i) =>
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "baseline" }}><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: C.RED, minWidth: 55, textAlign: "right" }}>{s.s}</span><span style={{ fontSize: 13, color: C.TEXT }}>{s.t}</span></div>
        )}
      </RuleBox>
    </div>
  );
}

// ═══════════════════════════════════════
// TOOL 5: COMPETITOR CHEAT SHEET
// ═══════════════════════════════════════
const competitors = [
  { name: "GHL White-Label Agencies", icon: "🏷️", color: C.AMBER, threat: "High",
    whatTheyDo: "Rebrand GoHighLevel and sell access at $297–$497/mo. One-time setup, client runs it themselves with limited support.",
    weaknesses: ["No ongoing management — client is on their own", "Platform-locked (GHL only)", "No vertical expertise or industry knowledge", "Generic setup, not configured for the client's workflow", "Support is usually a Facebook group"],
    howWeDiffer: "We deliver results, not software. We manage every month. We're platform-agnostic — we use GHL where it fits, and the Gizmo CRM where it works better.",
    response: "They hand you a gym membership and wish you luck. We're your personal trainer who shows up every session, adjusts the programme monthly, and reports on your results.",
    oneliner: "They sell software access. We deliver ongoing results.",
    threat_detail: "Very common in real estate. Often the first thing a prospect has tried. Frame Gizmo as what comes after — the professional layer.",
  },
  { name: "Freelancers / Fiverr / Upwork", icon: "💻", color: C.TEAL, threat: "Medium",
    whatTheyDo: "One-off CRM setup at $500–$3,000. No ongoing relationship, no industry knowledge, no accountability.",
    weaknesses: ["Build it and disappear", "No monitoring or maintenance", "No staff onboarding when team changes", "No reporting or performance visibility", "No accountability for outcomes"],
    howWeDiffer: "Setup is 20% of the value. We manage the other 80%. We have accountability, monthly reporting, and our business model depends on your results.",
    response: "Who monitors those automations next month? Who onboards your new hire? Who tells you which leads converted? A one-time build degrades in 90 days without management.",
    oneliner: "They build it once. We run it forever.",
    threat_detail: "Often the prospect has tried this before and it didn't work. Use their bad experience as your opening.",
  },
  { name: "In-House Hire", icon: "👤", color: C.PURPLE, threat: "Medium",
    whatTheyDo: "Full-time CRM administrator at $55,000–$90,000/year including benefits, recruitment, and training costs.",
    weaknesses: ["3–6 month ramp-up time", "$55K+ fully-loaded cost", "Single point of failure", "Hard to find someone with multi-platform expertise", "Turnover risk — they leave, knowledge walks out the door"],
    howWeDiffer: "We cost a third. We're operational in 14 days. You get a team, not a person. Zero turnover risk.",
    response: "A full-time CRM admin is $55K+ fully loaded. Our Growth retainer is $1,000–$1,500/month — less than a third. We're live in 14 days, not 6 months. And if our lead leaves, another walks in.",
    oneliner: "We cost a third, start in 14 days, and never call in sick.",
    threat_detail: "Common objection from mid-size operations. The fully-loaded cost comparison wins this every time.",
  },
  { name: "DIY / YouTube University", icon: "🔧", color: C.DIM, threat: "High",
    whatTheyDo: "Owner watches tutorials and attempts to configure CRM themselves. Usually results in a half-built system that degrades over time.",
    weaknesses: ["50% of DIY implementations fail within 90 days", "Massive opportunity cost of owner's time", "No ongoing monitoring or maintenance", "System degrades when staff changes", "No accountability for results"],
    howWeDiffer: "Your time is worth more than CRM configuration. 50% of DIY implementations fail. Every hour you spend on this is an hour not spent running the business.",
    response: "You're great at running your business. We're great at running the system behind it. 50% of self-built CRM setups fail within 90 days — not because the owner wasn't capable, but because there's no time to maintain it.",
    oneliner: "Your time is worth more than CRM configuration.",
    threat_detail: "Very common. The free audit often reveals exactly how much DIY has cost them in missed leads.",
  },
  { name: "BoldTrail / kvCORE", icon: "🏢", color: C.RED, threat: "Medium",
    whatTheyDo: "All-in-one real estate platform: CRM, IDX website, lead gen, market reports. $500–$1,500/month. Most agents use 20% of it.",
    weaknesses: ["Expensive for what's actually used", "No ongoing management — client does it themselves", "Complex — high learning curve", "No mobile document sending", "No operational layer — just software"],
    howWeDiffer: "BoldTrail is a platform. We're the operational layer that makes it work — or we replace it with the Gizmo CRM for agents who want simplicity and lower cost.",
    response: "BoldTrail is a powerful platform. Our clients on BoldTrail typically use about 20% of what they're paying for. We build and manage the other 80% — or we move them to the Gizmo CRM and cut their software cost by 70%.",
    oneliner: "They sell the platform. We make it work.",
    threat_detail: "Came up in a real prospect call. They can't send Buyer Agreements from their phone. That's your opening.",
  },
  { name: "Follow Up Boss", icon: "🐂", color: C.AMBER, threat: "Low",
    whatTheyDo: "Best-in-class real estate CRM for lead management and team routing. $69–$1,000/month depending on team size.",
    weaknesses: ["Software only — no operational management", "Client must configure and maintain automations themselves", "No document management or mobile send flow", "No monthly reporting or strategy calls", "No managed service layer"],
    howWeDiffer: "Follow Up Boss is excellent software. We're the managed service layer on top — we build and run what it's capable of. We're not competing with FUB; we complement it.",
    response: "Follow Up Boss is one of the best CRMs on the market. The problem isn't the software — it's that someone has to build, configure, and maintain the automations. That's what we do.",
    oneliner: "We make Follow Up Boss actually work.",
    threat_detail: "Don't compete. Position alongside. FUB + Gizmo managed services is a strong combo pitch.",
  },
  { name: "Marketing Agencies", icon: "📣", color: C.GOLD, threat: "Medium",
    whatTheyDo: "Run ads, build websites, generate leads. Some offer CRM setup as an add-on. Typically no ongoing operational management.",
    weaknesses: ["Generate leads but don't convert them", "CRM setup is an afterthought, not core expertise", "No ongoing management of automations", "No industry-specific vertical knowledge", "Conflict of interest — more leads = more agency revenue"],
    howWeDiffer: "We start where they stop. They generate leads. We convert them. We're complementary — clients often have both.",
    response: "Keep your agency for lead gen — they're great at that. We make sure every lead they generate actually gets followed up in under 60 seconds, nurtured properly, and converted. Your agency's results look better. Everyone wins.",
    oneliner: "They generate leads. We convert them.",
    threat_detail: "Frame as complementary. Many clients keep their agency and add Gizmo. Two separate budgets.",
  },
  { name: "AppFiles / DotLoop / DocuSign", icon: "📄", color: C.TEAL, threat: "Low",
    whatTheyDo: "Document management, transaction tracking, and e-signature platforms. AppFiles at $99–$149/month. Desktop-focused.",
    weaknesses: ["Desktop-first — poor mobile experience", "Can't send documents from phone in the field", "No CRM integration — lives outside the deal pipeline", "No automation layer — everything manual", "Another monthly subscription to manage"],
    howWeDiffer: "Gizmo replaces AppFiles entirely. Native document templates, mobile send flow, e-signature, automatic storage against contact record — all inside the CRM.",
    response: "Can you send a Buyer Agreement from your phone in under 60 seconds right now? With Gizmo, one tap — contact, template, auto-populated, send. Signed document back in your CRM automatically. AppFiles stays on your desk.",
    oneliner: "We send documents from anywhere. They don't.",
    threat_detail: "CRITICAL differentiator. The mobile document send flow is your killer demo moment. Build this into every real estate pitch.",
  },
];

function CompetitorCheatSheet() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);
  const filtered = competitors.filter(c => search === "" || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} placeholder="Search competitors..." />
      {filtered.map((comp, i) => <CompCard key={i} comp={comp} active={active === i} onToggle={() => setActive(active === i ? null : i)} />)}
      <RuleBox title="One-Sentence Positioning" color={C.RED}>
        {competitors.map((c, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, color: C.TEXT }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
          <span><b style={{ color: C.BRIGHT }}>{c.name.split("/")[0].trim()}:</b> {c.oneliner}</span>
        </div>)}
      </RuleBox>
    </div>
  );
}

function CompCard({ comp, active, onToggle }) {
  const tc = comp.threat === "High" ? C.RED : comp.threat === "Medium" ? C.AMBER : C.GREEN;
  return (
    <Card color={comp.color} onClick={onToggle}>
      <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 10 }}>
        <span style={{ fontSize: 20 }}>{comp.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: C.BRIGHT }}>{comp.name}</div>
          <div style={{ fontSize: 12, color: comp.color, fontWeight: 600, marginTop: 2 }}>{comp.oneliner}</div>
        </div>
        <Tag label={`${comp.threat} Threat`} color={tc} />
      </div>
      {active && <div style={{ borderTop: `1px solid ${C.BORD}`, padding: "14px 16px", background: `${C.DARK}80` }}>
        <div style={{ fontSize: 12, color: C.DIM, marginBottom: 12 }}><b style={{ color: C.TEXT }}>What they do:</b> {comp.whatTheyDo}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: C.RED, marginBottom: 6 }}>Their Weaknesses</div>
          {comp.weaknesses.map((w, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 12, color: C.TEXT }}><span style={{ color: C.RED, flexShrink: 0 }}>✗</span>{w}</div>)}
        </div>
        <div style={{ fontSize: 12, color: C.TEXT, marginBottom: 12 }}><b style={{ color: C.GREEN }}>How Gizmo differs:</b> {comp.howWeDiffer}</div>
        <div style={{ padding: "10px 14px", background: `${C.RED}08`, borderLeft: `2px solid ${C.RED}40`, fontSize: 14, color: C.BRIGHT, fontStyle: "italic", lineHeight: 1.7, marginBottom: 10 }}>"{comp.response}"</div>
        <div style={{ padding: "8px 12px", background: `${C.GOLD}08`, borderLeft: `2px solid ${C.GOLD}30`, fontSize: 12, color: C.GOLD, fontStyle: "italic" }}>💡 {comp.threat_detail}</div>
      </div>}
    </Card>
  );
}

// ═══════════════════════════════════════
// TOOL 6: PRICING REFERENCE
// ═══════════════════════════════════════
const priceTiers = [
  { name: "CRM — Individual", tag: "Self-Serve", color: C.TEAL, featured: false,
    us: "$49/mo", uk: "£39/mo", setupUS: "None", setupUK: "None",
    best: "Solo realtors, individual operators. Full CRM access, up to 500 contacts, pipeline management, mobile app.",
    includes: "Full Gizmo CRM access. Up to 500 contacts. Pipeline management. Mobile app. 14-day free trial.",
    howToSay: "Our self-serve Individual plan is $49/month with a 14-day free trial and no credit card required. Full CRM access — you run it yourself. Most clients start here and add managed services once they see what's possible.",
  },
  { name: "CRM — Business", tag: "Self-Serve", color: C.TEAL, featured: false,
    us: "$299/mo", uk: "£239/mo", setupUS: "None", setupUK: "None",
    best: "Team leaders and brokerages. Unlimited contacts, team management, performance dashboards.",
    includes: "Everything in Individual + unlimited contacts, team management, performance dashboards, sequences and campaigns.",
    howToSay: "Our Business CRM plan is $299/month. Unlimited contacts, full team management, sequences and campaigns. No setup fee. Start with the trial and we can always layer managed services on top.",
  },
  { name: "Managed — Starter", tag: "Managed Service", color: C.RED, featured: false,
    us: "$750/mo", uk: "£500–£650/mo", setupUS: "$1,500", setupUK: "£700–£1,000",
    best: "Small operations, up to 15 people, single location. Includes Gizmo CRM at no extra cost.",
    includes: "Full system build, 3 lead sources, core automations, monthly performance report, staff onboarding, email support. CRM included.",
    howToSay: "Our Starter managed service is $750/month with a $1,500 setup fee. Complete build, all core automations, monthly reporting, and staff onboarding. Operational in 14 days. CRM access included at no extra cost.",
  },
  { name: "Managed — Growth", tag: "Managed Service", color: C.RED, featured: true,
    us: "$999–$1,250/mo", uk: "£750–£1,000/mo", setupUS: "$2,000–$3,000", setupUK: "£1,200–£1,800",
    best: "Mid-size operations, 15–40 people, multiple lead sources. Most common tier. Includes Gizmo CRM.",
    includes: "Everything in Starter + owner dashboard, monthly strategy call, database reactivation campaigns, advanced automations, 48hr new staff onboarding, priority support. CRM included.",
    howToSay: "Our Growth tier is $999–$1,250/month with $2,000–$3,000 setup. Everything — dashboard, strategy calls, database campaigns. Most clients see full ROI within 30–60 days. CRM included.",
  },
  { name: "Managed — Full Operations", tag: "Managed Service", color: C.GOLD, featured: false,
    us: "$1,500/mo", uk: "£1,000–£1,400/mo", setupUS: "$3,000–$4,000", setupUK: "£1,800–£2,500",
    best: "Larger operations, 40+ people, multi-location, bridge service clients. Includes Gizmo CRM.",
    includes: "Everything in Growth + bridge service, custom API integrations, bi-weekly strategy calls, quarterly growth reviews, priority support. CRM included.",
    howToSay: "For your size, Full Operations at $1,500/month includes the bridge service, custom integrations, bi-weekly calls, and quarterly reviews. You get Gizmo as your outsourced revenue operations team.",
  },
];

function PricingReference() {
  return (
    <div>
      <div style={{ padding: "12px 16px", background: `${C.GOLD}08`, border: `1px solid ${C.GOLD}30`, borderLeft: `3px solid ${C.GOLD}`, marginBottom: 16 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.GOLD, marginBottom: 6 }}>Positioning Note</div>
        <div style={{ fontSize: 13, color: C.TEXT, lineHeight: 1.6 }}>All managed service plans include the Gizmo CRM at no additional cost. Self-serve CRM plans are for clients who want the software only. Lead with managed services — pivot to self-serve if budget is the blocker.</div>
      </div>
      {priceTiers.map((t, i) => <PriceCard key={i} tier={t} />)}
      <RuleBox title="Pricing Rules" color={C.RED}>
        {[
          "Never discount the monthly retainer. Permanent rate lock (founding pricing) is your only concession.",
          "Never quote before a discovery call. Anchor the range: '$49/month self-serve or $750–$1,500 managed.'",
          "The 14-day free trial is your most powerful entry point. Use it for every hesitant prospect.",
          "Founding client pricing: permanent rate lock at launch rates. Not a % discount — it's a guarantee.",
          "Invoice within 30 minutes of verbal yes. Have Stripe ready.",
          "Upsell timing: database reactivation at kickoff, bridge service once live, tier upgrade at 90-day review.",
          "Self-serve to managed upgrade: the natural path. Plant the seed at the trial stage.",
        ].map((r, i) =>
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, color: C.TEXT, lineHeight: 1.5 }}><span style={{ color: C.RED, fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>{String(i + 1).padStart(2, "0")}</span>{r}</div>
        )}
      </RuleBox>
      <RuleBox title="The Anchor Phrase — Memorise This" color={C.GOLD}>
        <div style={{ fontSize: 15, color: C.BRIGHT, lineHeight: 1.75, fontStyle: "italic" }}>"We have a free 14-day trial if you want to start with the CRM yourself — no credit card, full access. Or if you want us to build and run everything, our managed service retainers start at $750/month. Which makes more sense for where you are right now?"</div>
      </RuleBox>
    </div>
  );
}

function PriceCard({ tier }) {
  const [open, setOpen] = useState(false);
  return (
    <Card color={tier.color} onClick={() => setOpen(!open)} style={tier.featured ? { background: `linear-gradient(135deg, ${C.NAVY}, ${C.SURF})`, border: `1px solid ${tier.color}40` } : {}}>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <Tag label={tier.tag} color={tier.tag === "Self-Serve" ? C.TEAL : C.RED} />
          {tier.featured && <Tag label="Most Common" color={C.GOLD} />}
        </div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.BRIGHT }}>{tier.name}</div>
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
// TOOL 7: JARGON GLOSSARY
// ═══════════════════════════════════════
const jargon = [
  { cat: "US Real Estate", icon: "🏠", color: C.RED, terms: [
    { t: "Brokerage", d: "The company that holds the broker license. Agents work under it. The broker/owner is your buyer.", c: "Always pitch to the broker, not individual agents." },
    { t: "MLS / IDX", d: "MLS = shared listing database. IDX = system that puts MLS listings on websites and generates buyer leads.", c: "IDX leads need to flow into CRM automatically. Core integration." },
    { t: "GCI", d: "Gross Commission Income — total commission before splits. Key revenue metric.", c: "Use GCI for ROI calculations." },
    { t: "Sphere / SOI", d: "Sphere of Influence — past clients, friends, contacts who may refer business.", c: "Database reactivation targets the sphere. Your biggest ROI pitch." },
    { t: "Buyer Agreement", d: "Contract agents must now have signed before showing properties. New NAR requirement since August 2024.", c: "Agents MUST send this before every showing. Mobile send flow is critical here." },
    { t: "Under Contract", d: "Accepted offer, not yet closed. Triggers your transaction hub automation.", c: "This stage fires inspection, finance, and closing deadline automations." },
    { t: "DBPR", d: "Florida agency licensing real estate agents. Use DBPR lookup to research prospect agent counts.", c: "Search DBPR before your first call to any Florida brokerage." },
    { t: "Split / Cap", d: "Split = commission division (agent/brokerage). Cap = max an agent pays per year.", c: "Know the difference. Broker's split portion is their revenue per deal." },
    { t: "BoldTrail / kvCORE", d: "Popular all-in-one real estate platform. Expensive, complex, most agents use 20% of it.", c: "Don't attack it. Position Gizmo as the operational layer that makes it work — or as the simpler alternative." },
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
    { t: "Recall / Rebooking", d: "Contacting patients when due for next treatment. <40% return within 12 months.", c: "Automated recall is the core aesthetics pitch." },
    { t: "Consultation", d: "Initial assessment. Many don't convert on the day.", c: "Your 21-day follow-up sequence converts the 'I'll think about it' patients." },
    { t: "Patient Journey", d: "Full cycle: enquiry → consultation → treatment → aftercare → recall → review.", c: "You build and manage the entire journey automation." },
    { t: "Pabau / Cliniko", d: "Main CRM platforms. Pabau dominates UK aesthetics.", c: "Know Pabau inside out for this vertical." },
  ]},
  { cat: "Mortgage", icon: "🏦", color: C.TEAL, terms: [
    { t: "Loan Officer (LO)", d: "Originates mortgage loans. Works with borrowers.", c: "LOs are end users. Brokers/branch managers are your buyers." },
    { t: "Pre-Approval", d: "Verified assessment with documentation. Stronger than pre-qual.", c: "Status updates should trigger notifications to referring realtor via bridge service." },
    { t: "Clear to Close (CTC)", d: "Underwriter approved. All conditions met. Green light.", c: "CTC notification to the realtor is one of the most valuable bridge automations." },
    { t: "LOS", d: "Loan Origination System (Encompass, Byte). NOT a CRM.", c: "Never touch the LOS. Your bridge reads from it and pushes notifications outward." },
    { t: "The Bridge", d: "Gizmo's realtor–mortgage broker service: one retainer links two businesses. Realtor gets loan status updates. Broker gets referral nurture.", c: "One sales call can yield TWO retainers. Always look for the bridge opportunity." },
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
    { t: "RIA", d: "Registered Investment Advisor. Makes their own tech decisions.", c: "RIAs are your target. They have CRM autonomy." },
    { t: "Great Wealth Transfer", d: "$50T+ transferring from Boomers to heirs. 70% of heirs fire their parents' advisor.", c: "Heir engagement sequences are a powerful pitch. Protect the book." },
    { t: "Redtail / Wealthbox", d: "Main CRM platforms for independent advisors.", c: "Redtail: strong contacts, weak automation. Classic Gizmo opportunity." },
  ]},
];

function JargonGlossary() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const filtered = jargon.filter(j => activeCat === "all" || j.cat === activeCat).map(j => ({ ...j, terms: j.terms.filter(t => search === "" || t.t.toLowerCase().includes(search.toLowerCase()) || t.d.toLowerCase().includes(search.toLowerCase())) })).filter(j => j.terms.length > 0);
  return (
    <div>
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
    </div>
  );
}

function TermCard({ term, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.BORD}`, cursor: "pointer" }} onClick={() => setOpen(!open)}>
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
  { id: "plays", label: "Playbooks", icon: "🎯", component: VerticalPlaybooks, title: "Vertical", subtitle: "Playbooks" },
  { id: "crm", label: "CRM", icon: "🔗", component: CRMCheatSheet, title: "CRM Integration", subtitle: "Cheat Sheet" },
  { id: "obj", label: "Objections", icon: "🛡️", component: ObjectionHandler, title: "Objection", subtitle: "Handler" },
  { id: "roi", label: "ROI", icon: "📊", component: ROICalculator, title: "ROI", subtitle: "Calculator" },
  { id: "comp", label: "Competitors", icon: "⚔️", component: CompetitorCheatSheet, title: "Competitor", subtitle: "Cheat Sheet" },
  { id: "price", label: "Pricing", icon: "💰", component: PricingReference, title: "Pricing", subtitle: "Quick Reference" },
  { id: "jargon", label: "Jargon", icon: "📖", component: JargonGlossary, title: "Industry Jargon", subtitle: "Glossary" },
];

export default function App() {
  const [active, setActive] = useState("plays");
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
        <div style={{ padding: "24px 0 16px", borderBottom: `1px solid ${C.BORD}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: C.BRIGHT }}>GIZMO</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: C.RED }}>TOOLKIT</span>
            <span style={{ fontSize: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.DIM, marginLeft: 4 }}>v2 · Internal Only</span>
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, color: C.BRIGHT, lineHeight: 1.1, letterSpacing: -0.5 }}>
            {tool.title} <span style={{ color: C.RED }}>{tool.subtitle}</span>
          </h1>
        </div>

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

        <Component />

        <div style={{ marginTop: 32, textAlign: "center", padding: "16px 0", borderTop: `1px solid ${C.BORD}` }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 800, color: `${C.BRIGHT}15` }}>GIZMO</span>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 800, color: `${C.RED}25`, marginLeft: 6 }}>OPERATIONS</span>
          <div style={{ fontSize: 10, color: `${C.DIM}60`, marginTop: 4 }}>Internal Sales Toolkit · Not for distribution</div>
        </div>
      </div>
    </div>
  );
}
