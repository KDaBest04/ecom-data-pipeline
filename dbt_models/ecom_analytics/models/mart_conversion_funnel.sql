{{ config(materialized='table') }}

WITH user_events AS (
    SELECT
        user_id,
        SUM(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) as total_views,
        SUM(CASE WHEN event_type = 'cart' THEN 1 ELSE 0 END) as total_carts,
        SUM(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) as total_purchases
    FROM {{ ref('stg_events') }}
    GROUP BY user_id
),
funnel_wide AS (
    SELECT
        COUNT(DISTINCT user_id)::bigint as count_users,
        SUM(CASE WHEN total_views > 0 THEN 1 ELSE 0 END)::bigint as count_view,
        SUM(CASE WHEN total_carts > 0 THEN 1 ELSE 0 END)::bigint as count_cart,
        SUM(CASE WHEN total_purchases > 0 THEN 1 ELSE 0 END)::bigint as count_purchase
    FROM user_events
)

SELECT '1. Total Users' AS step_name, count_users AS user_count FROM funnel_wide
UNION ALL
SELECT '2. Viewed Product' AS step_name, count_view AS user_count FROM funnel_wide
UNION ALL
SELECT '3. Added to Cart' AS step_name, count_cart AS user_count FROM funnel_wide
UNION ALL
SELECT '4. Purchased' AS step_name, count_purchase AS user_count FROM funnel_wide