const bcrypt = require('bcryptjs');

const pasword = '1234'

bcrypt.hash(pasword, 10).then(hash => {
    console.log('el hash')
    console.log(hash)  
})