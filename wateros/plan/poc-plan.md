# Water OS: Chaos Interpreter Proof of Concept (POC) Development Plan
**Document Version:** 1.0  
**Date:** September 24, 2025

---

## 1.0 Objective
The objective of this Proof of Concept (POC) is to validate the core thesis of the Water OS "Chaos Interpreter": that by fusing disparate, often incomplete, and low-quality data sources, we can accurately identify and prioritize high-value Non-Revenue Water (NRW) loss hotspots in an urban water network.

This POC will move beyond a simple financial analysis to create a multi-layered, evidence-based "intelligence package" for a single, actionable leak, culminating in a high-confidence "dig here" recommendation for a utility partner.

## 2.0 Scope: The Sandbox Environment
The POC will be confined to a single, well-defined "sandbox" to ensure a manageable scope and clear, measurable results.

- **Area Type:** One District Metered Area (DMA).
- **Ideal Size:** Approximately 1-2 square kilometers.
- **Characteristics:** A DMA is a hydraulically isolated section of the water network with a known inflow point measured by a bulk meter. This is critical as it provides the ground truth for our water balance calculations (Total Water In vs. Total Water Billed). The ideal sandbox will be a residential or mixed-use area known by the utility to have high water losses.

## 3.0 Data Acquisition Plan
This POC requires the integration of three distinct categories of data: Ground-Truth, Satellite (Macroscope), and Drone (Microscope).

| Data Category | Source Name | Specific Data Needed | Purpose & Value | Acquisition Method |
| :--- | :--- | :--- | :--- | :--- |
| **Ground-Truth** | Utility Partner Data | Network Maps (CAD/PDF/Image), Billing Records (CSV), DMA Inflow Data (CSV), Customer Complaints (Text/CSV). | Forms the foundational digital twin and financial water balance model; provides the initial list of financial anomalies. | Establish a no-cost pilot partnership with a municipal water utility in exchange for the final "Hotspot Intelligence Report." |
| **Satellite (Macroscope)** | Synthetic Aperture Radar (SAR) | Historical SAR imagery (GeoTIFF format) over the DMA. | Detects persistent, anomalous soil moisture caused by long-term underground leaks, providing physical evidence. | Free: Copernicus Open Access Hub (Sentinel-1 data). <br> Commercial: Capella Space, ICEYE for higher resolution. |
| | Optical & Multispectral | High-resolution satellite photos (GeoTIFF format). | Validates maps and spots secondary evidence like unusual vegetation health along a pipe's path. | Free: USGS EarthExplorer (Landsat, Sentinel-2 data). <br> Commercial: Planet Labs, Maxar for sub-meter resolution. |
| **Drone (Microscope)** | Thermal Infrared Imagery | High-resolution thermal video or stitched thermal map of specific hotspots. | Pinpoints the precise surface location of a cool temperature signature from leaking water. | Hire a local, certified drone service provider specializing in infrastructure inspection. Provide them with specific coordinates to investigate. |
| | Lidar (3D Elevation) | A Lidar point cloud or Digital Elevation Model (DEM) of the hotspot. | Detects subtle ground subsidence (sinking) caused by soil erosion from a chronic leak. | Same as above. Lidar is a specialized sensor, so ensure the chosen provider has this capability. |

## 4.0 Integrated Analysis Workflow
The core of the POC is a multi-stage workflow designed to progressively increase the confidence level of each identified hotspot.

### Step 1: Baseline Model & Financial Anomaly Detection
- **Action:** Digitize the utility's network maps and georeference them against a modern map layer (e.g., OpenStreetMap).
- **Action:** Geocode customer addresses from billing records and "snap" them to the nearest digitized pipe segment.
- **Action:** Run the water balance calculation: Loss = (DMA Inflow) - (Sum of Billed Consumption).
- **Output:** An initial list of pipe segments with the highest financial losses—our first set of potential hotspots.

### Step 2: Satellite Data Fusion & Confidence Scoring
- **Action:** Overlay historical SAR and optical satellite data on the baseline model.
- **Action:** Develop a "Confidence Score" for each hotspot. This score increases if a financial anomaly correlates with a persistent soil moisture anomaly (from SAR) or an unusual vegetation signature (from optical).
- **Output:** A prioritized list of the Top 3-5 Hotspots that have corroborating evidence from both utility and satellite data.

### Step 3: Surgical Drone Investigation
- **Action:** Commission a drone service provider to fly missions only over the Top 3-5 prioritized hotspots.
- **Action:** The drones will collect thermal, Lidar, and ultra-high-resolution visual data.
- **Output:** A rich dataset for precise, ground-level analysis of the most promising locations.

### Step 4: Final Evidence Synthesis
- **Action:** Analyze the drone data. A hotspot's Confidence Score is elevated to "High Confidence" if the location also shows a clear thermal anomaly and measurable ground subsidence.
- **Output:** The final, definitive "dig here" recommendation.

## 5.0 POC Deliverable: The Hotspot Intelligence Report
The final output of this POC is not a software dashboard, but a concise, powerful, one-page report for each high-confidence hotspot. This report is designed to be immediately useful to a utility's field operations team.

**Report Template for a Single Hotspot:**
- **Location:** [e.g., Intersection of Elm St. & Oak Ave.]
- **Financial Impact:** Estimated loss of 50,000 L/day (from water balance model).
- **Evidence Layer 1 (Utility Data):** Ranked as the #2 highest loss segment in the DMA; 3 "low pressure" complaints logged in this vicinity in the last 6 months.
- **Evidence Layer 2 (Satellite Data):** Location corresponds to a persistent SAR soil moisture anomaly observed over the last 9 months.
- **Evidence Layer 3 (Drone Data):** A 2.5°C thermal anomaly detected along a 3-meter stretch of pavement. Lidar data shows 4cm of subsidence compared to the surrounding area.
- **Recommendation:** High Confidence Leak. Recommend immediate acoustic inspection or excavation at coordinates [Latitude, Longitude].

## 6.0 Success Criteria
This Proof of Concept will be considered successful if:
- Data from at least three distinct categories (e.g., Utility Billing, Satellite SAR, Drone Thermal) are successfully integrated.
- The workflow produces at least one "High Confidence" hotspot with corroborating evidence from multiple layers.
- The utility partner acknowledges that the final "Hotspot Intelligence Report" provides a level of actionable insight that was previously unavailable to them.
- **(Stretch Goal)** The utility physically investigates a recommended hotspot and validates the presence of a leak.
