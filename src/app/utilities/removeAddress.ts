export const removeAddress = (input: string | null): string => {
    return input ? input.replace(/\s\(.*?\)/, '') : '';
};
