import "./piechartbox.scss";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const data = [
    { name: 'Mobile', value: 400, color: "#0088FE" },
    { name: 'Group B', value: 300, color: "#00c49f" },
    { name: 'Group C', value: 0, color: "#FFBB2B" },
    { name: 'Group D', value: 200, color: "#FFBB42" },
    { name: 'Group E', value: 0, color: "#FF8042" },
  ];

/**
 * 过滤掉值为0或负数的数据项
 * 饼图只显示正值数据，因为：
 * 1. 0值会导致Recharts渲染空白扇形和悬停错误
 * 2. 负值在饼图中没有实际意义（饼图表示比例关系）
 * 3. 负值可能导致Recharts计算错误
 * @param {Array} dataArray - 原始数据数组，每个元素应包含 value 属性
 * @returns {Array} 过滤后的数据数组，只包含 value > 0 的数据项
 */
const filterZeroValueData = (dataArray) => {
  return dataArray.filter(item => item.value > 0);
};

const filteredData = filterZeroValueData(data);

const PieChartBox = () => {
  const hasValidData = filteredData.length > 0;

  return (
    <div className='pieChartBox'>
        <h1>Leads By source</h1>
        <div className='piechart'>
          {hasValidData ? (
            <ResponsiveContainer width="99%" height={300}>
               <PieChart>
                <Tooltip
                contentStyle={{background:"white", borderRadius:"5px"}} />
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
        ) : (
          <div className="no-data-message" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            color: '#888',
            fontSize: '16px'
          }}>
            暂无有效数据
          </div>
        )}

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