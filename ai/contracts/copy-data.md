# Copy Data

**Source:** `lp-creator-segments-acme/references/acme-product-rules.md` and `lp-creator-platform-acme/references/acme-platform-rules.md`, marketing team, built against shared rules **v5.0**.
**Synced into this repo:** 2026-08-18.

Approved facts a page may state. Rules about *how* to write live in `ai/contracts/copy-rules.md`; this file is *what is true*. Anything not in here and not in the page brief does not go on a page - not a stat, not a tool name, not a salary figure, not a competitor.

The list is deliberately incomplete. Where a vertical is missing, the marketing source says research it before the page ships. "Reuse the HVAC numbers because they are on hand" is the failure mode this file exists to prevent.

---

## Vertical pain data (sourced)

Usable in pain-point and results sections. Never usable without the citation.

### HVAC, lead handling
- 27% average missed-call rate; 62% during peak season or when crews are on-site (AgentZap, 2026)
- $350-$1,200 lost revenue per missed call; $88,400-$176,800/yr cumulative for a typical operator (Ethos Link Systems, 2025)
- Average HVAC response time 2+ hours; only 3% reply within 1 minute (Hatch, 2025)
- First responder wins the job 78% of the time (LeadConnect via Hatch)
- 5-minute response is 9x more likely to convert, 21x more likely to qualify the lead (HBR)
- 85% of missed callers never call back; 62% call a competitor directly (Instant Sales Funnels, 2025)

### Cleaning and maid services, lead handling
- 25-40% of inbound calls go unanswered during business hours (Allclean, 2025)
- $80,000-$250,000 lost per year for small and mid operators, including LTV and referrals (Allclean, 2025)
- 80% of voicemail callers hang up; 85% of missed callers never call back (Allclean)
- 5-minute response is 21x more likely to qualify vs. 30-minute (HBR via Verse.ai, 2025)
- 63% of customers would switch to a business that texts; 98% of texts are read vs. 6% of emails (Sakari, 2025)
- Cleaning and maid average 17.65% click-to-lead conversion (LocaliQ home services benchmark, 2025)
- 50% of sales close after the 5th follow-up; 44% of reps give up after one attempt (InsideSales)

### Recruiting, high-turnover verticals
- 82% of restaurant operators struggle to hire and retain staff (HigherMe, 2025)
- Cleaning and security annual staff turnover: 100-400%
- Security industry annual turnover: 200-400%; first-week quit pattern is common
- Automotive: perpetual open positions for certified technicians is the norm
- Average time to fill a role ~42 days; candidates go cold within 24-48 hours of applying
- Acme recruiting benchmark: 97.3% first-attempt success rate (74 scenarios, April 2026)

**Verticals with no sourced pain data yet:** eCommerce, insurance, real estate, logistics, automotive (dealership, parts, body shop), healthcare, HR, finance and accounting, legal.

---

## Integration stacks by vertical

Name the tools the reader recognizes from their own operations. A specific tool name lands harder than the 2,700+ count.

| Vertical | Integrations to name |
|----------|------------------------|
| HVAC | ServiceTitan, Housecall Pro, FieldEdge, FieldPulse, Jobber |
| Cleaning / janitorial | Jobber, ZenMaid, Housecall Pro, BookingKoala, Launch27, Maid Central, Aspire, Swept |
| Security | WinTeam, TrackTik, Deputy, Humanity, Paylocity |
| Restaurants / hospitality | 7shifts, HotSchedules, Toast, Square for Restaurants, Homebase |
| Auto repair | Mitchell 1, Shop-Ware, Tekmetric, AutoLeap, ROWriter |
| Plumbing | ServiceTitan, Housecall Pro, Jobber, Leap, CompanyCam |
| Roofing | JobNimbus, AccuLynx, EagleView, Leap, CompanyCam |
| Recruiting, cross-vertical | Workable, Greenhouse, BambooHR, ADP, Paylocity, Indeed API |

**Not researched yet:** insurance, logistics, real estate, property management, automotive dealerships and parts, healthcare. Do not invent tool names for these.

---

## Channel order by vertical

| Vertical | Lead channel | Full order |
|----------|-------------|-----------|
| HVAC, plumbing, electrical, emergency services | Voice | Voice → SMS → Web chat → Email |
| Cleaning, janitorial, maid services | SMS | SMS → Voice → Web chat → Email |
| Security companies | SMS | SMS → Voice → Web chat → Email |
| Restaurants, hospitality | SMS | SMS → Voice → Web chat → Email |
| Recruiting, any vertical | SMS | SMS → Email → Web chat → Voice |

For anything not listed - insurance, logistics, real estate, automotive, healthcare - confirm the primary channel with the author or research it. Channel preference varies a lot by how customers actually reach that kind of business today, so do not default to voice-first or SMS-first.

---

## Budget comparison anchors

For the "cheaper than a full-time hire" section. Full-time cost = salary + ~25% payroll taxes and benefits.

| Vertical | Role compared | FTE monthly | Acme est. monthly | Multiplier |
|----------|------------------------|-----------------|------------------------|------------|
| HVAC, lead handling | Front-desk CSR / dispatcher | $3,500-4,200 | ~$1,000 | ~3-4x |
| Cleaning, lead handling | Front-desk / booking coordinator | $3,000-3,800 | ~$600-800 | ~4-5x |
| Security, recruiting | In-house recruiter / HR coordinator | $3,500-4,500 | ~$800-1,000 | ~4x |
| Plumbing, lead handling | CSR / dispatcher | $3,200-4,000 | ~$900-1,100 | ~3-4x |
| Restaurants, recruiting | HR coordinator / hiring manager | $3,500-4,500 | ~$500-700 | ~5-6x |
| Auto repair, recruiting | HR coordinator / shop manager time | $4,000-5,000 | ~$600-800 | ~5-6x |
| Roofing, lead handling | Inside sales / estimating coordinator | $3,500-4,500 | ~$900-1,100 | ~3-4x |

**Estimation formula for an unlisted vertical:** take the typical monthly interaction volume for a 5-20 employee business in that vertical, price at ~$0.90 per resolved text conversation and ~$7.20 per hour of voice, add a modest buffer for workflow automation nodes, round to a defensible number. Look up the human role's median salary on Indeed or BLS. Never fabricate either side.

**Closing line template:** "No payroll, no contracts, no subscription, no per-seat fees. Credits adjust to your actual [call/message] volume - slower months cost less, peak season handles itself. For a full per-action cost breakdown and worked examples, see the [Pricing page](/pricing)."

---

## Technology clusters

Four clusters, v5.0. Every category/platform page belongs to one.

| Term | Cluster | Notes |
|------|---------|-------|
| Conversational AI Agent | Conversational AI | Cluster anchor |
| AI Voice Agent | Conversational AI | Channel-specific |
| AI SMS Agent | Conversational AI | Channel-specific |
| WhatsApp AI Agent | Conversational AI | Channel-specific |
| AI Receptionist | Conversational AI | Business-generic angle on the same cluster |
| AI Chatbot | Conversational AI | Article, not a landing page |
| Autonomous AI Software | Autonomous AI | The "software" modifier shifts intent toward buyer-evaluation language |
| AI Workflow Automation | Autonomous AI | Article in the current plan |
| Agentic AI Platform | Agentic AI | Rising analyst term, Q3 priority |
| Agentic Voice AI | Agentic AI | Channel-specific |
| Cognitive AI Platform | Cognitive AI | Differentiator anchor |
| Cognitive AI Agents | Cognitive AI | Agent-centric framing of the same cluster |

**Cross-link direction.** Vertical pages link **up** to the one cluster page matching their framing. Cluster pages link **down** to the vertical pages that exist. A cluster page also links **sideways** to the other three cluster anchors, because it is itself an anchor.

| A vertical page framed as | Links up to |
|----------------------|---------|
| Voice-led intake or scheduling (HVAC, plumbing, field services) | `/conversational-ai-platform/` or `/ai-voice-agent/` |
| SMS-led intake (cleaning, security, restaurants, recruiting) | `/ai-sms-agent/` or `/conversational-ai-platform/` |
| Background workflow, integration-heavy (logistics, insurance servicing, property management) | `/autonomous-ai-agents/` or `/ai-workflow-automation/` |
| The combined talk-and-act differentiator | `/cognitive-ai-platform/` or `/cognitive-ai-agents/` |
| Multi-step autonomous execution as the category | `/agentic-ai-platform/` or `/agentic-ai/` |

No clean fit: default to `/autonomous-ai-agents/` and note the choice in the brief. Confirm the target route exists before linking - several cluster anchors are still being created, and `qa:links` will catch a link to a route that does not.

---

## Category definitions (pre-approved)

Use these rather than writing a fresh one. Consistency across pages is what gets a definition cited.

- **Conversational AI Agent:** "A conversational AI agent is software that holds natural, multi-turn conversations with customers across voice, SMS, and chat - understanding intent, asking clarifying questions, and responding in context. On Acme, a conversational AI agent can also take action on the same canvas, not just talk."
- **AI Receptionist:** "An AI receptionist answers inbound calls and messages the way a front-desk employee would - greeting callers, answering common questions, and routing or booking as needed, without putting anyone on hold. Built on Acme, an AI receptionist can also update your CRM or scheduling system in the same conversation."
- **Autonomous AI Software:** "Autonomous AI software carries out multi-step tasks on its own once triggered - looking up information, making decisions within defined rules, and taking action across connected systems, without a human executing each step. Acme's autonomous AI agents draw on 2,700+ integrations to do this across the tools a business already uses."
- **Agentic AI Platform:** "An agentic AI platform lets you build software agents that pursue a goal across multiple steps - reasoning, calling tools, and adapting when a step fails - rather than following a single fixed script. Acme combines this with native conversational ability on one canvas."
- **Cognitive AI Platform:** "A cognitive AI platform combines conversational understanding with the ability to act - reasoning about what a customer needs and then doing something about it, in the same interaction. This native combination, rather than stitching together separate chat and automation tools, is what Acme's cognitive AI agents are built around."

**No approved definition yet:** AI Voice Agent, AI SMS Agent, WhatsApp AI Agent, Agentic Voice AI, Cognitive AI Agents. Draft one in the same shape, get it approved, and add it here rather than writing a one-off per page.

---

## Competitor set

Approved comparison targets, for category/platform pages: **Voiceflow, Botpress, Relevance AI, Make**. Plus a generic "traditional chatbot / IVR" row for readers not yet evaluating named platforms.

Vertical pages mostly compare against the status quo instead - the front desk, the hiring manager, the answering service - not against named platforms.

Do not name a competitor outside this list. Comparison criteria must be factual and verifiable.

---

## Security section openers by vertical

The four-card body is in `ai/contracts/copy-rules.md`. Only the opening sentence changes.

- HVAC / plumbing / field services: "Built for home service operators handling sensitive customer data - home addresses, access codes, payment information, financing applications, and recorded service calls."
- Cleaning: "Built for cleaning operators handling sensitive customer data - home addresses, access instructions, payment on file, and recorded client intake calls."
- Security: "Built for security operators handling sensitive personnel data - background check records, shift assignments, emergency contact information, and client site access protocols."
- Restaurants: "Built for restaurant operators handling applicant data, payment records, and customer contact information across high-volume hiring and service workflows."
- Recruiting, general: "Built for hiring teams handling candidate PII - contact details, employment history, consent-to-contact records, and interview scheduling data."
- Platform / category pages, audience-neutral: "Built for businesses handling customer conversations and connected system data across the channels and tools you already use."

---

## Service taxonomy decision

Add a service-line taxonomy section ("Built for Every HVAC Operation") only when each service line needs a different intake script, qualification logic, or agent flow. HVAC qualifies: emergency no-heat, tune-up, and new install each carry different urgency and dispatch logic.

Skip it when the flow is structurally identical across subtypes. Cleaning does not qualify: residential, commercial, and vacation-rental turnover all follow qualify → quote → book → remind → follow-up, and only the variables change. When skipping, distribute those terms into the social-proof description, a FAQ answer, and the footer terms instead.

---

## Testimonials

`[project]` Unresolved. The marketing source states Acme has approved testimonials and the section is always included. This repo has recorded the opposite - no approved quotes on hand - and the rule that testimonials are never invented is absolute on both sides.

Until real quotes with a named role or company type arrive, the `testimonials` block is omitted and the omission is noted in the batch review. Do not substitute a placeholder, and do not soften an invented quote into a "sample".
