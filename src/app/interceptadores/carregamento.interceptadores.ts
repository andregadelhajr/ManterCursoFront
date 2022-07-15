import { delay, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarregamentoService } from '../Service/carregamento.service';

@Injectable()
export class CarregamentoInterceptores implements HttpInterceptor {

  constructor(private carregamentoService: CarregamentoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.carregamentoService.carregamento();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.carregamentoService.idle();
      })
    );
  }
}