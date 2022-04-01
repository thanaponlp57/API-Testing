describe('API Testing', () => {

    // Cypress.config('baseUrl', 'http://dummy.restapiexample.com/api/v1')
    Cypress.config('baseUrl', 'http://localhost:8000/api')

    it('GET - read all book', () => {
        cy.request('/').then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            // expect(response.body).to.have.length(2)
        })
    })

    it('GET - read a book', () => {
        const id = '62440b3fa71c408dfb839e25';
        cy.request(`/read-book/${id}`).then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body).to.have.property('_id', id)
            // .should('include', { _id: '62440b3fa71c408dfb839e25' })
            // expect(response.body).to.have.length(2)
        })
    })

    it('POST - create a book', () => {
        const item = { "name": "test2", "price": "100", "description": "For test2" }
        cy.request('POST', '/add-book', item)
            .its('body')
            // .its('data')
            // .should('deep.eq', item) // return same as post body
            .should('include', { name: 'test2' })
    })

    it('PUT - update a book', () => {
        const item = { "name": "Thanapon", "price": "440", "description": "About book1" }
        cy.request({ method: 'PUT', url: '/update-book/62440b3fa71c408dfb839e25', body: item, failOnStatusCode: false })
            .its('status')
            // .should('eq', 401) // Unauth
            .should('eq', 200)
    })

    it('DELETE - delete a book', () => {
        const id = '624568be03ba15f2ce0084a6';
        cy.request('DELETE', `/delete-book/${id}`).then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body.msg).to.have.property('_id', id)
        })
    })

})