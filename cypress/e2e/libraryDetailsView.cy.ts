describe('Library Details page', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
        statusCode: 200,
        fixture: 'books.json'})
        .visit('http://localhost:3000/libraries/1')
    })
  
    it('', () => {
      
    })
  
    it('', () => {
      
    })
})