import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDataAdminCurrencyPair } from 'src/app/interfaces/dataadminCurrencyPairs.interface';
import { CurrencyPairUsageData, DataAdminService } from 'src/app/services/data-admin/data-admin.service';
@Component({
  selector: 'app-data-admin-currency-pairs-usage',
  templateUrl: './data-admin-currency-pairs-usage.component.html',
  styleUrls: ['./data-admin-currency-pairs-usage.component.scss']
})
export class DataAdminCurrencyPairsUsageComponent implements OnInit, AfterViewInit {
  @Input() currency: IDataAdminCurrencyPair;
  @ViewChild('diagram') diagram: ElementRef;
  filtersForm: FormGroup;
  data = [
    {
      provider: 'CoinGeko',
      pairName: 'SLP/USD',
      dataQuality: 'Scheduled',
      dataProvider: 'Scheduled'
    },
    {
      provider: 'Uniswap',
      pairName: 'wBTC/USD',
      dataQuality: 'Running',
      dataProvider: 'Running'
    },
    {
      provider: 'Harvest',
      pairName: 'Sushi/USD',
      dataQuality: 'Failed',
      dataProvider: 'Failed'
    },
    {
      provider: 'Harvest1',
      pairName: 'UniV2/USD',
      dataQuality: 'Completed',
      dataProvider: 'Completed'
    }
  ];

  columnsToDisplay = [
    'provider',
    'pairName',
    'dataQuality',
    'dataProvider'
  ];

  selectedRow = this.data[0].provider;

  currencyIcon = {
    "Running": "info_outline",
    "Scheduled": "error_outline",
    "Failed": "highlight_off",
    "Completed": "check_circle_outline",
  }

  diagramData = [
    [
      {
        name: 'fUSDC/USDC',
        id: 1,
        status: 'not_used',
        from: []
      },
      {
        name: 'USDC/USD',
        id: 2,
        status: 'not_used',
        from: []
      },
      {
        name: 'wBTC/BTC',
        id: 3,
        status: 'analysed',
        from: []
      },
      {
        name: 'BTC/USD',
        id: 4,
        status: 'not_used',
        from: []
      },
      {
        name: 'wBTC/BTC',
        id: 5,
        status: 'analysed',
        from: []
      },
      {
        name: 'BTC/USD',
        id: 6,
        status: 'not_used',
        from: []
      },
    ],
    [
      {
        name: 'fUSDC/USD',
        id: 7,
        status: 'not_used',
        from: [1, 2]
      },
      {
        name: 'wBTC/USD',
        id: 8,
        status: 'usage',
        from: [3, 4]
      },
      {
        name: 'wBTC/USD',
        id: 9,
        status: 'usage',
        from: [5, 6]
      },
      {
        name: 'USDC/USD',
        id: 10,
        status: 'not_used',
        from: []
      }
    ],
    [
      {
        name: 'UniV2 / USD',
        id: 11,
        status: 'usage',
        from: [7, 8]
      },
      {
        name: 'wBTC/test',
        id: 14,
        status: 'analysed',
        from: [8, 9]
      },
      {
        name: 'Sushi / USD',
        id: 12,
        status: 'usage',
        from: [9, 10]
      }
    ],
    [
      {
        name: 'SLP/USD',
        id: 13,
        status: 'usage',
        from: [11, 14, 12]
      }
    ]
  ]

  nodes = [];
  links = [];
  layoutSettings = {
    orientation: 'TB'
  }

  widthNode = 113;
  heightNode = 40;
  ySpace = 40;
  isLoading: boolean = false;
  usageData: CurrencyPairUsageData = new CurrencyPairUsageData();

  constructor(
    private fb: FormBuilder,
    private apiService: DataAdminService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.currency.firstChange && changes.currency.currentValue !== changes.currency.previousValue) {
      this.getList();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getList();
  }

  getList() {
    this.isLoading = true;
    const { PageIndex, PageSize } = this.usageData;
    const { exchangeRatePairId } = this.currency || {};
    this.apiService.getCurrencyPairUsage({
      PageIndex,
      PageSize,
      exchangeRatePairId
    }).subscribe(res => {
      this.usageData = {
        ...this.usageData,
        data: res.dependentPairs,
        total: res.recordCount
      };
      this.isLoading = false;
    });
  }

  initForm() {
    this.filtersForm = this.fb.group({
      baseToken: [''],
      quoteToken: ['']
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => this.drawDiagram(), 100);
  }

  drawDiagram() {
    this.nodes = [];
    this.links = [];
    let y = 20;
    const width = this.diagram.nativeElement.width.baseVal.value;
    for (let i = 0; i < this.diagramData.length; i++) {
      const row = this.diagramData[i];
      let freeSpace = width - this.widthNode * row.length;
      let startX
      let space = 0;
      if (row.length > 1) {
        space = freeSpace / (row.length - 1) * 0.5; // space between node
        startX = (freeSpace - space * (row.length - 1)) / 2; // start x position each row
      } else {
        startX = (width - this.widthNode) / 2;
      }
      for (let j = 0; j < row.length; j++) {
        let curNode = {
          ...row[j],
          x: startX,
          y,
        };
        this.nodes.push(curNode);
        startX += this.widthNode + space;
        let index = 0;
        const mid  = row[j].from.length / 2;
        row[j].from.forEach(f => {
          const parent = this.nodes.filter(n => n.id === f)[0];
          if (parent) {
            const x = parent.x + this.widthNode / 2 - 1;// -1 because line width = 2
            const _y = parent.y + this.heightNode;
            const lenY = (curNode.y - _y - 2) / 2;// width line = 2
            const lenX = curNode.x + this.widthNode / 2 + (index++ - mid + 0.5) * 14 - 1;
            const path = `M ${x} ${_y} l 0 ${lenY} l ${lenX - x} 0 l 0 ${lenY}`;
            const color = parent.status === 'not_used' ? '#3F3F3F' : parent.status === 'usage' ? '#CFD959' : '#71BFF2';
            this.links.push({
              path,
              color
            });
          }
        })
      }
      y += this.heightNode + this.ySpace;
    }
  }

}
