import { Component, Input, AfterViewInit, SimpleChanges, AfterViewChecked } from '@angular/core';
import { IDependency, ILine } from '../../interfaces/dependency.interface';

@Component({
  selector: 'app-dependency-diagram',
  templateUrl: './dependency-diagram.component.html',
  styleUrls: ['./dependency-diagram.component.scss']
})
export class DependencyDiagramComponent implements AfterViewInit, AfterViewChecked {
  @Input() dependency: Array<IDependency[]>;
  lines: ILine[] = [];
  isChange: boolean = false;

  currencyIcon = {
    "Running": "info_outline",
    "Scheduled": "error_outline",
    "Failed": "highlight_off",
    "Completed": "check_circle_outline",
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawLines(), 10);
  }

  ngAfterViewChecked(): void {
    if (this.isChange) {
      this.isChange = false;
      setTimeout(() => this.drawLines(), 10);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dependency.currentValue !== changes.dependency.previousValue) {
      this.isChange = true;
    }
  }

  drawLines() {
    this.lines = [];
    this.dependency?.forEach(element => {
      element.forEach(d => {
        if (d.from?.length > 0) {
          const mid  = d.from.length / 2;
          const toE = document.getElementById(`block-${d.id}`);
          let i = 0;
          for (let f of d.from) {
            const fromE = document.getElementById(`block-${f}`);
            const x = fromE.offsetLeft + fromE.offsetWidth / 2 - 1;
            const y = fromE.offsetTop + fromE.offsetHeight;
            const lenY = (toE.offsetTop - y) / 2 - 2;
            const lenX = toE.offsetLeft + toE.offsetWidth / 2 + (i++ - mid + 0.5) * 14 - 1;
            let path = `M ${x} ${y} l 0 ${lenY} l ${lenX - x} 0 l 0 ${lenY + 2 - 6 - 3}`; // offset: 3, height arrow: 6
            const color = i === 2 ? '#DE5442' : 'rgba(255, 255, 255, 0.38)';
            this.lines.push({
              path,
              color,
              fill: 'none'
            });
            path = `M ${lenX} ${toE.offsetTop - 6 - 3 - 2} l -4 0 l 4 6 l 4 -6 Z`; // draw arrow, offset: 3, height arrow: 6, line width: 2
            this.lines.push({
              path,
              color,
              fill: color
            });
          }
        }
      });
    });
  }
}
