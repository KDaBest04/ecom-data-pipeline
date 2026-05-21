{{ config(materialized='table') }}

WITH category_interactions AS (
    SELECT
        user_id,
        category_code,
        COUNT(*) as interaction_count
    FROM {{ ref('stg_events') }}
    WHERE category_code IS NOT NULL -- Bỏ qua các sự kiện không rõ danh mục
    GROUP BY user_id, category_code
),
ranked_tastes AS (
    SELECT
        user_id,
        category_code as favorite_category,
        interaction_count,
        -- Dùng Window Function để xếp hạng số lần tương tác của từng user
        ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY interaction_count DESC) as rank
    FROM category_interactions
)

SELECT
    user_id,
    favorite_category,
    interaction_count
FROM ranked_tastes
WHERE rank = 1 -- Chỉ lấy ngành hàng top 1 của mỗi người