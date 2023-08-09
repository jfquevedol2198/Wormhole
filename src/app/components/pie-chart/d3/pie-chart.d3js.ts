import * as d3 from 'd3';

import { MATERIAL_COLORS } from '../../../constants/colors';
import { IPieChartData } from '../../../interfaces/piechartData.interface';
import { formatValue } from '../../../utilities/format-value';

const buildNewHierarchy = (data: IPieChartData) => {
    const newRoot = { name: 'root', children: [] };
    const ratio = 100;

    data.platforms.map((platform) => {
        const platformRatio = Math.abs(
            (platform.totalBalance * ratio) / data.sumOfAbsoluteBalances,
        );
        const balances = [];
        platform.records.map((asset) => {
            const assetRatio = Math.abs(
                (asset.totalBalance * platformRatio) /
                    platform.sumOfAbsolutAssetBalances,
            );
            balances.push({
                name: asset.name,
                value: assetRatio,
                totalBalance: asset.totalBalance,
            });
        });
        newRoot.children.push({
            name: platform.name,
            children: balances,
            totalBalance: platform.totalBalance,
        });
    });

    return {
        ...newRoot,
        totalBalance: data.totalBalance,
    };
};

export class PieChart {
    public data: any;
    public width = 0;
    public radius = 0;
    public svg: any;
    public element: any;
    public totalLabel: any;
    public label: any;
    public g: any;
    public parent: any;
    public path: any;
    public root: any;

    public color = d3.scaleOrdinal().range(MATERIAL_COLORS);

    public format = d3.format(',d');

    public mousearc = d3
        .arc()
        .startAngle((d: any) => d.x0)
        .endAngle((d: any) => d.x1)
        .innerRadius((d: any) => d.y0 * this.radius * 2.3)
        .outerRadius((d: any) =>
            Math.max(d.y0 * this.radius * 1.45, d.y1 * this.radius * 1.45),
        );

    public arc = d3
        .arc()
        .startAngle((d: any) => d.x0)
        .endAngle((d: any) => d.x1)
        .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(this.radius * 1.5)
        .innerRadius((d: any) => d.y0 * this.radius * 2.25)
        .outerRadius((d: any) =>
            Math.max(d.y0 * this.radius * 1.45, d.y1 * this.radius * 1.45),
        );

    public partition = (data) => {
        const root = d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);
        return d3.partition().size([2 * Math.PI, root.height + 1])(root);
    };

    constructor(
        radius: number,
        width: number,
        data: IPieChartData,
        selector: string,
    ) {
        this.data = buildNewHierarchy(data);
        this.width = width;
        this.radius = radius;
        this.root = this.partition(this.data);
        this.root.each((d) => (d.current = d));
        this.svg = d3
            .select(`div${selector}`)
            .append('svg')
            .attr('width', `${this.width}%`)
            .attr('height', `${this.width}%`);
        this.element = this.svg.node();
        this.element.value = {
            sequence: [],
            percentage: 0.0,
            totalBalance: this.root.data.totalBalance,
        };
        this.setTotalLabelParams();

        this.svg
            .attr(
                'viewBox',
                `${-this.radius * 2 - 10} ${-this.radius * 2 - 10} ${
                    this.radius * 6 + 20
                } ${this.radius * 6 + 20}`,
            )
            .classed('app-pie-chart__chart', true)
            .style('max-width', `${this.radius * 6}px`)
            .style('font', '12px sans-serif');
        this.g = this.svg
            .append('g')
            .attr('transform', `translate(${this.radius},${this.radius})`);
        this.setLabelParams();
        this.setPathParams();
        this.setParentParams();
    }

    setTotalLabelParams = () => {
        this.totalLabel = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'app-pie-chart__chart__label')
            .attr('fill', '#888')
            .attr('font-size', '20pt')
            .attr('transform', `translate(${this.radius},${this.radius})`);

        this.totalLabel
            .append('tspan')
            .attr('class', 'text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '-0.75em')
            .text('Total');

        this.totalLabel
            .append('tspan')
            .attr('class', 'value')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '0.75em')
            .text(formatValue(this.element.value.totalBalance, '$'));
    };

    setLabelParams = () => {
        this.label = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'app-pie-chart__chart__label')
            .attr('fill', '#888')
            .attr('transform', `translate(${this.radius},${this.radius})`)
            .style('visibility', 'hidden');

        this.label
            .append('tspan')
            .attr('class', 'name')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '2.5em')
            .attr('font-size', '11pt')

            .text('');

        this.label
            .append('tspan')
            .attr('class', 'value')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '1em')
            .attr('font-size', '14pt')
            .text('');

        this.label
            .append('tspan')
            .attr('class', 'percentage')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '-0.5em')
            .attr('font-size', '24pt')
            .text('');
    };

    setParentParams = () => {
        this.parent = this.g
            .append('circle')
            .datum(this.root)
            .attr('r', this.radius)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('click', this.clicked);
    };

    setPathParams = () => {
        this.path = this.g
            .append('g')
            .selectAll('path')
            .data(this.root.descendants().slice(1))
            .join('path')
            .attr('fill', (d) => this.color(d.data.name))
            .attr('fill-opacity', (d) =>
                this.arcVisible(d.current)
                    ? d.data.totalBalance > 0
                        ? 1
                        : 0.3
                    : 0,
            )
            .attr('stroke-width', (d) => (this.arcVisible(d.current) ? 2 : 0))
            .attr('class', 'app-pie-chart__chart__section')
            .attr('stroke', '#ffffff')
            .attr('d', (d) => this.arc(d.current));

        this.path
            .on('mouseleave', (event, d) => {
                const sequence = d.ancestors().reverse().slice(1);
                const totalBalance = d.data.totalBalance;

                this.label.style('visibility', 'hidden');
                this.totalLabel.style('visibility', null);
                d3.select(event.currentTarget).style('transform', '');

                this.element.value = {
                    sequence,
                    percentage: 0.0,
                    totalBalance,
                };
                this.element.dispatchEvent(new CustomEvent('input'));
            })
            .attr('d', this.mousearc)
            .on('mouseenter', (event, d) => {
                if (event.currentTarget.getAttribute('fill-opacity') !== '0') {
                    const sequence = d.ancestors().reverse().slice(1);
                    let percentage;
                    if (d.parent) {
                        percentage = ((100 * d.value) / d.parent.value).toFixed(
                            2,
                        );
                    } else {
                        percentage = (
                            (100 * d.value) /
                            this.root.value
                        ).toFixed(2);
                    }

                    d3.select(event.currentTarget).style(
                        'transform',
                        'scale(1.05)',
                    );
                    this.label
                        .style('visibility', null)
                        .select('.percentage')
                        .text(percentage + '%');
                    this.label
                        .style('visibility', null)
                        .select('.name')
                        .text(d.data.name);
                    this.label
                        .style('visibility', null)
                        .select('.value')
                        .text(formatValue(d.data.totalBalance, '$'));

                    this.totalLabel.style('visibility', 'hidden');

                    this.element.value = {
                        sequence,
                        percentage,
                        totalBalance: 0,
                    };
                    this.element.dispatchEvent(new CustomEvent('input'));
                }
            });

        this.path
            .filter((d) => d.children)
            .style('cursor', 'pointer')
            .on('click', this.clicked);
    };

    arcVisible = (d) => {
        return d.y1 <= 2 && d.y0 >= 1 && d.x1 > d.x0;
    };

    clicked = (event, p) => {
        this.parent.datum(p.parent || this.root);

        this.root.each((d) => {
            return (d.target = {
                x0:
                    Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                    2 *
                    Math.PI,
                x1:
                    Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                    2 *
                    Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth),
            });
        });

        this.totalLabel
            .select('.value')
            .text(formatValue(p.data.totalBalance, '$'));

        const t = this.g.transition().duration(750);

        const s = this;

        this.path
            .transition(t)
            .tween('data', (d) => {
                const i = d3.interpolate(d.current, d.target);
                // tslint:disable-next-line:no-shadowed-variable
                return (t) => (d.current = i(t));
            })
            .filter(function (d) {
                return (
                    +this.getAttribute('fill-opacity') ||
                    +this.getAttribute('stroke-width') ||
                    s.arcVisible(d.target)
                );
            })
            .attr('fill-opacity', (d) =>
                this.arcVisible(d.target)
                    ? d.data.totalBalance > 0
                        ? 1
                        : 0.3
                    : 0,
            )
            .attr('stroke-width', (d) => (this.arcVisible(d.target) ? 2 : 0))
            .attrTween('d', (d) => () => this.arc(d.current));
    };
}
