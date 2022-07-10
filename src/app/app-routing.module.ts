import { CursoComponent } from './componente/curso/curso.component';
import { HomeComponent } from './componente/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'curso', component:CursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
