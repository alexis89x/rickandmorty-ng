/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Rick and Morty - CA')
  })

  it('cy.request() - make an XHR request', () => {
    // https://on.cypress.io/request
    cy.request('https://rickandmortyapi.com/api/character/?page=1')
      .should((response) => {
        expect(response.status).to.eq(200)
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
        // expect(response.body).to.have.property('info').and.be.oneOf([500, 501])
        expect(response.body).to.have.property('info')
        expect(response.body).to.have.property('results').and.be.length(20)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
  })

  it('.type() - type into a DOM element', () => {
    cy.get('.character').should('exist');
    cy.get('.character').first().should('contain', 'Sanchez')
  })

  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport
    cy.viewport(2999, 2999)
    cy.get('footer').should('be.visible')
  });
})
