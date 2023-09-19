
describe('Teste E2E do Meu Site', () => {
  it('Deve abrir a página inicial', () => {
    cy.visit('http://localhost:4200');

    cy.title().should('eq', 'Mini Escola');

    cy.get('h1').should('contain', 'Bem vindo ao gerenciador de matrículas!');

    cy.get('.card').should('be.visible');
  });

  it('Deve ir para alunos e adicionar um novo', () => {
    cy.visit('http://localhost:4200');

    cy.get('[routerlink="/aluno"]').click()

    cy.get('.container > :nth-child(3) > .btn').click()

    cy.get('.form-control').type('Teste Aluno')

    cy.get('.btn-primary').click()

    cy.contains('Teste Aluno')
  });

  it('Deve ir para cursos e adicionar um novo', () => {
    cy.visit('http://localhost:4200');

    cy.get('[routerlink="/curso"]').click()

    cy.get('.container > :nth-child(3) > .btn').click()

    cy.get(':nth-child(1) > .form-group > .form-control').type('Teste Curso')

    cy.get(':nth-child(2) > .form-group > .form-control').type('Teste Ementa')

    cy.get('.btn-primary').click()

    cy.contains('Teste Curso')
  });

  it('Deve ir para matriculas e adicionar uma nova', () => {
    cy.visit('http://localhost:4200');

    cy.get('[routerlink="/matricula"]').click()

    cy.get('.container > :nth-child(3) > .btn').click()

    cy.get('#codigoAluno').select(1)


    cy.get('#codigoCurso').select(1)

    cy.get('.btn-primary').click()
  });

  it('Delete matricula', () => {
    cy.visit('http://localhost:4200/matricula');

    cy.get(':nth-child(1) > [style="white-space: nowrap;"] > .btn').click()

    cy.contains('Matrícula deletada com sucesso!').should('be.visible')

  });

  it('Delete curso', () => {
    cy.visit('http://localhost:4200/curso');

    cy.get(':nth-child(1) > [style="white-space: nowrap;"] > .btn-danger').click()

    cy.contains('Curso deletado com sucesso!').should('be.visible')

  });

  it('Delete aluno', () => {
    cy.visit('http://localhost:4200/aluno');

    cy.get(':nth-child(7) > [style="white-space: nowrap;"] > .btn-danger').click()

    cy.contains('Aluno deletado com sucesso!').should('be.visible')

  });

});
