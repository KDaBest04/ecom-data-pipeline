'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TasteChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Top Favourite Categories</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            tick={{fontSize: 12}}
            interval={0}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip cursor={{fill: '#334155'}} contentStyle={{backgroundColor: '#0f172a', color: '#fff', border: 'none'}}/>
          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}