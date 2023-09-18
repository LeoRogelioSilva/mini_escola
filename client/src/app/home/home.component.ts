import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Método para navegar para a página de alunos (rota 'aluno')
  navigateToAluno() {
    this.router.navigate(['/aluno']); // Navega para a rota 'aluno'
  }
}
