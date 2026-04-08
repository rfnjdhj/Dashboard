import "./piechartbox.scss";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Mobile', value: 400, color: "#4FC3F7" },
    { name: 'Group B', value: 300, color: "#81C784" },
    { name: 'Group C', value: 300, color: "#FFD54F" },
    { name: 'Group D', value: 200, color: "#FF8A65" },
    { name: 'Group E', value: 0, color: "#BA68C8" },
    { name: 'Group F', value: 150, color: "#4DD0E1" },
    { name: 'Group G', value: 100, color: "#A1887F" },
];

const filteredData = data.filter(item => item.value > 0);

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const total = filteredData.reduce((sum, i) => sum + i.value, 0);
        const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
        
        return (
            <div className="custom-tooltip">
                <p className="label">{item.name}</p>
                <p className="value">
                    Value: {item.value} ({percentage}%)
                </p>
            </div>
        );
    }
    return null;
};

const PieChartBox = () => {
    return (
        <div className='pieChartBox'>
            <h1>Leads By source</h1>
            <div className='piechart'>
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Pie
                            data={filteredData}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#4FC3F7"
                            paddingAngle={5}
                            dataKey="value"
                            stroke="#384256"
                            strokeWidth={2}
                        >
                            {filteredData.map((item) => (
                                <Cell key={item.name} fill={item.color} stroke="#384256" strokeWidth={1} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="options">
                {
                    filteredData.map((item) => (
                        <div className="option" key={item.name}>
                            <div className="title">
                                <div className="dot" style={{ backgroundColor: item.color }}>
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
