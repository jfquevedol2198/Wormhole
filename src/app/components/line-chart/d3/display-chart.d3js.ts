import * as d3 from 'd3';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

import { IMargin } from '../../../interfaces/margin.interface';
import { IRange } from '../../../interfaces/range.interface';
import { ISerializedData } from '../../../interfaces/serialized-data.interface';
import { formatValue } from '../../../utilities/format-value';
import { limitRange } from '../../../utilities/limitRange';
import { BaseChart } from './base-chart.d3js';

const HIGHLIGHT_WIDTH = 290;
const DRAG_DEBOUNCE = 150;
const TOOLTIP_WIDTH = 250;
const TOOLTIP_HEIGHT = 34;
const TOOLTIP_OFFSET = 15;
const MIN_COLOR = '#de5542';
const MAX_COLOR = '#97bf5c';

export class DisplayChart extends BaseChart {
    private selects: number[];
    private selecting: boolean;

    private selectedRange$: BehaviorSubject<IRange>;

    private dot: d3.Selection<SVGCircleElement, unknown, null, undefined>;

    private ruleVertical: d3.Selection<
        SVGLineElement,
        unknown,
        null,
        undefined
    >;

    private ruleHorizontal: d3.Selection<
        SVGLineElement,
        unknown,
        null,
        undefined
    >;

    private ruleHorizontalLabel: d3.Selection<
        d3.BaseType,
        unknown,
        null,
        undefined
    >;

    private ruleVerticalLabel: d3.Selection<
        d3.BaseType,
        unknown,
        null,
        undefined
    >;
    private dragHighlight: d3.Selection<
        SVGRectElement,
        unknown,
        null,
        undefined
    >;

    private minMaxTooltip: d3.Selection<SVGElement, unknown, null, undefined>;
    private interval: number;

    private tooltip: d3.Selection<SVGTextElement, unknown, null, undefined>;

    private tooltipLabel: d3.Selection<d3.BaseType, unknown, null, undefined>;

    private baseX: number;
    private baseY: number;
    private baseYMin: number;
    private minIndex: number;
    private maxIndex: number;
    private values: number[];

    events = (svg: d3.Selection<d3.BaseType, unknown, null, undefined>) => {
        const moved = (event) => {
            event.preventDefault();

            const svgElement = this.element.getElementsByTagName('svg')[0];
            const svgPoint = svgElement.createSVGPoint();

            svgPoint.x = event.clientX;
            svgPoint.y = event.clientY;

            const xm = this.x.invert(
                svgPoint.matrixTransform(svgElement.getScreenCTM().inverse()).x,
            );

            const ym = this.y.invert(
                svgPoint.matrixTransform(svgElement.getScreenCTM().inverse()).y,
            );

            const i = d3.bisectCenter(this.data.indexes, xm);
            const s = d3.least(this.data.series, (d) =>
                Math.abs((d as ISerializedData).values[i] - ym),
            );
            const ruleVerticalX = this.x(this.data.indexes[i]);

            this.path
                .style('opacity', (d) => (d === s ? null : '.35'))
                .filter((d) => d === s)
                .raise();

            this.dot
                .attr(
                    'transform',
                    `translate(${this.x(this.data.indexes[i])},${this.y(
                        (s as ISerializedData).values[i],
                    )})`,
                )
                .raise();

            const cursorY = Math.round(d3.pointer(event)[1]);
            const cursorX = Math.round(d3.pointer(event)[0]);
            const baseYFixed = Math.round(this.baseY);
            const baseYMinFixed = Math.round(this.baseYMin);
            const baseXFixed = Math.round(this.baseX);

            // Min & Max Tooltip
            const setMinAndMaxTooltip = (
                index: number,
                type: string,
                coord,
            ) => {
                const color = type === 'min' ? MIN_COLOR : MAX_COLOR;
                const value = this.values[index];

                this.minMaxTooltip.attr('display', null);
                this.minMaxTooltip
                    .select('rect')
                    .attr('x', this.baseX - 150)
                    .attr('y', coord + (type === 'min' ? 16 : -39))
                    .attr('width', 195)
                    .attr('height', 23)
                    .attr('rx', 4);

                this.minMaxTooltip
                    .select('polygon')
                    .attr(
                        'points',
                        `${this.baseX + 18},${
                            coord + (type === 'min' ? 16 : -16)
                        } ${this.baseX + 23},${
                            coord + (type === 'min' ? 11 : -11)
                        } ${this.baseX + 28},${
                            coord + (type === 'min' ? 16 : -16)
                        }`,
                    );

                this.minMaxTooltip
                    .select('text')
                    .style('fill', color)
                    .attr('x', this.baseX - 53)
                    .attr('y', coord + (type === 'min' ? 31 : -24))
                    .text(
                        `${type === 'min' ? 'Low' : 'High'}: ${this.formatYAxis(
                            value,
                        )} Time: ${moment(this.data.indexes[index]).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )}`,
                    );
            };

            const isMinMaxTooltipDisplayed = (x, y) => {
                return (
                    cursorY >= y - 9 &&
                    cursorY <= y - 9 + 17 &&
                    cursorX >= x &&
                    cursorX <= x + 45
                );
            };

            const toggleVisibility = (isShown, isMin) => {
                this.ruleHorizontalLabel.style('display', isShown);
                this.ruleHorizontal.style('display', isShown);
                if (isMin) {
                    this.ruleVerticalLabel.style('display', isShown);
                }
            };
            if (
                isMinMaxTooltipDisplayed(baseXFixed, baseYFixed) &&
                this.width > 800
            ) {
                setMinAndMaxTooltip(this.maxIndex, 'max', this.baseY);
                toggleVisibility('none', false);
            } else if (
                isMinMaxTooltipDisplayed(baseXFixed, baseYMinFixed) &&
                this.width > 800
            ) {
                setMinAndMaxTooltip(this.minIndex, 'min', this.baseYMin);
                toggleVisibility('none', true);
            } else {
                this.minMaxTooltip.attr('display', 'none');
                toggleVisibility(null, true);
            }

            // P&L Tooltip next to the dot
            let tooltipX = this.x(this.data.indexes[i]);

            if (tooltipX > this.width - this.margin.right - TOOLTIP_WIDTH) {
                tooltipX =
                    this.x(this.data.indexes[i]) -
                    TOOLTIP_WIDTH -
                    TOOLTIP_OFFSET;
            }

            this.tooltip
                .attr('x', this.x(this.data.indexes[i]))
                .attr('y', this.y(this.data.indexes[i]) + 15)
                .attr('display', null)
                .raise();

            this.tooltipLabel.select('text').text(
                `${(s as ISerializedData).name} at
                        ${moment(this.data.indexes[i]).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )}
                    : $${formatValue((s as ISerializedData).values[i], '', 0)}`,
            );

            this.tooltipLabel
                .attr(
                    'transform',
                    `translate(${tooltipX},${this.y(
                        (s as ISerializedData).values[i],
                    )})`,
                )
                .attr('display', null)
                .raise();

            this.ruleVertical
                .attr('x1', ruleVerticalX)
                .attr('x2', ruleVerticalX)
                .attr('display', null)
                .raise();

            this.ruleVerticalLabel
                .select('text')
                .text(
                    `${moment(this.data.indexes[i]).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}`,
                );
            this.ruleVerticalLabel
                .attr(
                    'transform',
                    `translate(${limitRange(
                        ruleVerticalX - HIGHLIGHT_WIDTH / 6,
                        0,
                        this.width - this.margin.right - HIGHLIGHT_WIDTH / 3,
                    )}, ${this.height - this.margin.bottom + 16})`,
                )
                .attr('display', null)
                .raise();

            const ruleHorizontalY = limitRange(
                this.y(ym),
                this.margin.top,
                this.height - this.margin.bottom,
            );

            this.ruleHorizontal
                .attr('y1', ruleHorizontalY)
                .attr('y2', ruleHorizontalY);

            this.ruleHorizontal.attr('display', null);

            this.ruleHorizontalLabel
                .select('text')
                .text(`${formatValue(ym, '$', 0)}`);

            this.ruleHorizontalLabel
                .attr(
                    'transform',
                    `translate(${this.width - this.margin.right - 24}, ${
                        ruleHorizontalY + 3
                    })`,
                )
                .attr('display', null)
                .raise();

            if (this.selecting) {
                this.selects[1] = this.data.indexes[i];

                const x1 = this.x(this.selects[0]);
                const x2 = this.x(this.selects[1]);

                this.dragHighlight
                    .attr('display', null)
                    .attr('x', x1 < x2 ? x1 : x2)
                    .attr('width', Math.abs(x1 - x2));
            }

            this.dot.attr('display', null);
            this.tooltipLabel.select('rect').attr('display', null);
            this.ruleVerticalLabel.select('rect').attr('display', null);
            this.ruleHorizontalLabel.select('rect').attr('display', null);
        };

        const entered = () => {
            this.ruleVerticalLabel.attr('display', null);
            this.ruleHorizontalLabel.attr('display', null);
            this.tooltip.attr('display', null);
            this.tooltipLabel.attr('display', null);
            this.minMaxTooltip.attr('display', null);
        };

        const left = () => {
            this.path.style('opacity', null);
            this.dot.attr('display', 'none');
            this.ruleVertical.attr('display', 'none');
            this.ruleVerticalLabel.attr('display', 'none');
            this.ruleHorizontal.attr('display', 'none');
            this.ruleHorizontalLabel.attr('display', 'none');
            this.tooltip.attr('display', 'none');
            this.tooltipLabel.attr('display', 'none');
            this.minMaxTooltip.attr('display', 'none');
        };

        const clicked = (event) => {
            const svgElement = this.element.getElementsByTagName('svg')[0];
            const svgPoint = svgElement.createSVGPoint();

            svgPoint.x = event.clientX;

            const xm = this.x.invert(
                svgPoint.matrixTransform(svgElement.getScreenCTM().inverse()).x,
            );

            const i = d3.bisectCenter(this.data.indexes, xm);

            this.selectedDate$.next(this.data.indexes[i]);
        };

        const dragstart = (event) => {
            this.interval = window.setInterval(() => {
                this.selecting = true;

                const svgElement = this.element.getElementsByTagName('svg')[0];
                const svgPoint = svgElement.createSVGPoint();

                svgPoint.x = event.clientX;

                const xm = this.x.invert(
                    svgPoint.matrixTransform(
                        svgElement.getScreenCTM().inverse(),
                    ).x,
                );

                this.selects[0] =
                    this.data.indexes[d3.bisectCenter(this.data.indexes, xm)];
            }, DRAG_DEBOUNCE);
        };

        const dragend = (event) => {
            if (this.interval) {
                window.clearInterval(this.interval);
            }

            if (this.selecting) {
                this.selecting = false;

                const [left, right] = this.selects.sort((a, b) =>
                    a > b ? 1 : -1,
                );

                if (left && right && this.selectedRange$) {
                    this.selectedRange$.next({ left, right });
                }
            } else {
                clicked(event);
            }
        };

        if ('ontouchstart' in document)
            svg.style('-webkit-tap-highlight-color', 'transparent')
                .on('touchmove', moved)
                .on('touchstart', entered)
                .on('touchend', left);
        else
            svg.on('mousemove', moved)
                .on('mouseenter', entered)
                .on('mouseleave', left)
                .on('mousedown', dragstart)
                .on('mouseup', dragend);
    };

    constructor(
        element: Element,
        selector: string,
        renderWidth: number,
        renderHeight: number,
        margin: IMargin,
        data: any,
        selectedDate$: BehaviorSubject<Date>,
        selectedRange$: BehaviorSubject<IRange>,
        trendline: string,
        darkTheme: boolean,
    ) {
        super(
            element,
            selector,
            renderWidth,
            renderHeight,
            margin,
            data,
            selectedDate$,
        );

        this.selects = [];

        this.selectedRange$ = selectedRange$;

        this.showAxis(this.xAxis);
        this.showAxis(this.yAxis);

        this.showGrid(this.gridHorizontal);

        this.dot = this.svg
            .append('circle')
            .style('fill', darkTheme ? 'rgb(255,255,255)' : 'rgb(0,0,0)')
            .attr('r', 2.5)
            .attr('display', 'none');

        this.tooltip = this.svg
            .append('g')
            .append('text')
            .style('opacity', 0)
            .attr('text-anchor', 'right')
            .attr('alignment-baseline', 'middle');

        this.tooltipLabel = this.svg
            .append('g')
            .style('cursor', 'default')
            .attr('display', 'none')
            .attr('opacity', 0.9);

        this.tooltipLabel
            .append('rect')
            .style('fill', 'rgb(66,66,66)')
            .attr('y', -16)
            .attr('x', 5)
            .attr('width', TOOLTIP_WIDTH)
            .attr('height', TOOLTIP_HEIGHT)
            .attr('rx', 4)
            .attr('display', 'none');

        this.tooltipLabel
            .append('text')
            .style('fill', 'white')
            .attr('x', 10)
            .attr('y', 4)
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);

        this.ruleVertical = this.svg
            .append('line')
            .attr('display', 'none')
            .attr('stroke', 'rgb(155,155,155)')
            .attr('stroke-dasharray', 3)
            .attr('y1', this.margin.top + 1)
            .attr('y2', this.height - this.margin.bottom - 1)
            .attr('x1', 0)
            .attr('x2', 0);

        this.ruleVerticalLabel = this.svg
            .append('g')
            .style('cursor', 'default')
            .attr('display', 'none')
            .attr('opacity', 0.9);

        this.ruleVerticalLabel
            .append('rect')
            .style('fill', 'rgb(66,66,66)')
            .attr('y', -12)
            .attr('width', 120)
            .attr('height', 16)
            .attr('rx', 4)
            .attr('display', 'none');

        this.ruleVerticalLabel
            .append('text')
            .style('fill', 'white')
            .attr('x', 12)
            .attr('y', 0)
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);

        this.ruleHorizontal = this.svg
            .append('line')
            .attr('display', 'none')
            .attr('stroke', 'rgb(155,155,155)')
            .attr('stroke-dasharray', 3)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('x1', this.margin.left)
            .attr('x2', this.width - this.margin.right);

        this.ruleHorizontalLabel = this.svg
            .append('g')
            .style('cursor', 'default')
            .attr('display', 'none')
            .attr('opacity', 0.9);

        this.ruleHorizontalLabel
            .append('rect')
            .style('fill', 'rgb(66,66,66)')
            .attr('y', -12)
            .attr('width', 60)
            .attr('height', 16)
            .attr('rx', 4)
            .attr('display', 'none');

        this.ruleHorizontalLabel
            .append('text')
            .style('fill', 'white')
            .attr('x', 30)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);

        this.dragHighlight = this.svg
            .append('rect')
            .attr('x', this.margin.left)
            .attr('y', this.margin.top)
            .attr('width', 0)
            .attr(
                'height',
                this.height - this.margin.bottom - this.margin.top - 1,
            )
            .style('fill', '#777777')
            .style('opacity', '.3');

        this.minMaxTooltip = this.svg
            .append('g')
            .style('cursor', 'default')
            .attr('opacity', 0.9)
            .attr('display', 'none');

        this.minMaxTooltip
            .append('rect')
            .attr('id', 'tooltip_highlight')
            .style('fill', 'rgb(66,66,66)')
            .style('opacity', '.9');

        this.minMaxTooltip
            .append('polygon')
            .attr('id', 'tooltip_box')
            .style('fill', 'rgb(66,66,66)')
            .style('opacity', '.9');

        this.minMaxTooltip
            .append('text')
            .attr('id', 'tooltip_text')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);

        this.svg.call(this.events);

        if (trendline) {
            const hours = parseInt(trendline.match(/\d+/g)[0]);

            const chunk = (array, chunk_size) => {
                const tempArray = [];

                for (let index = 0; index < array.length; index += chunk_size) {
                    tempArray.push(array.slice(index, index + chunk_size));
                }

                return tempArray;
            };

            const median = (array) => {
                const mid = Math.floor(array.length / 2);
                const nums = [...array].sort();

                return array.length % 2 !== 0
                    ? nums[mid]
                    : (nums[mid - 1] + nums[mid]) / 2;
            };

            const average = (array) =>
                array.reduce((a, c) => a + c) / array.length;

            const trendlinePath = d3
                .line()
                .curve(d3.curveBasis)
                .defined((d) => !isNaN(d as any))
                .x((_, i) => this.x(data.indexes[i * hours]))
                .y((d) => this.y(d as any));

            if (data.series[0]?.values) {
                this.svg
                    .append('g')
                    .attr('fill', 'none')
                    .attr('stroke-linejoin', 'round')
                    .attr('stroke-linecap', 'round')
                    .selectAll('path')
                    .data([
                        chunk(data.series[0].values, hours).map(
                            trendline.startsWith('moving-median')
                                ? median
                                : average,
                        ),
                    ])
                    .join('path')
                    .attr('stroke', '#8a60fe')
                    .attr('stroke-dasharray', 6)
                    .attr('stroke-width', 2.5)
                    .attr('d', (d) => trendlinePath((d as any) || 0));
            }
        }

        const appendRule = (index: number, type: string) => {
            const color = type === 'min' ? MIN_COLOR : MAX_COLOR;
            const value = this.values[index];

            this.baseX = this.width - this.margin.right;
            this.baseY = this.y(value);

            if (type === 'min') {
                this.baseYMin = this.y(value);
            }

            if (this.width > 800 && this.data.series.length === 1) {
                this.svg
                    .append('line')
                    .attr('stroke', color)
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', 3)
                    .attr('y1', this.baseY)
                    .attr('y2', this.baseY)
                    .attr('x1', this.margin.left)
                    .attr('x2', this.baseX)
                    .lower();

                this.svg
                    .append('rect')
                    .style('fill', color)
                    .attr('x', this.baseX)
                    .attr('y', this.baseY - 9)
                    .attr('width', 45)
                    .attr('height', 17)
                    .attr('rx', 4);

                this.svg
                    .append('text')
                    .style('fill', 'black')
                    .attr('x', this.baseX + 22)
                    .attr('y', this.baseY + 3)
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'sans-serif')
                    .attr('font-size', 10)
                    .text(this.formatYAxis(value));
            }
        };

        if (this.data.series.length > 0) {
            this.values = this.data.series[0].values;

            this.minIndex = this.values.reduce(
                (a, c, i) => (c < this.values[a] ? i : a),
                0,
            );

            this.maxIndex = this.values.reduce(
                (a, c, i) => (c > this.values[a] ? i : a),
                0,
            );

            appendRule(this.minIndex, 'min');
            appendRule(this.maxIndex, 'max');
        }
    }
}
