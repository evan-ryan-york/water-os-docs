# Water OS: V 0.1 POC Project Plan (Final, Expanded)

This document outlines the complete plan to build a compelling, functional proof of concept that demonstrates the core value proposition of Water OS: turning disparate, messy utility data into a prioritized, actionable, and financially quantified map of physical water loss hotspots.

## 🎯 Project Goal

To build an interactive dashboard that ranks physical leak hotspots in a simulated version of Dar es Salaam, Kenya. The ranking will be primarily driven by DMA mass-balance & minimum-night-flow (MNF) analysis, customer complaint clustering, and network topology. Lightweight remote-sensing (NDVI) will be used only as a secondary, corroborating feature.

## 📜 POC Scope: What It Is & What It Isn't

This POC is designed to be a powerful proof of methodology for investors and potential utility partners. It simulates the real-world conditions of a developing city's water utility to prove that our data fusion and AI approach can find value where others can't.

### What this POC WILL be able to do:

*   **Simulate a Digital Twin**: Create a realistic, albeit synthetic, digital representation of a water network with incomplete and messy data.
*   **Ingest and Fuse Data**: Demonstrate the ability to combine various data types (geospatial, time-series, tabular, unstructured text) into a single analytical model.
*   **Identify & Prioritize NRW Hotspots**: Use a rule-based engine and an ML model to rank the most significant physical leak locations based on simulated data.
*   **Quantify Financial Impact**: Translate estimated water loss (liters/day) into financial terms ($/year) and calculate a break-even for repairs.
*   **Explain Its Reasoning**: Provide clear, human-readable "Reason Codes" for why a specific area was flagged as a high-probability hotspot.

### What this POC WILL NOT be able to do:

*   **Connect to a Live Utility System**: The POC will use only synthetic and public data. It will not have any live SCADA or billing system integrations.
*   **Serve as an Operational Tool**: This is a diagnostic and planning tool, not a real-time operational control system for managing valves or pumps.
*   **Detect Real Leaks in Dar es Salaam**: The leaks and network are synthetic. The goal is to prove the method, which can then be applied to real utility data.
*   **Process Payments or Manage Customers**: The billing data is purely for NRW calculation and does not involve any real customer or financial information.

## ✅ Core Deliverable

An interactive dashboard deployed at a temporary URL (e.g., `poc.water-os.ai`) featuring:

*   A **MapLibre map** with toggleable layers: a satellite basemap, the synthesized pipe network (with a visual distinction between "Known vs. Inferred" sections), and the AI-generated leak hotspot heatmap.
*   A **clickable interface** where selecting a hotspot reveals a detailed panel showing:
    *   A **"Reason Codes"** section visualized as a stacked bar chart (e.g., "45% High MNF, 30% Complaint Cluster").
    *   A **"Savings Ledger"** with a Break-Even Calculator (e.g., "Est. Repair Cost: $1,500 | Break-Even: 45 Days").
    *   A **Confidence Score** with a range (e.g., "85% Probability | Range: 75-92%"), computed via isotonic calibration and bootstrapping.
    *   A **Data Quality Score** (High/Medium/Low) with a tooltip explaining the score based on data completeness and reliability for that specific area.
    *   An **"About this POC" modal** containing data source licenses, model performance metrics (Precision@K), and key caveats.

## 🛠️ Technology Stack & Rationale

This stack is chosen for its power, portability, cost-effectiveness, and excellent developer experience, enabling rapid progress for a solo founder.

| Component | Technology | What It Does & Why It Was Chosen |
| :--- | :--- | :--- |
| **Database** | Supabase (Postgres + PostGIS + TimescaleDB) | **Role**: The central nervous system for all structured data. <br> **Why**: Supabase provides a managed, serverless PostgreSQL instance. We get the industry-best PostGIS for spatial queries, and will use standard PostgreSQL timestamptz columns with a B-tree index for efficient time-series analysis (essential for MNF). This approach is highly effective for the POC's scale. |
| **Object Storage**| Cloudflare R2 | **Role**: Stores and serves all large, unstructured data files like map tiles and satellite imagery. <br> **Why**: R2 is S3-compatible but has zero egress fees. This is a massive cost-saver, as serving map tiles can generate significant bandwidth. |
| **Data Versioning**| DVC | **Role**: Git for data. It tracks changes to our synthetic datasets and ML models. <br> **Why**: Ensures our experiments are reproducible. We can always tie a specific model's performance back to the exact version of the synthetic data it was trained on. |
| **Pipelines** | Prefect | **Role**: The conductor of our data orchestra. It schedules, runs, and monitors our data processing workflows. <br> **Why**: Prefect is incredibly developer-friendly. It allows us to turn any Python function into a robust, trackable pipeline step with a simple decorator, making it ideal for managing the complex data synthesis and ML training process. |
| **Backend API** | Python & FastAPI | **Role**: The API that serves data from the database to our frontend dashboard. <br> **Why**: FastAPI is a modern, high-performance Python framework. It's incredibly fast, includes automatic data validation, and generates interactive API documentation, speeding up development significantly. |
| **Deployment** | Docker on Fly.io | **Role**: How we package and run our backend service in the cloud. <br> **Why**: Docker creates a portable container for our app. Fly.io is a cost-effective platform that can run these containers and automatically scale them down to zero when not in use, keeping costs minimal. |
| **Frontend** | React, TypeScript, Vite | **Role**: The user interface and dashboard that the user interacts with. <br> **Why**: This is the robust, industry-standard stack for building professional, interactive web applications. TypeScript adds safety, and Vite provides a lightning-fast development experience. |
| **Mapping** | MapLibre GL JS + PMTiles | **Role**: Renders the interactive map and all its data layers. <br> **Why**: This is a "serverless" mapping stack. PMTiles lets us pre-package all our map data into a single file on R2. MapLibre can then intelligently render it without needing a costly, complex, a dedicated tile server. It's fast, cheap, and powerful. |

## 💾 How It All Comes Together: Building the Digital Twin

The POC creates a digital twin by layering synthetic utility data on top of a real-world geographic canvas. Here’s the step-by-step data flow:

### Step 1: The Real-World Canvas (Foundational Data)

The process starts with publicly available data for Dar es Salaam, Kenya:

*   **Topography (SRTM DEM)**: Provides elevation data for the entire city.
*   **Infrastructure Layout (OpenStreetMap)**: Gives us the road network and building footprints.
*   **Satellite Imagery (Sentinel-2)**: Provides a visual basemap and data for NDVI calculation.

### Step 2: Synthesizing the "Messy" Utility Reality

This is where we simulate the incomplete and imperfect data a real utility would provide, with conditions controlled by one of three **Utility Personas** (e.g., the "Informal Growth" persona will have lower map completeness, fewer supply hours, and a lower complaint rate).

*   **Pipe Network & DMAs**: We partition the OSM road network into "pseudo-DMAs" using graph-based spectral clustering, then inject realistic imperfections like fuzzy boundaries and orphan pipes. We then degrade this map, removing 30-40% of pipes to simulate unmapped infrastructure.
*   **Leak Placement**: Using the elevation data to estimate pressure, along with simulated pipe age and material, we place synthetic leaks in physically plausible locations. Each leak is tagged with its true water loss (`physical_loss_lps`). The leak prevalence is kept low (2-4% of pipes) to create realistic class imbalance.
*   **Hydraulic Validation**: The entire network is run through a WNTR simulation (behind a `USE_WNTR` feature flag) to ensure the physics are sound and to generate realistic pressure data.
*   **Customer & Flow Data**: We sprinkle synthetic customers into OSM building footprints, creating imperfect billing records. We then generate realistic, noisy, and gappy hourly inflow data for each pseudo-DMA. This data includes a "supply hours" flag; MNF is only calculated on nights with >=6 hours of continuous supply to handle intermittent supply scenarios.
*   **Complaints**: We generate unstructured text complaints with fuzzy locations near the synthetic leaks (e.g., "big leak near the market"). These are geocoded against a small gazetteer built from OSM points of interest, and a `geocode_confidence` score is stored with each.

### Step 3: Fusing Data for Analysis (Feature Engineering)

With all data sources prepared, our **Prefect pipeline** takes over. It creates a grid over the city and, for each cell, calculates a list of features:

*   **The Core Signals**: The calculated MNF Residual and Mass Balance (Inflow - Billed Consumption - Exports) from the time-series flow data.
*   **Corroborating Signals**: The density and confidence score of geocoded Customer Complaints.
*   **Contextual Signals**: Network topology features (edge betweenness, distance to a main pipe), pressure proxies from elevation, and the weak NDVI signal from satellite imagery.
*   **Data Quality Features**: A score based on the percentage of usable nights for MNF calculation, sensor data missingness, and geocoding confidence.

### Step 4: Modeling & Generating Insights

*   **Rule-Based Baseline**: First, a simple weighted model scores areas based on clear rules (e.g., if MNF > X and complaints > Y, score = High). This provides a valuable, easily understood baseline.
*   **XGBoost Model**: An XGBoost machine learning model is then trained on all the features, using spatial cross-validation (holding out entire pseudo-DMAs) to prevent data leakage.
*   **Explainability (SHAP)**: After the model makes a prediction, we use SHAP to analyze why. This generates the human-readable **Reason Codes**, turning a "black box" prediction into a trusted, explainable insight.

The final output is the interactive dashboard, a true digital twin that visualizes the complex, interconnected data and presents a clear, financially quantified list of the most critical Non-Revenue Water hotspots to address.

## ✅ Success Metrics & Timeline

### Success Metrics:

*   **Economic**: What is the $/liter saved ratio for the top 20 predicted repairs?
*   **Precision**: Precision@20 with a 100m tolerance buffer.
*   **Sensitivity**: What is the smallest leak (L/day) the model can reliably detect?
*   **Timeliness**: Detection Lag: How many days after a leak is injected does the model detect it?
*   **Accuracy**: Spatial Precision (meters between predicted hotspot and actual leak) and City-level NRW Error (model's total NRW vs. ground truth).
*   **Ablation Study**: A formal table showing the change in Precision@20 with and without key features (MNF, complaints, topology).

### 5-Week De-Risked Timeline:

*   **Week 0**: Setup & Prep.
*   **Week 1**: Infra & Core Data Pipeline.
*   **Week 2**: Rule-Based Scoring & Dashboard Shell.
*   **Week 3**: XGBoost Model & Details Panel.
*   **Week 4**: Evaluation, Polish & Offline Demo.
