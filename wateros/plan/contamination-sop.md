# Contamination Incident Response Plan
**Version:** 1.1 | **Last Updated:** 2025-11-26

**Status**: CONFIDENTIAL, DRAFT
**Owner**: Founder, Operations Manager
**Purpose**: To define the exact, non-negotiable steps to take upon discovery of a positive contamination test from a Layer 3 Audit (E. coli or Heavy Metals).

> **This is a "Break Glass in Case of Emergency" SOP. Failure to follow this plan perfectly will result in brand collapse.**

---

## Phase 1: The Trigger

**Event**: The Operations Manager (OM) receives a positive lab result (E. coli, Lead, etc.) from SGS for a Layer 3 audit.

**Action**: The OM immediately opens the Admin Dashboard, logs in, and locates the corresponding `AuditRecord`.

**Action**: The OM clicks **"Mark as POSITIVE."**

> This single click triggers the automated containment and traceback process.

---

## Phase 2: Automated Containment (Time: T+0 seconds)

The instant an audit is marked "POSITIVE," the system must automatically:

1. **Identify Sources**: The `AuditRecord` is linked to a specific `FillRecord`, which identifies `truck_id: "T10"` and `depot_id: "D05"`.

2. **Immediate Suspension (Both)**:
   - The system sets `truck_id: "T10"` to `Status: SUSPENDED`. This truck can no longer log in or receive new orders.
   - The system sets `depot_id: "D05"` to `Status: SUSPENDED`. All drivers are now blocked from creating new `FillRecords` at this depot.

3. **Alert**: An automated high-priority alert (SMS, push notification) is sent to the Founder and OM.

---

## Phase 3: Triage (Time: T+1 to T+24 Hours)

**Objective**: Determine if the contamination source is the **Truck** or the **Depot**.

**OM Action (Call)**: The OM immediately calls the driver of T10 and the owner of D05 to inform them of the suspension and the positive test.

**OM Action (Re-test Depot)**: The OM drives to D05 and takes a new sterile sample directly from the depot tap. This sample is sent for an 18-hour E. coli test. This is the **triage test**.

**OM Action (Inspect Truck)**: The OM meets with T10 and orders an immediate, mandatory "Level 3 Sterilization" (full tank flush and steam clean) at a partner facility, at our expense.

### Triage Logic:

- **IF** the depot's new test comes back **NEGATIVE**: The source was the Truck. The truck remains banned until it passes a new full-panel lab test. The depot is provisionally re-activated.

- **IF** the depot's new test comes back **POSITIVE**: The source is the Depot. The depot is moved to a long-term (or permanent) ban.

---

## Phase 4: Traceback & Notification (Time: T+1 minute)

The instant the audit is marked "POSITIVE," the Admin Dashboard must automatically generate two customer lists.

### The "High-Risk" List (Truck Contamination):

**Query**: "Find all Customers linked to Deliveries that used `truck_id: "T10"` AND where the `delivery_timestamp` is after the original audit's `sample_taken_timestamp`."

**Result**: A list of every customer who received water from the contaminated truck after the sample was taken.

### The "Potential-Risk" List (Depot Contamination):

**Query**: "Find all Customers linked to Deliveries that used `depot_id: "D05"` from any truck AND where the `delivery_timestamp` is after the original audit's `sample_taken_timestamp`."

**Result**: A wider list of all customers who received water from the (potentially) contaminated depot.

---

## Phase 5: Crisis Communication (Time: T+15 minutes)

**This is not an email or a push notification. This is a direct phone call from the Founder or Operations Manager to every customer on the "High-Risk" List.**

### The Script:

> "Hello [Customer Name], this is Ryan, the founder of Clearwater. I am calling with an important and urgent water quality alert.
>
> A routine, 24-hour lab test we conduct as part of our 3-Layer Trust Check has just come back positive for E. coli.
>
> Our records show that your [home/business] received a delivery from this specific truck before we received the positive result.
>
> Your trust and safety are our only priorities. We are advising you to **not consume this water without boiling it first**.
>
> We have already taken the truck and its depot offline. I am personally dispatching a new, verified-clean truck to you for a full, free replacement. It should be there within [timeframe].
>
> I am deeply sorry for this, and I am here to answer any questions you have."

### Key Principles of the Call:

1. **Lead with Transparency**: "Positive for E. coli."
2. **Be Specific**: "Your home received a delivery from this truck."
3. **Give Actionable Advice**: "Boil the water."
4. **Show Containment**: "We have taken the truck offline."
5. **Make It Right**: "A free replacement is on its way."

---

**This plan turns a potential brand-ending catastrophe into a moment of radical, trust-building honesty.**
