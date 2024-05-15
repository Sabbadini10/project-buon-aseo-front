import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraficasServices {
  private transactionsData = [
    ['rsf934fds', 'John Doe', 100, 1000],
    ['f0efnakr', 'Anna Smith', 200, 800],
    ['mfaiks12', 'Robert Johnson', 300, 500],
    ['15fqmfk', 'Susan Williams', 400, 100]
  ];

  getTransactionsData() {
    return this.transactionsData;
  }
}