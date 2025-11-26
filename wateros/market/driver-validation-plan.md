# Driver Validation Plan
**Version:** 1.0 | **Last Updated:** 2025-11-22

## Core Philosophy
Test behavior, not opinions. We're running lean "Wizard of Oz" experiments where your researcher manually simulates the platform's core value to see if drivers actually change their behavior and are willing to pay.

## Pre-Launch: Recruit the "Beta Driver Group"

**Timeline:** Week 0 (do this immediately)

**Action:** Your researcher recruits 10-15 drivers for a private WhatsApp group

**The Pitch:**

"I'm testing a new FREE service to help truck drivers save time and money. Can I add you to a private WhatsApp group where I'll send you helpful alerts and job opportunities? You can leave anytime, and there's no commitment."

**Selection Criteria:**

- Mix of owner-operators and fleet drivers
- Different depot preferences (geographic diversity)
- Range of experience levels (1 year to 10+ years)
- At least a few who are tech-comfortable and communicative

**Success Metric:** 10+ drivers actively join and respond to initial messages

---

## Testing Sequence: Run in Priority Order Based on Pain Scores

Once your researcher completes the pain point scoring from her interviews, run these experiments in order from highest-scoring pain to lowest. Only test the top 2-3 (don't exhaust driver goodwill testing everything).

---

## 🧪 Experiment 1: "Human Waze" (Traffic & Routing)

**Run this if:** "Wasted Time/Fuel (Traffic)" scores 7+ average

### Week 1: Passive Traffic Intelligence

**What Your Researcher Does:**

- Monitors Google Maps, Waze, local Twitter/radio for Accra traffic 3x daily (9am, 12pm, 3pm)
- Broadcasts to WhatsApp group:

  "⚠️ TRAFFIC ALERT (9:30am): Major accident on N1 near Accra Mall. 2+ hour delays. Use Spintex Road instead."

**What You're Measuring:**

- **Engagement:** How many drivers respond? ("Thanks!" "Is it clear now?")
- **Co-production:** Do drivers start voluntarily reporting traffic? ("Stuck at Osu Circle, avoid!")
- **Reported value:** End-of-week survey: "How many times did these alerts help you? 0 / 1-2 / 3-5 / 6+"

### Week 2: Active VIP Routing

**What Your Researcher Does:**

- Announces: "This week I'm offering FREE personal routing to the first 5 drivers each day. WhatsApp me your start point and destination, I'll find you the fastest route."
- When a driver requests, she uses Google Maps/Waze to plot optimal route
- Sends detailed directions via WhatsApp or screenshot
- Follows up: "How was that route? Did it save you time?"

**What You're Measuring:**

- **Demand:** Do drivers request routing help?
- **Reported savings:** Do drivers report actual time/fuel savings?
- **Repeat behavior:** Do the same drivers request routing again the next day?

### Week 3: Value Validation

**The Ask:**
"Thanks for testing! Next week, I'm going to charge GHS 5/day for the routing service (traffic alerts stay free). Who wants to continue?"

**Success Criteria:**

- ✅ 70%+ drivers report saving time/fuel
- ✅ 50%+ continue using after Week 1
- ✅ 3+ drivers pay GHS 5 for Week 3 routing service
- ✅ Drivers spontaneously share traffic intel (co-production signal)

**Kill Signal:** If <30% engage or nobody will pay, this pain isn't big enough to build around.

---

## 🧪 Experiment 2: "Depot Scout" (Finding Water)

**Run this if:** "Finding Water (Supply Search)" scores 7+ average

### Week 1: Morning Supply Intelligence

**What Your Researcher Does:**

- Calls or visits 5-7 major depots every morning at 8am
- Asks: "Do you have water? What's the queue like?"
- Broadcasts to WhatsApp group by 8:30am:

  "💧 WATER UPDATE (8:30am):
  ✅ Depot A (Weija): HAS WATER - Short queue
  ❌ Depot B (Nsawam): NO WATER (closed today)
  ⚠️ Depot C (Teshie): LOW - Long queue (2+ hours)"

**What You're Measuring:**

- **Behavior change:** Daily check-ins: "Did today's update change where you went?"
- **Saved trips:** "Did this save you a wasted trip to an empty depot?"
- **Engagement:** Are drivers checking the group before leaving?

### Week 2: Add Midday Update + Crowdsourcing

**What Your Researcher Does:**

- Continues morning updates
- Adds 12pm midday update (call depots again)
- Announces: "Help me keep this accurate! After you fill up, reply with: [Depot Name] + [Water Status] + [Queue Time]. First 3 reports each day get GHS 5 airtime."

**What You're Measuring:**

- **Crowdsourcing viability:** Do drivers actually report back?
- **Data quality:** Are driver reports accurate compared to her depot calls?
- **Network effects:** Do drivers start relying on each other's updates?

### Week 3: Value Validation

**The Ask:**
"I'm going to start charging GHS 20/week for guaranteed morning water updates. Who wants to subscribe?"

**Alternative Test (Higher Value):**
"Tomorrow I have EXCLUSIVE info on a small depot that just got a big delivery. Only paying members get the location. GHS 30 for tomorrow's intel. Who's in?"

**Success Criteria:**

- ✅ 60%+ report avoiding at least one wasted trip
- ✅ 40%+ say they'd pay for consistent supply intel
- ✅ 5+ drivers pay for Week 3 or exclusive intel
- ✅ Drivers successfully crowdsource depot data

**Kill Signal:** If drivers don't change depot decisions based on intel, the pain isn't actionable.

---

## 🧪 Experiment 3: "Queue Intel + Express Lane" (Depot Wait Times)

**Run this if:** "Depot Wait Times (Queues)" scores 7+ average

### Week 1: Queue Length Data

**What Your Researcher Does:**

- Combines with Experiment 2 (if running both)
- Adds queue info to supply updates:

  "💧 WATER UPDATE (8:30am):
  ✅ Depot A (Weija): HAS WATER - 3 trucks waiting (~30min)"
- End-of-week interviews: "Did knowing queue lengths change where you went?"

**What You're Measuring:**

- **Decision impact:** Do drivers explicitly choose depots based on queue data?
- **Value perception:** "On a scale of 1-10, how valuable is queue info?"

### Week 2: The "Express Lane" Test (Critical!)

**What Your Researcher Does:**

- Negotiates with ONE friendly depot manager:

  "I want to pre-buy 10 'priority slots' for my drivers this week. They can skip the queue. I'll pay you [Normal Price + GHS 20 premium]. Can we do this?"

- Posts to group:

  "🚀 EXPRESS LANE TEST:
  I have 10 priority slots at Depot C this week.
  Skip the entire queue. Normal price + GHS 30 premium.
  Pay me via MoMo NOW to reserve your slot. First-come, first-served."

**What You're Measuring:**

- **Willingness to pay:** How fast do slots sell out?
- **Price sensitivity:** If they don't sell at GHS 30, try GHS 15 the next day
- **Driver feedback:** "Was skipping the queue worth the premium?"

### Week 3: Revenue Model Test

**Scale the Express Lane:**

- If slots sold out, offer 20 slots next week at same price
- Track: repeat customers (same drivers buying again = strong signal)

**Success Criteria:**

- ✅ 50%+ drivers say queue intel changes their decisions
- ✅ 7+ drivers pay premium for express lane access
- ✅ Multiple drivers purchase express slots repeatedly
- ✅ Drivers explicitly say time savings justifies cost

**Kill Signal:** If nobody pays for express access, queues aren't painful enough to monetize.

---

## 🧪 Experiment 4: "Instant Pay Broker" (Payment Issues)

**Run this if:** "Payment Issues (Collections)" scores 7+ average

### Week 1: Find Beta Purchasers

**What Your Researcher Does:**

- Recruits 3-5 "beta purchasers" (hotels, guesthouses, restaurants, residential customers)
- Pitch: "Pay me upfront via Mobile Money. I guarantee a reliable truck will deliver. No cash, no hassle."
- Gets at least 3 pre-paid orders lined up for Week 2

### Week 2: The "Water OS Job" Test

**What Your Researcher Does:**

- Posts guaranteed-payment jobs to driver WhatsApp group:

  "💰 WATER OS JOB (Osu): 10,000L
  ✅ Customer has ALREADY PAID ME
  ✅ Instant MoMo payment to you = GHS 800
  ✅ No cash handling, no chasing payment
  Reply 'CLAIM' to get this job."

- **Critical:** Pays driver via Mobile Money within 5 minutes of delivery confirmation
- Compares: How fast is this job claimed vs. normal cash jobs in the informal market?

**What You're Measuring:**

- **Claim speed:** Is there fierce competition for guaranteed-payment jobs?
- **Driver reaction:** Record exact quotes after payment. "That was amazing." "When's the next one?"
- **Preference signal:** Do drivers explicitly ask for more "Water OS jobs"?

### Week 3: Price Sensitivity Test

**The Ask:**
"I have 5 more guaranteed instant-pay jobs this week. But I need to charge 10% platform fee (so you get GHS 720 instead of GHS 800). Who wants them?"

**Alternative Test:**
"What would you accept: GHS 800 cash payment (chase customer yourself) or GHS 720 guaranteed instant MoMo?"

**Success Criteria:**

- ✅ 100% of drivers prefer Water OS guaranteed-payment jobs
- ✅ Jobs claimed within minutes (faster than informal alternatives)
- ✅ 50%+ drivers accept lower rate for instant guaranteed payment
- ✅ Drivers proactively ask for more platform jobs

**Kill Signal:** If drivers don't value instant payment more than informal cash system, payment isn't a big enough pain.

---

## 🧪 Experiment 5: "Confirmed Order" (Cancelled Orders)

**Run this if:** "Cancelled Orders (Wasted Trips)" scores 7+ average

### Week 1-2: Same as Experiment 4, Different Messaging

**What Your Researcher Does:**

- Exact same mechanics as Experiment 4 (pre-paid purchasers, instant MoMo to drivers)
- But changes the messaging focus to emphasize "no cancellation risk":

  "🔒 CONFIRMED ORDER (Osu): 10,000L
  ✅ Customer has PRE-PAID - cannot cancel
  ✅ You are GUARANTEED to be paid for this trip
  ✅ Instant MoMo = GHS 800 on completion
  Reply 'CLAIM' to get this job."

**What You're Measuring:**

- **Messaging resonance:** When drivers claim, ask "Why did you want this job?" Listen for: "I know the customer will actually be there." "No wasted trip."
- **Security perception:** Follow-up question: "How did this feel different from your normal WhatsApp orders?" Listen for: "Safer." "More secure." "Less stressful."
- **Pain validation:** Do drivers explicitly mention cancellation anxiety as a current problem?

### Week 3: Deposit-Based Cancellation Test (Advanced)

**What Your Researcher Does:**

- Posts a regular job (not pre-paid) but with customer deposit:

  "📍 NEW JOB (Legon): 10,000L scheduled for Saturday
  Customer paid GHS 100 deposit
  If they cancel <2hrs before, YOU keep the deposit
  Normal cash payment on delivery
  Who wants it?"

**What You're Measuring:**

- **Deposit value:** Does the deposit make drivers more willing to take the job?
- **Risk mitigation:** Do drivers see this as meaningful protection?

**Success Criteria:**

- ✅ 80%+ prefer confirmed/pre-paid jobs to normal informal orders
- ✅ Drivers explicitly cite "no cancellation" as key benefit
- ✅ Multiple drivers ask "Do you have more confirmed orders?"
- ✅ Drivers willing to accept 5-10% lower rate for cancellation protection

**Kill Signal:** If drivers don't perceive cancellation risk as significant, this isn't a defensible value prop.

---

## 📊 The Meta-Analysis: Week 4 "Value Auction"

After testing the top 2-3 pain points, run this final validation:

### The "Willingness to Pay" Ranking Exercise

**What Your Researcher Does:**

- Brings together 8-10 drivers who participated in multiple experiments
- Runs a structured interview:

  "You've now tested several of our services:
  1. Traffic alerts + routing (saves X time/fuel)
  2. Supply intel (saves Y wasted trips)
  3. Queue intel + express lane (saves Z wait time)
  4. Instant payment (no collections)
  5. Confirmed orders (no cancellations)

  If you could only subscribe to ONE service, and had to pay for it monthly, which would you choose? Rank them 1-5."

**Follow-Up:**

- "How much would you pay per month for your #1 choice?"
- "Would you pay a 10% per-job commission to get your top 2 features?"

**What You're Measuring:**

- **Clear winner:** Does one solution dramatically outrank others?
- **Willingness to pay:** Concrete numbers, not hypotheticals
- **Feature bundling:** Would drivers pay more for multiple solutions combined?

---

## 🚦 Go/No-Go Decision Framework

### ✅ GREEN LIGHT: Build the Platform

You should proceed to build Water OS if ALL of these are true:

- **Strong pain validated:** At least one pain point scored 7+ average across 10+ drivers
- **Behavioral change proven:** 60%+ of drivers demonstrably changed behavior based on manual MVP
- **Willingness to pay confirmed:** 5+ drivers paid real money for manual service OR 50%+ accepted lower per-job rates for platform benefits
- **Repeatable value:** Drivers returned for service multiple times (not just novelty effect)
- **Clear #1 winner:** One solution ranked significantly higher than others in meta-analysis

### 🟡 YELLOW LIGHT: Pivot Required

Consider pivoting if:

- Multiple pain points scored 5-7 (moderate) but none were 8+
- Drivers liked the service but wouldn't pay
- Value was situational (only useful sometimes)
- Manual execution required unsustainable effort (can't automate)

**Pivot Options:**

- Combine multiple moderate-value features into higher-value bundle
- Target different customer segment (focus pure B2B, skip residential)
- Reframe as B2B SaaS tool for depots/fleet operators instead of marketplace

### 🔴 RED LIGHT: Don't Build

Stop if:

- No pain point scored above 6
- Drivers didn't change behavior even with free service
- Zero willingness to pay at any price point
- The "solution" requires being a wholesaler (asset-heavy, not software)

---

## 📅 Recommended Testing Timeline

### Week 0: Setup
- Recruit beta driver group (10-15 drivers)
- Identify top 2-3 pain points from interview scoring

### Weeks 1-2: Test #1 Priority Pain Point
- Run full 2-week experiment for highest-scoring pain
- Measure engagement, behavior change, willingness to pay

### Weeks 3-4: Test #2 Priority Pain Point
- Run second experiment
- Compare results to first test

### Week 5: Meta-Analysis
- Value auction exercise
- Calculate unit economics
- Make go/no-go decision

### Week 6: Decision Point
- ✅ If validated: Begin V1 product scoping and technical build
- 🔴 If not validated: Pivot or abandon

---

## 💡 Key Testing Principles (Pulled from All Three Plans)

- **Test behavior, not opinions** - Watch what drivers do, not what they say
- **Make them pay something** - Even GHS 5 separates "nice to have" from "must have"
- **Measure co-production** - Do drivers contribute intel back? That's network effect potential
- **Track repeat usage** - One-time novelty ≠ sustainable value
- **Use real money flows** - Researcher should actually collect/pay via MoMo to test friction
- **Start with best-case scenario** - If the manual version with free personalized service doesn't work, the automated app definitely won't
- **Kill quickly** - If Week 1 shows no engagement, don't waste Week 2

---

## 🎯 Success Looks Like...

By end of Week 5, you should be able to say:

**"We tested [X solution] with 12 drivers for 3 weeks. They reported saving [Y GHS/hours] per week. 8 of them paid us real money to continue the service. When we asked them to rank all solutions, [X] won by a landslide. The unit economics work: drivers save GHS 100/week, will pay GHS 20/week (20% of savings), giving us GHS 10/driver/week after payment processing. We're ready to build."**

That's your green light.

---

Does this synthesized plan capture everything you need? Which pain point does your gut say will test strongest?
