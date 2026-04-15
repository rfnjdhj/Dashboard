import "./piechartbox.scss";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const data = [
    { name: 'Mobile', value: 400, color: "#0088FE" },
    { name: 'Group B', value: 300,color: "#00c49f" },
    { name: 'Group C', value: 300, color: "#FFBB2B"},
    { name: 'Group D', value: 200, color: "#FFBB42" },
];

const CHART_TITLE = 'Leads By source';

const PieChartBox = () => {
  const chartRef = useRef(null);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingCSV, setIsExportingCSV] = useState(false);

  const getTotalValue = () => {
    return data.reduce((sum, item) => sum + item.value, 0);
  };

  const getPercentage = (value) => {
    const total = getTotalValue();
    return ((value / total) * 100).toFixed(2);
  };

  const sanitizeFilename = (name) => {
    return name.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
  };

  const handleExportImage = async () => {
    if (!chartRef.current || isExportingImage) return;

    setIsExportingImage(true);

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#2a3447',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement('a');
      const sanitizedTitle = sanitizeFilename(CHART_TITLE);
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `${sanitizedTitle}_${dateStr}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('导出图片失败:', error);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleExportCSV = async () => {
    if (isExportingCSV) return;

    setIsExportingCSV(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const headers = ['名称', '数值', '占比(%)'];
      const rows = data.map(item => [
        item.name,
        item.value,
        getPercentage(item.value)
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      const sanitizedTitle = sanitizeFilename(CHART_TITLE);
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `${sanitizedTitle}_${dateStr}.csv`;
      link.href = URL.createObjectURL(blob);
      link.click();

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('导出CSV失败:', error);
    } finally {
      setIsExportingCSV(false);
    }
  };

  return (
    <div className='pieChartBox' ref={chartRef}>
        <div className="header">
            <h1>{CHART_TITLE}</h1>
            <div className="exportButtons">
                <button 
                    className="exportButton" 
                    onClick={handleExportImage}
                    disabled={isExportingImage || isExportingCSV}
                >
                    {isExportingImage ? (
                        <>
                            <span className="spinner"></span>
                            导出中...
                        </>
                    ) : '导出为图片'}
                </button>
                <button 
                    className="exportButton exportButtonCSV" 
                    onClick={handleExportCSV}
                    disabled={isExportingImage || isExportingCSV}
                >
                    {isExportingCSV ? (
                        <>
                            <span className="spinner"></span>
                            导出中...
                        </>
                    ) : '导出 CSV'}
                </button>
            </div>
        </div>
        <div className='piechart'>
        <ResponsiveContainer width="99%" height={300}>
           <PieChart>
            <Tooltip contentStyle={{background:"white", borderRadius:"5px"}} />
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
            {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
            ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
        <div className="options">
            {data.map((item) => (
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
    </div>
  )
}

export default PieChartBox;
