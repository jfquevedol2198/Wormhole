import * as d3 from 'd3';
import * as moment from 'moment';
import { ICount, ITraderStamina } from '../../../interfaces/traderStamina.interface';
import { listOfMonth } from '../../../helpers/listOfMonths';
import { listOfWeekdays } from '../../../helpers/listOfWeekdays';

export class CalendarHeatmap {
    public squareLength: number;
    public padding: number;
    public squareLengthWithPadding: number;
    public monthLabelHeight: number;
    public monthLabelHeightWithPadding: number;
    public dayLabelLength: number;
    public legendLabelLength: number;
    public width: number;
    public height: number;
    public legendWidth: number;
    public locale = {
        months: listOfMonth,
        days: listOfWeekdays,
    };

    public counterMap: any = {};
    public now: Date;
    public yearAgo: Date;
    public startDate: Date;
    public maxCount: number;

    public selector: string;
    public data: ITraderStamina[];
    public colors: string[];
    public weekStart: number; // 0 for Sunday, 1 for Monday

    constructor(
        selector: string,
        weekStart: number,
        data: ITraderStamina[],
        colors: string[],
        squareLength: number,
        padding: number,
        monthLabelHeight: number,
        dayLabelLength: number,
        legendLabelLength: number,
    ) {
        this.selector = selector;
        this.data = data;
        this.colors = colors;
        this.weekStart = weekStart;

        this.squareLength = squareLength;
        this.padding = padding;
        this.squareLengthWithPadding = this.squareLength + this.padding;
        this.monthLabelHeight = monthLabelHeight;
        this.monthLabelHeightWithPadding = this.padding * 3 + this.monthLabelHeight;

        this.dayLabelLength = dayLabelLength;
        this.legendLabelLength = legendLabelLength;

        this.width = this.squareLengthWithPadding * 53 + this.dayLabelLength;
        this.height = this.monthLabelHeightWithPadding + this.squareLengthWithPadding * 8.5;
        this.legendWidth = this.squareLengthWithPadding * 6 + (this.legendLabelLength + this.padding) * 4;

        this.now = moment().endOf('day').toDate();
        this.yearAgo = moment().startOf('day').subtract(1, 'year').toDate();

        this.data.map((element: ITraderStamina) => {
            const {date, ...counts} = element;
            const formattedDate = moment(element.date).format('YYYY-MM-DD');
            this.counterMap[formattedDate] = counts;
        });

        this.maxCount = d3.max(this.data, (d) => (
            d.transactionCount + d.nftCount + d.borrowCount + d.depositCount + d.liquidationCount + d.repayCount
            + d.rewardCount + d.stakeCount + d.swapCount + d.unStakeCount + d.withdrawCount
        ));

        d3.select(`div${this.selector}`).selectAll('svg.calendar-heatmap').remove();

        const dateRange = d3.timeDays(this.yearAgo, this.now);
        const monthRange = d3.timeMonths(moment(this.yearAgo).startOf('month').toDate(), this.now);
        const firstDate = moment(dateRange[0]);

        const color = d3.scaleLinear<string>()
            .range(this.colors)
            .domain([0, this.maxCount]);

        const svg = d3.select(`div${this.selector}`)
            .append('svg')
            .attr('width', '100%')
            .attr('class', 'calendar-heatmap')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);

        const dayRects = svg.selectAll<SVGRectElement, {}>('.calendar-heatmap__day-cell')
            .data(dateRange);

        const cell = dayRects.enter().append('rect')
            .attr('class', 'calendar-heatmap__day-cell')
            .attr('width', this.squareLength)
            .attr('height', this.squareLength)
            .attr('fill', (d) => (color(this.totalCountForDate(d))))
            .attr('x', (d) => this.getCellX(d, firstDate))
            .attr('y', (d) => this.getCellY(d));

        let tooltip;

        cell.each((d, index) => {
            if (this.countForDate(d).nftCount > 0) {
                svg
                    .append('svg:image')
                    .attr('xlink:href', 'assets/img/NFTImage.png')
                    .attr('width', `${this.squareLength * 0.7}`)
                    .attr('height', `${this.squareLength * 0.7}`)
                    .attr('x', () => this.getCellX(d, firstDate) + 0.15 * this.squareLength)
                    .attr('y', () => this.getCellY(d) + 0.15 * this.squareLength)
                    .on('mouseover', () => {
                        tooltip = this.createTooltip(d, index);
                    })
                    .on('mouseout', () => {
                        tooltip.remove();
                    });
            }
        });

        cell.merge(dayRects)
            .on('mouseover', (event, d) => {
                const index = cell.merge(dayRects).nodes().indexOf(event.target);
                tooltip = this.createTooltip(d, index);
                d3.select(event.currentTarget).style('stroke', '#555555');
            })
            .on('mouseout', (event) => {
                tooltip.remove();
                d3.select(event.currentTarget).style('stroke', '');
            });

        const colorRange = [color(0)];
        for (let i = 4; i > 0; i--) {
            colorRange.push(color(this.maxCount / i));
        }

        const legendGroup = svg.append('g');
        const legendGroupElementsHeight = this.height - this.squareLength;
        const legendGroupTextHeight = this.height - this.padding;
        const nftLabelX = this.width - this.legendWidth;
        const nftIconX = nftLabelX + this.legendLabelLength + this.padding;
        const lessLabelX = nftIconX + this.squareLengthWithPadding * 2;
        const getLegendCellX = (index: number): number => {
            return lessLabelX + this.legendLabelLength + this.padding + index * this.squareLengthWithPadding;
        };
        const moreLabelX = getLegendCellX(5);

        legendGroup.selectAll('.calendar-heatmap__legend')
            .data(colorRange)
            .enter()
            .append('rect')
            .attr('class', 'calendar-heatmap__legend')
            .attr('width', this.squareLength)
            .attr('height', this.squareLength)
            .attr('x', (d, i) => getLegendCellX(i))
            .attr('y', legendGroupElementsHeight)
            .attr('fill', (d) => (d));

        legendGroup.append('svg:image')
            .attr('xlink:href', 'assets/img/NFTImage.png')
            .attr('width', this.squareLength)
            .attr('height', this.squareLength)
            .attr('x', nftIconX)
            .attr('y', legendGroupElementsHeight);

        legendGroup.append('text')
            .attr('class', 'app-f-dde app-f-s-8')
            .attr('x', nftLabelX)
            .attr('y', legendGroupTextHeight)
            .text('NFT');

        legendGroup.append('text')
            .attr('class', 'app-f-dde app-f-s-8')
            .attr('x', lessLabelX)
            .attr('y', legendGroupTextHeight)
            .text('Less');

        legendGroup.append('text')
            .attr('class', 'app-f-dde app-f-s-8')
            .attr('x', moreLabelX)
            .attr('y', legendGroupTextHeight)
            .text('More');


        dayRects.exit().remove();

        svg.selectAll('.month')
            .data(monthRange)
            .enter().append('text')
            .attr('class', 'month-name app-f-dde app-f-s-9')
            .text((d) => (this.locale.months[d.getMonth()]))
            .attr('x', (d) => this.getMonthX(d, dateRange))
            .attr('y', this.monthLabelHeight)
            .style('visibility', (d) => this.getMonthX(d, dateRange) === -1 ? 'hidden' : null);

        this.locale.days.forEach((day, index) => {
            index = this.formatWeekday(index);
            if (index % 2 === 0) {
                svg.append('text')
                    .attr('class', 'day-initial app-f-dde app-f-s-8')
                    .attr('transform', 'translate(15,' + (this.squareLengthWithPadding * (index + 1) + 12) + ')')
                    .style('text-anchor', 'middle')
                    .attr('dy', '2')
                    .text(day);
            }
        });
    }

    countForDate(d: Date): ICount {
        const key = moment(d).format('YYYY-MM-DD');
        return this.counterMap[key] || 0;
    }

    totalCountForDate(d: Date): number {
        const key = moment(d).format('YYYY-MM-DD');
        if (this.counterMap[key]) {
            const count = this.counterMap[key];
            return count.transactionCount + count.nftCount + count.borrowCount + count.depositCount
                + count.liquidationCount + count.repayCount + count.rewardCount + count.stakeCount + count.swapCount
                + count.unStakeCount + count.withdrawCount;
        }
        return 0;
    }

    formatWeekday(weekDay: number) {
        if (this.weekStart === 1) {
            if (weekDay === 0) {
                return 6;
            } else {
                return weekDay - 1;
            }
        }
        return weekDay;
    }

    createTooltip(d: Date, index: number) {
        const dateStr = moment(d).format('ddd, MMM Do YYYY');
        const count = this.countForDate(d);
        const firstLine = `${count.transactionCount + ' transaction' + this.pluralizedTooltipUnit(count.transactionCount) + ', '
            + count.nftCount + ' NFT' + this.pluralizedTooltipUnit(count.nftCount) + ', '
            + count.borrowCount + ' borrow' + this.pluralizedTooltipUnit(count.borrowCount) + ', '
            + count.rewardCount + ' reward' + this.pluralizedTooltipUnit(count.rewardCount) + ', '
            + count.liquidationCount + ' liquidation' + this.pluralizedTooltipUnit(count.liquidationCount) + ','}`;

        const secondLine = `${
            + count.repayCount + ' repay' + this.pluralizedTooltipUnit(count.repayCount) + ', '
            + count.depositCount + ' deposit' + this.pluralizedTooltipUnit(count.depositCount) + ', '
            + count.stakeCount + ' stake' + this.pluralizedTooltipUnit(count.stakeCount) + ', '
            + count.swapCount + ' swap' + this.pluralizedTooltipUnit(count.swapCount) + ', '
            + count.unStakeCount + ' unstake' + this.pluralizedTooltipUnit(count.unStakeCount) + ' and '
            + count.withdrawCount + ' withdraw' + this.pluralizedTooltipUnit(count.withdrawCount) + ' on '}`;

        const tooltipWidth = this.getTooltipWidth(secondLine.length);
        const tooltipHeight = 3.5 * this.squareLengthWithPadding;

        const tooltip = d3.select(`svg.calendar-heatmap`).append('g');
        const tooltipContainer = tooltip
            .append('rect')
            .attr('class', 'calendar-heatmap__day-cell__tooltip')
            .attr('x', () => this.getTooltipLeftPosition(index, tooltipWidth))
            .attr('y', () => this.getTooltipTopPosition(d, tooltipHeight))
            .attr('width', `${tooltipWidth}`)
            .attr('height', `${tooltipHeight}`)
            .attr('fill', 'rgb(66, 66, 66)')
            .attr('rx', 5);

        tooltip
            .append('text')
            .attr('class', 'app-f-s-9')
            .attr('fill', 'rgba(255,255,255, 0.87)')
            .attr('x', () => this.getTextLeftPosition(index, tooltipWidth, firstLine.length))
            .attr('y', () => this.getTextTopPosition(1, tooltipHeight, d))
            .text(firstLine);

        tooltip
            .append('text')
            .attr('class', 'app-f-s-9')
            .attr('fill', 'rgba(255,255,255, 0.87)')
            .attr('x', () => this.getTextLeftPosition(index, tooltipWidth, secondLine.length))
            .attr('y', () => this.getTextTopPosition(2, tooltipHeight, d))
            .text(secondLine);

        tooltip
            .append('text')
            .attr('class', 'app-f-s-9')
            .attr('fill', 'rgba(255,255,255, 0.87)')
            .attr('x', () => this.getTextLeftPosition(index, tooltipWidth, dateStr.length))
            .attr('y', () => this.getTextTopPosition(3, tooltipHeight, d))
            .text(dateStr);

        return tooltip;
    }

    getTooltipWidth(textLength: number): number {
        return 0.4 * textLength * this.squareLengthWithPadding;
    }

    getTextLeftPosition(index: number, tooltipWidth: number, textLength: number): number {
        return this.getTooltipLeftPosition(index, tooltipWidth)
            + (tooltipWidth - textLength * 0.4 * this.squareLengthWithPadding) / 2 + 0.5 * this.squareLengthWithPadding;
    }

    getTextTopPosition(index: number, tooltipHeight: number, d: Date): number {
        return this.getTooltipTopPosition(d, tooltipHeight) + index * this.squareLengthWithPadding
    }

    getTooltipLeftPosition(index: number, tooltipWidth: number): number {
        return (index * (this.width - tooltipWidth) / 365);
    }

    getTooltipTopPosition(d: Date, tooltipHeight: number): number {
        const formattedWeekday = this.formatWeekday(d.getDay());
        return formattedWeekday > 2
            ? this.monthLabelHeightWithPadding + this.squareLengthWithPadding * (formattedWeekday - 0.5) - tooltipHeight
            : this.monthLabelHeightWithPadding + this.squareLengthWithPadding * (formattedWeekday + 1.5);
    }

    getCellY(d: Date): number {
        return this.monthLabelHeightWithPadding + this.formatWeekday(d.getDay()) * this.squareLengthWithPadding;
    }

    getCellX(d: Date, firstDate: moment.Moment): number {
        const cellDate = moment(d);
        const result = cellDate.week() - firstDate.week()
            + (firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear()));
        return result * this.squareLengthWithPadding + this.dayLabelLength;
    }

    getMonthX(d: Date, dateRange: Date[]): number {
        let matchIndex = 0;
        dateRange.find((element, index) => {
            matchIndex = index;
            return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
        });

        if (matchIndex === 0) {
            return -1;
        } else {
            return Math.floor(matchIndex / 7) * this.squareLengthWithPadding + 40;
        }
    }

    pluralizedTooltipUnit(count: number) {
        return count === 1 ? '' : 's';
    }
}
