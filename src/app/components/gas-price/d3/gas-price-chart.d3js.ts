import * as d3 from 'd3';
import * as moment from 'moment';

import { IGasPriceWeekData } from '../../../interfaces/gasPrice.interface';
import { IMargin } from '../../../interfaces/margin.interface';

export class GasPriceChart {
    private svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
    private fontColour = 'rgb(155,155,155)';

    constructor(
        selector: string,
        totalWidth: number,
        totalHeight: number,
        gasPrice: IGasPriceWeekData,
    ) {
        const margin = { top: 5, right: 30, bottom: 30, left: 20 };
        const width = totalWidth - margin.left - margin.right;
        const height = totalHeight - margin.top - margin.bottom;

        this.svg = this.buildBaseSvg(selector, width, height, margin);

        const x = this.xAxis(width, height, margin, gasPrice);
        const y = this.yAxis(width, height, gasPrice);

        this.xGrid(width, height, margin);
        this.yGrid(width, height, margin);

        this.drawMainLine(gasPrice, y, x);
        this.drawBottomSurfaceArea(gasPrice, y, x);
    }

    protected xAxis(
        width: number,
        height: number,
        margin: IMargin,
        gasPrice: IGasPriceWeekData,
    ): d3.ScaleTime<number, number> {
        const start = moment(gasPrice.data[0].timestamp);
        const end = moment(gasPrice.data[gasPrice.data.length - 1].timestamp);

        const insertLinebreaks = function () {
            const el = d3.select(this);
            const words = el.text().split(' ');
            el.text('');

            for (let i = 0; i < words.length; i++) {
                const tspan = el.append('tspan').text(words[i]);
                if (i > 0) {
                    tspan.attr('x', 0).attr('dy', '10');
                }
            }
        };

        const x = d3
            .scaleTime()
            .domain([start.toDate(), end.toDate()])
            .range([0, width + margin.right + 20]);

        const axis = this.svg
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(
                d3
                    .axisBottom(x)
                    .ticks(6)
                    .tickFormat((domainValue, index) =>
                        moment(domainValue as Date).format('ddd DD/MM'),
                    )
                    .tickSizeOuter(2),
            );

        axis.selectAll('text').attr('fill', this.fontColour);
        axis.selectAll('line').attr('stroke', this.fontColour);
        axis.selectAll('domain').attr('stroke', this.fontColour);

        axis.call((g) => g.selectAll('g.tick text').each(insertLinebreaks));

        return x;
    }

    protected yAxis(
        width: number,
        height: number,
        gasPrice: IGasPriceWeekData,
    ): d3.ScaleLinear<number, number> {
        let maxHeightData = 0;

        gasPrice.data.forEach((data) => {
            if (data.value > maxHeightData) {
                maxHeightData = data.value;
            }
        });

        const y = d3
            .scaleLinear()
            .domain([0, maxHeightData + 10])
            .range([height, 0])
            .nice();

        const axis = this.svg.append('g').call(d3.axisLeft(y));

        axis.selectAll('text').attr('fill', this.fontColour);
        axis.selectAll('line').attr('stroke', this.fontColour);
        axis.selectAll('domain').attr('stroke', this.fontColour);

        return y;
    }

    protected buildBaseSvg(
        selector: string,
        width: number,
        height: number,
        margin: IMargin,
    ) {
        return d3
            .select(`div${selector}`)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 525 400`)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')',
            );
    }

    private xGrid(width: number, height: number, margin: IMargin) {
        const xGrid = d3
            .scaleLinear()
            .range([0, width + margin.right + margin.left])
            .nice();
        this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(0,' + height + ')')
            .call((g) =>
                g.attr('stroke', 'currentColor').attr('stroke-opacity', 0.1),
            )
            .call(
                d3
                    .axisBottom(xGrid)
                    .ticks(8)
                    .tickSize(-height)
                    .tickValues(null),
            );
    }

    private yGrid(width: number, height: number, margin: IMargin) {
        const yGrid = d3.scaleLinear().range([0, height]).nice();
        this.svg
            .append('g')
            .attr('class', 'grid')
            .call((g) =>
                g.attr('stroke', 'currentColor').attr('stroke-opacity', 0.1),
            )
            .call(
                d3
                    .axisLeft(yGrid)
                    .ticks(8)
                    .tickSize(-width - margin.right - margin.left)
                    .tickValues(null),
            )
            .attr('color', this.fontColour)
            .call((g) => g.select('.domain').remove());

        this.svg.selectAll('.grid text').remove();
    }

    private drawMainLine(
        gasPrice: IGasPriceWeekData,
        y: d3.ScaleLinear<number, number>,
        x,
    ) {
        this.svg
            .append('path')
            .datum(gasPrice.data as any)
            .attr('fill', 'none')
            .attr('stroke', '#C296D3')
            .attr('stroke-width', 2)
            .attr(
                'd',
                d3
                    .line()
                    .curve(d3.curveNatural)
                    .x((d: any) => x(d.timestamp))
                    .y((d: any) => y(d.value)),
            );
    }

    private drawBottomSurfaceArea(
        gasPrice: IGasPriceWeekData,
        y: d3.ScaleLinear<number, number>,
        x,
    ) {
        this.svg
            .append('path')
            .datum(gasPrice.data as any)
            .attr('fill', '#AC6EC1')
            .attr('fill-opacity', '0.2')
            .attr('stroke-linecap', 'round')
            .attr('stroke', 'none')
            .attr(
                'd',
                d3
                    .area()
                    .x((d: any) => {
                        return x(d.timestamp);
                    })
                    .y0((d: any) => {
                        return y(0);
                    })
                    .y1((d: any) => {
                        return y(d.value);
                    }),
            );
    }
}
