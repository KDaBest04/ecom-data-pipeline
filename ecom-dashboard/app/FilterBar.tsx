'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLimit = searchParams.get('limit') || '10';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    router.push(`/?limit=${val}`);
  };

  return (
    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
      <label style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>Hiển thị:</label>
      <select
        value={currentLimit}
        onChange={handleChange}
        style={{
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: '#1e293b',
          color: '#fff',
          border: '1px solid #334155',
          cursor: 'pointer',
          outline: 'none',
          fontSize: '14px'
        }}
      >
        <option value="5">Top 5 ngành</option>
        <option value="10">Top 10 ngành</option>
        <option value="20">Top 20 ngành</option>
      </select>
    </div>
  );
}