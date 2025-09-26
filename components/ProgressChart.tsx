import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgressData } from '../types';

interface ProgressChartProps {
  data: ProgressData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#8E8E93" tickLine={false} axisLine={false} />
          <YAxis stroke="#8E8E93" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(28, 28, 30, 0.8)', 
                borderColor: '#3A3A3C',
                borderRadius: '0.75rem',
            }} 
            labelStyle={{color: '#F2F2F7'}}
            itemStyle={{color: '#A3FF2D'}}
          />
          <Line type="monotone" dataKey="weight" stroke="#A3FF2D" strokeWidth={3} dot={false} activeDot={{ r: 8, fill: '#A3FF2D' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
