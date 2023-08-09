import * as d3 from 'd3';

import { BehaviorSubject } from 'rxjs';

import { limitRange } from '../../../utilities/limitRange';
import { convertNumberValueToShortString} from "../../../utilities/convertNumberValueToShortString";

import { IMargin } from '../../../interfaces/margin.interface';
import { ISerializedData } from '../../../interfaces/serialized-data.interface';

export class BaseChart {
    public data: any;

    public element: Element;

    public width: number;
    public height: number;
    public margin: IMargin;

    public svg: d3.Selection<d3.BaseType, unknown, null, undefined>;

    public x: d3.ScaleTime<number, number, never>;
    public y: d3.ScaleLinear<number, number, never>;
    public line: d3.Line<[number, number]>;

    private marker: d3.Selection<SVGLineElement, unknown, null, undefined>;

    public path: d3.Selection<
        d3.BaseType | SVGPathElement,
        unknown,
        SVGElement,
        unknown
    >;

    public selectedDate$: BehaviorSubject<Date>;

    public xAxis = (g: d3.Selection<d3.BaseType, unknown, null, undefined>) => {
        const shortLabels = () =>
            new Date(
                this.data.indexes[this.data.indexes.length - 1],
            ).getTime() -
                new Date(this.data.indexes[0]).getTime() >=
            7 * 24 * 60 * 60 * 1000;

        return g
            .attr(
                'transform',
                `translate(0, ${this.height - this.margin.bottom})`,
            )
            .call(
                d3
                    .axisBottom(this.x)
                    .ticks(Math.floor(this.width / (shortLabels() ? 160 : 220)))
                    .tickFormat(
                        shortLabels()
                            ? d3.timeFormat('%Y-%m-%d')
                            : d3.timeFormat('%Y-%m-%d %H:%M'),
                    ),
            );
    };

    public yAxis = (g: d3.Selection<d3.BaseType, unknown, null, undefined>) =>
        g
            .attr(
                'transform',
                `translate(${this.width - this.margin.right}, 0)`,
            )
            .call(
                d3
                    .axisRight(this.y)
                    .tickSize(0)
                    .tickFormat((value) => this.formatYAxis(value)),
            )
            .call((g) => g.select('.domain').remove());

    public formatYAxis = (value) => {
        return convertNumberValueToShortString(value, '$')
    };

    public gridVertical = (
        g: d3.Selection<d3.BaseType, unknown, null, undefined>,
    ) =>
        g
            .append('g')
            .selectAll('line')
            .data(this.x.ticks())
            .join('line')
            .attr('x1', (d) => 0.5 + this.x(d))
            .attr('x2', (d) => 0.5 + this.x(d))
            .attr('y1', this.margin.top)
            .attr('y2', this.height - this.margin.bottom);

    public gridHorizontal = (
        g: d3.Selection<d3.BaseType, unknown, null, undefined>,
    ) =>
        g
            .append('g')
            .selectAll('line')
            .data(this.y.ticks())
            .join('line')
            .attr('y1', (d) => 0.5 + this.y(d))
            .attr('y2', (d) => 0.5 + this.y(d))
            .attr('x1', this.margin.left)
            .attr('x2', this.width - this.margin.right);

    constructor(
        element: Element,
        selector: string,
        renderWidth: number,
        renderHeight: number,
        margin: IMargin,
        data: any,
        selectedDate$: BehaviorSubject<Date>,
        svgHeight?: string,
    ) {
        this.element = element;
        this.data = data;
        this.margin = margin;

        this.selectedDate$ = selectedDate$;

        this.width = renderWidth - this.margin.left - this.margin.right;
        this.height = renderHeight - this.margin.top - this.margin.bottom;

        this.svg = d3
            .select(element)
            .select(`svg${selector}`)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .style('overflow', 'hidden');

        if (svgHeight) {
            this.svg.attr('height', svgHeight);
        }

        this.svg.selectAll('*').remove();

        this.x = d3
            .scaleTime()
            .domain(
                <[Date | number, Date | number]>(
                    d3.extent(this.data.indexes as any)
                ),
            )
            .range([margin.left, this.width - margin.right]);

        this.y = d3
            .scaleLinear()
            .domain([
                d3.min(this.data.series, (d) =>
                    d3.min((d as ISerializedData).values),
                ),
                d3.max(this.data.series, (d) =>
                    d3.max((d as ISerializedData).values),
                ) as number,
            ])
            .nice()
            .range([this.height - margin.bottom, margin.top]);

        this.line = d3
            .line()
            .defined((d) => !isNaN(d as any))
            .x((_, i) => this.x(data.indexes[i]))
            .y((d) => this.y(d as any));

        this.path = this.svg
            .append('g')
            .attr('fill', 'none')
            .attr('stroke-width', 1.5)
            .attr('opacity', this.data.series.length === 1 ? '1' : '.5')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .selectAll('path')
            .data(this.data.series)
            .join('path')
            .attr('stroke', (d) => (d as ISerializedData).color)
            .attr('d', (d) => this.line((d as any).values || 0));

        this.marker = this.svg
            .append('line')
            .attr('display', 'none')
            .attr('stroke', 'rgba(255, 23, 68, .7)')
            .attr('stroke-width', 3)
            .attr('y1', this.margin.top + 1)
            .attr('y2', this.height - this.margin.bottom - 1)
            .attr('x1', 0)
            .attr('x2', 0);

        this.selectedDate$ &&
            this.selectedDate$.subscribe((date) => {
                if (date) {
                    const point = limitRange(
                        this.x(date),
                        this.margin.left,
                        this.width - this.margin.right - 2,
                    );

                    point &&
                        this.marker
                            .attr('display', null)
                            .attr('x1', point)
                            .attr('x2', point);
                }
            });
    }

    showGrid(grid: any) {
        this.svg
            .append('g')
            .call((g) =>
                g.attr('stroke', 'currentColor').attr('stroke-opacity', 0.1),
            )
            .call(grid);
    }

    showAxis(axis: any) {
        this.svg
            .append('g')
            .call(axis)
            .attr('color', 'rgb(155,155,155)')
            .attr('class', 'app-f-s-9');
    }
}
