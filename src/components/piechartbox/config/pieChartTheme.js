export const DEFAULT_COLORS = [
    "#0088FE",
    "#00c49f",
    "#FFBB2B",
    "#FFBB42",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
];

export const getColorByIndex = (index, colors = DEFAULT_COLORS) => {
    return colors[index % colors.length];
};
