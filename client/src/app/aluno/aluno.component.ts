import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlunoService } from './aluno.service';
import { Aluno } from './aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
})
export class AlunoComponent {
  constructor(private alunoService: AlunoService) { }

  alunos: Aluno[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'action'];
  dataSource = new MatTableDataSource<Aluno>(this.alunos);
  selection = new SelectionModel<Aluno>(true, []);
  @ViewChild('successAlert') successAlert!: ElementRef;
  @ViewChild('errorAlert') errorAlert!: ElementRef;

  ngOnInit() {
    this.loadAlunos();
  }

  loadAlunos() {
    this.alunoService.getAll().subscribe((data) => {
      this.alunos = data;
    });
  }


  deleteAluno(codigo: number) {
    const aluno = this.alunos.find(x => x.codigo === codigo);
    if (!aluno) return;
    aluno.isDeleting = true;
    this.alunoService.delete(codigo)
      .pipe(first())
      .subscribe(
        () => {
          this.alunos = this.alunos.filter((x) => x.codigo !== codigo);
          this.showSuccessAlert();
        },
        (error) => {
          console.error('Erro na requisição:', error);
          this.showErrorAlert();
        }
      );
  }

  showErrorAlert() {
    this.errorAlert.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.errorAlert.nativeElement.style.display = 'none';
    }, 3000);
  }

  showSuccessAlert() {
    this.successAlert.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.successAlert.nativeElement.style.display = 'none';
    }, 3000);
  }
}
