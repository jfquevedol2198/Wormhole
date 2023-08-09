import * as d3 from 'd3';

import { BaseChart } from './base-chart.d3js';
import { BehaviorSubject } from 'rxjs';

import { IRange } from '../../../interfaces/range.interface';
import { IMargin } from '../../../interfaces/margin.interface';

import { limitRange } from '../../../utilities/limitRange';

const TRIANGLE_LEFT_MARKER_OFFSET = 4;
const TRIANGLE_RIGHT_MARKER_OFFSET = 3;
export class NavigationChart extends BaseChart {
    private selects: number[];
    private dragging: string;
    private dragged: number;

    private selectedRange$: BehaviorSubject<IRange>;

    public dragger: d3.Selection<SVGRectElement, unknown, null, undefined>;

    public highlightLeft: d3.Selection<
        SVGRectElement,
        unknown,
        null,
        undefined
    >;

    public highlightRight: d3.Selection<
        SVGRectElement,
        unknown,
        null,
        undefined
    >;

    public borderLeft: d3.Selection<SVGLineElement, unknown, null, undefined>;
    public borderRight: d3.Selection<SVGLineElement, unknown, null, undefined>;

    public resizerLeft: d3.Selection<
        SVGCircleElement,
        unknown,
        null,
        undefined
    >;
    public resizerRight: d3.Selection<
        SVGCircleElement,
        unknown,
        null,
        undefined
    >;

    public triangleLeft: d3.Selection<any, unknown, null, undefined>;
    public triangleRight: d3.Selection<any, unknown, null, undefined>;

    public events = (
        svg: d3.Selection<d3.BaseType, unknown, null, undefined>,
    ) => {
        const moved = (event) => {
            event.preventDefault();

            const dragLeft = (xm: number): number =>
                limitRange(
                    this.x(this.selects[0]) + xm - this.dragged,
                    this.margin.left + 1,
                    this.width,
                );

            const dragRight = (xm: number): number =>
                limitRange(
                    this.x(this.selects[1]) + xm - this.dragged,
                    this.margin.left,
                    this.width - this.margin.right,
                );

            const updateDragger = (positions: {
                left?: number;
                right?: number;
            }) => {
                if (positions.left) {
                    this.borderLeft
                        .attr('display', null)
                        .attr('x1', positions.left)
                        .attr('x2', positions.left);

                    this.resizerLeft.attr('cx', positions.left);
                    this.triangleLeft.attr(
                        'x',
                        positions.left - TRIANGLE_LEFT_MARKER_OFFSET,
                    );

                    this.highlightLeft
                        .attr('display', null)
                        .attr('width', positions.left - this.margin.left);

                    this.dragger
                        .attr('x', positions.left)
                        .attr(
                            'width',
                            positions.right ||
                                this.x(this.selects[1]) - positions.left,
                        );
                }

                if (positions.right) {
                    this.borderRight
                        .attr('display', null)
                        .attr('x1', positions.right)
                        .attr('x2', positions.right);

                    this.resizerRight.attr('cx', positions.right);
                    this.triangleRight.attr(
                        'x',
                        positions.right - TRIANGLE_RIGHT_MARKER_OFFSET,
                    );

                    this.highlightRight
                        .attr('display', null)
                        .attr('x', positions.right)
                        .attr(
                            'width',
                            this.width - positions.right - this.margin.right,
                        );

                    this.dragger
                        .attr('x', positions.left || this.x(this.selects[0]))
                        .attr(
                            'width',
                            positions.right -
                                (positions.left || this.x(this.selects[0])),
                        );
                }
            };

            if (this.dragging) {
                const svgElement = this.element.getElementsByTagName('svg')[0];
                const svgPoint = svgElement.createSVGPoint();

                svgPoint.x = event.clientX;

                const xm = svgPoint.matrixTransform(
                    svgElement.getScreenCTM().inverse(),
                ).x;

                if (this.dragging === 'left') {
                    updateDragger({
                        left: Math.min(dragLeft(xm), this.x(this.selects[1])),
                    });
                }

                if (this.dragging === 'right') {
                    updateDragger({
                        right: Math.max(dragRight(xm), this.x(this.selects[0])),
                    });
                }

                if (this.dragging === 'both') {
                    updateDragger({ left: dragLeft(xm), right: dragRight(xm) });
                }
            }
        };

        const dragstart = (event) => {
            const svgElement = this.element.getElementsByTagName('svg')[0];
            const svgPoint = svgElement.createSVGPoint();

            svgPoint.x = event.clientX;

            this.dragged = svgPoint.matrixTransform(
                svgElement.getScreenCTM().inverse(),
            ).x;

            if (
                this.dragged > parseFloat(this.borderLeft.attr('x1')) + 5 &&
                this.dragged < parseFloat(this.borderRight.attr('x1')) - 5
            ) {
                this.dragging = 'both';
            }

            if (
                this.dragged > parseFloat(this.borderLeft.attr('x1')) - 5 &&
                this.dragged < parseFloat(this.borderLeft.attr('x1')) + 5
            ) {
                this.dragging = 'left';
            }

            if (
                this.dragged > parseFloat(this.borderRight.attr('x1')) - 5 &&
                this.dragged < parseFloat(this.borderRight.attr('x1')) + 5
            ) {
                this.dragging = 'right';
            }
        };

        const dragend = (event) => {
            this.dragger.style('cursor', 'grab');

            const svgElement = this.element.getElementsByTagName('svg')[0];
            const svgPoint = svgElement.createSVGPoint();

            svgPoint.x = event.clientX;

            const xm = svgPoint.matrixTransform(
                svgElement.getScreenCTM().inverse(),
            ).x;

            const left =
                this.dragging === 'both' || this.dragging === 'left'
                    ? this.data.indexes[
                          limitRange(
                              d3.bisectCenter(
                                  this.data.indexes,
                                  this.x
                                      .invert(
                                          this.x(this.selects[0]) +
                                              xm -
                                              this.dragged,
                                      )
                                      .getTime(),
                              ),
                              1,
                              Infinity,
                          )
                      ]
                    : this.data.indexes[
                          d3.bisectCenter(
                              this.data.indexes,
                              this.x.invert(this.x(this.selects[0])).getTime(),
                          )
                      ];

            const right =
                this.dragging === 'both' || this.dragging === 'right'
                    ? this.data.indexes[
                          d3.bisectCenter(
                              this.data.indexes,
                              this.x
                                  .invert(
                                      this.x(this.selects[1]) +
                                          xm -
                                          this.dragged,
                                  )
                                  .getTime(),
                          )
                      ]
                    : this.data.indexes[
                          d3.bisectCenter(
                              this.data.indexes,
                              this.x.invert(this.x(this.selects[1])).getTime(),
                          )
                      ];

            this.selectedRange$ && this.selectedRange$.next({ left, right });

            this.dragged = undefined;
            this.dragging = undefined;
        };

        if ('ontouchstart' in document)
            svg.style('-webkit-tap-highlight-color', 'transparent')
                .on('touchmove', moved)
                .on('touchstart', dragstart)
                .on('touchend', dragend);
        else
            svg.on('mousemove', moved)
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
        darkTheme: boolean,
        svgHeight: string,
    ) {
        super(
            element,
            selector,
            renderWidth,
            renderHeight,
            margin,
            data,
            selectedDate$,
            svgHeight,
        );

        this.selects = [];

        this.selectedRange$ = selectedRange$;

        this.showAxis(this.xAxis);

        this.dragger = this.svg
            .append('rect')
            .attr('height', this.height - this.margin.bottom - 1)
            .style('opacity', '0')
            .style('cursor', 'grab');

        this.borderLeft = this.svg
            .append('line')
            .attr('display', 'none')
            .attr('stroke', darkTheme ? 'white' : 'black')
            .attr('y1', this.margin.top)
            .attr('y2', this.height - this.margin.bottom - 1)
            .attr('x1', 0)
            .attr('x2', 0)
            .style('cursor', 'ew-resize');

        this.highlightLeft = this.svg
            .append('rect')
            .attr('fill', darkTheme ? '#ffffff' : '#000000')
            .attr('x', this.margin.left)
            .attr('y', this.margin.top)
            .attr('width', 0)
            .attr('height', this.height - this.margin.bottom - 1)
            .style('opacity', '.15');

        this.resizerLeft = this.svg
            .append('circle')
            .attr('cx', this.margin.left)
            .attr(
                'cy',
                (this.height - this.margin.top - this.margin.bottom) / 2,
            )
            .attr('r', 6)
            .attr('fill', '#000')
            .attr('stroke', '#fff')
            .style('cursor', 'ew-resize');

        this.triangleLeft = this.svg
            .append('svg:image')
            .attr('xlink:href', 'assets/img/left_chevron.png')
            .attr('width', '7px')
            .attr('height', '7px')
            .attr('x', this.margin.left - TRIANGLE_LEFT_MARKER_OFFSET)
            .attr(
                'y',
                (this.height - this.margin.top - this.margin.bottom) / 2 -
                    TRIANGLE_LEFT_MARKER_OFFSET,
            )
            .style('cursor', 'ew-resize');

        this.borderRight = this.svg
            .append('line')
            .attr('display', 'none')
            .attr('stroke', darkTheme ? 'white' : 'black')
            .attr('y1', this.margin.top)
            .attr('y2', this.height - this.margin.bottom - 1)
            .attr('x1', 0)
            .attr('x2', 0)
            .style('cursor', 'ew-resize');

        this.highlightRight = this.svg
            .append('rect')
            .attr('fill', darkTheme ? '#ffffff' : '#000000')
            .attr('x', 0)
            .attr('y', this.margin.top)
            .attr('width', 0)
            .attr('height', this.height - this.margin.bottom - 1)
            .style('opacity', '.15');

        this.resizerRight = this.svg
            .append('circle')
            .attr('cx', this.margin.left)
            .attr(
                'cy',
                (this.height - this.margin.top - this.margin.bottom) / 2,
            )
            .attr('r', 6)
            .attr('fill', '000')
            .attr('stroke', '#fff')
            .style('cursor', 'ew-resize');

        this.triangleRight = this.svg
            .append('svg:image')
            .attr('xlink:href', 'assets/img/right_chevron.png')
            .attr('width', '7px')
            .attr('height', '7px')
            .attr('x', this.margin.left - TRIANGLE_LEFT_MARKER_OFFSET)
            .attr(
                'y',
                (this.height - this.margin.top - this.margin.bottom) / 2 -
                    TRIANGLE_LEFT_MARKER_OFFSET,
            )
            .style('cursor', 'ew-resize');

        this.svg.call(this.events);

        this.selectedRange$ &&
            this.selectedRange$.subscribe((range: IRange) => {
                const xleft =
                    range?.left &&
                    limitRange(this.x(range.left), 0, this.width);

                const xright =
                    range?.right &&
                    limitRange(this.x(range.right), 0, this.width);

                if (xleft) {
                    this.selects[0] = new Date(range.left).getTime();

                    this.borderLeft
                        .attr('display', null)
                        .attr('x1', xleft)
                        .attr('x2', xleft);

                    this.resizerLeft.attr('cx', xleft);
                    this.triangleLeft.attr(
                        'x',
                        xleft - TRIANGLE_LEFT_MARKER_OFFSET,
                    );
                }

                if (xright) {
                    this.selects[1] = new Date(range.right).getTime();
                    const highlightRightWidth =
                        this.width - xright - this.margin.right;

                    this.borderRight
                        .attr('display', null)
                        .attr('x1', xright)
                        .attr('x2', xright);

                    this.resizerRight.attr('cx', xright);
                    this.triangleRight.attr(
                        'x',
                        xright - TRIANGLE_RIGHT_MARKER_OFFSET,
                    );
                    this.highlightRight
                        .attr('display', null)
                        .attr('x', xright)
                        .attr(
                            'width',
                            highlightRightWidth < 0 ? 0 : highlightRightWidth,
                        );

                    this.highlightLeft
                        .attr('display', null)
                        .attr('width', xleft - this.margin.left);

                    this.dragger.attr('x', xleft).attr('width', xright - xleft);
                }

                if (!xleft && !xright) {
                    this.selects = [];

                    this.highlightLeft.attr('display', 'none');
                    this.borderLeft.attr('display', 'none');

                    this.highlightRight.attr('display', 'none');
                    this.borderRight.attr('display', 'none');
                }
            });
    }
}
