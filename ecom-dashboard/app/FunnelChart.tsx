'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FunnelChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="step_name" type="category" width={150} stroke="#94a3b8" />
          <Tooltip cursor={{fill: '#334155'}} contentStyle={{backgroundColor: '#0f172a', color: '#fff', border: 'none'}}/>
          <Bar dataKey="user_count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}