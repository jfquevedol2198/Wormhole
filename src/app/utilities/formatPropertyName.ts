export const formatPropertyName = (name: string) => {
    if (name === 'In Wallet') {
        return {
            shortName: name.split(' ')[1],
            columnDef: name.split(' ')[1].toLowerCase(),
        };
    } else if (name === 'Funding Received') {
        return {
            shortName: name.split(' ')[0],
            columnDef: 'floatingFunding',
        };
    } else {
        return {
            shortName: name.split(' ')[0],
            columnDef: name.split(' ')[0].toLowerCase(),
        };
    }
};
