export const getTooltipValue = (value: string, maxLength = 16) => {
    return value && value.length > maxLength ? `${value}` : null;
};
