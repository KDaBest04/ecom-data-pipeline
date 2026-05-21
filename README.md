# E-Commerce Data Pipeline & Interactive Analytics Dashboard

A complete End-to-End Data Engineering pipeline applying ELT architecture to process, transform, and visualize user behavior data from an e-commerce platform.

## Architecture & Tech Stack
* **Data Ingestion:** Apache Spark (PySpark)
* **Data Warehouse:** PostgreSQL (Dockerized)
* **Data Transformation:** dbt (Data Build Tool)
* **Frontend / Visualization:** Next.js, Recharts, TailwindCSS

## Key Business Features
1.  **Conversion Funnel Analytics:** Tracks user journey (View ➔ Cart ➔ Purchase). Uncovered an anomaly where `Purchase > Add to Cart`, indicating potential frontend tracking loss or a 1-Click Checkout feature.
2.  **User Segmentation (RFM):** Leveraged SQL `PIVOT` to aggregate transaction history, categorizing users into VIPs, Regular Buyers, and Window Shoppers.
3.  **Customer Taste Profiling:** Applied SQL `WINDOW FUNCTIONS` to rank and extract the Top 1 favorite product category for each individual user, enabling personalized recommendations.
4.  **Interactive Dashboard:** Built a dynamic Next.js frontend querying PostgreSQL directly, featuring URL-based parameters for real-time data filtering.

##  Repository Structure
* `/data`: Raw CSV data files.
* `/spark_etl`: PySpark scripts for data cleaning and loading.
* `/dbt_models/ecom_analytics`: dbt project containing data models (`stg_events`, `mart_conversion_funnel`, etc.).
* `/ecom-dashboard`: Next.js source code for the interactive dashboard.
* `docker-compose.yml`: Infrastructure setup for the PostgreSQL database.

##  How to run
1. Start the database: `docker-compose up -d`
2. Run the ETL script: `python spark_etl/etl.py`
3. Run dbt transformations: `cd dbt_models/ecom_analytics && dbt run`
4. Start the dashboard: `cd ecom-dashboard && npm install && npm run dev`
