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
