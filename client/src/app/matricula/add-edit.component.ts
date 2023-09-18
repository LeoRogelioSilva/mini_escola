import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MatriculaService } from './matricula.service';
import { AlunoService } from '../aluno/aluno.service';
import { CursoService } from '../curso/curso.service';
import { Aluno } from '../aluno/aluno';
import { Curso } from '../curso/curso';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponentMatricula implements OnInit {
  form3!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  alunoList: Aluno[] = []
  cursoList: Curso[] = []
  @ViewChild('successAlert3') successAlert3!: ElementRef;
  @ViewChild('errorAlert3') errorAlert3!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matriculaService: MatriculaService,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) { }

  ngOnInit() {
    this.codigo = this.route.snapshot.params['id'];
    this.isAddMode = !this.codigo;

    this.loadAlunos();
    this.loadCursos();

    this.form3 = this.formBuilder.group({
      codigoAluno: ['', Validators.required],
      codigoCurso: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.matriculaService.getById(this.codigo)
        .pipe(first())
        .subscribe(x => this.form3.patchValue(x));
    }
  }

  loadAlunos() {
    this.alunoService.getAll().subscribe((data) => {
      this.alunoList = data;
    });
  }
  loadCursos() {
    this.cursoService.getAll().subscribe((data) => {
      this.cursoList = data;
    });
  }

  get f() { return this.form3.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form3 is invalid
    if (this.form3.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createMatricula();
    }
  }

  private createMatricula() {
    this.matriculaService.create(this.form3.value)
      .pipe(first())
      .subscribe(() => {
        alert('Sucesso!')
        this.router.navigate(['/matricula']);
      },
        (error) => {
          console.error('Erro na requisição:', error);
          this.showErrorAlert();
        }
      )
      .add(() => this.loading = false);
  }

  showErrorAlert() {
    this.errorAlert3.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.errorAlert3.nativeElement.style.display = 'none';
    }, 3000);
  }

  showSuccessAlert() {
    this.successAlert3.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.successAlert3.nativeElement.style.display = 'none';
    }, 3000);
  }
}
