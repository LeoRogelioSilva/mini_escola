import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { CursoService } from './curso.service';
import { Curso } from './curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent {
  constructor(private cursoService: CursoService) { }

  cursos: Curso[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'ementa', 'action'];
  dataSource = new MatTableDataSource<Curso>(this.cursos);
  selection = new SelectionModel<Curso>(true, []);
  @ViewChild('successAlert') successAlert!: ElementRef;
  @ViewChild('errorAlert') errorAlert!: ElementRef;

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    this.cursoService.getAll().subscribe((data) => {
      this.cursos = data;
    });
  }


  deleteCurso(codigo: number) {
    const curso = this.cursos.find(x => x.codigo === codigo);
    if (!curso) return;
    curso.isDeleting = true;
    this.cursoService.delete(codigo)
      .pipe(first())
      .subscribe(
        () => {
          this.cursos = this.cursos.filter((x) => x.codigo !== codigo);
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
