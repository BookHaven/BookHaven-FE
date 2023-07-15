describe('Library Details page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
            statusCode: 200,
            fixture: 'libraries.json'
        })
        .visit('http://localhost:3000/libraries/1/form')
    })
  
    it('should display the name of the library', () => {
        cy.contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.street').should('have.string', '1748 S. Washington Steet');
        cy.get('.city-state-zip').should('have.string', 'Denver, CO 80210');
    })

    it('should instruct users to add a book', () => {
        cy.contains("h2", "Add a book to this library");
    })

    it('should have an input field that takes in an ISBN', () => {
        cy.get('#isbn-input').should('be.visible'); 
        cy.get('#isbn-input').should('have.attr', 'placeholder', 'Enter ISBN');
        
        cy.get('input[name="isbn"]').type('12345')
        cy.get('input[name="isbn"]').should('have.value', '12345')
    })

    it('should direct users to library details page once "Add Book" button is clicked', () => {
        
    })

    it('should direct users to library details page when "Return" button is clicked', () => {
        
    })
})