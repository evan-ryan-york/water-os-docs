"use client";

import React, { useState } from "react";

interface Task {
  domain: string;
  domainName: string;
  month: string;
  monthDisplay: string;
  content: string;
}

// Generate months from November 2025 to April 2027
const generateMonths = () => {
  const months = [];
  const startDate = new Date(2025, 10, 1); // November 2025 (month is 0-indexed)

  for (let i = 0; i < 18; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    months.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      display: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  }

  return months;
};

const domains = [
  { key: "travel", name: "Ryan's Travel", subtitle: "" },
  { key: "market", name: "Market Validation & Product Strategy", subtitle: '(The "What & Why")' },
  { key: "gtm", name: "Go-to-Market (GTM) & Sales", subtitle: '(The "Who & Where")' },
  { key: "technical", name: "Technical Development", subtitle: '(The "How")' },
  { key: "hiring", name: "Hiring & Team Building", subtitle: "" },
  { key: "business", name: "Business, Finance & Operations", subtitle: "" },
  { key: "legal", name: "Legal, Regulatory & Compliance", subtitle: "" },
  { key: "marketing", name: "Marketing & Communications", subtitle: "" }
];

const months = generateMonths();

// Ryan's Travel Data
const travelData: { [key: string]: string } = {
  "2025-11": "Remote (South America)",
  "2025-12": "Remote (South America)",
  "2026-01": "Remote (South America)",
  "2026-02": "On-the-Ground (Accra)",
  "2026-03": "Remote (South America)",
  "2026-04": "On-the-Ground (Accra)",
  "2026-05": "Remote (South America)",
  "2026-06": "On-the-Ground (Accra)",
  "2026-07": "Remote (USA)",
  "2026-08": "On-the-Ground (Accra)",
  "2026-09": "On-the-Ground (Accra)",
  "2026-10": "Flexible",
  "2026-11": "Flexible",
  "2026-12": "Flexible",
  "2027-01": "Flexible",
  "2027-02": "Flexible",
  "2027-03": "Flexible",
  "2027-04": "Flexible"
};

// Market Validation & Product Strategy Data
const marketData: { [key: string]: string } = {
  "2025-11": "• Hire a local Market Researcher in Accra.\n• Create a \"Heat Map\" of Accra to identify 3-5 potential launch pod candidates.\n• Conduct broad, exploratory interviews to understand market dynamics and build a network.\n• Establish bi-weekly check-in calls to review progress with the researcher.",

  "2025-12": "• Analyze the researcher's report and select the primary launch pod.\n• Conduct structured interviews with purchasers, drivers, fleet owners, and depot managers within the chosen pod.\n• Complete and transcribe the initial set of ~28 stakeholder interviews.",

  "2026-01": "• Analyze all interview data to identify the most critical, addressable pain points.\n• Synthesize findings into a preliminary \"Validated Pain Point Matrix\" report.\n• Conduct a rapid initial analysis to create a priority list of the highest-value contacts to meet.",

  "2026-02": "• Attend 10-15 introductory meetings scheduled by your researcher.\n• Listen, learn, and establish personal credibility with potential partners.\n• Validate the pain points identified from the remote interviews in face-to-face conversations.\n• Create a shortlist of \"Friendlies\"—individuals open to further conversation.",

  "2026-03": "• Analyze feedback from your trip to confirm and refine the MVP scope.\n• Translate the top 1-2 validated pain points for each user type into a minimal set of core features.\n• Create simple wireframes or a clickable prototype (e.g., Figma) demonstrating the core user journey.\n• Finalize the MVP Feature List and Clickable Prototype.",

  "2026-04": "• Have your researcher schedule follow-up meetings with your \"friendlies.\"\n• Walk them through the prototype and ask if it solves their problem.\n• Gather feedback on what is confusing or needs improvement.\n• Complete the Usability Feedback Report and Final V1 Product Spec.",

  "2026-05": "• Incorporate all trip feedback into final V1 product specification.\n• Solidify launch pricing model.\n• Define incentive structure for anchor clients and early-adopter suppliers.\n• Complete V1 Product Roadmap ready for main development sprint.",

  "2026-06": "• Base yourself in or near the launch pod for significant time on the ground.\n• Focus full-time on sales and relationship management.\n• Re-engage \"friendlies\" and target anchor B2B clients.\n• Present refined offer and secure Letter of Intent (LOI) from at least one anchor client.",

  "2026-07": "• Use this remote time for critical administrative tasks that don't require your physical presence.\n• Focus on operational and legal setup work.",

  "2026-08": "• Arrive in Accra with full availability.\n• Personally oversee the onboarding of your first 5-10 truck drivers and 2-3 depots.\n• Ensure all initial suppliers are trained and ready for launch.",

  "2026-09": "• \"Concierge\" the first delivery by manually overseeing every step to ensure a flawless experience.\n• Establish a weekly rhythm of checking in with your anchor client and all active drivers to gather immediate feedback.\n• Complete the first successful, paid transaction.",

  "2026-10": "• Collect intensive feedback from your first clients and drivers.\n• Focus product strategy on removing friction from the core transaction loop (ordering, notifications, payment settlement).\n• Iterate rapidly based on real-world usage data.",

  "2026-11": "• Begin designing and validating simple SaaS tools that make suppliers dependent on your platform.\n• Develop basic digital inventory management for depots.\n• Create simple earnings tracker for drivers.",

  "2026-12": "• With a stable driver network in your pod, begin scoping the consumer-facing app.\n• Conduct 10-15 new interviews with residential households within your launch pod to validate their specific needs.\n• Define the B2C product requirements and feature set.",

  "2027-01": "• Analyze the key metrics for success in your first pod.\n• Document findings and processes into a comprehensive \"Launch Playbook.\"\n• Identify what worked well and what needs improvement for future expansion.",

  "2027-02": "• Continue optimizing operations within Pod #1.\n• Refine product features based on user feedback and usage data.\n• Focus on deepening market penetration and driver density within existing pod.",

  "2027-03": "• Based on learnings, create a 12-month forward-looking product roadmap.\n• Include B2C app launch timeline, advanced SaaS features, and potential integrations.\n• Focus on maximizing density and efficiency within Pod #1.",

  "2027-04": "• Continue refining operational processes and product features.\n• Optimize unit economics and driver retention strategies.\n• Document best practices for future scaling opportunities."
};

// Go-to-Market (GTM) & Sales Data
const gtmData: { [key: string]: string } = {
  "2025-11": "• Use the \"Heat Map\" to begin building a preliminary list of B2B targets.\n• Identify key supply-side contacts (drivers, depots) within the potential pods.",

  "2025-12": "• Focus lead qualification efforts within the selected launch pod.\n• Identify key decision-makers at the top 10-15 B2B targets.\n• Identify the most influential suppliers (drivers/depots) in the pod.\n• Map all depots within a 5km radius of the pod.\n• Create a list of all potential business clients in the pod.\n• Create a directory of all water trucks that service the pod.",

  "2026-01": "• Focus outreach on scheduling meetings for the February trip, prioritizing the highest-value contacts first.\n• Establish and track a goal of securing 10-15 confirmed meetings with key decision-makers.\n• Continue intelligence gathering by building out the \"Pod Directory\" of all potential suppliers and business clients.",

  "2026-02": "• Attend pre-scheduled meetings with potential partners.\n• Build rapport, listen, and establish personal credibility without selling.\n• Focus on building the foundation of trust, as business is personal in Ghana.\n• Create a shortlist of \"warm leads\" who are receptive to a follow-up.",

  "2026-03": "• Based on direct feedback from your trip, refine your value proposition and create a simple, powerful sales deck.\n• Focus the pitch on solving their biggest validated pain point (reliability) and include your irresistible introductory offer.\n• Complete V1 Sales Deck and define the \"Anchor Offer.\"",

  "2026-04": "• Re-engage your \"warm leads\" in person.\n• Shift conversation from \"getting to know you\" to \"here is how I plan to solve your problem.\"\n• Walk them through the prototype and present the V1 sales pitch to get feedback.\n• Secure verbal buy-in from 2-3 potential anchor clients.",

  "2026-05": "• Based on feedback from the April trip, finalize the sales deck and prepare a formal Letter of Intent (LOI).\n• Have your ground team maintain contact with the warm leads, keeping them updated on your progress.\n• Confirm schedule for your June meetings and finalize all sales materials.",

  "2026-06": "• Focus your full attention on meeting with the decision-makers at your top 2-3 target B2B clients.\n• Present the final offer to secure a signed Letter of Intent (LOI) from at least one anchor client.\n• Lock in your foundational demand with a signed agreement.",

  "2026-07": "• Shift ground team's focus entirely to the supply side.\n• Have them visit depots and hubs to recruit driver partners for the signed anchor client contract.\n• Build a pipeline of 15-20 interested truck drivers and 5-7 depots.",

  "2026-08": "• Meet with the interested drivers and depot owners your team has lined up.\n• Personally onboard your first 5-10 truck drivers and 2-3 depots.\n• Offer a heavily subsidized deal (e.g., 12 months free access) to secure initial suppliers.\n• Ensure your initial, vetted supplier network is live and trained.",

  "2026-09": "• You and your local manager will manually manage the first few transactions.\n• Call the client to confirm, call the driver to dispatch, and call both after to ensure satisfaction.\n• Complete first successful, paid transaction with ecstatic first customers.",

  "2026-10": "• Develop a case study and testimonial from your anchor client.\n• Use this social proof to sign an additional 3-5 B2B clients within the same launch pod.\n• Scale B2B sales systematically within Pod #1.",

  "2026-11": "• Continue to sign up B2B clients within the pod to increase network density.\n• Expand your supplier network in the pod to 15-25 trucks to service the new demand.\n• Maintain high service quality as you scale.",

  "2026-12": "• Aim to have a liquid, cash-flow positive micro-market in Pod #1.\n• Begin transitioning early-adopter suppliers from free trials to a paid subscription model.\n• Finalize B2B scaling in the first pod.",

  "2027-01": "• With a dense network of active trucks, begin hyper-local B2C acquisition only within Pod #1.\n• Use targeted community engagement (flyers, residents' associations, referral programs).\n• Acquire your first 50-100 B2C customers.",

  "2027-02": "• Continue targeted B2C sales within Pod #1.\n• Scale B2B client base from 10 → 15 clients.\n• Focus on increasing transaction frequency and customer retention.",

  "2027-03": "• Expand driver network from 18 → 22 trucks to meet growing demand.\n• Optimize pricing and commission structures based on market feedback.\n• Strengthen relationships with existing B2B anchor clients.",

  "2027-04": "• Continue systematic growth within Pod #1.\n• Target 25+ B2B clients and 26 trucks by end of month.\n• Document successful GTM strategies for future reference."
};

// Technical Development Data
const technicalData: { [key: string]: string } = {
  "2025-11": "• Set up Supabase project and design V1 database schema (users, trucks, depots, orders).\n• Create the Android repository and set up the initial Kotlin project in Android Studio.\n• Begin deep research into solving the Accra GPS/mapping inaccuracy problem.",

  "2025-12": "• Build core user authentication logic (signup, login, etc.) on the back-end.\n• Build a Proof of Concept (POC) for offline data storage and synchronization on the Android app.\n• Develop the basic Android app shell with navigation screens (login, dashboard, settings).",

  "2026-01": "• Build V1 of core API endpoints based on the \"Pain Point Matrix\" learnings.\n• Connect the Android app to Supabase and implement the full user login/logout flow.\n• Create the repository and set up the initial Next.js project for the Supplier Dashboard.",

  "2026-02": "• Build the Purchaser Flow in the Android app (create order, view history, see status).\n• Refine back-end logic for order matching and real-time status updates.\n• Build the basic user authentication and dashboard layout for the web app.",

  "2026-03": "• Build the Driver Flow in the Android app (view/accept jobs, see job details).\n• Implement the real-time driver location tracking system on the back-end.\n• Build the transaction history table for the web app.",

  "2026-04": "• Integrate the GPS/Mapping solution into the Android app, including the \"manual pin drop\" feature.\n• Solidify the back-end schema to store proprietary, corrected mapping data.\n• Build the Fleet Owner's real-time driver map feature on the web app.",

  "2026-05": "• Integrate with a payment gateway (e.g., Paystack) and build payment logic on the back-end.\n• Implement the purchaser payment flow and push notifications in the Android app.\n• Build the Depot Owner's digital inventory tracking feature on the web app.",

  "2026-06": "• Build the V1 Admin Panel (\"God Mode\") for manual order management and user support.\n• Focus on end-to-end testing of the full transaction cycle in the Android app.\n• Build the \"add/manage drivers\" feature for Fleet Owners on the web app.",

  "2026-07": "• Finalize back-end security rules and perform system-wide stress testing.\n• Complete the final UI/UX polish on the Android app and prepare it for Google Play Store submission.\n• Onboard your local Ops Manager and train them on how to use the Admin Panel.",

  "2026-08": "• Conduct a closed beta test of the entire system with your first \"friendly\" drivers and anchor client.\n• Fix all critical bugs identified during the beta test.\n• Prepare all systems for the official go-live date in September."
};

// Business, Finance & Operations Data
const businessOpsData: { [key: string]: string } = {
  "2025-11": "• Finalize the pre-launch/validation budget (covering researcher salary, travel, and initial legal fees).\n• Draft and execute a simple independent contractor agreement for the local Market Researcher.",

  "2026-01": "• Define the V1 pricing model and incentive structure for early-adopter suppliers based on initial research findings.",

  "2026-02": "• During your on-the-ground trip, meet with a few major banks (e.g., Ecobank, Stanbic) to understand the requirements for opening a corporate account.",

  "2026-04": "• Open your corporate business bank account in Ghana during your on-the-ground trip.\n• With the company registered and bank account open, begin the application process to become a merchant with your chosen payment gateway (e.g., Paystack).",

  "2026-05": "• Secure approval from the payment gateway and gain access to your merchant dashboard and API keys.\n• Draft the formal Letter of Intent (LOI) template to be used for signing your first anchor client.",

  "2026-06": "• Define the role and create a detailed job description for your first hire: an on-the-ground Operations Manager.\n• Begin the recruitment process for the Operations Manager, leveraging your researcher's local network to source candidates.",

  "2026-07": "• Define the initial set of Key Performance Indicators (KPIs) to track at launch (e.g., GTV, # of deliveries, avg. fulfillment time, support requests).\n• Develop the V1 \"Launch Playbook,\" detailing the step-by-step \"concierge\" process for managing the first live transactions.",

  "2026-08": "• Interview final candidates and hire your Operations Manager.\n• Onboard and train the Ops Manager on the launch playbook and the Admin Panel.\n• Set up a cloud accounting system (e.g., Zoho Books) and establish your financial tracking processes."
};

// Hiring & Team Building Data
const hiringData: { [key: string]: string } = {
  "2025-11": "• Hire a local Market Researcher in Accra on an independent contractor basis.\n• Draft and execute a simple independent contractor agreement for the Market Researcher.",

  "2025-12": "• Observe the Market Researcher's working style and document qualities that would be valuable in a full-time Operations Manager.",

  "2026-01": "• Based on early research findings, begin informally identifying the core responsibilities that will need to be handled on the ground full-time.",

  "2026-02": "• During your on-the-ground trip, pay attention to the skills and qualities that local partners respond to most positively.\n• Ask trusted contacts what characteristics make someone effective in relationship-driven business roles in Ghana.",

  "2026-03": "• Draft a preliminary job description for an Operations Manager role covering sales, relationship management, and operational oversight.\n• Share the draft job description with your Market Researcher and 2-3 local contacts for feedback on clarity and competitiveness.",

  "2026-04": "• Refine the Operations Manager job description based on feedback from local contacts during your trip.\n• Determine the appropriate salary range by researching comparable roles in Accra's tech and logistics sectors.",

  "2026-05": "• Finalize the Operations Manager job description with clear responsibilities, required experience, and success metrics.\n• Define the role's reporting structure and decision-making authority in relation to your remote management.\n• Draft a legally compliant employment agreement template for the Operations Manager position.",

  "2026-06": "• Post the Operations Manager job opening through your researcher's network, LinkedIn, and relevant Ghanaian job boards.\n• Begin actively sourcing candidates by asking for referrals from your \"friendlies\" and local business contacts.\n• Conduct initial phone/video screening interviews with promising candidates to assess communication skills and cultural fit.\n• Create a shortlist of 3-5 candidates to meet in person during your on-the-ground time.",

  "2026-07": "• Review applications and conduct second-round video interviews with shortlisted candidates while remote.\n• Administer a practical assessment (e.g., create a simple outreach plan for drivers) to evaluate candidates' problem-solving approach.\n• Check references for your top 2-3 candidates before making final decision.",

  "2026-08": "• Interview your final 2-3 candidates in person during your on-the-ground trip.\n• Make a hiring decision and extend an offer to your chosen Operations Manager candidate.\n• Execute the employment agreement with your new Operations Manager.\n• Onboard and train the Operations Manager on the launch playbook, Admin Panel, and all supplier relationship protocols.\n• Have the Operations Manager shadow you intensively during the beta test to learn hands-on operations management.",

  "2026-09": "• Gradually delegate day-to-day operational tasks to the Operations Manager while you focus on strategic oversight.\n• Establish a daily check-in rhythm with the Operations Manager to review challenges and provide guidance.\n• Based on the Operations Manager's workload during launch week, assess whether part-time support is needed immediately or can wait.\n• Document any tasks that are falling through the cracks to inform future part-time hire needs.",

  "2026-10": "• Monitor Operations Manager performance and provide coaching as needed.\n• Begin documenting need for specialized support roles (sales, driver success, depot relationships).\n• Assess team capacity against growing operational demands.",

  "2026-11": "• Based on growth trajectory, begin drafting job description for Sales role to start in December.\n• Define responsibilities: B2B commercial client acquisition, pipeline management, relationship building.\n• Determine salary range ($2,000/month to start) and success metrics.",

  "2026-12": "• Hire Sales FTE ($2,000/month) to focus on B2B commercial client acquisition.\n• Goal: Grow commercial clients from 5 → 25+ by Month 12.\n• Onboard and train on value proposition, target client profiles, and sales process.\n• Begin preparing job description for Driver Success Support role to start in January.",

  "2027-01": "• Hire Driver Success Support Manager ($1,200/month) to handle driver onboarding, training, and retention.\n• Role supports 15-25 trucks initially, scaling to 1 success manager per 20 drivers.\n• Focus on maintaining 85%+ driver retention rate.\n• Train on driver onboarding protocols, issue resolution, and ongoing support.",

  "2027-02": "• Monitor performance of Sales FTE and Driver Success Manager.\n• Assess need for additional support as driver network scales to 18 trucks.\n• Begin planning for Depot Relationship Manager hire in March.",

  "2027-03": "• Hire Depot Relationship Manager ($1,400/month) to scale depot partnerships from 8 → 14.\n• Role manages depot relationships, data sharing agreements, and IoT sensor deployment planning.\n• Scaling ratio: 1 depot manager per 40 drivers.\n• Train on depot relationship protocols and operational coordination.",

  "2027-04": "• Full team now in place: Operations Manager, Sales FTE, Driver Success Support, Depot Relationship Manager.\n• Conduct team performance reviews and optimize workflows.\n• Document team structure and responsibilities for future scaling.\n• Assess whether additional sales capacity needed as commercial clients grow."
};

// Legal, Regulatory & Compliance Data
const legalData: { [key: string]: string } = {
  "2025-11": "• Identify and shortlist reputable corporate law firms in Accra to assist with incorporation and compliance.",

  "2025-12": "• Formally engage a Ghanaian law firm on a consulting basis.\n• Request a \"Regulatory Assessment Brief\" covering company setup, GIPC rules, data protection, and water sector regulations.",

  "2026-01": "• Review the legal brief to decide on the optimal corporate structure.\n• Create a preliminary compliance checklist for the MVP launch based on counsel's advice.",

  "2026-02": "• Instruct your law firm to formally begin the business incorporation process with the Office of the Registrar of Companies (ORC).\n• Begin the parallel registration process with the Ghana Investment Promotion Centre (GIPC) as required.",

  "2026-03": "• Secure the official business incorporation certificate and Tax Identification Number (TIN).\n• Begin drafting the initial versions of the Terms of Service and Privacy Policy, ensuring they align with Ghana's Data Protection Act.",

  "2026-04": "• Use your corporate documents to complete the Know Your Business (KYB) compliance check for your payment gateway application.\n• Begin drafting the initial version of the Supplier Agreement for drivers and depots.",

  "2026-05": "• Finalize the Terms of Service, Privacy Policy, and Supplier Agreement with your legal counsel.\n• Ensure these legal documents are ready for integration into the app and onboarding flows.",

  "2026-06": "• Draft a legally compliant employment agreement template for your first local hire (Operations Manager).\n• Create a simple internal data handling policy to ensure operational compliance.",

  "2026-07": "• Register the company as a \"data controller\" with Ghana's Data Protection Commission (DPC).\n• Conduct a final legal review of the entire user journey within the app before the beta test.",

  "2026-08": "• Execute the finalized employment agreement with your new Operations Manager.\n• Execute the finalized Supplier Agreements with your initial cohort of beta-testing drivers and depots."
};

// Marketing & Communications Data (abbreviated for brevity, but include all 18 months)
const marketingData: { [key: string]: string } = {
  "2025-11": "• Define 5 core brand attributes (Trustworthy, Empowering, Efficient, Community-Rooted, Professional).\n• Generate shortlist of 3-5 potential company names that work in English and Twi, suggest reliability/flow, and avoid Silicon Valley clichés.\n• Create visual mood board capturing Ghana's entrepreneurial spirit with professional aesthetic (blue for trust/water with warm accents).\n• Secure primary domain and launch V1 \"Founder's Vision\" website with founder story, problem statement, solution overview, email capture, and professional email setup.\n• Integrate brand name perception questions into market researcher's interview script testing trustworthiness and credibility signals.",

  "2025-12": "• Analyze researcher interviews to identify communication channels suppliers actually use (WhatsApp groups, radio stations, specific depots).\n• Document existing informal market dynamics: how drivers find customers, price ranges, trust mechanisms, and pain points.\n• Gather feedback on 3-5 name options and understand what \"professional\" means in local context.",

  "2026-01": "• Select official company name based on market validation and secure all related domains and social media handles.\n• Commission professional logo and comprehensive brand identity guide (color palette, typography, icon library, photography style, tone of voice with bilingual considerations).\n• Update website to V1.5 with new brand identity, separate stakeholder sections, About Us, mission statement, segmented email capture, and critical WhatsApp contact button.\n• Design templates for bilingual business cards, one-page value proposition sheets for each market side, and B2B pitch deck.",

  "2026-02": "• Print bilingual pitch deck, stakeholder-specific one-pagers (drivers: \"Earn More, Work Smarter\"; depots: \"Run Your Business Like a Pro\"; purchasers: \"Reliable Water, Every Time\"), business cards with prominent WhatsApp, and founder bio sheet.\n• Visit 3-4 major depots during peak times with goodwill gestures (bottled water, refreshments), conduct informal conversations, and leave business cards with message \"We're building something to help you. We want your input.\"\n• Shadow 2-3 drivers for full days ($50-100/day), document workflow/pain points, take photos/videos with permission, and identify potential \"champion\" drivers.\n• Meet with 5-6 potential anchor clients positioning as seeking feedback not selling, understand procurement processes, and identify 2-3 warm prospects.\n• Conduct formal meeting with local Assemblyman seeking counsel and blessing for community entry.\n• Capture professional photos of operations, video testimonials from drivers about challenges, B-roll footage of water delivery ecosystem, and voice memos of local communication styles.\n• Create LinkedIn company page, post real-time trip updates if appropriate, gather emails for \"Early Access\" list, and set up Google Analytics.",

  "2026-03": "• Rewrite all marketing messaging using actual stakeholder language, incorporate observed pain points, quantify value propositions with real numbers, and create \"day in the life\" scenarios.\n• Develop case study templates for anchor clients, drivers, and depot partners with quantifiable metrics.\n• Write 2-3 blog posts: \"Hidden Cost of Unreliable Water in Accra's Economy,\" \"Technology Empowering Ghana's Informal Logistics,\" and \"Three-Sided Marketplace Model: Lessons from African Infrastructure.\"\n• Commission illustrated infographics (current vs. WaterOS system), \"How It Works\" diagrams for each stakeholder, app interface mockups, and Ghanaian-context icons.\n• Create content calendar (April-September) with weekly blog topics, monthly social media themes, email drip sequences, PR story angles, and media target list.\n• Establish monthly WhatsApp check-in protocol with warm anchor prospects sharing valuable content, maintain community leader relationships, and keep champion drivers engaged.",

  "2026-04": "• Launch Website V2 with separate stakeholder pages, segmented email capture, WhatsApp integration, mobile-first design, FAQ addressing trust concerns, and \"In the News\" section.\n• Design \"Founding Partner\" programs: drivers (zero fees 3 months, priority orders, badge, swag, dedicated support), anchor clients (50-70% discount, account manager, priority service, feature input, case study), depot owners (free SaaS 6 months, training, co-marketing, analytics).\n• Build AI templates for hyper-personalized B2B outreach customized by industry/location/size and test on small batch.\n• Research and test AI voice/SMS services for Ghanaian accent with natural, culturally appropriate, bilingual messaging.\n• Set up AI monitoring dashboard for local news water mentions, social media water discussions, weather patterns, and construction announcements.\n• Compile list of Ghana journalists (Daily Graphic, Business & Financial Times, GhanaWeb, Citi FM, Joy FM), research their beats, draft press release templates, and begin informal relationship building.\n• Reach out to construction suppliers/contractors associations, Ghana Hotels Association, Chamber of Commerce, and mobile money providers for partnerships.",

  "2026-05": "• Develop customized proposals for each target anchor client showing current costs, WaterOS projected costs with pilot discount, reliability guarantee with SLA metrics, implementation timeline, and risk mitigation.\n• Present proposals professionally in-person with testimonial videos, app mockups, addressing platform dependency concerns, and key pitch: \"We guarantee you'll never run out of water again, or we refund you completely.\"\n• Host informal \"town hall\" at local venue inviting 15-20 drivers with refreshments, present opportunity with guaranteed anchor orders, explain earning potential, gather feedback, and sign up 5-8 interested drivers on the spot.\n• Visit 2-3 strategic depot owners, present SaaS value proposition (digital inventory, demand forecasting, payment processing, analytics), demonstrate mockups, and sign 1-2 depot partners.\n• Distribute professional branded merchandise (t-shirts for committed drivers, caps for depot workers, water bottles for anchor clients, truck stickers).\n• Conduct professional photography session with committed partners, capture video testimonials about excitement, film pilot preparation B-roll.\n• Brief 1-2 trusted local journalists on background (embargoed until launch) framing as \"local tech initiative empowering Ghanaian water entrepreneurs.\"\n• Update Assemblyman on progress and commitments, request endorsement for community introduction, and discuss potential launch event.",

  "2026-06": "• Launch \"WaterOS Drivers Club\" WhatsApp community providing daily traffic/depot queue/checkpoint updates, weekly maintenance tips, monthly income strategies with light moderation (founder + champion drivers as admins, invite-only growth, goal: 50+ members end of June, 100+ by August).\n• Create private WhatsApp groups for pilot drivers (5-8), anchor clients (2-3), and depot partners (1-2) to share development updates, gather feature input, and build co-creator ownership.\n• Publish 2 blog posts per month, share on LinkedIn with targeted hashtags, post in Ghana tech/business groups, email to subscribers, and pursue guest posts.\n• Launch Twitter/X account posting 3x weekly (industry insights, behind-scenes updates, informal economy stories, infrastructure commentary), engage with Ghana tech influencers, and interact with potential partners.\n• Run Facebook/Instagram ads hyper-local to launch pod ($200-300 budget) offering \"Join Waitlist - Founding Members Get 25% Off\" with real trip photos (goal: 100+ launch pod emails).\n• Continue partnership development with industry associations, hotel groups, mobile money providers, and Chamber of Commerce.",

  "2026-07": "• Sign hard contracts with anchor clients, formalize driver agreements (terms/fees/support), finalize depot agreements, and address last-minute concerns.\n• Conduct full-day hands-on training for pilot drivers (app walkthrough, order workflow, payment management, quality standards, customer service, troubleshooting) and train depot partners and anchor clients.\n• Execute mock deliveries with pilot drivers, test all systems end-to-end, identify and fix workflow issues, and build confidence.\n• Conduct professional video shoot capturing driver testimonials about excitement, anchor client testimonials about problem solved, training behind-the-scenes, and photos for all launch materials.\n• Host small community blessing event with Assemblyman, introduce pilot partners, frame as community initiative, and take photos for PR.\n• Print all launch materials locally in Accra: driver materials (visual how-to guides bilingual, FAQ sheets, branded vehicle decals, ID cards, referral cards), purchaser B2C materials (tri-fold brochures, pricing guides, ordering instructions, comparison charts), purchaser B2B materials (service agreements, onboarding packets), depot materials (SaaS quick start guides, training manuals), and community materials (door hangers, flyers, posters).\n• Finalize press release, create media kit (founder bio, company overview, high-res photos, FAQs), develop interview talking points (community empowerment focus, local partner success, water crisis data), and schedule 2-3 media interviews for early September.\n• Launch Website V3 with live registration/onboarding for all sides, transparent pricing page, video explainer How It Works, comprehensive FAQs, Founding Partners page, WhatsApp live chat, Success Stories section, Press page, testimonials, real photos, community endorsements, security/privacy policy, and contact info.\n• Finalize referral program (customers: refer friend both get GHS 50; drivers: refer driver get GHS 100 after 10th delivery, refer customer get GHS 20) with digital/physical cards, tracking system, and promotional graphics.",

  "2026-08": "• Week 1 (Aug 1-7): Place mysterious branded posters at 5-10 key launch pod locations reading \"The water problem has a solution. Coming Soon to [Neighborhood]\" with only website URL and WhatsApp. Post daily social media countdown with no details. Have champion drivers and depot partners drop hints.\n• Week 2 (Aug 8-14): Host Saturday Aug 10 community reveal event with founder presentation, live demo, Q&A. Post launch video simultaneously across all channels. Distribute press release to all media contacts. Replace teaser posters with full WaterOS branded posters and apply branded decals to pilot trucks.\n• Week 3 (Aug 15-21): Post daily educational social media content (How to Order, Driver Spotlight, Transparent Pricing, testimonials). Print and distribute 500 door-to-door visual guides. Host community Q&A. Launch 11-day email drip campaign.\n• Week 4 (Aug 22-31): Post daily social media countdown \"10 days until reliable water.\" Identify 3-5 micro-influencers in launch pod. Distribute final flyer round to every household/business. Launch radio sponsorships on popular stations. Create minute-by-minute launch day schedule. Conduct final briefing with all pilot partners.",

  "2026-09": "• Week 1 (Sept 1-7): Execute September 1 6:00 AM launch with pre-arranged first order. Post real-time content throughout day. Distribute morning press release, secure radio mentions. Host end-of-day gathering with pilot partners. Founder personally involved in every delivery. Post daily content rhythm showcasing success stories and fixing issues immediately.\n• Week 2 (Sept 8-14): Launch Facebook/Instagram ads ($50-75/day) hyper-local with real customer photos. Hire 2-3 local youth for door-to-door flyering. Host Saturday afternoon community demo event. Write \"Week 1 Success Stories\" blog post. Run daily Driver Spotlight Series. Reach out to launch journalists with Week 1 success story. Heavily promote referral incentives.\n• Week 3 (Sept 15-21): Open Wave 2 driver applications if needed. Create case studies on most successful pilot driver and anchor client. Identify 10-15 similar businesses for B2B outreach. Request opportunity to present at local hotel/construction association meeting. Host mid-month appreciation event. Run user-generated content campaign. Partner with Residents' Association.\n• Week 4 (Sept 22-30): Analyze marketing performance (CAC, conversion rates, retention). Deploy customer survey measuring NPS. Create comprehensive case studies (anchor client, top driver, depot partner). Identify 2-3 potential Pod 2 locations and begin research. Document everything into replicable expansion playbook. Publish comprehensive \"September Success Report.\" Send personal thank you messages to all pilot partners. Implement top feature requests and optimize based on learnings.",

  "2026-10": "• Collect intensive feedback from your first clients and drivers.\n• Focus product strategy on removing friction from the core transaction loop (ordering, notifications, payment settlement).\n• Iterate rapidly based on real-world usage data.",

  "2026-11": "• Begin designing and validating simple SaaS tools that make suppliers dependent on your platform.\n• Develop basic digital inventory management for depots.\n• Create simple earnings tracker for drivers.",

  "2026-12": "• With a stable driver network in your pod, begin scoping the consumer-facing app.\n• Conduct 10-15 new interviews with residential households within your launch pod to validate their specific needs.\n• Define the B2C product requirements and feature set.",

  "2027-01": "• Analyze the key metrics for success in your first pod.\n• Document findings and processes into a comprehensive \"Launch Playbook.\"\n• Identify what worked well and what needs improvement for future expansion.",

  "2027-02": "• Identify and begin on-the-ground research in your next target expansion pod.\n• Use your playbook to accelerate the validation and B2B anchor client identification process.\n• Apply lessons learned from Pod #1 to streamline the process.",

  "2027-03": "• Based on learnings, create a 12-month forward-looking product roadmap.\n• Include B2C app launch timeline, advanced SaaS features, and potential integrations.\n• Define the long-term product vision for multi-pod scaling.",

  "2027-04": "• Finalize plans for scaling the product across multiple pods and potentially new cities.\n• Continue refining the long-term roadmap based on ongoing Pod #1 and Pod #2 performance.\n• Prepare for accelerated expansion phase."
};

// Helper function to build unified tasks array with metadata
const buildUnifiedTasks = (): Task[] => {
  const tasks: Task[] = [];

  const dataByDomain = {
    travel: travelData,
    market: marketData,
    gtm: gtmData,
    technical: technicalData,
    hiring: hiringData,
    business: businessOpsData,
    legal: legalData,
    marketing: marketingData
  };

  domains.forEach(domain => {
    const domainData = (dataByDomain as any)[domain.key];
    if (domainData) {
      months.forEach(month => {
        const content = domainData[month.key];
        if (content) {
          tasks.push({
            domain: domain.key,
            domainName: domain.name,
            month: month.key,
            monthDisplay: month.display,
            content: content
          });
        }
      });
    }
  });

  return tasks;
};

// Build the unified tasks array
const allTasks = buildUnifiedTasks();

// Parse content into individual task items
const parseTasks = (content: string): string[] => {
  if (!content) return [];

  const lines = content.split('\n');
  const tasks: string[] = [];
  let currentTask = '';

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•')) {
      if (currentTask) tasks.push(currentTask);
      currentTask = trimmed.substring(1).trim();
    } else if (trimmed && currentTask) {
      currentTask += ' ' + trimmed;
    } else if (trimmed) {
      currentTask = trimmed;
    }
  });

  if (currentTask) tasks.push(currentTask);

  return tasks.filter(t => t.length > 0);
};

// Domain color mapping
const getDomainColor = (domainKey: string): string => {
  const colors: { [key: string]: string } = {
    travel: "bg-green-100 text-green-800 border-green-300",
    market: "bg-blue-100 text-blue-800 border-blue-300",
    gtm: "bg-purple-100 text-purple-800 border-purple-300",
    technical: "bg-orange-100 text-orange-800 border-orange-300",
    hiring: "bg-pink-100 text-pink-800 border-pink-300",
    business: "bg-yellow-100 text-yellow-800 border-yellow-300",
    legal: "bg-red-100 text-red-800 border-red-300",
    marketing: "bg-indigo-100 text-indigo-800 border-indigo-300"
  };
  return colors[domainKey] || "bg-gray-100 text-gray-800 border-gray-300";
};

interface IndividualTask {
  domain: string;
  domainName: string;
  taskText: string;
  taskIndex: number;
  isTravel: boolean;
}

interface ByMonthProps {
  completedTasks: Set<string>;
  toggleTask: (taskKey: string) => void;
}

export default function ByMonth({ completedTasks, toggleTask }: ByMonthProps) {
  const [selectedMonth, setSelectedMonth] = useState(months[0].key);
  const [copied, setCopied] = useState(false);

  // Filter tasks for the selected month and flatten into individual tasks
  const tasksForMonth = allTasks.filter(task => task.month === selectedMonth);

  const individualTasks: IndividualTask[] = [];
  tasksForMonth.forEach((task) => {
    const parsed = parseTasks(task.content);
    const isTravel = task.domain === "travel";

    if (isTravel) {
      // For travel, just show the content as-is
      individualTasks.push({
        domain: task.domain,
        domainName: task.domainName,
        taskText: task.content,
        taskIndex: 0,
        isTravel: true
      });
    } else {
      // For other domains, create individual task items
      parsed.forEach((taskText, idx) => {
        individualTasks.push({
          domain: task.domain,
          domainName: task.domainName,
          taskText,
          taskIndex: idx,
          isTravel: false
        });
      });
    }
  });

  const selectedMonthDisplay = months.find(m => m.key === selectedMonth)?.display || "";

  const generateCopyText = () => {
    let text = `# Execution Plan - ${selectedMonthDisplay}\n\n`;

    // Group tasks by domain
    const tasksByDomain: { [domain: string]: IndividualTask[] } = {};
    individualTasks.forEach(task => {
      if (!tasksByDomain[task.domain]) {
        tasksByDomain[task.domain] = [];
      }
      tasksByDomain[task.domain].push(task);
    });

    // Format each domain's tasks
    domains.forEach(domain => {
      const domainTasks = tasksByDomain[domain.key];
      if (domainTasks && domainTasks.length > 0) {
        text += `## ${domain.name}\n`;
        if (domain.subtitle) text += `${domain.subtitle}\n`;
        text += '\n';

        domainTasks.forEach(task => {
          if (task.isTravel) {
            text += `${task.taskText}\n\n`;
          } else {
            text += `- ${task.taskText}\n`;
          }
        });
        text += '\n';
      }
    });

    return text;
  };

  const handleCopy = async () => {
    try {
      const text = generateCopyText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">By Month</h1>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Version: 1.0 | Last Updated: 2025-11-25</p>
      </div>

      {/* Month selector chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {months.map(month => (
          <button
            key={month.key}
            onClick={() => setSelectedMonth(month.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedMonth === month.key
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {month.display}
          </button>
        ))}
      </div>

      {/* Selected month display */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{selectedMonthDisplay}</h2>
      </div>

      {/* Tasks for selected month in three columns */}
      {individualTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {individualTasks.map((task, idx) => {
            const taskKey = `${task.domain}-${selectedMonth}-${task.taskIndex}`;
            const isCompleted = completedTasks.has(taskKey);

            return (
              <div
                key={idx}
                className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-all ${
                  isCompleted ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!task.isTravel && (
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleTask(taskKey)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border flex-shrink-0 ${getDomainColor(task.domain)}`}>
                        {task.domainName}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
                    } ${task.isTravel ? 'font-medium' : ''}`}>
                      {task.taskText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks scheduled for this month.</p>
        </div>
      )}
    </div>
  );
}
