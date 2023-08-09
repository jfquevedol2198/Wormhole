export const separateStringIntoWords = (line: string): string => {
    return line ? line.split(/(?=[A-Z])/).join(' ') : '';
};
