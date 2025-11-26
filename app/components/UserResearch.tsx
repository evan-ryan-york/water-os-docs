"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define transcript metadata
interface Transcript {
  id: string;
  name: string;
  date: string;
  type: "driver" | "residential" | "commercial" | "depot";
  content: string;
}

// Sample transcripts - replace with actual data
const transcripts: Transcript[] = [
  {
    id: "residential-dorcas-001",
    name: "Residential Interview - Dorcas (Kasoa)",
    date: "2025-10-28",
    type: "residential",
    content: `# Interview Summary: Dorcas – Residential Purchaser

**Location:** Kasoa
**Date:** 28-10-2025
**Duration:** 35 minutes
**Consent:** She did not want to be recorded
**Profile:** Household that occasionally purchases water via tanker, primarily dependent on rainwater

---

## Section 1: Current Water Situation & Sources

**Main source:** Tap water is extremely unreliable — it flows only once every three months.

**Alternative sources:** Household depends mostly on rainwater collection for domestic use (washing, cleaning, and sometimes cooking).

**Use of tanker water:** Tanker water is purchased only during urgent situations, such as when rainwater storage runs out or when water is needed for an event or specific task.

**Household responsibility:** Dorcas explained that her father handles all arrangements related to purchasing tanker water, including calling the driver and making payment.

**Key Quote:**
> "Our tap hardly flows — maybe once in three months. Most times we use rainwater, and only when it finishes does my dad call the tanker to bring some."

---

## Section 2: Ordering Process

**How they order:** The father contacts a known tanker driver directly via phone.

**Driver relationship:** The family uses the same driver repeatedly because they trust his reliability and water quality.

**Timing:** They only order when the rainwater is depleted—not on a fixed schedule.

**Payment method:** Payment is made in cash on delivery. No mobile money or credit arrangements are used.

**Delivery time:** Once the driver is contacted, delivery is usually same-day or within a few hours, depending on driver availability.

**Key Quote:**
> "My dad just calls the same driver we've been using for years. He brings it the same day and gets paid cash."

---

## Section 3: Pain Points & Frustrations

**Main frustration:** The unreliable tap system is the biggest challenge; sometimes they go weeks without any municipal water.

**Cost:** Tanker prices vary, and the family sometimes finds it expensive when demand is high.

**Seasonal difficulty:** During dry seasons, rainwater runs out quickly, and drivers charge more due to higher demand.

**Time pressure:** When rainwater finishes suddenly, they must wait for the driver to be available, which can delay water access.

**Key Quote:**
> "When the weather is dry, it's hard. Prices go up and sometimes we wait a long for the driver to come."

---

## Section 4: Trust & Quality

**Water source:** Dorcas said they don't always know exactly where the tanker driver gets the water, but the family trusts him because they've used him for years without issues.

**Perceived safety:** They don't treat or test the water after delivery — they assume it's safe.

**Trust signals:** Their trust is based on familiarity and past reliability, not on visible quality checks.

**Key Quote:**
> "We've used him for so long. The water looks fine, so we just use it."

---

## Section 5: The "Magic Wand" & Ideal State

**Ideal change:** Dorcas said she would want the tap water to flow regularly — even once a week would be a big improvement.

**Reason:** It would save them the stress and cost of depending on rain and tankers.

**Positive aspect to keep:** She appreciates that the tanker driver is dependable when needed.

**Key Quote:**
> "If the tap would flow at least once a week, that would be perfect. Then we wouldn't always have to worry."

---

## Section 6: Technology & Payments

**Smartphone usage:** Dorcas owns a smartphone and uses WhatsApp and Mobile Money (MTN) regularly.

**Digital familiarity:** She has ordered food, data and airtime online before.

**Openness to digital solutions:** She said she would try an app to order water if it's trustworthy and transparent with pricing.

**Trust condition:** She emphasized that she would want to see reviews or know the driver's reputation before using it.

**Key Quote:**
> "If there was an app where you can see the driver, price, and reviews, I'd try it. But it has to be someone you can trust."

---

## Closing Reflections

Dorcas's experience highlights the severe unreliability of public water supply in peri-urban Accra (Kasoa). Her family depends on rainwater and long-term trust relationships with a single tanker driver.

### Key themes emerging:

- **Reliability gap:** Tap water unavailable most of the time.
- **Price sensitivity:** Cost spikes during dry seasons.
- **Trust-based transactions:** Dependence on personal relationships over formal systems.
- **Digital readiness:** Smartphone user, open to mobile solutions if credibility and reliability are ensured.
`
  },
  {
    id: "residential-joy-001",
    name: "Residential Interview - Joy Lamptey (Nautical Nungua)",
    date: "2025-10-29",
    type: "residential",
    content: `# Interview Summary: Joy Lamptey – Residential Purchaser

**Location:** Nautical Nungua
**Date:** 29-10-2025
**Duration:** ~40 minutes
**Participant:** Joy Lamptey (Household member)
**Profile:** Residential household relying on intermittent tap flow and tanker deliveries

---

## Section 1: Current Water Situation & Sources

**Main water access:** The tap water in Nautical Nungua flows only once a week, typically on Thursdays in the afternoon.

**Alternative sources:** During periods without water flow, the household relies on tanker deliveries for their water supply.

**Frequency of tanker orders:** They only order tanker water during shortages, not on a regular schedule.

**Water management responsibility:** The household collectively manages the process, with Joy and her family reaching out to nearby suppliers when needed.

**Key Quote:**
> "Usually on Thursdays in the afternoon the tap is open — that's how we get our water. But when there's no water, we fall on the tanker deliveries."

---

## Section 2: Ordering Process

**Supplier proximity:** The family typically orders from a neighbor who owns a water tanker.

**Ordering method:** Because the supplier lives nearby, they don't need to make formal calls — they simply reach out directly, and the tanker is delivered.

**Pricing:** A 1,000-liter tanker costs ₵350 during normal periods.

**Payment method:** Payments are made either in cash or via Mobile Money (MoMo).

**Alternative supplier:** When the neighbor's tanker isn't available, they contact another supplier from Accra, though this option is more expensive due to transportation costs.

**Key Quote:**
> "We just call our neighbor — they have a tanker. They bring it right away and we pay ₵350 for 1,000 liters. But if he's not around, I call another guy from Accra, and that one costs ₵450 because of the distance and fuel for 1,000 liters."

---

## Section 3: Pain Points & Frustrations

**Unreliable supply:** Even with a nearby supplier, there are times when the neighbor's tanker is unavailable, forcing them to seek distant alternatives.

**High costs:** The price increases sharply when they must buy from suppliers outside the community (₵450 instead of ₵350).

**Dependency:** Joy expressed frustration about relying entirely on tanker services during shortages, especially when both local and distant suppliers are unavailable.

**Key Quote:**
> "Sometimes my neighbor doesn't have water or he's busy. Then I have to call someone all the way from Accra, which costs more."

---

## Section 4: Trust & Quality

**Water source:** Joy did not specify the exact source of the water but indicated trust in local suppliers since they are neighbors and have never had issues.

**Quality assurance:** There is no formal testing or treatment, but the water is visually inspected and assumed to be clean.

**Trust basis:** The relationship with the supplier is informal but trust-based, reinforced by proximity and familiarity.

**Key Quote:**
> "They're our neighbors, so we trust them. We've never had any problem with the water."

---

## Section 5: The "Magic Wand" & Ideal State

**Ideal solution:** Joy suggested a mobile application system similar to ride-hailing apps (like Bolt) that would allow users to order water easily and transparently.

**Desired features:** The app should display available tankers, prices, and destinations, and allow for digital payments upon delivery.

**Reasoning:** Such a platform would save time, reduce dependency on specific suppliers, and bring clarity in pricing.

**Key Quote:**
> "If there was an app where you can just request water, see the price, and pay on delivery — like how Bolt works — that would really help. It would fast-track some of these challenges."

---

## Section 6: Technology & Payments

**Technology use:** Joy uses a smartphone and is comfortable using mobile money (MTN MoMo) for transactions.

**Digital readiness:** She is open to adopting a digital solution if it ensures reliability, verified suppliers, and transparent pricing.

**Payment preferences:** Prefers pay-on-delivery systems, either digital or cash, for assurance of service.

**Key Quote:**
> "I'd use an app if it's clear and easy — if you can see the tanker and the price before you pay."

---

## Closing Reflections

Joy's experience reflects a semi-urban dependency pattern, where households rely partly on intermittent municipal supply and partly on community-based tanker networks. She expressed strong interest in digital innovation for water delivery, indicating readiness for a solution that blends trust, convenience, and transparency.

### Emerging Themes:

- **Weekly tap access (only Thursdays)** creates reliance on tanker systems.
- **Informal neighborhood water networks** are common.
- **Price differences** are driven by distance and scarcity.
- **Strong openness to digital transformation** — clear demand for a "Bolt-for-water" model.
`
  },
  {
    id: "residential-enoch-001",
    name: "Residential Interview - Enoch (Adenta)",
    date: "2025-10-30",
    type: "residential",
    content: `# Interview Summary: Enoch – Residential Purchaser

**Location:** Adenta
**Date:** 30-10-2025
**Duration:** ~45 minutes
**Participant:** Enoch
**Profile:** Single-occupant household relying on mixed water sources (GWCL, tanker, borehole)

---

## Section 1: Current Water Situation & Sources

**Main source:** Enoch primarily depends on Ghana Water Company Limited (GWCL) supply, but noted it is highly inconsistent — sometimes once a week, other times once every two weeks.

**Alternative sources:** His household has a borehole that helps during shortages. He supplements with tanker deliveries when borehole output is insufficient.

**Water responsibility:** Enoch lives alone, so he personally manages ordering and tracking water supply.

**Usage frequency:** Typically orders tanker water whenever supply runs low, not on a fixed schedule.

**Key Quote:**
> "The normal Ghana water doesn't really flow every time. Sometimes once a week, sometimes once in two weeks. So most often we use tankers around our neighborhood when we need water."

---

## Section 2: Ordering Process

**Finding a supplier:** He initially got his tanker contact through neighbors' recommendations when he moved to the area. He has since maintained the same contact.

**Ordering decision:** He orders when the tank is nearly empty, especially when the tap hasn't flowed for several days.

**Pricing:** The cost is usually ₵500–₵600 per full tank, depending on the tanker size.

**Payment method:** Payment is made either in cash or via Mobile Money (MoMo) depending on what he has at the moment.

**Delivery time:** Tanker deliveries typically arrive within 1 to 4 hours, though this varies depending on the driver's location.

**Reliability:** Enoch reported few issues with lateness but mentioned some minor timing mismatches when he wasn't home.

**Key Quote:**
> "For my tank, I usually pay around ₵500 to ₵600. It depends on them, but they tell you before they come. Sometimes it takes about three or four hours for the water to arrive."

---

## Section 3: Pain Points & Frustrations

**Scheduling conflicts:** The biggest challenge is timing — drivers sometimes arrive later than expected, causing inconvenience when he's not at home.

**Occasional delays:** When delivery timing doesn't align with his availability, the tanker has to return later, delaying access to water.

**Quality concerns:** Once received slightly brownish-colored water; he called to complain but only got a vague response.

**Unverified safety:** He does not know the source of the water and never verifies its cleanliness.

**Key Quote:**
> "Sometimes they give you time and it doesn't work. I've had to tell them to go and come back. And once the water looked brownish — I called, but they just said they'd work on it."

---

## Section 4: Trust & Quality

**Awareness of source:** Enoch admits he has no idea where the drivers fetch water from; suppliers usually claim it's "tap water."

**Verification:** He does not test or treat the water after delivery.

**Perception:** Trust is based purely on repeated transactions rather than verified quality.

**Key Quote:**
> "I don't actually know where they get it from. All I know is there's water coming to my end. They usually say it's tap water."

---

## Section 5: The "Magic Wand" & Ideal State

**Preferred improvements:** Would like to see better water quality and punctual deliveries.

**Systemic wish:** Advocates for a structured system or platform to monitor and coordinate water delivery timing.

**Expectation:** An organized solution would reduce waiting time and ensure consistency and accountability.

**Key Quote:**
> "If there's a system that checks timing and quality of water delivery, I'd be glad. It would make life much easier."

---

## Section 6: Technology & Payments

**Technology use:** Active smartphone user; regularly uses WhatsApp, Facebook, and mobile money (MTN MoMo).

**Experience with digital services:** Has ordered food and transport (Uber) online before and found it convenient.

**Digital readiness:** Open to using an app for water ordering if it guarantees genuineness, safety, and pay-on-delivery options.

**Trust requirement:** Emphasized need for verified suppliers and transparency before adoption.

**Key Quote:**
> "If it's genuine and you can pay on delivery, I'll trust it. Just like ordering food or Uber — you need to be sure the source is right."

---

## Section 7: Additional Insights & Referrals

**Quality emphasis:** Suggested that future research should focus on water quality, not just delivery logistics, since "water is life."

**Network:** Mentioned that neighbors also rely on tanker water and might be open to interviews, depending on timing.

**Availability:** Works night shifts, making daytime coordination more difficult.

**Key Quote:**
> "If there should be more research, it should focus on the quality of water because we use water for everything."

---

## Closing Reflections

Enoch's experience reflects the realities of many single-occupant urban residents who must coordinate multiple informal water sources to maintain household supply. His story reveals strong reliance on recommendation-based networks, moderate satisfaction with existing suppliers, and a desire for regulated, technology-driven systems to ensure reliability and quality.

### Emerging Themes:

- **Intermittent GWCL supply** drives dependence on informal tanker networks.
- **Boreholes provide a limited backup**, reducing but not eliminating tanker reliance.
- **Frustrations center on timing and uncertain water quality.**
- **Digital literacy is high**; strong openness to tech-enabled solutions.
- **Emphasis on trust, verification, and accountability** in any new system.
`
  },
  {
    id: "residential-kwasi-001",
    name: "Residential Interview - Kwasi Junior (Nyaminadom, Kasoa)",
    date: "2025-10-31",
    type: "residential",
    content: `# Interview Summary: Kwasi Junior – Residential Purchaser

**Location:** Nyaminadom, Kasoa (Liberia Camp Area)
**Date:** 31-10-2025
**Duration:** ~45 minutes
**Participant:** Kwasi Junior (Landlord / Resident Manager)
**Profile:** Lives in a compound house with multiple tenants; responsible for managing household and tenant water arrangements

---

## Section 1: Current Water Situation & Sources

**Context:** Enoch lives in a compound house at Nyaminadom, near Kasoa Liberia Camp, an area currently experiencing major road construction.

**Previous situation:** Water supply from Ghana Water Company Limited (GWCL) used to be stable, flowing almost daily except Thursdays or Wednesdays.

**Current situation:** Over the past three to four months, water flow has drastically reduced, forcing residents to buy tanker water weekly.

**Household structure:** The compound has many tenants, who share a 1,000-litre "Rambo" poly tank for storage.

**Usage:** Tanker water doesn't last a week because tenants hoard water, do laundry frequently, and store extra for themselves.

**Cost burden:** The current tanker cost is ₵400 per trip for 500-1000 litres, compared to ₵22–₵23 per person per month under the GWCL system — making tanker dependence significantly more expensive.

**Key Quote:**
> "It used to flow every day, but for the past three months we constantly need to buy water. A small truck costs ₵400, and it doesn't even last us a week. Before, we paid just ₵22 a month for Ghana Water."

---

## Section 2: Ordering Process

**Supplier type:** The compound purchases water from individual truck owners, not formal companies.

**Supplier identification:** Tanker drivers drive through the neighborhood looking for customers. Residents flag them down or call directly when in need.

**Delivery delays:** On several occasions, they have had to wait three days for delivery — e.g., ordered on Sunday, received on Wednesday.

**Water source uncertainty:** The drivers claim to fetch "tap water", sometimes from Winneba, but this cannot be verified.

**Payment method:** All transactions are cash on delivery. No digital or credit arrangements exist.

**Key Quote:**
> "We ordered on Sunday and got the water on Wednesday. The driver said they had to go as far as Winneba to get 'tap water'—but we can't confirm where it really comes from."

---

## Section 3: Pain Points & Frustrations

**Unverified quality:** Residents don't know where the water comes from or whether the tanker is cleaned after previous use.

**Cross-use contamination risk:** Same tankers may supply farms and domestic users without cleaning between trips.

**Price volatility:** Prices fluctuate between ₵400 and ₵500, depending on demand. Drivers exploit scarcity, knowing residents have no choice.

**Dependency:** Residents feel trapped by the lack of alternatives — they must buy water "anyhow it comes."

**Operational delay:** Water shortages cause discomfort and tension among tenants, especially when the tank empties midweek.

**Key Quote:**
> "We don't even know how clean the water is. The same truck could go to a river for farmers and come back to supply us — but hey, we need water, so we accept it anyhow."

---

## Section 4: Trust & Quality

**Supplier relationship:** Entirely informal and transactional; based on availability rather than trust.

**Quality verification:** No testing or filtering is done. Residents assume it's safe because they have no better option.

**Transparency gap:** Residents don't know the water source or sanitation process of the tankers.

**Key Quote:**
> "They say it's tap water, but we can't verify. We just take it because we need water."

---

## Section 5: The "Magic Wand" & Ideal State

**Proposed solution:** Enoch suggested introducing a prepaid metering system for water — similar to electricity prepaid meters — where each tenant pays for what they consume.

**Motivation:** Shared water bills create conflict and unfair cost distribution among tenants; prepaid metering would encourage accountability and reduce wastage.

**Outcome expectation:** Such a system would ease landlord burden, ensure fair billing, and reduce overuse.

**Key Quote:**
> "If we had prepaid water meters like electricity, everyone could buy their own credit. Those who waste will pay for it, and landlords won't bear the cost."

---

## Section 6: Technology & Payment

**Payment method:** Strictly cash-based, as tanker operators are informal.

**Digital readiness:** Enoch is open to formalized digital systems, especially those involving metering and billing integration with GWCL.

**Trust factor:** For him, the credibility of the supplier and quality assurance are more important than convenience alone.

**Key Quote:**
> "If organizations can work with Ghana Water to bring prepaid meters, it will help the average Ghanaian. It will make things fair."

---

## Section 7: Additional Insights

**Socioeconomic pressure:** The compound structure magnifies the burden of unreliable water supply, as collective consumption leads to conflict and cost escalation.

**Institutional gap:** Residents are willing to pay for formal systems if it ensures reliable access and quality assurance.

**Practical innovation idea:** The prepaid water meter concept represents a grassroots-driven technological solution worth exploring.

---

## Closing Reflections

Enoch's case illustrates the structural vulnerability of urban compound living in water-scarce zones. His narrative highlights how collective water management becomes a daily negotiation between cost, quality, and access. It also reveals a strong public readiness for technological innovation, including smart metering and digital tracking, to improve fairness and accountability.

### Emerging Themes:

- **Shift from stable tap supply to full tanker dependency**
- **Informal supplier ecosystem with no quality verification**
- **High price sensitivity and exploitation during scarcity**
- **Collective water use challenges in compound settings**
- **Innovative citizen-led proposals (prepaid metering)**
`
  },
  {
    id: "residential-ama-001",
    name: "Residential Interview - Ama Agata (Sakumono)",
    date: "2025-11-05",
    type: "residential",
    content: `# Interview Summary: Ama Agata – Residential Purchaser (Sakumono)

**Location:** Sakumono, Greater Accra Region
**Date:** 5-11-2025
**Duration:** ~30 minutes
**Participant:** Ama Agata (Resident, Sakumono)
**Profile:** Household head in a residential community that has experienced prolonged water shortages. Relies entirely on private water tanker deliveries for daily needs.

---

## Section 1: Current Water Situation & Sources

Ama Agata explained that the tap in her area has not been flowing for the past year.

As a result, her household depends completely on tanker water deliveries for all domestic use — bathing, cooking, laundry, and cleaning.

She usually purchases 400 to 500 gallons of water per delivery, depending on the size of the container and the availability of drivers.

Water is bought from private tanker operators who she contacts directly whenever the household supply runs low.

**Key Quote:**
> "The tap hasn't flowed for a year now. Every week we have to buy water — 400 or sometimes 500 gallons — depending on who's available."

---

## Section 2: Procurement & Cost

The price of water has increased significantly compared to the normal bills she used to pay when Ghana Water was flowing.

Previously, she paid a fixed monthly rate for piped water, but now the cost per purchase is much higher because of fuel prices and delivery charges.

Feels that the situation is unfair — residents are paying more for an essential service that should be regularly provided.

She often calls different suppliers to compare prices or find whichever tanker is available fastest.

**Key Quote:**
> "It's too expensive now. Before, I didn't pay like this. But because we don't have water from the tap, we have no choice."

---

## Section 3: Frequency & Reliability

Buys water every week or every 10 days, depending on household usage.

There is no fixed supplier — she calls whichever tanker is nearby or recommended by neighbors.

Delivery times can be unpredictable; sometimes she waits hours or even a full day before getting a response.

Expressed frustration that tanker drivers often delay or cancel, citing fuel shortages or long queues at depots.

**Key Quote:**
> "Sometimes you'll call them, and they'll say they're at the depot or they don't have water yet. You just have to wait."

---

## Section 4: Emotional Impact & Frustration

Described the experience as "disappointing and exhausting", especially since she has been living with this situation for a full year.

The lack of consistent water supply affects her family's daily routine — cleaning, cooking, and sanitation have become stressful.

Mentioned that it's frustrating to spend extra money on something as basic as water when it should be a guaranteed public service.

**Key Quote:**
> "It's disappointing. For one whole year, no water from the tap — and now we're spending more than ever just to get by."

---

## Section 5: Quality & Safety

She does not always trust the quality of the tanker water but says she has no choice.

Sometimes the water looks slightly unclear, but she still uses it for washing and cleaning.

For cooking and drinking, she often buys sachet ("pure") water instead.

Has never asked the tanker drivers about where they fetch their water from.

**Key Quote:**
> "You can't be sure if it's clean or not. We just use it because we have to — for cooking, I prefer sachet water."

---

## Section 6: The "Magic Wand" & Ideal State

If she could change one thing, it would be for Ghana Water to restore tap flow in Sakumono.

Wishes for regular, reliable piped water, so households wouldn't need to depend on expensive tanker deliveries.

Also suggested that if tanker delivery systems were regulated, prices would be more consistent and affordable.

Believes water should not be "a luxury" but a basic necessity that everyone should access at a fair cost.

**Key Quotes:**
> "If only Ghana Water would fix whatever the problem is, we wouldn't be suffering like this."

> "At least they should make the tanker prices uniform — everyone is charging differently."

---

## Emerging Themes & Observations

- Prolonged tap outages (over one year) have forced residents into total dependence on private tanker systems.
- Rising costs and inconsistent supply are major household concerns.
- Lack of trust in water quality and unregulated pricing create additional burdens.
- The situation in Sakumono mirrors broader supply issues — communities near urban centers are still underserved despite infrastructure presence.

---

## Pain Point Scorecard – Ama Agata (Residential Purchaser, Sakumono)

| Pain Point | Score (1–10) | Notes / Justification |
|------------|--------------|----------------------|
| **1. Cost of Water** | **10 / 10** | Water expenses have more than doubled. She now pays GHS 300–450 weekly for tanker deliveries — far higher than her past Ghana Water bills. Describes the cost as "too much." |
| **2. Reliability of Supply** | **9 / 10** | Tap has not flowed for over a year; entirely dependent on tanker drivers whose schedules are inconsistent. Sometimes must wait hours or days. |
| **3. Access / Availability** | **9 / 10** | Not always easy to find a tanker with available water. Drivers report shortages at depots, causing frequent delivery delays. |
| **4. Quality & Safety of Water** | **8 / 10** | Uncertain about source and treatment; assumes it's "treated borehole" water but lacks verification. Uses sachet water for cooking and drinking. |
| **5. Regulation / Fairness** | **8 / 10** | Frustrated with lack of government oversight on tanker pricing and supply; believes authorities should regulate depots and ensure fairness. |

### Top Pain Points
- 🟩 High Cost of Water (10/10)
- 🟩 Reliability & Access (9/10)

### Secondary Pain Points
- 🟧 Water Quality (8/10)
- 🟧 Regulation / Fairness (8/10)

### Summary Insight
Ama Agata's household has faced a year-long water outage, forcing complete dependence on private tanker operators. The cost burden, combined with inconsistent delivery and unverified quality, reflects deep systemic inequities in residential water access. Her story captures the lived experience of urban water insecurity, where survival depends on affordability, trust, and chance rather than guaranteed public service.
`
  },
  {
    id: "commercial-water-seller-001",
    name: "Community Water Seller Interview (Sakumono)",
    date: "2025-11-06",
    type: "commercial",
    content: `# Interview Summary: Community Water Seller – Sakumono Area

**Location:** Sakumono, Greater Accra Region
**Date:** 6-11-2025
**Duration:** ~38 minutes
**Participant:** Male respondent (Name withheld)
**Profile:** Operates a small water-selling business using two polytanks (1,000L and 400L). Purchases water from tanker drivers and resells to households in his community.

---

## Section 1: Business Overview

The respondent operates a small, informal water distribution business within the Sakumono community.

He owns two polytanks (1,000L and 400L), which he fills with water purchased from tanker drivers.

He resells to nearby residents when taps stop flowing — a common issue that has persisted for over a year.

He is responsible for all purchasing, transportation arrangements, and pricing decisions. The business is fully self-managed, and demand is generally consistent due to the ongoing shortage in the area.

**Key Quote:**
> "We have two tanks — 1,000 liters and 400 liters. I buy the water, including fuel and transport, for 300 cedis. But it's too much."

---

## Section 2: Supply & Pricing

Buys water from private tanker drivers who fetch it from treated borehole depots or private filling points (since Ghana Water suspended tanker hydrant operations).

Each 1,000-liter refill costs about GHS 300, inclusive of water, fuel, and transport.

A 400-liter refill costs around GHS 150.

Notes that prices have sharply increased in the last year due to the restricted GWCL supply and rising fuel prices.

**Key Quote:**
> "The prices are high because Ghana Water isn't supplying. They're buying from other places, so it's expensive."

---

## Section 3: Network & Sources

He maintains informal contact with local depot owners who inform him when water is available.

However, he noted that several depots have been shut down or restricted by Ghana Water, worsening the shortage.

He sometimes must wait several days to restock because of tanker delays or supply exhaustion at depots.

**Key Quote:**
> "Some depots were told to stop by Ghana Water. Now the tankers buy from boreholes and treated water points."

---

## Section 4: Challenges & Impacts

His biggest challenge is the high cost of purchasing and transporting water.

Profit margins have fallen drastically; customers often cannot afford higher retail prices.

Experiences frequent delays due to tanker unavailability or long waiting queues.

Describes the situation as "very bad" — emotionally draining and financially unstable.

**Key Quote:**
> "It's very bad. We can't get water like before. Prices are too much, and customers are complaining."

---

## Section 5: The "Magic Wand"

If given the chance to change one thing, he would want Ghana Water Company Limited (GWCL) to restore hydrant operations and ensure consistent bulk supply to tanker drivers.

He believes this would stabilize prices and improve access for both resellers and households.

He also suggested that the government consider setting up community reservoirs that store water during shortages.

**Key Quote:**
> "If Ghana Water opens the depots again, everything will be fine. Prices will go down."

---

## Section 6: Technology Awareness & Opportunities

Currently operates without any formal system — uses phone calls to contact drivers and depots.

Expressed interest in using digital tools if they would make ordering and delivery faster or more reliable.

Believes that a platform that connects verified tanker drivers and depots could prevent misinformation, long waits, and price exploitation.

Would trust such a platform only if it guarantees authentic suppliers and transparent pricing.

**Key Quote:**
> "If there was an app where we could see which depot has water, I would use it. It will save time and fuel."

---

## Section 7: Emerging Themes

**Dependency on Informal Networks:**
Operations rely heavily on word-of-mouth, personal trust, and local knowledge of available depots.

**Impact of Policy Decisions:**
Ghana Water's restriction on tanker operations has ripple effects across the informal distribution chain — from tanker drivers to community-level sellers.

**Rising Cost of Living:**
Inflation and fuel price hikes are forcing sellers and buyers into unsustainable spending patterns for basic water access.

**Potential for Tech-Enabled Transparency:**
Respondents like him see digital platforms as a possible bridge to improve coordination, reduce search time, and ensure verified water sources.

**Emotional Fatigue & Social Pressure:**
As a local supplier, he faces constant complaints from neighbors and customers, intensifying stress and reducing motivation.

---

## Summary Insight

This respondent's story reveals how policy disruptions upstream (like hydrant closures) cascade through the informal water economy, constraining both livelihood and access.

As a community water reseller, he sits at the intersection of household vulnerability and tanker supply instability, struggling to balance affordability, reliability, and trust.

His openness to technology signals an emerging readiness for digital coordination tools, particularly those that could connect drivers, depots, and consumers transparently to restore efficiency in Ghana's urban water delivery network.

---

## Pain Point Scorecard

| Pain Point | Score (1–10) | Notes / Justification |
|------------|--------------|----------------------|
| **1. Cost of Supply (Fuel + Water)** | **10 / 10** | Huge cost burden — pays ≈ GHS 300 per 1,000 L including fuel and transport. Profit margins are collapsing; he called the price "too much." |
| **2. Access to Water (Source Availability)** | **9 / 10** | Ghana Water's ban on tanker hydrants and closure of some depots make sourcing difficult; sometimes waits days or travels long distances. |
| **3. Supply Reliability (Depot / Driver Delays)** | **8 / 10** | Tanker delays and inconsistent schedules lead to stockouts; cannot restock tanks when demand spikes. |
| **4. Profitability & Customer Pricing** | **8 / 10** | Rising costs cannot be fully passed on to customers; must keep prices "affordable" for the community, reducing profit. |
| **5. Regulation / Policy Constraints** | **9 / 10** | Strongly affected by GWCL's restrictions on tanker operations. Believes poor communication and unclear policy are root causes. |
| **6. Technology Adoption / Digital Access** | **7 / 10** | Uses only phone calls; open to an app that shows which depots have water and current prices — "It will save time and fuel." |

### Top Pain Points
- 🟩 Cost of Supply (10/10)
- 🟩 Access Restrictions from GWCL (9/10)

### Secondary Pain Points
- 🟧 Supply Delays & Profit Pressure (8/10)
- 🟧 Limited Digital Coordination (7/10)

### Minor Issue
- 🟦 Customer Payment (4/10)

### Summary
This Sakumono-based community water seller faces the brunt of Ghana's ongoing water distribution disruptions. With hydrant closures by GWCL, he is forced to travel long distances and rely on uncertain borehole sources — pushing operational costs to unsustainable levels. Despite rising expenses, he must keep prices low to serve his community. His "magic wand" vision centers on a transparent digital coordination platform that tracks available depots, real-time water prices, and approved sources — helping small suppliers reduce wasted trips, fuel costs, and uncertainty.
`
  },
  {
    id: "depot-denis-001",
    name: "Depot & Fleet Owner Interview - Denis Opoku Amanor (Tema)",
    date: "2025-11-07",
    type: "depot",
    content: `# Interview Summary: Denis Opoku Amanor – Depot & Fleet Owner (Tema)

**Date:** 7-11-2025
**Duration:** ≈ 35 minutes
**Location:** Tema, Greater Accra
**Profile:** Registered depot and fleet owner under Ghana Water Company Limited (GWCL). Operates hydrant-based water supply for industrial, institutional, and residential clients.

---

## Section 1: Background & Operations

Denis Opoku Amanor is a hydrant owner and fleet operator in Tema who began his business after formally engaging GWCL to mount a hydrant for his company. His depot draws directly from Ghana Water's treated sources such as Akosombo, which he described as the safest and cleanest supply in the country.

He also owns several water tankers, distributing to industrial clients, schools, hospitals, and local residents. His company paid monthly bills directly to GWCL based on water volume used. Initially charged under domestic tariffs, he was later moved to commercial billing, significantly increasing costs.

---

## Section 2: Capacity & Pricing Structure

Denis provided the following breakdown for tanker capacities and corresponding retail prices:

| Capacity (Liters) | Gallons | Selling Price (GHS) |
|-------------------|---------|---------------------|
| 4,500 L | 1,000 gal | 200 |
| 9,000 L | 2,000 gal | 250 |
| 11,250 L | 2,500 gal | 250–300 |
| 16,500 L | 3,500 gal | 500 |
| 18,000 L | 4,000 gal | 600 |
| 22,500 L | 5,000 gal | 700+ |

Monthly payments to GWCL range from GHS 60,000 – 100,000, depending on meter readings and seasonal demand.

---

## Section 3: Current Challenges

In July 2025, Denis received an official call from GWCL instructing him to suspend all hydrant operations pending further authorization. Since then, his depot has remained closed, leaving both his tankers and customers stranded.

He expressed empathy for fleet owners and truck drivers who now must travel as far as Weija, Amasaman, or Kwabenya to fetch water — increasing fuel use, travel time, and congestion.

**Key Quote:**
> "They have to travel all the way to Weija or Kwabenya. The traffic and fuel costs are killing them."

He lamented the impact on schools and hospitals, which relied on his depot for daily operations, noting that he receives constant calls from frustrated clients and institutions in need.

**Key Quote:**
> "Imagine a hospital with no water. I get calls all night; I can't even sleep."

---

## Section 4: Financial & Operational Effects

The GWCL suspension left his entire fleet idle. Despite zero deliveries, he continues paying drivers and maintaining trucks. The reclassification from domestic to commercial billing had already strained his profit margins, and the current halt has effectively frozen cash flow.

**Key Quote:**
> "We are losing money every day. I still pay my drivers and maintain the vehicles, but no work is going on."

---

## Section 5: Technology & Adaptation

Denis noted that technology could play a role in improving coordination between GWCL, depot owners, and fleet operators. He suggested a digital platform that could:

- Display active hydrant zones and available depots in real time.
- Help drivers locate the nearest approved water source.
- Provide a transparent billing and scheduling system.

He believes this would reduce confusion, long travel distances, and operational inefficiencies.

---

## Section 6: The "Magic Wand" Vision

If he could change one thing, Denis would want transparent communication and predictable zoning regulations from GWCL.

**Key Quote:**
> "We need Ghana Water to sit with us — not just call to stop work. We are partners in supplying the city."

He envisions a zonal hydrant system where each district in Greater Accra has a regulated water access point. This would reduce traffic, fuel waste, and pricing disparities.

---

## Section 7: Emerging Themes

**Regulatory Dependence:** Small operators depend entirely on GWCL's approval; a single directive can halt the entire value chain.

**Rising Costs:** Reclassification from domestic to commercial tariffs escalated expenses across the board.

**Systemic Ripple Effect:** When one depot shuts down, demand pressure shifts region-wide.

**Need for Coordination:** Absence of centralized communication leaves drivers guessing where water is available.

**Digital Readiness:** Stakeholders like Denis are open to technology as long as it is trustworthy and officially backed.

---

## Pain Point Scorecard — Denis Opoku Amanor (Tema Depot Owner)

| Pain Point | Score (1–10) | Impact Level & Notes |
|------------|--------------|----------------------|
| **Access Suspension from GWCL** | **10 / 10** | The hydrant shutdown halted all operations since July; fleets idle and customers unserved. |
| **Customer Pressure & Unmet Demand** | **9 / 10** | Constant calls from schools and hospitals; unable to supply them with safe water. |
| **Operational Downtime & Revenue Loss** | **8 / 10** | Paying drivers and maintenance costs despite no deliveries; cash flow frozen. |
| **Fuel & Distance Burden for Drivers** | **8 / 10** | Fleet owners must travel to Weija or Kwabenya for water; fuel and time costs high. |
| **Billing Reclassification (Commercial Rate)** | **6 / 10** | Shift from domestic to commercial billing raised monthly costs (₵60k–₵100k). |
| **Technology Adoption Potential** | **7 / 10** (opportunity) | Open to digital coordination tools to see active hydrants, depots, and real-time water availability. |

### Top Pain Points
- 🟩 Access Suspension from GWCL (10/10)
- 🟩 Customer Pressure & Unmet Demand (9/10)

### Secondary Pain Points
- 🟧 Operational Downtime & Revenue Loss (8/10)
- 🟧 Fuel & Distance Burden for Drivers (8/10)

### Minor Issue
- 🟦 Billing Reclassification (6/10)

### Summary
Denis Opoku Amanor's case exposes how a single regulatory decision can cripple both formal and informal water distribution chains. His hydrant shutdown has sparked a domino effect of idle fleets, price spikes, and customer distress across Tema and Accra. He calls for a zonal, tech-enabled coordination system linking GWCL, depots, and fleet owners to ensure transparent, predictable access to treated water and a more resilient urban supply network.
`
  },
  {
    id: "depot-ebo-001",
    name: "Depot Owner Interview - Ebo Ghartey (Tema Industrial Area)",
    date: "2025-11-12",
    type: "depot",
    content: `# Interview Summary: Ebo Ghartey – Depot Owner (Tema Industrial Area)

**Date:** 12 November 2025
**Location:** Tema (In-person conversation)
**Role:** Depot Owner (uses tap and well)
**Status:** Depot forcibly shut down by GWCL (July/August 2025)

---

## Section 1: Background & Operations

Ebo Ghartey operates a licensed depot and hydrant tapping point in the Tema Industrial Area, one of the most water-dependent regions of Accra due to factories, cold stores, manufacturing hubs, and logistics companies.

**His business consists of:**
- A GWCL-approved hydrant connection
- A large water reservoir
- Pumps and operating staff
- A fleet of trucks (or partnership with fleet owners)
- A monthly billing arrangement with GWCL

**He previously supplied:**
- Industrial companies
- Schools
- Hospitals
- Commercial properties
- Dozens of independent truck drivers who rely on his depot daily

---

## Section 2: GWCL Shutdown Impact

In July/August 2025, he received an instruction from GWCL:

**Key Quote:**
> "Hold operations. Suspend dispensing water to all truck drivers until further notice."

**His hydrant was shut down completely, meaning:**
- No drivers could fetch water
- His depot could not operate
- He could not serve any industrial client
- His staff were laid off
- His trucks were grounded

He describes the shutdown as sudden and devastating, with no detailed explanation other than "orders from above."

**He strongly suspects the shutdown is part of GWCL's efforts to:**
- Tackle non-revenue water
- Investigate corruption within hydrant operations
- Clean up internal staff leaks
- Reset the tanker distribution ecosystem

He agrees the system had problems but insists legitimate depots like his are being punished despite paying all bills.

---

## Section 3: Monthly Bills & Cost Burden

**Before the shutdown, he paid:**
- ₵150,000+ per month to GWCL (depending on volume)
- Sometimes more during high-demand seasons (dry season, industrial peak periods)
- He paid these bills consistently and on time.

**Now, despite the shutdown:**
- He still pays fixed costs
- He has lost revenue
- His workers have lost jobs
- His trucks are idle

**His concern is worsening financial pressure:**

**Key Quote:**
> "We pay all this money to Ghana Water, but now we can't even operate. My workers are home. The system is collapsing."

---

## Section 4: Crisis for Drivers & Final Consumers

**He reports that truck drivers are suffering worse:**
- Drivers now travel to Weija, Kwabenya, Achimota to find water
- Trips are 60–90 minutes one way
- Fuel costs have doubled
- Travel times increased
- Traffic is worse
- Prices for residents have doubled or tripled
- Households are angry
- Schools and hospitals are calling him daily
- Some drivers have threatened demonstrations

**He himself receives non-stop calls:**

**Key Quote:**
> "People call me day and night. I cannot sleep. Hospitals call, schools call. I feel bad because I can't help them."

---

## Section 5: Fear for Public Health

**Because depots are shut:**
- Drivers are now fetching water from untreated boreholes, streams, and informal private wells
- No quality control
- No certification
- Consumers have no idea what they are drinking or cooking with

**He finds this extremely dangerous:**

**Key Quote:**
> "The water people are drinking now, nobody can confirm the quality. This is risky."

---

## Section 6: Possibility of Social Unrest

**There is rising anger among:**
- Depot owners
- Truck drivers
- Community members
- Schools and hospitals

**He mentioned several drivers are planning a demonstration because:**
- They cannot get water
- They have lost income
- They feel abandoned by authorities

He admitted he himself is "frustrated and tired."

---

## Section 7: His View on the Root Problem

**He believes the shutdown was caused by:**
- Internal corruption at GWCL
- Weak monitoring
- Lack of digital tracking
- Failure to control hydrant withdrawals
- Staff involvement in leakages

**His exact statement:**

**Key Quote:**
> "If they had proper tracking and controls, they wouldn't need to shut down all of us. This is a system problem."

This aligns perfectly with CLEAR WATER's solution.

---

## Section 8: Magic Wand / Ideal Solution

When asked how the situation could be fixed, he said:

**Key Quote:**
> "Just give us a controlled system. Track the water properly. If everything is recorded and transparent, GWCL will not lose, drivers will not suffer, and we can work."

**His key desires:**
- Transparent monitoring
- A system to verify drivers
- Regulated extraction
- Accountability for all parties
- Guaranteed reopening of depots
- Fair billing

---

## Emerging Themes

- **Regulatory Shutdown Impact:** Licensed, bill-paying depot shut down without clear process
- **System Collapse:** Entire water distribution chain disrupted
- **Public Health Risk:** Unverified water sources now being used
- **Economic Pressure:** ₵150k+ monthly payments with zero revenue
- **Social Tension:** Rising anger, potential demonstrations
- **Need for Digital Tracking:** Explicitly calls for transparent monitoring system
- **Quality Concerns:** No certification or testing for alternative water sources

---

## Pain Point Scorecard – Ebo Ghartey

| Pain Point Category | Score (1–10) | Notes / Evidence from Interview |
|---------------------|--------------|--------------------------------|
| **Finding Water / Access to Supply** | **10 / 10** | Depots shut down; drivers traveling to Weija/Kwabenya; no local supply. |
| **Revenue Loss (Shutdown Impact)** | **10 / 10** | Business completely halted; still paying fixed costs; over ₵150k/mo in bills before closure. |
| **Unemployment Impact** | **9 / 10** | Staff sent home; trucks idle; workers losing livelihoods. |
| **Fuel & Distance Pressure** | **8 / 10** | Drivers travel long routes → increased fuel → higher prices for consumers. |
| **Serving Schools & Hospitals** | **7 / 10** | Constant calls; feels morally responsible; cannot supply them. |
| **Risk of Demonstration / Public Anger** | **7 / 10** | Drivers planning protests; frustration rising. |
| **Communication from GWCL** | **4 / 10** | Received abrupt shutdown order; no clarity; "orders from above." |
| **Cash Flow Constraints** | **3 / 10** | Issue exists, but overshadowed by complete shutdown. |

### Top Pain Points
- 🟩 Finding Water / Supply Access (10/10)
- 🟩 Revenue Loss (10/10)
- 🟩 Unemployment Impact (9/10)

### Secondary Pain Points
- 🟧 Fuel & Distance Pressure (8/10)
- 🟧 Serving Schools & Hospitals (7/10)
- 🟧 Risk of Demonstration (7/10)

### Minor Issues
- 🟦 Communication from GWCL (4/10)
- 🟦 Cash Flow (3/10)

### Summary
Ebo Ghartey's depot shutdown represents a complete business collapse despite being a licensed, bill-paying operator. With over ₵150,000 in monthly payments to GWCL before closure, his case demonstrates the severe economic impact of blanket regulatory shutdowns. The ripple effects extend beyond his business to unemployed staff, struggling truck drivers, and critical institutions like schools and hospitals. His explicit call for "transparent monitoring" and "proper tracking" directly validates the need for digital water distribution management systems.
`
  },
  {
    id: "depot-timber-market-001",
    name: "Depot Owner Interview - Timber Market Tema",
    date: "2025-11-13",
    type: "depot",
    content: `# Interview Summary: Depot Owner – Tema Timber Market

**Name:** Timber Market Tema
**Location:** Tema Timber Market
**Date:** 13-11-2025
**Duration:** ~25 minutes
**Stakeholder Category:** Depot Owner / GWCL Hydrant-Linked Depot
**Interviewer:** Anna

---

## Section 1: Background & Operations

The depot owner has been operating at Tema Timber Market for several years, serving truck drivers in the Timber Market and industrial zones of Tema.

**Key Quote:**
> "I've been operating this depot for some years now. I serve the truck drivers around Tema, especially those who work in the Timber Market and industrial zones."

---

## Section 2: Hydrant Shutdown & Impact

**Shutdown Timeline:**
Around July/August 2025, Ghana Water called and instructed the depot to shut down completely.

**Official Communication:**
> "Ghana Water called me around July/August and told me to shut down the depot. They said we should hold on until they give further instructions. Since then, I've not been able to serve any of the tanker drivers."

**Current Status:**
- Fully shut down
- No operations for months
- No reason given beyond "orders from above"
- No follow-up communication from GWCL

**Key Quote:**
> "They said we should stop supplying water to the tankers. No reason was given. They just said it is from 'above' and that they will get back to us. Up till now, nothing."

---

## Section 3: Financial Impact

**Personal Impact:**
- Complete loss of income from depot operations
- Depot was primary source of livelihood
- Workers depending on the depot have lost employment

**Communication Overload:**
The owner receives constant calls from desperate drivers seeking water.

**Key Quote:**
> "It has really affected me. This depot is my livelihood. Every day, drivers come here to buy water. Since the shutdown, I have had no income from the depot at all. I also have workers who depend on this place. Sometimes I even have to turn off my phone because drivers keep calling me day and night. They are begging for water, but I can't help them."

---

## Section 4: Impact on Drivers & the Public

**Driver Challenges:**
- Forced to travel to distant locations (Weija, Kwabenya, Accra)
- Significant increase in fuel costs
- Heavy traffic delays
- Price increases passed to consumers

**Price Escalation:**
Households now being charged ₵800-₵1,500 for tanker water (compared to previous fair prices).

**Key Quote:**
> "They are suffering. They now have to travel very far—places like Weija, Kwabenya, and some go all the way to Accra—just to get water. You know how far that is from Tema. They are spending too much on fuel, traffic is heavy, and because of the distance, they are forced to increase their prices. That is why some households are now being charged 800, 1000, even 1500 cedis for tanker water."

---

## Section 5: Impact on Essential Services

**Previously Served:**
- Many schools in Tema
- Several hospitals
- Critical institutions requiring daily water supply

**Current Situation:**
Cannot supply schools and hospitals, causing significant concern for children and patients.

**Key Quote:**
> "That one worries me a lot. I used to supply many schools and a few hospitals in Tema. Imagine a hospital without water. And schools—children need water every day. Now when they call me, I have to tell them I don't have water. It's painful."

---

## Section 6: Perspective on GWCL Decision

**Understanding of Rationale:**
Believes GWCL is trying to address water loss and misuse of hydrants.

**Critique of Approach:**
Shutting down all depots without a replacement system is creating a new crisis.

**Proposed Solution:**
Proper monitoring system instead of blanket shutdowns.

**Key Quote:**
> "Honestly, I think Ghana Water is trying to solve a problem. Maybe there is too much water loss or some people are misusing the hydrants. But shutting down all of us without a new plan is causing another crisis. If they had a proper system to monitor depots and tankers, we wouldn't be in this situation."

---

## Section 7: Operations & Pricing Structure

**Previous Pricing (Before Shutdown):**

| Capacity (Liters) | Gallons | Selling Price (GHS) |
|-------------------|---------|---------------------|
| 4,500 L | 1,000 gal | ~200 |
| 9,000 L | 2,000 gal | ~250 |
| 11,250 L | 2,500 gal | ~250+ |
| 16,500 L | 3,500 gal | ~500 |
| 18,000 L | 4,000 gal | ~600 |
| 22,500 L | 5,000 gal | ~700+ |

**Quality Difference:**
Fair prices were possible because water came directly from Ghana Water. Current borehole and private plant sources result in price increases.

**Key Quote:**
> "These are fair prices because we were getting the water directly from Ghana Water. But now drivers are buying from boreholes, small private plants—so the prices shoot up."

---

## Section 8: Frustration & Community Mood

**General Sentiment:**
High frustration among depot owners and drivers.

**Potential for Unrest:**
Some drivers discussing organizing demonstrations.

**Feeling of Abandonment:**
GWCL has left operators "hanging" with no timeline for resolution.

**Key Quote:**
> "People are very frustrated. Some drivers are even talking about organizing a demonstration. We feel stuck. Ghana Water has left us hanging, and we don't know when they will reopen the hydrants."

---

## Section 9: Closing Reflections & Key Insight

**Call for Collaboration:**
GWCL should work with depot owners rather than shutting them down.

**Solution Framework:**
Proper tracking and transparent monitoring system would solve the underlying problems.

**Key Quotes:**
> "Ghana Water should involve us. If they want to stop theft, they should work with us, not shut us down completely."

> "There must be a proper tracking system. If they can guarantee us water and monitor everything in a transparent way, this entire problem will go away."

---

## Emerging Themes

- **No Communication:** "Orders from above" with no follow-up for months
- **Complete Income Loss:** Livelihood entirely dependent on depot operations
- **Driver Desperation:** Constant calls from drivers begging for water
- **Price Explosion:** ₵800-₵1,500 per tanker (up from ₵200-700)
- **Institutional Impact:** Schools and hospitals without reliable water
- **Call for Collaboration:** Wants to work with GWCL, not be shut out
- **Explicit System Need:** "Proper tracking system" and "transparent monitoring"
- **Quality Concerns:** Borehole water replacing GWCL treated water
- **Potential Unrest:** Drivers discussing demonstrations

---

## Pain Point Scorecard – Depot Owner (Tema Timber Market)

| Pain Point Category | Rating (1–10) | Notes |
|---------------------|---------------|-------|
| **Access to Water (Hydrant Shutdown)** | **10 / 10** | Complete shutdown by GWCL since July/August. Zero operations. No income. Drivers stranded. |
| **Financial Loss / Income Collapse** | **10 / 10** | Depot fully closed → 100% revenue lost, workers affected. |
| **Customer Pressure & Community Impact** | **9 / 10** | Schools, hospitals, businesses calling daily; cannot supply. Emotional distress. |
| **Driver Dependency & Fuel Burden** | **8 / 10** | Drivers now travel to Weija, Kwabenya, Accra; fuel cost up → prices inflated. |
| **Operational Uncertainty / No Communication from GWCL** | **8 / 10** | No timeline for reopening. No official explanation. No support. |
| **Pricing Distortion (Market Chaos)** | **7 / 10** | Fair depot prices replaced by inflated borehole prices (₵1000–₵1500). |
| **Technology & Monitoring Gap** | **7 / 10** | Believes a tracking system or proper digital control would prevent illegal extraction and avoid crisis. |
| **Stress & Overload (Constant Calls)** | **6 / 10** | Receives nonstop calls from drivers and institutions; cannot help. |

### Top Pain Points (Critical / Severe)
- 🟩 Hydrant Shutdown (10/10) - The total closure of hydrants by GWCL is the single biggest issue. Operations dead for months, creating severe income loss and community impact.
- 🟩 Financial Collapse (10/10) - Zero income since the shutdown. Workers and dependents affected.
- 🟩 Essential Services Impact (9/10) - Schools and hospitals rely heavily on his depot. The inability to supply is "painful" and dangerous.

### Secondary Pain Points (Important but Indirect)
- 🟧 Driver Fuel Costs & Long Distances (8/10) - Drivers now travel far (Weija, Kwabenya), increasing transport time, fuel usage, and prices.
- 🟧 Lack of Communication from GWCL (8/10) - Depot owners told "stop until further notice"—no clarity, no plan, no timeline.
- 🟧 Pricing Chaos (7/10) - Borehole and informal suppliers now dominate, inflating consumer prices.

### Minor but Notable Issues
- 🟦 Tech/Monitoring Gap (7/10) - Believes the shutdown could have been avoided with proper tracking and accountability system.
- 🟦 Personal Stress Overload (6/10) - Nonstop calls from desperate drivers and customers; emotional pressure.

### Summary
The Tema Timber Market depot owner's account reveals the full downstream impact of GWCL's hydrant shutdown. His depot has been completely closed since July/August, resulting in total income loss and severe hardship for the tanker drivers who depend on him. Drivers are now forced to travel long distances to far-away borehole sources, inflating fuel costs and causing residential and commercial prices to double or triple.

His most urgent concerns revolve around GWCL's lack of communication, collapse of tanker supply chains, and growing pressure from essential institutions like schools and hospitals. He believes the solution is not shutting depots down, but implementing a transparent tracking system that ensures accountability without harming the ecosystem.

His story strongly supports the case for ClearWater's "data-for-water" model, which would give GWCL transparency while allowing depots to operate legally and consistently again.
`
  },
  {
    id: "driver-fleet-owner-tema-001",
    name: "Fleet Owner Interview (Tema/Sakumono)",
    date: "2025-11-07",
    type: "driver",
    content: `# Interview Summary: Fleet Owner – Tema/Sakumono Zone

**Location:** Sakumono, Tema (Greater Accra Region)
**Date:** 7-11-2025
**Duration:** ~40 minutes
**Participant:** [Fleet Owner – Name withheld]
**Profile:** Medium-scale water supplier operating tanker trucks that serve both commercial and residential clients across Tema and Accra.

---

## Section 1: Business Background & Operations

Operates a tanker water supply business primarily around Sakumono and Tema, with customers extending into Accra's residential and commercial areas.

Previously fetched water from a Ghana Water Company Limited (GWCL) hydrant depot, but that source has been suspended.

Now relies on private boreholes and informal suppliers, though these sources are unreliable and unverified.

Described demand for water as extremely high, especially among households and construction sites in expanding neighborhoods.

**Key Quote:**
> "I used to get water from the Ghana Water depot, but they've stopped us. Now I have to depend on boreholes, and the demand keeps going up."

---

## Section 2: Supply Challenges & Workarounds

The suspension of GWCL tanker operations has disrupted his work completely.

His regular depot owner confirmed that GWCL instructed them to halt all tanker water sales.

He now travels to farther areas such as Weija and Kwabenya just to fetch water, which increases both fuel cost and delivery prices.

Admitted that due to exhaustion and demand pressure, he sometimes turns off his phone to avoid endless customer calls.

**Key Quote:**
> "I work in Tema, but now I go all the way to Weija or Kwabenya for water. It's too far and the fuel cost is killing me, so I have to charge more."

---

## Section 3: Operational Realities

High customer demand, particularly from new residential developments that lack piped water connections.

Has the trucks and manpower to serve these areas efficiently, but no consistent source of supply.

Also provides pumping services to multi-storey buildings, helping residents transfer water to overhead tanks — but these services depend entirely on whether he can get water in the first place.

**Key Quote:**
> "New sites need water every day. I have the trucks, but if there's no water, I can't work. The problem isn't customers — it's supply."

---

## Section 4: Infrastructure & Quality Concerns

Reported that some pipelines in Accra have been leaking for nearly two years, wasting large volumes of water that could have served households.

Expressed serious doubts about borehole water quality — says he cannot verify if the water he fetches is treated or safe.

Noted that Ghana Water's treated water was always reliable in quality, unlike what he currently gets from boreholes.

**Key Quote:**
> "Now we just trust whatever water we get. Before, Ghana Water's water was safe, but this borehole water — no one knows."

---

## Section 5: Reflections & Needs

Believes tanker drivers and fleet owners could help bridge Ghana's urban water gap if properly regulated and given consistent access.

Urged for better communication and coordination between GWCL and tanker operators, instead of outright bans.

Feels that private suppliers are being sidelined despite their essential role in delivering water to underserved areas.

**Key Quote:**
> "They should regulate us, not block us. We can help Ghana Water reach the areas they can't."

---

## Section 6: The "Magic Wand" & Ideal State

If he could change one thing, it would be guaranteed access to safe, consistent water sources, ideally through designated supply points where tanker drivers can legally fetch water.

Wishes for a system that reduces the need to drive long distances from Tema to Weija or Kwabenya.

Suggested that if depots were more evenly distributed and well-regulated, tanker operators could deliver faster, safer, and at lower cost.

Emphasized that the current situation forces him to increase prices, which affects customers but leaves him with little profit due to high fuel costs.

**Key Quotes:**
> "If every zone had at least one working hydrant for tanker drivers, we wouldn't have to travel so far."

> "I just need a fair system — good water access, clear rules, and less wasted time on the road."

---

## Emerging Themes

- Severe regulatory and operational barriers due to GWCL's suspension of tanker access.
- Rising fuel costs and long-distance travel drastically cutting into profit margins.
- Reliance on unregulated borehole sources poses health and quality concerns.
- Suggests zonal hydrant systems and collaborative regulation as potential solutions.

---

## Pain Point Scorecard: Fleet Owner – Tema/Sakumono Zone

| Pain Point | Score (1–10) | Notes / Justification |
|------------|--------------|----------------------|
| **1. Wasted Time / Fuel (Traffic)** | **9 / 10** | Forced to travel from Tema to Weija/Kwabenya to find water; long distances and heavy traffic raise costs and reduce daily trips. |
| **2. Finding Water (Supply Search)** | **10 / 10** | Main issue. GWCL hydrant closure has made water extremely hard to find; must rely on informal boreholes. |
| **3. Depot Wait Times (Queues)** | **7 / 10** | When boreholes have water, long queues form — delays deliveries by several hours. |
| **4. Payment Issues (Collections)** | **3 / 10** | Customers usually pay on delivery; minor problem. Main issue is availability, not payment. |
| **5. Cancelled Orders (Wasted Trips)** | **5 / 10** | Moderate issue; customers cancel after long waits or if he cannot deliver on time due to water shortages. |

### Top Pain Points
- 🟩 Finding Water (10/10)
- 🟩 Fuel & Distance (9/10)

### Secondary Pain Points
- 🟧 Depot Queues (7/10)
- 🟧 Cancelled Orders (5/10)

### Minor Issue
- 🟦 Payment (3/10)

### Summary
This Tema-based fleet owner's story highlights the structural inefficiencies and regulatory uncertainty in the current water delivery ecosystem. The combination of restricted hydrant access, unverified borehole dependency, long travel distances, and customer pressure has created unsustainable working conditions. His "magic wand" vision — legal, zonal access to safe water — points to a strong opportunity for intervention through regulated supply points or a digital coordination platform.
`
  },
  {
    id: "driver-nuhe-001",
    name: "Driver/Fleet Owner Interview - Nuhé (Spintex)",
    date: "2025-10-31",
    type: "driver",
    content: `# Interview Summary: Nuhé – Fleet Owner / Manager

**Location:** Spintex
**Date:** 31-10-2025
**Duration:** ~40 minutes
**Participant:** Nuhé (Fleet Owner and Tanker Driver)
**Profile:** Owns and manages two water tanker trucks that supply water to residential and commercial clients in and around Accra.

---

## Section 1: Business Overview

**Background:** Nuhé has been in the tanker water delivery business for several years, operating independently. He owns two tanker trucks which he personally manages and sometimes drives himself.

**Entry into business:** He entered the industry after realizing that demand for tanker water in Accra was rising due to inconsistent municipal supply.

**Scope of operations:** His business mainly serves households, small businesses, and institutions that depend on tanker water for daily use.

**Other ventures:** This is his primary source of livelihood, with no other major business.

**Truck utilization:** Both trucks are dedicated solely to water delivery and not used for other hauling services.

**Key Quote:**
> "Normally we get water from under bridge, but Ghana Water said we shouldn't. They won't allow us to fetch. It's been three months now."

---

## Section 2: Operational Model

**Daily routine:** Operations start early in the morning. Nuhé coordinates with his drivers, confirms availability of water at depots, and assigns each truck to specific clients or routes.

**Driver management:** Each truck has a dedicated driver and sometimes an assistant. He pays drivers per trip (commission-based system).

**Order flow:** Most customer orders come through direct phone calls or WhatsApp messages from previous clients or referrals.

**Dispatch system:** He personally dispatches and monitors the drivers, though no formal GPS or tracking system is used. Communication is through mobile calls.

**Fuel and maintenance:** Fuel costs are handled per trip, while maintenance and major repairs are managed centrally by him.

**Water source:** He previously obtained water from a hydrant "under the bridge" managed by McCarthy & Sons, a licensed bulk supplier.

**Preferred depots:** That hydrant was his main source until Ghana Water Company Limited (GWCL) stopped tanker access three months ago.

**Key Quote:**
> "We used to get water from McCarthy and Sons. They also accounted to Ghana Water. But now Ghana Water says we can't fetch there anymore."

---

## Section 3: Customer Base & Revenue

**Client types:** Serves a mix of households, shops, small guest houses, and offices.

**Contract structure:** No long-term contracts; business runs on on-demand requests.

**Customer acquisition:** Primarily referral-based; new customers come through recommendations from satisfied clients.

**Marketing:** Uses social media (Facebook and WhatsApp) for visibility, posting his number and tanker photos.

**Pricing:** Pricing varies based on distance, water availability, and tanker size.

**Revenue model:** Income is trip-based, and payment is cash on delivery. No credit system is offered.

**Key Quote:**
> "Some people find me through social media, and others get my number from friends I've served before."

---

## Section 4: Driver Management

**Driver relationship:** Works with two main drivers, one per truck. They are independent contractors who earn per completed trip.

**Recruitment:** Recruits drivers through referrals and personal recommendations; values trust and reliability.

**Monitoring:** Relies on phone communication to track daily operations; no formal logs or digital systems.

**Common issues:** Drivers sometimes complain about long wait times at hydrants or fuel shortages.

**Turnover:** Low turnover — most drivers stay long-term due to consistent demand.

**Conflict handling:** Handles disputes personally and emphasizes honesty and timely reporting.

**Key Quote:**
> "I just call them and check how far they've gone. Sometimes they complain the depot is slow, or fuel is too expensive."

---

## Section 5: Financial & Operational Pain Points

**Regulatory restrictions:** The suspension of hydrant access by GWCL has paralyzed operations for the past three months.

**Loss of revenue:** His trucks have been idle, affecting both his income and that of his drivers.

**Fuel cost fluctuations:** Rising fuel prices significantly reduce profit margins.

**Maintenance costs:** Vehicle upkeep is expensive; repairs and parts must be paid out-of-pocket since there's no formal insurance scheme.

**Cash flow:** Entirely cash-based system — no bank transactions, no deferred payments, making liquidity tight when operations pause.

**Idle time:** With no water access, both tankers remain unused, but he still incurs maintenance and licensing costs.

**Key Quote:**
> "For three months now, we haven't been working. The trucks are there, but Ghana Water won't let us fetch."

---

## Section 6: Information & Visibility

**Operational visibility:** Has no digital monitoring tools; relies solely on drivers' phone updates.

**Demand forecasting:** Predicts orders based on past patterns and seasonal trends (higher during dry months).

**Record keeping:** Keeps manual notes or mental records of deliveries and payments.

**Information gap:** Lacks real-time updates on depot availability and fuel price projections, making planning difficult.

**Key Quote:**
> "We don't know when water will be available or when Ghana Water will stop us again. Everything is uncertain."

---

## Section 7: Competition & Market Dynamics

**Competition:** The market is fragmented, with many small independent operators.

**Customer loyalty:** Based on trust, promptness, and quality of service.

**Competitive edge:** His trucks are known for fast response and clean delivery.

**Threats:** Larger fleets with more trucks and flexible sourcing can undercut prices when supply is scarce.

**Market saturation:** Observes more new tankers entering the business, intensifying price competition.

**Key Quote:**
> "Everywhere now you see tankers. Everyone wants to join the business because water doesn't flow."

---

## Section 8: Quality Control & Regulation

**Quality assurance:** Previously trusted McCarthy & Sons for clean, treated water from GWCL.

**Post-restriction:** Uncertain about where future water will come from if hydrants remain closed.

**Customer perception:** Clients trust him because they've never complained about contamination.

**Regulation:** No formal water delivery license; operates under informal community norms.

**Concern:** Feels the government should regularize tanker operations to ensure access and quality standards.

**Key Quote:**
> "Customers trust us because we bring them good water. But if we can't fetch from Ghana Water, everyone will suffer."

---

## Section 9: The "Magic Wand" & Growth

**Ideal change:** Would like Ghana Water Company Limited to reopen hydrants for tanker access.

**Growth barrier:** Cannot expand fleet or operations until there's clarity and stability from GWCL.

**Investment potential:** Would consider adding more trucks and hiring more drivers if access is restored.

**Vision:** To operate formally and transparently, partnering with regulators for mutual benefit.

**Key Quote:**
> "If they just allow us to fetch again, we can work, the drivers can earn, and people will get water. That's all we need."

---

## Section 10: Technology & Future

**Digital tools:** Does not currently use any software; only phones and WhatsApp.

**Tech openness:** Open to adopting digital platforms that can connect tanker operators, track orders, and manage payments securely.

**Trust factor:** Would only use such tools if they are reliable and transparent, with verified suppliers and clear pricing.

**Willingness to pay:** Expressed readiness to pay for systems that save time and ensure steady business.

**Key Quote:**
> "If there's a proper system that connects us and the customers, I'll use it. Even if I have to pay — as long as it works."

---

## Closing Reflections

Nuhé's case illustrates the vulnerability of independent water fleet operators in Accra's informal water economy. His dependency on GWCL's hydrant access shows how policy decisions ripple through the entire delivery chain. Despite his operational experience and small-scale digital outreach, his business remains at the mercy of regulatory inconsistencies.

### Emerging Themes:

- **High dependency on GWCL hydrant systems**
- **Severe impact of regulatory restrictions on livelihoods**
- **Lack of formal tracking, record keeping, or visibility tools**
- **Desire for recognition, transparency, and collaboration with GWCL**
- **Strong openness to digital transformation if trust is guaranteed**
`
  },
  {
    id: "driver-joseph-001",
    name: "Driver/Fleet Manager Interview - Joseph (Sakumono)",
    date: "2025-10-31",
    type: "driver",
    content: `# Interview Summary: Joseph – Fleet Manager (Family-Owned Business)

**Location:** Sakumono, Community 13
**Date:** 31-10-2025
**Duration:** ~40 minutes
**Participant:** Joseph
**Profile:** Manages four water tanker trucks owned by his father; supplies water to residential and commercial customers across Accra and surrounding towns.

---

## Section 1: Business Overview

**Business type:** The respondent manages a small family-owned fleet of four water tankers, used exclusively for commercial and residential water delivery.

**Background:** The business was established by his father. The respondent currently oversees daily operations — dispatching drivers, handling clients, and ensuring maintenance.

**Motivation:** The family entered the business due to the constant demand for tanker water in Accra, as Ghana Water Company's supply is unreliable.

**Scope of operation:** Trucks supply various neighborhoods within Accra and its outskirts, sometimes as far as Winneba to source or deliver water.

**Other ventures:** This is the family's main business, with no other major ventures at the moment.

**Key Quote:**
> "Sometimes when people call for water, you have to look elsewhere — even travel to Winneba to get it before supplying them."

---

## Section 2: Operational Model

**Daily structure:** The respondent coordinates four drivers, ensuring trucks are filled, fueled, and dispatched early in the day.

**Driver relationship:** The drivers are commission-based, earning per completed delivery rather than on fixed salaries.

**Order system:** Customers call directly to place orders; drivers or the respondent handle these requests.

**Dispatch method:** Orders are manually assigned — no digital system or GPS tracking. Communication is done through phone calls.

**Water source:** Trucks typically fetch water from Ghana Water Company depots, but when hydrants are dry, they travel long distances to alternative private sources.

**Fuel & maintenance:** The respondent personally manages fuel disbursement, servicing, and maintenance, which he describes as "very expensive."

**Key Quote:**
> "It depends on where you get water. Sometimes you have to travel far — that means more fuel and more time gone."

---

## Section 3: Customer Base & Revenue

**Customer type:** A mix of residential households, small businesses, and construction sites.

**Contract type:** Primarily one-off transactions, not long-term contracts.

**Customer acquisition:** Clients get his number through referrals or word-of-mouth recommendations.

**Revenue model:** Fully cash-based, with payment on delivery.

**Marketing:** No formal advertising; relies entirely on trust and referrals.

**Key Quote:**
> "When someone calls me, I tell them the price, and if they agree, I fetch the water and deliver. That's all."

---

## Section 4: Driver Management

**Recruitment:** Finds drivers through trusted contacts and referrals.

**Monitoring:** Relies on phone calls to track progress; there is no tracking technology.

**Training:** Drivers learn through experience and observation; no formal training is provided.

**Common complaints:** Drivers often complain about high fuel prices and long trips to find available water.

**Turnover:** Moderate — most drivers stay for long periods, but new hires are trained informally by older drivers.

**Key Quote:**
> "Drivers complain that fuel is too costly now and that sometimes they drive long before they get water."

---

## Section 5: Financial & Operational Pain Points

**Fuel cost:** A major drain on profits. Long-distance sourcing increases fuel expenses.

**Water scarcity:** Sometimes hydrants or depots are dry, forcing detours to farther towns like Winneba.

**Unpredictable costs:** Prices for water and fuel fluctuate weekly, making budgeting difficult.

**Idle trucks:** On some days, trucks sit idle because no water is available to fetch.

**Maintenance:** Frequent breakdowns, especially due to rough roads and overuse, add unexpected repair costs.

**Cash flow:** The business is entirely cash-based, so funds move quickly but lack formal tracking.

**Key Quote:**
> "You can buy fuel, go all the way, and come back with no water — that's a loss."

---

## Section 6: Information & Visibility

**Data tracking:** No formal record-keeping; relies on manual notes or memory.

**Visibility:** Has no real-time awareness of driver locations once they leave.

**Demand forecasting:** Operates reactively — when customers call, trucks are dispatched.

**Information gaps:** Does not know which depots have water in advance; must rely on calls to other drivers.

**Tools:** Uses only a mobile phone and WhatsApp for coordination.

**Key Quote:**
> "We just move. You don't know which depot has water till you get there."

---

## Section 7: Competition & Market Dynamics

**Competition:** The business is highly fragmented, with many small independent operators.

**Customer loyalty:** Built mainly on trust and reliability. If a customer is satisfied, they call again.

**Competitive advantage:** Maintains multiple trucks, allowing him to serve multiple clients simultaneously.

**Market change:** Notes that many new trucks have entered the business recently, increasing competition and reducing prices.

**Key Quote:**
> "Now everyone wants to join this business because water doesn't flow. There are too many tankers on the road."

---

## Section 8: Quality Control & Regulation

**Water quality assurance:** Fetches only from GWCL or trusted depots to maintain customer confidence.

**Documentation:** Has no formal license but follows local depot regulations.

**Customer concerns:** Says most clients trust the water because it comes from recognized sources.

**Regulatory environment:** Operates informally, though he's aware of Ghana Water and local assembly oversight.

**Key Quote:**
> "We use Ghana Water depots mostly, so customers don't complain about the water."

---

## Section 9: The "Magic Wand" & Growth

**Ideal improvement:** A reliable and consistent water supply from GWCL depots.

**Growth barrier:** Irregular access to water and rising fuel costs prevent scaling up.

**Investment goal:** Would expand the fleet and hire more drivers if water availability was stable.

**Vision:** To manage a larger, more structured fleet with better coordination and official recognition.

**Key Quote:**
> "If Ghana Water was steady, we could add more trucks and serve more people."

---

## Section 10: Technology & Future

**Technology use:** Currently none, aside from basic phone communication.

**Openness to innovation:** Very open to digital solutions that would help coordinate trips, confirm depot availability, and manage customers.

**Trust condition:** Would adopt technology only if it's transparent, reliable, and affordable.

**Willingness to pay:** Willing to pay for systems that reduce wasted trips and fuel.

**Key Quote:**
> "If there's an app that tells us where to get water or manage orders, I'll use it — it will save time and money."

---

## Closing Reflections

This fleet manager's account highlights the daily inefficiencies in Accra's tanker operations. Despite managing four trucks, his business remains vulnerable to water shortages, high fuel costs, and poor coordination systems. His experiences underline that fleet size does not equal stability — systemic unpredictability affects all operators alike.

### Emerging Themes:

- **Long-distance sourcing and wasted fuel are the most expensive pain points**
- **Entirely manual, phone-based coordination with no visibility**
- **Cash-only operations; no digital records**
- **Desire for reliability and structured collaboration with GWCL**
- **High openness to digital platforms that can reduce waste**
`
  },
  {
    id: "commercial-clinton-001",
    name: "Commercial Interview - Clinton (Food Establishment, Accra)",
    date: "2025-10-31",
    type: "commercial",
    content: `# Interview Summary: Clinton – Business Purchaser (Food Establishment)

**Location:** Accra – specific area not provided
**Date:** 31-10-2025
**Duration:** ~40 minutes
**Participant:** Clinton (Operations/Business Manager)
**Profile:** Operates a small to medium-scale food business that relies on a steady water supply for cooking, cleaning, and sanitation.

---

## Section 1: Business Context & Water Needs

Clinton's business uses water for cooking, washing utensils, and cleaning the environment — making water a critical operational input.

The company depends primarily on Ghana Water Company Limited (GWCL) supply but experiences inconsistent flow patterns.

Water availability fluctuates — sometimes flows for 2–3 weeks continuously, then may stop for up to two months.

During shortages, the business relies on private tanker deliveries to fill poly tanks for daily use.

**Key Quote:**
> "Sometimes the water comes for two or three weeks, then it goes off for a month or two. When that happens, we have to call the tankers to fill our poly tanks so we can manage."

---

## Section 2: Procurement & Operations

Works with two regular tanker drivers who supply water on call.

On average, they order twice per month, at ₵300 per trip (~₵600 for two deliveries).

Each delivery fills their mini poly tank, though exact volume (liters) was not specified.

Ordering process: simple call-based arrangement; payment made on delivery.

Record-keeping: The business maintains a petty cash sheet where all water-related expenses are recorded daily.

**Key Quote:**
> "We have a sheet where we record all our expenses. Every payment for water is captured there."

---

## Section 3: Pain Points & Challenges

Longest outage: Experienced a two-month water shortage three months ago, forcing the business to rely solely on tanker deliveries and sachet (pure) water for washing.

Availability issue: During shortages, tankers are often unavailable, or drivers report no water at depots, causing delays.

Price increases: The price per tanker load increased from ₵250 to ₵300 earlier this year, likely due to inflation and fuel costs.

Quality concern: Does not fully trust tanker water for cooking — uses it mainly for cleaning, not food preparation.

Unclear source: When asked, a driver mentioned fetching from "Tema," but Clinton could not verify the actual source or safety.

**Key Quote:**
> "Sometimes we call and the tankers say they're far or there's no water. We've even had to use pure water to wash utensils before."

---

## Section 4: Payment & Tracking

GWCL bills are paid via mobile notification to the company's account department, which processes payments digitally.

Tanker water payments are made in cash upon delivery.

No digital system is currently used for ordering; all processes are manual.

**Key Quote:**
> "We pay the truck drivers on delivery, but Ghana Water bills go through our company account."

---

## Section 5: Ideas & Recommendations

Clinton proposed that every constituency should have a large public reservoir, allowing residents and businesses to access stored water during shortages.

Suggested Ghana Water Company could partner with large institutions to install pumping systems or deep boreholes to improve supply resilience.

Open to digital solutions but skeptical — questioned why a tech platform would work better than the normal water supply system.

**Key Quotes:**
> "If each constituency had a reservoir, at least we could get water when the taps stop flowing."

> "A digital platform for water isn't a bad idea, but if that can work, why not fix the normal pipes first?"

---

## Section 6: Reflections & Emerging Themes

**Operational dependency:** Even small interruptions in supply affect daily operations.

**Limited trust:** Tanker-supplied water is viewed as a backup, not a safe primary source.

**Rising costs:** Incremental price hikes from 250 → 300 GHS are adding to business strain.

**Preparedness gap:** No formal system exists for emergency water supply — fully dependent on phone calls and chance availability.

**Key Insight:**
Clinton's experience highlights the fragile dependence of small urban businesses on informal tanker systems. Even with record-keeping and structured payments, they remain vulnerable to water shortages, quality uncertainty, and rising operational costs.
`
  },
  {
    id: "commercial-yaw-001",
    name: "Commercial Interview - Yaw (Laundry Service, Ashaiman)",
    date: "2025-10-28",
    type: "commercial",
    content: `# Interview Summary: Yaw – Commercial Purchaser (Laundry Service)

**Location:** Ashaiman
**Date:** 28-10-2025
**Business Type:** Laundry Service
**Key Contact:** Yaw (Care Taker)
**Consent:** He didn't want to be recorded
**Duration:** ~40 minutes

---

## Section 1: Business Context & Water Needs

**Type of operation:** Yaw runs a laundry service, which depends heavily on a consistent water supply for washing and rinsing clothes daily.

**Main source:** The tap water in Ashaiman does not flow regularly, often going off for several days or even weeks.

**Alternative sources:** Because of the unreliability, Yaw relies on tanker drivers and local water depots to meet the laundry's daily operational needs.

**Water volume & frequency:** He typically orders water every two to three days, depending on customer load.

**Operational impact:** When water runs out, the laundry cannot operate fully, leading to delays in customer orders and occasional loss of clients.

**Key Quote:**
> "Our tap doesn't flow often, and because of that, I always have to rely on water tankers or buy from depot owners. If I don't get water, I can't wash — business stops."

---

## Section 2: Current Procurement Process

**How they order:** Yaw has two main tanker drivers he calls whenever he needs water.

**Communication:** Orders are made via phone or WhatsApp, depending on which driver is available.

**Lead time:** Delivery usually takes a few hours, but during high-demand periods (especially in dry seasons), it can take up to a day or more.

**Supplier relationship:** The drivers are known contacts — he has worked with them for over a year.

**Pricing arrangement:** Prices are negotiated per trip and vary based on distance, water scarcity, and tanker size.

**Tracking:** He keeps informal records of water purchases — mostly handwritten notes or mental estimates.

**Key Quote:**
> "I call the same two drivers. If one is busy, the other comes. But sometimes both are delayed, so I have to buy smaller quantities from a nearby depot."

---

## Section 3: Pain Points & Operational Impact

**Unreliable supply:** Frequent water shortages and late deliveries cause major operational disruptions.

**Cost variability:** Tanker prices increase sharply during dry seasons, making budgeting difficult.

**Operational delays:** On several occasions, Yaw had to delay or turn down client orders due to water unavailability.

**Stress factor:** Managing water logistics takes significant time — "sometimes half my day goes into just finding water."

**Key Quote:**
> "The hardest part is when you have customers waiting and no water. You can't tell them to wait two days. It affects your reputation."

---

## Section 4: Pricing & Financial Predictability

**Payment structure:** Yaw pays cash on delivery for each tanker. No credit or long-term arrangement exists.

**Price volatility:** Prices change based on scarcity and fuel costs. During high demand, he's sometimes charged ₵400–₵450 per tanker, compared to ₵300 on normal days.

**Budgeting impact:** The unpredictability makes it difficult to plan expenses, especially in peak business seasons.

**Key Quote:**
> "You can't plan. Today they'll say ₵300, next week ₵450. You just pay because you need the water."

---

## Section 5: Supplier Relationships & Trust

**Relationship type:** Largely informal but trust-based; he keeps using the same two suppliers because "they deliver when they say they will."

**Quality checks:** He does not test the water, but relies on the tanker's appearance and familiarity with the drivers.

**Water source awareness:** He's not sure where they fetch it from, but assumes it's from "a clean place."

**Switching suppliers:** He occasionally uses other drivers when his main suppliers are unavailable, though he prefers familiar ones.

**Key Quote:**
> "I don't really know where they get it from, but I trust them. I've used them for a long time and never had a problem."

---

## Section 6: The "Magic Wand" & Ideal State

**Ideal change:** Yaw said he would want reliable tap water or at least a centralized, affordable tanker supply point near Ashaiman.

**Reason:** It would save time, ensure consistent pricing, and reduce stress from chasing multiple suppliers.

**Positive aspect to keep:** He appreciates that his drivers are responsive and flexible with delivery times.

**Key Quote:**
> "If water was always available, I wouldn't need to worry or chase drivers every few days."

---

## Section 7: Technology & Payments

**Current method:** Cash is the main mode of payment.

**Digital use:** He uses Mobile Money (MTN) for personal and some business transactions but rarely for tanker payments.

**Openness to tech:** He would consider a digital ordering platform if it guarantees transparent pricing, quick delivery, and trusted suppliers.

**Key Quote:**
> "If there was an app where you can see the tankers, prices, and delivery time, I'd use it — as long as it's reliable."

---

## Section 8: Decision-Making Authority

Yaw personally handles all water procurement decisions since he manages the laundry himself.

If a better or cheaper option appeared, he could switch immediately without needing approval.

**Key Quote:**
> "It's my business, so I decide who brings the water. If someone is cheaper and faster, I'll call them next time."

---

## Closing Reflections

Yaw's experience underscores the vulnerability of small urban businesses to unreliable water infrastructure. His case highlights:

- Dependence on informal suppliers for essential operations.
- Severe price volatility linked to seasonal scarcity.
- Significant time loss managing logistics manually.
- High openness to technology, provided it's trustworthy and practical.

### Emerging Themes:

- **Operational risk from supply inconsistency**
- **Informal but loyal supplier networks**
- **Cash-based transactions with limited records**
- **Desire for digital tools that improve reliability and transparency**
`
  },
  {
    id: "commercial-maame-001",
    name: "Commercial Interview - Maame Serwah (Washup Laundry Service, Haatso)",
    date: "2025-11-14",
    type: "commercial",
    content: `# Interview Summary: Maame Serwah – Laundry Owner (Washup Laundry Service)

**Location:** Haatso
**Date:** Date not provided
**Business Type:** Laundry Pick-Up & Delivery Service
**Key Contact:** Maame Serwah (Owner)
**Consent:** Not recorded
**Duration:** ~40 minutes
**Conducted:** Ryan

---

## Section 1: Business Context & Water Needs

**Type of operation:**
Ama runs Washup, a laundry pick-up and delivery service that operates all cleaning and washing from a single location. The business transitioned into laundry shortly after COVID, shifting from general cleaning work to a more focused laundry service. Washup was officially registered in 2022.

**Main water source:**
She relies primarily on tap water from Ghana Water Company Limited (GWCL). In her area (Haatso), tap water follows a schedule — it usually goes off on Wednesdays and Sundays. However, in the past two months, water availability has become even more irregular.

**Water quality & pressure:**
Water quality is generally fine, but pressure is sometimes low, which slows operations.

**Use of alternative sources:**
She does not use tanker services. Washup is still small enough that she can "manage the water situation" without external deliveries.

**Operational impact:**
Irregular flow causes inconvenience and operational stress, especially as the schedule has become less reliable recently.

**Key Quote:**
> "Where I live, the water goes off on Wednesdays and Sundays — but for the past two months, it's been even less regular."

---

## Section 2: Current Procurement Process

**How they get water:**
Unlike other laundries that rely on tankers, Ama depends solely on municipal tap water.

**Communication with suppliers:**
Since she doesn't order water from external suppliers, she interacts primarily with GWCL for information. When issues arise, she contacts GWCL directly — though getting responses is difficult.

**GWCL interactions:**
She often has to visit GWCL offices in person because calls go unanswered. Even when she receives phone numbers from officials, the contacts frequently do not pick up.

**Tracking:**
She does not track water procurement since she does not purchase tankers.

**Key Quote:**
> "You can get someone's number from GWCL, but they won't pick up. You still have to go back to the office."

---

## Section 3: Pain Points & Operational Impact

**Unreliable supply:**
The water schedule used to be predictable, but over the last two months, flow has become more erratic. Sudden shortages disrupt washing schedules.

**Operational delays:**
Low pressure and irregular supply slow down the workflow and increase stress, though she has not yet needed tanker support.

**Administrative burden:**
Dealing with GWCL is time-consuming — phone calls go unanswered, and office visits are often required.

**Key Quote:**
> "I had to go to GWCL in person. Calling doesn't work — they won't pick up."

---

## Section 4: Pricing & Financial Predictability

**Payment structure:**
She pays standard GWCL bills for tap water; no tanker purchases.

**Price variability:**
She notes that GWCL water pricing has been stable. No major fluctuations.

**Budgeting impact:**
Predictable water bills mean her main concern is availability, not cost.

**Key Quote:**
> "The cost for water is stable. Getting it from Ghana Water is reasonable."

---

## Section 5: Supplier Relationships & Trust

**Primary supplier:**
Her only supplier is GWCL.

**Trust level:**
Trust is limited — not due to water quality, but due to poor customer service and responsiveness.

**Switching options:**
She does not want to rely on tankers unless absolutely necessary. Her long-term solution is to get a larger workspace with more storage capacity.

**Key Quote:**
> "I don't use water trucks. I just manage the situation for now."

---

## Section 6: The "Magic Wand" & Ideal State

**Ideal change:**
Ama wants a larger workspace that can accommodate big storage tanks. Reliable storage would eliminate stress around scheduled outages and unpredictable flow.

**Reason:**
She wants to maintain her current business model but scale up operations. More storage capacity means more control and fewer disruptions.

**Positive aspect to keep:**
She appreciates that tap water quality is generally good and affordable when it flows.

**Key Quote:**
> "I want a bigger space so I can have large storage tanks. I don't want to worry about water running out."

---

## Section 7: Technology & Payments

**Current method:**
She pays GWCL through their standard billing system. No tanker-related payments.

**Digital use:**
Her water-related interactions are minimal, but she did not express resistance to technology; the issue is more about infrastructure reliability than transaction or ordering tools.

**Openness to tech:**
Not directly discussed, but improving GWCL communication or flow schedules would be more relevant to her than a tanker marketplace.

---

## Section 8: Decision-Making Authority

Ama is the sole owner and operator of Washup. She makes all decisions related to water access and operational structure.

If she needed to switch to tanker services or invest in large storage tanks, she could decide immediately without external approval.

**Key Quote:**
> "I want to keep the same business model — just with more space and better storage."

---

## Closing Reflections

Ama's experience differs from Yaw's in meaningful ways:

- She does not purchase water from tankers at all.
- Her main challenge is irregular municipal supply and GWCL's poor responsiveness, not pricing or delivery delays.
- Her long-term solution is infrastructure (storage tanks + larger space) rather than supplier diversification.
- Pricing is stable for her, unlike the volatile tanker market.

### Emerging Themes (Compared to other interviews):

- **Dependence on inconsistent municipal schedules**
- **No engagement with informal tanker market**
- **Administrative frustration with GWCL**
- **Desire for autonomy via larger storage capacity**
`
  }
];

export default function UserResearch() {
  const [selectedTranscripts, setSelectedTranscripts] = useState<Set<string>>(
    new Set(transcripts.map(t => t.id))
  );
  const [copied, setCopied] = useState(false);

  const toggleTranscript = (id: string) => {
    setSelectedTranscripts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedTranscripts(new Set(transcripts.map(t => t.id)));
  };

  const deselectAll = () => {
    setSelectedTranscripts(new Set());
  };

  const copyAllVisible = async () => {
    const visibleContent = transcripts
      .filter(t => selectedTranscripts.has(t.id))
      .map(t => t.content)
      .join("\n\n---\n\n");

    try {
      await navigator.clipboard.writeText(visibleContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filterByType = (type: Transcript["type"]) => {
    const filtered = transcripts.filter(t => t.type === type).map(t => t.id);
    setSelectedTranscripts(new Set(filtered));
  };

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="bg-white border rounded p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">User Research</h1>
            <p className="text-sm text-gray-500">Version: 1.0 | Last Updated: 2025-11-22</p>
          </div>
          <button
            onClick={copyAllVisible}
            className={`px-4 py-2 rounded transition-colors ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy All Visible"}
          </button>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-700">Quick Filters:</span>
            <button
              onClick={selectAll}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Deselect All
            </button>
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            <button
              onClick={() => filterByType("driver")}
              className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition-colors"
            >
              Drivers Only
            </button>
            <button
              onClick={() => filterByType("residential")}
              className="px-3 py-1 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded transition-colors"
            >
              Residential Only
            </button>
            <button
              onClick={() => filterByType("commercial")}
              className="px-3 py-1 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded transition-colors"
            >
              Commercial Only
            </button>
            <button
              onClick={() => filterByType("depot")}
              className="px-3 py-1 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded transition-colors"
            >
              Depot Only
            </button>
          </div>

          {/* Individual transcript checkboxes */}
          <div className="border-t pt-3">
            <p className="font-semibold text-sm text-gray-700 mb-2">Select Individual Transcripts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {transcripts.map(transcript => (
                <label
                  key={transcript.id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedTranscripts.has(transcript.id)
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTranscripts.has(transcript.id)}
                    onChange={() => toggleTranscript(transcript.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{transcript.name}</div>
                    <div className="text-xs text-gray-500">
                      {transcript.date} • {transcript.type}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Selected count */}
        <div className="mt-3 text-sm text-gray-600">
          Showing {selectedTranscripts.size} of {transcripts.length} transcripts
        </div>
      </div>

      {/* Transcripts Display */}
      <div className="space-y-6">
        {transcripts
          .filter(t => selectedTranscripts.has(t.id))
          .map(transcript => (
            <div key={transcript.id} className="bg-white border rounded p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{transcript.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <span>{transcript.date}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      transcript.type === "driver" ? "bg-blue-100 text-blue-800" :
                      transcript.type === "residential" ? "bg-green-100 text-green-800" :
                      transcript.type === "commercial" ? "bg-purple-100 text-purple-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {transcript.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(transcript.content);
                      // Could add individual copy feedback here
                    } catch (err) {
                      console.error("Failed to copy:", err);
                    }
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {transcript.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
      </div>

      {selectedTranscripts.size === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded p-8 text-center">
          <p className="text-gray-600">No transcripts selected. Use the filters above to select transcripts to view.</p>
        </div>
      )}

      {/* Pain Point Scorecard Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pain Point Scorecard Analysis</h2>
        <p className="text-sm text-gray-600 mb-6">Quantitative analysis of key operational pain points</p>

        {/* Nuhé Scorecard */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold text-gray-900">Nuhé (Fleet Owner – 2 Trucks)</h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Context:</strong> Small fleet operator in Accra. Previously sourced water from the &quot;under bridge&quot; hydrant managed by McCarthy &amp; Sons.
              Has been unable to operate very well for the past three months due to GWCL restrictions.
            </p>
          </div>

          {/* Pain Points Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pain Point</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Score (1–10)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes / Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">1. Wasted Time / Fuel (Traffic)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
                      5 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Moderate issue. He mentioned that movement within the city adds to costs, but his main problem is not having water to fetch rather than traffic delays.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">2. Finding Water (Supply Search)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
                      10 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <strong>Severe.</strong> His entire operation has been halted because the hydrant source was closed. He explicitly said he&apos;s been unable to fetch water for 3 months.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">3. Depot Wait Times (Queues)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
                      6 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Previously, queues at the &quot;under-bridge&quot; depot caused minor delays, but now the issue is total closure rather than long waits.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">4. Payment Issues (Collections)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                      2 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Not a major problem; customers usually pay on delivery (cash-and-carry). No credit or delay mentioned.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">5. Cancelled Orders (Wasted Trips)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                      3 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Low frequency. Since most customers call him directly and he delivers on request, cancellations rarely occur.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Analysis Summary</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-red-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Top Pain Point:</strong> Finding water (supply access restrictions)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-orange-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Secondary Pain Points:</strong> Depot wait times and fuel/time waste
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-blue-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Minor Issues:</strong> Payment delays and cancellations
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Summary:</strong> Nuhé&apos;s primary struggle is regulatory disruption — losing access to the GWCL hydrant has completely slowed down his business.
                While everyday inefficiencies like traffic or fuel exist, they&apos;re secondary to the core problem of not being allowed to fetch water.
              </p>
            </div>
          </div>
        </div>

        {/* Joseph Scorecard */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mt-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold text-gray-900">Joseph (Fleet Manager – 4 Trucks, Managed for Father)</h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Context:</strong> Manages four water tanker trucks for his father. Operates across Accra, sourcing from Ghana Water Company hydrants.
              Travels long distances (sometimes to Winneba) to find water when local sources dry up.
            </p>
          </div>

          {/* Pain Points Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pain Point</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Score (1–10)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes / Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">1. Wasted Time / Fuel (Traffic)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
                      8 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    High fuel cost and wasted hours due to long routes searching for available depots. Mentioned traveling far distances to get water.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">2. Finding Water (Supply Search)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
                      9 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <strong>Major challenge.</strong> Regularly travels to other towns (e.g., Winneba) to locate available water. Strongly linked to GWCL unreliability.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">3. Depot Wait Times (Queues)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
                      7 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Long queues are common, especially during shortages. Impacts delivery scheduling and driver productivity.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">4. Payment Issues (Collections)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                      3 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Customers pay on delivery; no reported credit issues. Slight negotiation on price but manageable.
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">5. Cancelled Orders (Wasted Trips)</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                      2 / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Very rare; most orders are confirmed before dispatch. Minimal wasted trips.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Analysis Summary</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-red-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Top Pain Points:</strong> Finding water and Fuel/Traffic waste
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-orange-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Secondary Pain Point:</strong> Depot queues
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 bg-blue-500 rounded mt-1 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">
                  <strong>Minor Issues:</strong> Payment and cancellations
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Summary:</strong> Joseph&apos;s main struggle is operational inefficiency caused by unreliable water sources. His fleet wastes substantial time and fuel
                traveling to distant depots. Queues worsen the issue, reducing daily trips per truck and increasing costs. Payment and cancellations are negligible
                compared to the supply-side and fuel problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
