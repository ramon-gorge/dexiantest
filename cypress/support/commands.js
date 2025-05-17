import { fazerLogin } from '../pages/loginPage';
import { pedido } from '../pages/pedidoPage';
import { criarPasteis } from '../pages/admPasteis';

Cypress.Commands.add('loginJoao', () => {
    cy.get(fazerLogin.loginNome).type('João');
    cy.get(fazerLogin.loginMatricula).type('123');
    cy.get(fazerLogin.loginSenha).type('123');
    cy.get(fazerLogin.loginEntrar).click();
    cy.get('#login-msg').should('contain', 'Login realizado');
});

Cypress.Commands.add('criarPastel', novoPastel => {
    cy.get(criarPasteis.nomePastel).type(novoPastel.nomePastel);
    cy.get(criarPasteis.precoPastel).type(novoPastel.precoPastel);
    cy.get(criarPasteis.criarPastelBtn).click();
});

Cypress.Commands.add('loginInvalido', () => {
    cy.get(fazerLogin.loginNome).type('Estevam');
    cy.get(fazerLogin.loginMatricula).type('123456');
    cy.get(fazerLogin.loginSenha).type('123456');
    cy.get(fazerLogin.loginEntrar).click();
});