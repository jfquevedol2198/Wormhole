export interface IDatesSelected {
    formattedDate: string;
    reportId: number;
    fullDate: string;
}

export interface IDatesFromReport {
    createdDate: string;
    reportId: number;
}
export interface ICalendarData {
    month: string;
    monthNumber: string;
    startAt: Date;
    datesSelected: IDatesSelected[];
}
export interface ICalendarDialogData {
    properData: IDatesSelected;
}
