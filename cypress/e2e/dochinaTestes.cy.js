import { pedido } from '../pages/pedidoPage';
import { fazerLogin } from '../pages/loginPage';
import { criarPasteis } from '../pages/admPasteis';

describe('Pastelaria do China', () => {
    beforeEach('Acessa Pastelaria', () => {
        cy.visit('src/DochinaOfc.html')
        cy.loginJoao()
    });

    it('Login com sucesso', () => {
        //Garantir que usuario esta logado
        cy.get('#login-msg')
        .should('be.visible')

        //Fazer pedido esta sendo exibido
        cy.get('#pedido-section > h2')
        .should('be.visible')
    });

     it('Fazer um pedido com varios pasteis e com Observação', () => {
       cy.get(pedido.numeroMesa).type('15');
       cy.get(pedido.pastelCheckboxes).eq(0).check();
       cy.get(pedido.pastelCheckboxes).eq(3).check();
       cy.get(pedido.observação).type('Pastel de pizza sem tomate');
       cy.get(pedido.enviarPedido).click();
       cy.get('#pedido-msg')
       .should('be.visible')
       cy.get('#pedidos-mesa > .pedido').then(function(mesaPedido) {
       cy.log(mesaPedido.text())
       })
       cy.get('#pedido-section > h3')
       .should('be.visible')
       cy.get(':nth-child(3) > h2')
       .should('be.visible')
       cy.get('#cozinha-pedidos > .pedido').then(function(cozinhaPedido) {
       cy.log(cozinhaPedido.text())
      })
    })

    it('Criar Novo Pastel', () => {
        const novoPastel = {
            nomePastel: 'Pastel Especial',
            precoPastel: '20',
        }
       cy.criarPastel(novoPastel)
       cy.contains('#pastel-checkbox-list label', novoPastel.nomePastel).should('exist')
       cy.contains('#admin-pastel-list', novoPastel.nomePastel).should('exist')
    })

    it('Inativar Pastel pelo Checkbox', () => {
        cy.get(criarPasteis.listaPasteis).eq(1).uncheck();
        cy.get(criarPasteis.listaPasteis).eq(1).should('not.be.checked');
        cy.get(pedido.pastelCheckboxes).should('length', 3);
    })

    it('Inativar pastel pelo ingrediente', () => {
        cy.get(criarPasteis.removerInsgrediente).type('carne');
        cy.get(criarPasteis.desabilitarIngrediente).click();
        cy.contains('#admin-pastel-list', 'carne').should('not.be.checked');
        cy.get(pedido.pastelCheckboxes).should('length', 3);
    })

})