import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class ResponsiveLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={"100%"} height={300}>

        <AreaChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff2557" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2e5bff00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0068ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2e5bff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="url(#colorPv)"/>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
