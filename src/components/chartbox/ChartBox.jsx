import React, { useState, useEffect } from 'react';
import "./chartbox.scss"
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import Skeleton from '../skeleton/Skeleton';


const ChartBox = (props) => {

const {color, icon, title, dataKey, number, percentage, chartbox } = props;
const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载延迟
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className='chartBox'>
        <Skeleton type="chart" height={200} />
      </div>
    );
  }

  return (
    <div className='chartBox'>
        <div className='boxInfo'></div>
        <div className='chartInfo'></div>
        <div className="title">
            <img src={props.icon} alt="" />
            <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/">View All</Link>
        <div className="chartInfo">
            <div className="chart">
                {/* Chart container */}

                <ResponsiveContainer width="99%" height="100%">
        <LineChart data={props.chartData}>
            <CartesianGrid stroke="#384256" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip 
            contentStyle={{background:"#2a3447", borderRadius:"5px", border: "1px solid #384256", color: "#fff"}}
            labelStyle={{display:"none"}} 
            position={{x: 10, y:70}}/>
          <Line type="monotone"
           dataKey={props.dataKey}
           stroke={props.color} 
           strokeWidth={2}
          dot={false} />
        </LineChart>
      </ResponsiveContainer>


                
            </div>
            <div className="texts">
                <span className='percentage' style={{color:props.percentage <0 ? "tomato" : "limegreen"}}>
                    {props.percentage}</span>
                <span className='duration'>this month</span>

            </div>


        </div>
    </div>
  );
}

export default ChartBox;