# Quality Assurance Protocol
**Version:** 1.1 | **Last Updated:** 2025-11-26

## 1. Guiding Principle: "Trust Through Verification"

Our brand is not built on guaranteeing 100% pure water; it is built on guaranteeing 100% transparency and verification. We are a "Trust Infrastructure" first and a marketplace second. This protocol is the single most important SOP (Standard Operating Procedure) in the company. Failure to execute it is an existential risk. All personnel must be trained on this protocol before their first day.

## 2. Reference Standard

All tests are benchmarked against the Ghana Standards Authority (GSA) DGS 175:2021 (Specification for drinking water). Key maximum limits are:

- **Turbidity**: 5 NTU
- **Total Dissolved Solids (TDS)**: 500 mg/L
- **pH**: 6.5 - 8.5
- **E. coli**: 0 cfu / 100ml
- **Arsenic (As)**: 0.01 mg/L
- **Lead (Pb)**: 0.01 mg/L

## 3. The 3-Layer Trust Protocol

### Layer 1: Source Vetting (One-Time Depot Onboarding)

**Objective**: To ensure a depot's source is fundamentally viable before it is ever allowed to join the platform.

#### Policy:

**Source Blacklisting (Non-Negotiable)**: Any depot sourcing water directly from untreated surface water (e.g., Weija Lake, Odaw River) is permanently blacklisted due to uncontrollable risks (Schistosomiasis, industrial/sewage runoff).

**Eligible Sources**: Depots must prove they use a protected borehole source or a GWCL supply.

**Mandatory WRC Permit**: Depot must provide a valid Water Resources Commission (WRC) permit for water abstraction.

#### Onboarding Procedure (Ops Manager):

1. **Document Verification**: Collect and verify WRC permit.

2. **Baseline Lab Test**:
   - Take one (1) sterile 1L sample from the depot's main filling tap.
   - Deliver sample to SGS Ghana (or equivalent accredited lab).
   - Order a full-panel "Potable Water Test" benchmarked against DGS 175:2021.
   - **Minimum Test Panel**: E. coli, Total Coliforms, Turbidity, pH, TDS, Lead, Arsenic, Mercury, and Cadmium.

3. **Go/No-Go**: The depot is only activated on the platform if the SGS lab report shows 100% compliance. This report is scanned and attached to the depot's file in the admin dashboard.

### Layer 2: Point-of-Filling Check (Per-Delivery)

**Objective**: To catch sudden, real-time changes in water quality (e.g., siltation after rain, salinity intrusion, new biological contamination).

#### Equipment:

Each driver will be issued a **Clearwater Field Test Kit** containing:
- Digital Turbidity Meter (e.g., Hach 2100Q or Hanna HI98713)
- Digital TDS/EC Meter (e.g., Hanna HI99301)
- ATP Luminometer & Swabs (e.g., Hygiena EnSURE Touch & AquaSnap)

**Note**: Meters must be calibrated by the Ops Manager weekly.

#### Procedure (Built into Driver App):

1. Driver arrives at an approved (Layer 1) depot.
2. Driver App prompts: "Begin 3-Point Quality Check."
3. Driver takes a sample from the depot tap before filling the tanker.
4. Driver performs the three tests:
   - **Test 1 (Turbidity)**: Enters NTU value. (App validates: MUST BE ≤ 5.0 NTU).
   - **Test 2 (TDS)**: Enters ppm value. (App validates: MUST BE ≤ 500 ppm).
   - **Test 3 (ATP)**: Enters RLU value. (App validates: MUST BE ≤ [Threshold TBD]).
5. Driver is prompted: "Take photo of meter readings." This photo is uploaded and attached to the order data to prevent fraud.

#### Pass/Fail:

- **PASS**: All three values are within range. The app unlocks the "Confirm Fill-Up" button. The order is now "In Transit." These test results are automatically attached to the customer's order record.

- **FAIL**: Any value is outside the threshold. The app blocks the fill-up. It displays: "Quality Alert. Do Not Fill. Awaiting Ops Manager review." The driver is instructed to try a different approved depot.

### Layer 3: Random Auditing (Weekly Enforcement)

**Objective**: To police the network for driver fraud and test for the "invisible" threats (bacteria, heavy metals) that the Layer 2 instant-test cannot catch.

#### Equipment (Ops Manager):

- Ops Manager's own calibrated Field Test Kit (Turbidity, TDS, ATP).
- Portable Incubator & E. coli test kits (e.g., Colilert).
- Sterile sample bottles for lab submission.

#### Procedure (Ops Manager, 5-10 random audits per week):

1. **Intercept**: Randomly select an "In Transit" driver at the customer's delivery point before they unload.

2. **Field Audit (Fraud Check)**:
   - Take a sample from the truck's tank.
   - Run the 3-point (Turbidity, TDS, ATP) test using the Ops Manager's own meters.
   - Compare these results to the driver's submitted Layer 2 data for that order.
   - **Result**: If readings are materially different, the driver is immediately suspended for fraud.

3. **Lab Audit (Invisible Threat Check)**:
   - From the same sample, take two more sterile samples.
   - **Sample A (E. coli)**: Place in the portable incubator (in office/car). Read result in 18-24 hours.
   - **Sample B (Metals)**: Send to SGS Ghana for the Heavy Metals Panel (Arsenic, Lead, Mercury).

#### Enforcement Policy (Zero Tolerance):

- **Driver Fraud (Layer 3 Field Audit)**: Permanent platform ban.

- **E. coli Positive (Layer 3 Lab Audit A)**:
  - **Driver**: Permanent platform ban.
  - **Depot**: Immediate suspension. A full new Layer 1 Lab Test is required for reinstatement. Two strikes = permanent ban.

- **Metals Positive (Layer 3 Lab Audit B)**:
  - **Depot**: Immediate, permanent ban. This indicates a catastrophic source failure that is not correctable.
