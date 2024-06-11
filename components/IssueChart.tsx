'use client';

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import React from 'react';
import { Card } from './ui/card';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card className='p-2'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            fill= '#8F00FF'
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;