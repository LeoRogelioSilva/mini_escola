import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CursoService } from './curso.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponentCurso implements OnInit {
    form2!: FormGroup;
    codigo!: number;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cursoService: CursoService
    ) {}

    ngOnInit() {
        this.codigo = this.route.snapshot.params['id'];
        this.isAddMode = !this.codigo;

        this.form2 = this.formBuilder.group({
            nome: ['', Validators.required],
            ementa: ['', Validators.required],
          });

        if (!this.isAddMode) {
            this.cursoService.getById(this.codigo)
                .pipe(first())
                .subscribe(x => this.form2.patchValue(x));
        }
    }

    get f() { return this.form2.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form2 is invalid
        if (this.form2.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createCurso();
        } else {
            this.updateCurso();
        }
    }

    private createCurso() {
        this.cursoService.create(this.form2.value)
            .pipe(first())
            .subscribe(() => {
                alert('Sucesso!')
                this.router.navigate(['/curso']);
            })
            .add(() => this.loading = false);
    }

    private updateCurso() {
        this.cursoService.update(this.codigo, this.form2.value)
            .pipe(first())
            .subscribe(() => {
                alert('Sucesso!')
                this.router.navigate(['/curso']);
            })
            .add(() => this.loading = false);
    }
}
