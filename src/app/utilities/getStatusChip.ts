export const getStatusChip = (status: string) => {
    if (status === 'Completed') {
        return {
            type: 'success',
            text: status,
        };
    } else if (status === 'Scheduled') {
        return {
            type: 'process',
            text: status,
        };
    } else if (status === 'Running') {
        return { type: 'info', text: status };
    } else if (!status) {
        return { type: 'error', text: 'Missing status' };
    } else {
        return { type: 'error', text: status };
    }
};
