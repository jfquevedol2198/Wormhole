import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataAdminService, ListCoinsData } from 'src/app/services/data-admin/data-admin.service';
import { ALPHABET_LIST } from '../../constants/alphabet-list';
import { IListCoinsResponse } from '../../interfaces/listCoins.interface';

@Component({
  selector: 'app-search-platforms-dialog',
  templateUrl: './search-platforms-dialog.component.html',
  styleUrls: ['./search-platforms-dialog.component.scss']
})
export class SearchPlatformsDialogComponent implements OnInit {
  filtersForm: FormGroup;
  loading: boolean = true;
  listCoins: ListCoinsData = new ListCoinsData();
  listFilter: string[] = [];
  index: number = 0;
  selectedCoin: IListCoinsResponse = null;
  

  constructor(
    private fb: FormBuilder,
    private platformService: DataAdminService
  ) { }

  ngOnInit(): void {
    this.listFilter = ALPHABET_LIST;
    this.initFilterForm();
    this.platformService.getListCoins().subscribe((data: any) => {
      this.listCoins = {
        ...this.listCoins,
        data
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  initFilterForm() {
    this.filtersForm = this.fb.group({
      text: [''],
      filter: ['']
    })
  }

  processListCoins() {
    return this.listCoins.data.filter((c) => {
      return c.name.charAt(0).toUpperCase() === this.listFilter[this.index]
    });
  }

  onSelectCoin(coin) {
    this.selectedCoin = coin;
  }
}
