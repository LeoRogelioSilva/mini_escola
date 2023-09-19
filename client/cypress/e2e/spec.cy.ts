
describe('Teste E2E do Meu Site', () => {
  it('Deve abrir a página inicial', () => {
    cy.visit('http://localhost:4200');

    cy.title().should('eq', 'Mini Escola');

    cy.get('h1').should('contain', 'Bem vindo ao gerenciador de matrículas!');

    cy.get('.card').should('be.visible');
  });

  it('Deve ir para alunos', () => {
    cy.visit('http://localhost:4200');


  })
});
