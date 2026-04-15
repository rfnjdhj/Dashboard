import { TOOLTIP_STYLES } from '../config/pieChartConfig';
import { DEFAULT_COLORS, getColorByIndex } from '../config/pieChartTheme';

/**
 * 过滤饼图数据
 * @param {Array} data - 原始数据数组
 * @param {Function|null} filterFn - 过滤函数，返回true表示保留该数据项
 * @returns {Array} 过滤后的数据数组
 */
export const filterPieChartData = (data, filterFn = null) => {
    if (!filterFn) {
        return data;
    }
    return data.filter(filterFn);
};

/**
 * 获取Tooltip样式
 * @returns {Object} Tooltip样式对象的副本，防止外部修改原始配置
 */
export const getTooltipStyles = () => {
    return { ...TOOLTIP_STYLES };
};

/**
 * 从数据中提取颜色数组（兼容旧数据格式）
 * @param {Array} data - 包含color属性的数据数组
 * @returns {Array} 颜色数组
 */
export const getPieChartColors = (data) => {
    return data.map(item => item.color);
};

/**
 * 根据索引获取颜色（使用主题配置）
 * @param {number} index - 数据项索引
 * @param {Array} colors - 颜色数组，默认为DEFAULT_COLORS
 * @returns {string} 颜色值
 */
export const getColorForDataItem = (index, colors = DEFAULT_COLORS) => {
    return getColorByIndex(index, colors);
};

/**
 * 计算数据总值
 * @param {Array} data - 包含value属性的数据数组
 * @returns {number} 所有数据项的value之和
 */
export const calculateTotalValue = (data) => {
    return data.reduce((total, item) => total + item.value, 0);
};

/**
 * 为数据项添加颜色属性（使用主题配置）
 * @param {Array} data - 原始数据数组
 * @param {Array} colors - 颜色数组，默认为DEFAULT_COLORS
 * @returns {Array} 添加了color属性的数据数组
 */
export const addColorsToData = (data, colors = DEFAULT_COLORS) => {
    return data.map((item, index) => ({
        ...item,
        color: getColorByIndex(index, colors)
    }));
};
