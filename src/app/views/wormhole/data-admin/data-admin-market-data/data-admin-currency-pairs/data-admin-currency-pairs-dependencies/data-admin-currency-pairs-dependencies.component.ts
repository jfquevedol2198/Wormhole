import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IDependency } from '../../../../../../interfaces/dependency.interface';
import { IDataAdminCurrencyPair } from 'src/app/interfaces/dataadminCurrencyPairs.interface';
import { DataAdminService, CurrencyPairDependencyData } from 'src/app/services/data-admin/data-admin.service';

@Component({
  selector: 'app-data-admin-currency-pairs-dependencies',
  templateUrl: './data-admin-currency-pairs-dependencies.component.html',
  styleUrls: ['./data-admin-currency-pairs-dependencies.component.scss']
})
export class DataAdminCurrencyPairsDependenciesComponent implements OnInit {
  @Input() currency: IDataAdminCurrencyPair;
  diagrams: Array<IDependency[]> = [];
  data: Array<IDependency[]> = [
    [
      {
        id: 5,
        name: 'Univ2/WETH',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        quoteToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        provider: 'Uniswap',
        type: 'default',
        from: []
      },
      {
        id: 6,
        name: 'GUSD/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Failed',
        baseToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Cover',
        type: 'default',
        from: []
      }
    ],
    [
      {
        id: 2,
        name: 'fSLP/SLP',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
        quoteToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        provider: 'Harvest',
        type: 'default',
        from: [5]
      },
      {
        id: 3,
        name: 'SLP/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Completed',
        baseToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Sushi',
        type: 'purple',
        from: [5, 6]
      },
      {
        id: 4,
        name: 'WETH/USD',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        quoteToken: 'USD',
        provider: 'Cross',
        type: 'default',
        from: []
      }
    ],
    [
      {
        id: 1,
        name: 'fSLP/USD',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
        quoteToken: 'USD',
        provider: 'Cross',
        type: 'blue',
        from: [2, 3, 4]
      }
    ]
  ]
  data1: Array<IDependency[]> = [
    [
      {
        id: 7,
        name: 'Univ2/WETH',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        quoteToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        provider: 'Uniswap',
        type: 'default',
        from: []
      },
      {
        id: 8,
        name: 'GUSD/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Failed',
        baseToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Cover',
        type: 'default',
        from: []
      },
      {
        id: 9,
        name: 'GUSD/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Failed',
        baseToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Cover',
        type: 'default',
        from: []
      }
    ],
    [
      {
        id: 5,
        name: 'Univ2/WETH',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        quoteToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        provider: 'Uniswap',
        type: 'default',
        from: [8, 9]
      },
      {
        id: 6,
        name: 'GUSD/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Failed',
        baseToken: '0xb65afaa2c59fd94f00d667f651b5d0c800ab99b6',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Cover',
        type: 'default',
        from: [7]
      }
    ],
    [
      {
        id: 2,
        name: 'fSLP/SLP',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
        quoteToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        provider: 'Harvest',
        type: 'default',
        from: []
      },
      {
        id: 3,
        name: 'SLP/WETH',
        dataQuality: 'Scheduled',
        dataProvider: 'Completed',
        baseToken: '0x8fd00f170fdf3772c5ebdcd90bf257316c69ba45',
        quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        provider: 'Sushi',
        type: 'purple',
        from: [5, 6]
      },
      {
        id: 4,
        name: 'WETH/USD',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        quoteToken: 'USD',
        provider: 'Cross',
        type: 'default',
        from: []
      }
    ],
    [
      {
        id: 1,
        name: 'fSLP/USD',
        dataQuality: 'Completed',
        dataProvider: 'Completed',
        baseToken: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
        quoteToken: 'USD',
        provider: 'Cross',
        type: 'blue',
        from: [2, 3, 4]
      }
    ]
  ]
  currencyIcon = {
    "Running": "info_outline",
    "Scheduled": "error_outline",
    "Failed": "highlight_off",
    "Completed": "check_circle_outline",
  };
  columnsToDisplay = [
    'provider',
    'rateSource',
    'lastRate',
    'highestRate',
    'lowestRate',
    'dataQuality',
    'dataProvider',
    'active',
    'requested',
  ];
  isFull = false;
  dataTable = [
    {
      provider: 'CoinGeko',
      rateSource: 'OffChain/USD',
      lastRate: '0.116783456',
      highestRate: '0.216783456',
      lowestRate: '0.216783456',
      dataQuality: 'Scheduled',
      dataProvider: 'Scheduled',
      active: true,
      requested: false
    },
    {
      provider: 'Uniswap',
      rateSource: 'MarketToMarket',
      lastRate: '0.116783456',
      highestRate: '1200.12',
      lowestRate: '0.216783456',
      dataQuality: 'Running',
      dataProvider: 'Running',
      active: false,
      requested: true
    },
    {
      provider: 'Harvest',
      rateSource: 'Data Gap',
      lastRate: '0.116783456',
      highestRate: '0.000011987',
      lowestRate: '0.216783456',
      dataQuality: 'Failed',
      dataProvider: 'Failed',
      active: false,
      requested: false
    },
    {
      provider: 'Harvest',
      rateSource: 'Data Gap',
      lastRate: '0.116783456',
      highestRate: '0.116783456',
      lowestRate: '0.216783456',
      dataQuality: 'Completed',
      dataProvider: 'Completed',
      active: false,
      requested: false
    }
  ];
  dependencyData: CurrencyPairDependencyData = new CurrencyPairDependencyData();
  isLoading: boolean = false;

  constructor(
    private apiService: DataAdminService
  ) { }

  ngOnInit(): void {
    this.diagrams = [...this.data];
    // setInterval(() => {
    //   if (this.isFull) {
    //     this.diagrams = [...this.data];
    //   } else {
    //     this.diagrams = [...this.data1];
    //   }
    //   this.isFull = !this.isFull;
    // }, 6000);
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.currency.firstChange && changes.currency.currentValue !== changes.currency.previousValue) {
      this.getList();
    }
  }

  getList() {
    this.isLoading = true;
    const { PageIndex, PageSize } = this.dependencyData;
    this.apiService.getCurrencyPairDependencies({
      exchangeRatePairId: this.currency?.exchangeRatePairId,
      PageIndex,
      PageSize
    }).subscribe(res => {
      this.dependencyData = {
        ...this.dependencyData,
        data: res.pairsDependencies,
        total: res.recordCount
      }
      this.isLoading = false;
    });
  }

}
