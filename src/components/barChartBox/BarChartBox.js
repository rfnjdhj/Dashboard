import "./barchartbox.scss";
import { BarChart, Bar, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import Skeleton from '../skeleton/Skeleton';
import React, { useState, useEffect } from 'react';



const BarChartBox = (props) => {

  const {title, color, dataKey, chartData} = props;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载延迟
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="barChartBox">
        <Skeleton type="bar" height={150} />
      </div>
    );
  }
  
  return (
    <div className="barChartBox">
        <h1>{props.title}</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
        <BarChart data={props.chartData} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={30}
        >
          <CartesianGrid stroke="#384256" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip 
          contentStyle={{background:"#2a3447", borderRadius:"5px", border: "1px solid #384256", color: "#fff"}}
          labelStyle={{display:"none"}}
          />
          <Bar dataKey={props.dataKey} fill={props.color} />
        </BarChart>
      </ResponsiveContainer>
        </div>

    </div>
  )
}

export default BarChartBox;