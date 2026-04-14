import "./piechartbox.scss";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const data = [
    { name: 'Mobile', value: 400, color: "#4FC3F7" },
    { name: 'Group B', value: 300, color: "#66BB6A" },
    { name: 'Group C', value: 0, color: "#FFA726" },
    { name: 'Group D', value: 200, color: "#FF7043" },
    { name: 'Group E', value: 150, color: "#EC407A" },
    { name: 'Group F', value: 100, color: "#AB47BC" },
    { name: 'Group G', value: 80, color: "#26A69A" },
    { name: 'Group H', value: 60, color: "#FFCA28" },
  ];
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const PieChartBox = () => {
  const filteredData = data.filter(item => item.value > 0);
  
  return (
    <div className='pieChartBox'>
        <h1>Leads By source</h1>
        <div className='piechart'>
        <ResponsiveContainer width="99%" height={300}>
           <PieChart>
            <Tooltip
            contentStyle={{
              background: "#384256",
              color: "white",
              border: "1px solid #4a5568",
              borderRadius: "5px"
            }} />
            <Pie
            data={filteredData}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            >
            {filteredData.map((item) => (
                <Cell key={item.name} 
                fill={item.color} />
            ))}
            </Pie>
            
        </PieChart>
      </ResponsiveContainer>

        </div>

        <div className="options">
            {
                filteredData.map((item) => (
                    <div className="option"
                        key={item.name}>
                        <div className="title">
                            <div className="dot" style={{backgroundColor:item.color}}>
                                <span>{item.name}</span>

                            </div>
                            <span>{item.value}</span>

                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default PieChartBox;
