import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  navigateToAluno() {
    this.router.navigate(['/aluno']); // Navega para a rota 'aluno'
  }
  navigateToCurso() {
    this.router.navigate(['/curso']); // Navega para a rota 'aluno'
  }
  navigateToMatricula() {
    this.router.navigate(['/matricula']); // Navega para a rota 'aluno'
  }
}
