import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './curso/curso.component';

import { MatriculaComponent } from './matricula/matricula.component';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'curso',
    component: CursoComponent
  },
  {
    path: 'aluno',
    component: AlunoComponent
  },
  {
    path: 'matricula',
    component: MatriculaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
