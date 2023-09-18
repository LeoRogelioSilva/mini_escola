import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { MatriculaService } from './matricula.service';
import { Matricula } from './matricula';
import { AlunoService } from '../aluno/aluno.service';
import { CursoService } from '../curso/curso.service';
import { Aluno } from '../aluno/aluno';
import { Curso } from '../curso/curso';


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent {
  constructor(
    private matriculaService: MatriculaService,
    private alunoService: AlunoService,
    private cursoService: CursoService,
  ) { }

  alunos: Aluno[] = []
  cursos: Curso[] = []
  matriculas: Matricula[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'ementa', 'action'];
  dataSource = new MatTableDataSource<Matricula>(this.matriculas);
  selection = new SelectionModel<Matricula>(true, []);
  @ViewChild('successAlert') successAlert!: ElementRef;
  @ViewChild('errorAlert') errorAlert!: ElementRef;

  ngOnInit() {
    this.loadMatriculas();
    this.loadAlunos();
    this.loadCursos();
  }

  loadAlunos() {
    this.alunoService.getAll().subscribe((data) => {
      this.alunos = data;
    });
  }

  loadCursos() {
    this.cursoService.getAll().subscribe((data) => {
      this.cursos = data;
    });
  }

  loadMatriculas() {
    this.matriculaService.getAll().subscribe((data) => {
      this.matriculas = data;
    });
  }

  getNomeAluno(codigo: number){
    const aluno = this.alunos.find(x => x.codigo === codigo)
    if(aluno){
      return(aluno.nome)
    }
    return "";
  }

  getNomeCurso(codigo: number){
    const curso = this.cursos.find(x => x.codigo === codigo)
    if(curso){
      return(curso.nome)
    }
    return "";
  }

  deleteMatricula(codigo: number) {
    const matricula = this.matriculas.find(x => x.codigo === codigo);
    if (!matricula) return;
    matricula.isDeleting = true;
    this.matriculaService.delete(codigo)
      .pipe(first())
      .subscribe(
        () => {
          this.matriculas = this.matriculas.filter((x) => x.codigo !== codigo);
          // Exibir o alerta de sucesso
          this.showSuccessAlert();
        },
        (error) => {
          // Lidar com o erro da requisição HTTP
          console.error('Erro na requisição:', error);
          // Exibir um alerta de erro aqui, por exemplo:
          this.showErrorAlert();
        }
      );
  }

  showErrorAlert() {
    // Exibir o alerta de sucesso
    this.errorAlert.nativeElement.style.display = 'block';
    setTimeout(() => {
      // Ocultar o alerta após alguns segundos (por exemplo, 3 segundos)
      this.errorAlert.nativeElement.style.display = 'none';
    }, 3000); // Tempo em milissegundos
  }

  showSuccessAlert() {
    // Exibir o alerta de sucesso
    this.successAlert.nativeElement.style.display = 'block';
    setTimeout(() => {
      // Ocultar o alerta após alguns segundos (por exemplo, 3 segundos)
      this.successAlert.nativeElement.style.display = 'none';
    }, 3000); // Tempo em milissegundos
  }
}
