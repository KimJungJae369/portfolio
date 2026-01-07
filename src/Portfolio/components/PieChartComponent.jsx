import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FFB7B2', '#B5EAD7', '#C7CEEA', '#E2F0CB', '#FFDAC1', '#FF9AA2'];

const PieChartComponent = ({ transactions }) => {
  // Process data: Filter expenses and group by category
  const dataMap = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const amount = Math.abs(curr.amount);
      acc[curr.category] = (acc[curr.category] || 0) + amount;
      return acc;
    }, {});

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  }));

  if (data.length === 0) {
    return <div style={{textAlign: 'center', color: '#999', padding: '50px'}}>지출 내역이 없습니다.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()}원`}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
