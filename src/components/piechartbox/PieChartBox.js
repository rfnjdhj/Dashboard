import "./piechartbox.scss";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PIE_CHART_DATA, PIE_CHART_OPTIONS } from './config/pieChartConfig';
import { filterPieChartData, getTooltipStyles, addColorsToData } from './utils/pieChartUtils';

const PieChartBox = () => {
  const filteredData = filterPieChartData(PIE_CHART_DATA);
  const dataWithColors = addColorsToData(filteredData);
  const tooltipStyles = getTooltipStyles();
  const { innerRadius, outerRadius, paddingAngle, dataKey, title, height, showLegend } = PIE_CHART_OPTIONS;

  return (
    <div className='pieChartBox'>
        <h1>{title}</h1>
        <div className='piechart'>
        <ResponsiveContainer width="99%" height={height}>
           <PieChart>
            <Tooltip contentStyle={tooltipStyles} />
            <Pie
              data={dataWithColors}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#8884d8"
              paddingAngle={paddingAngle}
              dataKey={dataKey}
            >
            {dataWithColors.map((item, index) => (
                <Cell key={item.name} fill={item.color} />
            ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
        {showLegend && (
            <div className="options">
                {dataWithColors.map((item) => (
                    <div className="option" key={item.name}>
                        <div className="title">
                            <div className="dot" style={{backgroundColor:item.color}}>
                                <span>{item.name}</span>
                            </div>
                            <span>{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default PieChartBox;
