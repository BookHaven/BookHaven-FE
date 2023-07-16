describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Displays the Book Haven landing page', () => {
    cy.get('.landing-title').should('have.text', 'Find a Book, Share a Book')
    cy.get('.landing-desc').should('have.text', 'BookHaven brings together book lovers and book sharers. Find a book you want to read, and borrow it from a library near you.')
    cy.get('.landing-button').should('have.text', 'See All Libraries')
    cy.get('.landing-button-link').should('have.attr', 'href', '/libraries')
    cy.get('.library-image').should('have.attr', 'src', '/library.png')
    cy.get('.library-image').should('have.attr', 'alt', 'Free Library')
    cy.get('.grass-image').should('have.attr', 'src', '/grass.png')
    cy.get('.grass-image').should('have.attr', 'alt', 'Grass')
  })

  it('Upon link click, it takes the user to the Library Index page', () => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')
    
    cy.get('.landing-button').click()
      .wait('@getLibraries')
      .url().should('eq', 'http://localhost:3000/libraries')
  })
})