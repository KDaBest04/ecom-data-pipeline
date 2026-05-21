{{ config(materialized='view') }}

SELECT
    event_time,
    event_type,
    product_id,
    category_code,
    price,
    user_id,
    user_session
FROM {{ source('raw_data', 'raw_events') }}