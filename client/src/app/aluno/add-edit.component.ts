import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlunoService } from './aluno.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    codigo!: number;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    @ViewChild('successAlert') successAlert!: ElementRef;
    @ViewChild('errorAlert') errorAlert!: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alunoService: AlunoService
    ) {}

    ngOnInit() {
        this.codigo = this.route.snapshot.params['id'];
        this.isAddMode = !this.codigo;

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
          });

        if (!this.isAddMode) {
            this.alunoService.getById(this.codigo)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.isAddMode)
        if (this.isAddMode) {
            this.createAluno();
        } else {
            this.updateAluno();
        }
    }

    private createAluno() {
        this.alunoService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['/aluno']);
                alert('Salvo com Sucesso!');
              },
              (error) => {
                console.error('Erro na requisição:', error);
                alert('Erro ao Salvar');
              }
            )
            .add(() => this.loading = false);
    }

    private updateAluno() {
        this.alunoService.update(this.codigo, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['/aluno']);
                alert('Salvo com Sucesso!');
              },
              (error) => {
                console.error('Erro na requisição:', error);
                alert('Erro ao Salvar')
              }
            )
            .add(() => this.loading = false);
    }
}
