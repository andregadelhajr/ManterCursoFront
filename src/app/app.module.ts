import { CursoService } from './Service/curso.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursoComponent } from './componente/curso/curso.component';
import { HomeComponent } from './componente/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { LogComponent } from './componente/log/log.component';
import { NavBarComponent } from './componente/nav-bar/nav-bar.component';
import { FooterComponent } from './componente/footer/footer.component';
import { FinalizadosComponent } from './componente/finalizados/finalizados.component';

@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    HomeComponent,
    CategoriaComponent,
    LogComponent,
    NavBarComponent,
    FooterComponent,
    FinalizadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true
      }
    ), 
  ],
  providers: [HttpClientModule, CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
