import { LogComponent } from './componente/log/log.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { CursoComponent } from './componente/curso/curso.component';
import { HomeComponent } from './componente/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './componente/nav-bar/nav-bar.component';
import { FooterComponent } from './componente/footer/footer.component';
import { FinalizadosComponent } from './componente/finalizados/finalizados.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'curso', component:CursoComponent},
  {path: 'categoria', component:CategoriaComponent},
  {path: 'log', component:LogComponent},
  {path: 'nav-bar', component:NavBarComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'finalizado', component:FinalizadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
