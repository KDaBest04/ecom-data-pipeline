{{ config(materialized='table') }}

WITH user_metrics AS (
    SELECT
        user_id,
        MAX(event_time) as last_active_date,
        SUM(CASE WHEN event_type = 'purchase' THEN price ELSE 0 END) as total_spend,
        SUM(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) as total_views,
        SUM(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) as total_orders
    FROM {{ ref('stg_events') }}
    GROUP BY user_id
)

SELECT
    user_id,
    total_spend,
    total_views,
    total_orders,
    last_active_date,
    -- Ứng dụng Logic Business để phân khúc khách hàng
    CASE
        WHEN total_spend >= 500 THEN '1. VIP Customer'
        WHEN total_orders > 0 AND total_spend < 500 THEN '2. Regular Buyer'
        WHEN total_views > 20 AND total_orders = 0 THEN '3. Window Shopper'
        ELSE '4. Casual Visitor'
    END as user_segment
FROM user_metrics