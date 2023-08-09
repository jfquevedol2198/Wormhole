import { Moment } from 'moment';

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const dateFormat = 'DD/MM/YYYY';
export const dateAndTimeFormat = 'DD-MM-YYYY HH:mm:ss';

export const formatDate = (input: Date | string): string => {
    const date = new Date(input);
    const day = date.getDate();

    let ord = 'th';

    if (day % 10 === 1) ord = 'st';
    if (day % 10 === 2) ord = 'nd';
    if (day % 10 === 3) ord = 'rd';

    return `${day}${ord} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const dateToString = (date: Date): string =>
    `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${
        date.getMonth() + 1
    }-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;

export const timeToString = (date: Date, areSecondsNeeded = true): string => {
    const hour = date.getUTCHours();
    const hourStr = hour < 10 ? `0${hour}` : hour;

    const minute = date.getMinutes();
    const minuteStr = minute < 10 ? `0${minute}` : minute;

    const second = date.getSeconds();
    const secondStr = second < 10 ? `0${second}` : second;

    return areSecondsNeeded
        ? `${hourStr}:${minuteStr}:${secondStr}`
        : `${hourStr}:${minuteStr}`;
};

export const dateAndTimeToString = (date) => {
    return dateToString(date) + 'T' + timeToString(date);
};

export const humanReadableTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds - hours * 60 * 60) / 60);

    seconds -= hours * 60 * 60 + minutes * 60;

    return [
        hours > 1 ? `${hours} hours ` : '',
        minutes > 0 && hours <= 8 ? `${minutes} minutes` : '',
        seconds > 0 && hours === 0 && minutes < 30 ? ` ${seconds} seconds` : '',
    ].join('');
};

export const momentToUtcFormat = (date: Moment) => {
    return date.utc().format('YYYY-MM-DDTHH:mm');
};
