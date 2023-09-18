import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlunoService } from './aluno.service';

export interface Aluno {
  codigo: number;
  nome: string;
  isDeleting: boolean;
}

const tableData: Aluno[] = [
  {
    codigo: 1,
    nome: "Teste",
    isDeleting: false
  },
  {
    codigo: 1,
    nome: "Teste",
    isDeleting: false
  }
]


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
})
export class AlunoComponent {
  constructor(private alunoService: AlunoService){}

  alunos: Aluno[] = tableData
  displayedColumns: string[] = ['codigo', 'nome', 'action'];
  dataSource = new MatTableDataSource<Aluno>(tableData);
  selection = new SelectionModel<Aluno>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Aluno): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  deleteAluno(codigo: number){
    const aluno = this.alunos.find(x => x.codigo === codigo);
        if (!aluno) return;
        aluno.isDeleting = true;
        this.alunoService.delete(codigo)
            .pipe(first())
            .subscribe(() => this.alunos = this.alunos.filter(x => x.codigo !== codigo));

  }
}
