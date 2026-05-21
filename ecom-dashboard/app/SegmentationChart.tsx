'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const segmentDescriptions: Record<string, string> = {
  '1. VIP Customer': 'Chi tiêu trên $500. Cần chăm sóc đặc biệt.',
  '2. Regular Buyer': 'Có mua hàng nhưng dưới $500. Tiềm năng up-sale.',
  '3. Window Shopper': 'Xem nhiều (>20 lần) nhưng không mua. Cần tung voucher.',
  '4. Casual Visitor': 'Khách vãng lai, xem ít và chưa mua.'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#0f172a', padding: '15px', border: '1px solid #334155', borderRadius: '8px', color: '#fff', zIndex: 1000 }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: payload[0].color }}>{data.name}</p>
        <p style={{ margin: '0 0 5px 0' }}>Số lượng: <strong>{data.value.toLocaleString()}</strong> users</p>
        <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
          💡 {segmentDescriptions[data.name] || 'Không có mô tả'}
        </p>
      </div>
    );
  }
  return null;
}

export default function SegmentationChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: 450, backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#f8fafc' }}>User Segmentation</h3>
      {/* Cái bọc Flex-grow này sẽ ép Recharts nằm ngoan ngoãn bên trong */}
      <div style={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{color: '#94a3b8', paddingTop: '15px'}} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}