import { IBlockchainMessage } from '../../../../interfaces/blockchainMessages';

export const messagesColumns = [
    {
        columnDef: 'timestamp',
        header: 'Date and Time',
        isSortable: true,
        cell: (blockchainMessage: IBlockchainMessage) =>
            blockchainMessage.date.format('DD/MM/YYYY'),
        subCell: (blockchainMessage: IBlockchainMessage) =>
            blockchainMessage.date.format('hh:mm A'),
    },
    {
        columnDef: 'blockNumber',
        header: 'Block Number',
        isSortable: true,
        cell: (blockchainMessage: IBlockchainMessage) =>
            `${blockchainMessage.blockNumber}`,
    },
    {
        columnDef: 'recipient',
        header: 'Recipient',
        isSortable: true,
        cell: (blockchainMessage: IBlockchainMessage) =>
            blockchainMessage.recipient,
    },
    {
        columnDef: 'transactionHash',
        header: 'Transaction Hash',
        isSortable: true,
        cell: (blockchainMessage: IBlockchainMessage) =>
            blockchainMessage.transactionHash,
    },
    {
        columnDef: 'message',
        header: 'Message',
        isSortable: true,
        cell: (blockchainMessage: IBlockchainMessage) =>
            blockchainMessage.message,
    },
];
