import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from './curso';

import { API_URL } from '../config';

const baseUrl = `${API_URL}/curso`;

@Injectable({ providedIn: 'root' })
export class CursoService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Curso[]>(baseUrl);
    }

    getById(codigo: number) {
        return this.http.get<Curso>(`${baseUrl}/${codigo}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(codigo: number, params: any) {
        return this.http.put(`${baseUrl}/${codigo}`, params);
    }

    delete(codigo: number) {
        return this.http.delete(`${baseUrl}/${codigo}`);
    }
}
