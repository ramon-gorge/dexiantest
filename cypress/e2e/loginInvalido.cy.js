describe('Login inválido', () => {
        beforeEach('Acessa Pastelaria', () => {
        cy.visit('src/DochinaOfc.html')
    });
    it('Logar com usuario inválido', () => {
        cy.loginInvalido()
        cy.get('#login-msg')
        .contains('Usuário ou senha inválidos.')
        .should('be.visible')

    })
});