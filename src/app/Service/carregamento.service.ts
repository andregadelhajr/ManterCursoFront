import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CarregamentoService {

  carregamentoRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  carregamento() {
    this.carregamentoRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }

  idle() {
    this.carregamentoRequestCount--;
    if (this.carregamentoRequestCount <= 0) {
      this.carregamentoRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
