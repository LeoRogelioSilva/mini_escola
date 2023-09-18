import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Matricula } from './matricula';

import { API_URL } from '../config';

const baseUrl = `${API_URL}/matricula`;

@Injectable({ providedIn: 'root' })
export class MatriculaService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Matricula[]>(baseUrl);
    }

    getById(codigo: number) {
        return this.http.get<Matricula>(`${baseUrl}/${codigo}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    delete(codigo: number) {
        return this.http.delete(`${baseUrl}/${codigo}`);
    }
}
