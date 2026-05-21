import pool from '../lib/db';
import FunnelChart from './FunnelChart';
import SegmentationChart from './SegmentationChart';
import TasteChart from './TasteChart';
import FilterBar from './FilterBar';

export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<{ limit?: string }> }) {
  const searchParams = await props.searchParams;
  const limit = parseInt(searchParams.limit || '10', 10);

  const funnelRes = await pool.query(`
    SELECT step_name, user_count::int 
    FROM mart_conversion_funnel 
    ORDER BY step_name
  `);

  const segRes = await pool.query(`
    SELECT user_segment as name, COUNT(*)::int as value 
    FROM mart_user_segmentation 
    GROUP BY user_segment
    ORDER BY name
  `);

  const tasteRes = await pool.query(`
    SELECT favorite_category as name, COUNT(*)::int as value 
    FROM mart_customer_taste 
    GROUP BY favorite_category 
    ORDER BY value DESC 
    LIMIT $1
  `, [limit]);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>🛒 E-Commerce Data Dashboard</h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>
          End-to-End Pipeline: Spark ➔ Postgres ➔ dbt ➔ Next.js
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '25px' }}>
          <FunnelChart data={funnelRes.rows} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'end' }}>
          <SegmentationChart data={segRes.rows} />

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FilterBar />
            <TasteChart data={tasteRes.rows} />
          </div>
        </div>
      </div>
    </main>
  );
}