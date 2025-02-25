describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
  it('opens', () => {
    cy.visit('/')
  })
  it('increments', () => {
    cy.visit('/')
    cy.get('button').click()
    cy.get('button').click()
    cy.get('button').click()
    cy.get("button").should("have.text", "count is 3")
  })
})