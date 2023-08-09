import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-geko-error-dialog',
  templateUrl: './coin-geko-error-dialog.component.html',
  styleUrls: ['./coin-geko-error-dialog.component.scss']
})
export class CoinGekoErrorDialogComponent implements OnInit {
  error = `{"ExchangeAddress":"https://api.coingecko.com","MaxQueryRange":"90.00:00:00","RateLimitingWindow":"00:01:00","ObsoleteSymbols":

  {"yusd-synthetic-token-expiring-1-october-2020":"0xb2fdd60ad80ca7ba89b9bab3b5336c2601c020b4","alpha-quark-token":"0x2a9bdcff37ab68b95a53435adfd8892e86084f93","ethereum":"ETH"},"IgnoredSymbols":["01coin","0-5x-long-algorand-token","0-5x-long-altcoin-index-token","0-5x-long-balancer-token","0-5x-long-bilibra-token","0-5x-long-bitcoin-cash-token","0-5x-long-bitcoin-sv-token","0-5x-long-bitcoin-token","
  
  0-5x-long-dogecoin-token","0-5x-long-dragon-index-token","0-5x-long-echange-token-index-token","0-5x-long-eos-token","0-5x-long-ethereum-classic-token","0-5x-long-ethereum-token","0-5x-long-huobi-token-token","0-5x-long-kyber-network-token","0-5x-long-leo-token","0-5x-long-litecoin-token","0-5x-long-matic-token","0-5x-long-midcap-index-token","0-5x-long-okb-token","0-5x-long-pax-gold-token","0-5x-long-privacy-index-token","0-5x-long-shitcoin-index-token","0-5x-long-swipe-token","0-5x-long-tether-gold-token","0-5x-long-tether-token"
  
  0-5x-long-dogecoin-token","0-5x-long-dragon-index-token","0-5x-long-echange-token-index-token","0-5x-long-eos-token","0-5x-long-ethereum-classic-token","0-5x`;
  active: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onHighlight(e) {
    console.log('eeee', e)
  }

}
