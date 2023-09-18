import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './curso/curso.component';

import { MatriculaComponent } from './matricula/matricula.component';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AddEditComponent } from './aluno/add-edit.component';
import { AddEditComponentCurso } from './curso/add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'curso',
    children: [
      {
        path: '',
        component: CursoComponent,
      },
      {
        path: 'add',
        component: AddEditComponentCurso,
      },
      {
        path: 'edit/:id',
        component: AddEditComponentCurso,
      },
    ]
  },
  {
    path: 'aluno',
    children: [
      {
        path: '',
        component: AlunoComponent, // Seu componente principal de aluno
      },
      {
        path: 'add',
        component: AddEditComponent, // Seu componente para adicionar um aluno
      },
      {
        path: 'edit/:id',
        component: AddEditComponent, // Seu componente para editar um aluno
      },
    ]
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
