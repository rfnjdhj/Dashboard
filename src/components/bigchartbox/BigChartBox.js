import "./bigchartbox.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Skeleton from '../skeleton/Skeleton';
import React, { useState, useEffect } from 'react';

const data = [
    {
      name: "Sun",
      books: 4000,
      clothes: 2400,
      electronic: 2400,
    },
    {
      name: "Mon",
      books: 3000,
      clothes: 1398,
      electronic: 2210,
    },
    {
      name: "Tue",
      books: 2000,
      clothes: 9800,
      electronic: 2290,
    },
    {
      name: "Wed",
      books: 2780,
      clothes: 3908,
      electronic: 2000,
    },
    {
      name: "Thu",
      books: 1890,
      clothes: 4800,
      electronic: 2181,
    },
    {
      name: "Fri",
      books: 2390,
      clothes: 3800,
      electronic: 2500,
    },
    {
      name: "Sat",
      books: 3490,
      clothes: 4300,
      electronic: 2100,
    },
  ];
  

const BigChartBox = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载延迟
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className='bigChartBox'>
        <Skeleton type="chart" height={300} />
      </div>
    );
  }

  return (
    <div className='bigChartBox'>
        <h1>Revenue Analytics</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
        <AreaChart
          
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#384256" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip 
            contentStyle={{background:"#2a3447", borderRadius:"5px", border: "1px solid #384256", color: "#fff"}}
          />
          <Area type="monotone" dataKey="electronic" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="clothes" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="books" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>

        </div>


    </div>
  )
}

export default BigChartBox;