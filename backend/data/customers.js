const bcrypt = require('bcryptjs')

const customers = [
    {
        forename: 'Connor',
        surname: 'Clarke',
        addressline1: '45 Bristol Road',
        addressline2: '-',
        town: 'Bridgwater',
        postcode: 'TA6 4AU',
        email: 'connorclarke1511@hotmail.com',
        password: bcrypt.hash('password', 10)
    },
    {
        forename: 'Harris',
        surname: 'Clarke',
        addressline1: '45 Bristol Road',
        addressline2: '-',
        town: 'Bridgwater',
        postcode: 'TA6 4AU',
        email: 'harrisclarke663@hotmail.com',
        password: bcrypt.hash('minecraft', 10)
    },
    {
        forename: 'Test',
        surname: 'User',
        addressline1: 'Testing Avenue',
        addressline2: '-',
        town: 'TestTown',
        postcode: 'TE5 3ST',
        email: 'testaccount@hotmail.com',
        password: bcrypt.hash('testUser', 10)
    }

]

module.exports = customers
