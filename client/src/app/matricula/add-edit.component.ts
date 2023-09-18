import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MatriculaService } from './matricula.service';
import { AlunoService } from '../aluno/aluno.service';
import { CursoService } from '../curso/curso.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponentMatricula implements OnInit {
    form3!: FormGroup;
    codigo!: number;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private matriculaService: MatriculaService,
        private alunoService: AlunoService,
        private cursoService: CursoService
    ) {}

    ngOnInit() {
        this.codigo = this.route.snapshot.params['id'];
        this.isAddMode = !this.codigo;

        this.form3 = this.formBuilder.group({
            nome: ['', Validators.required],
            ementa: ['', Validators.required],
          });

        if (!this.isAddMode) {
            this.matriculaService.getById(this.codigo)
                .pipe(first())
                .subscribe(x => this.form3.patchValue(x));
        }
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
            })
            .add(() => this.loading = false);
    }
}