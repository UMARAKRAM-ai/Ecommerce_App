import bcrypt from 'bcrypt'

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password: await bcrypt.hash('12345', 10),
        isAdmin:true
    },
    {
        name:'Max',
        email:'max@email.com',
        password:await bcrypt.hash('12345', 10),
        isAdmin:true
    },
    {
        name:'Sam',
        email:'sam@email.com',
        password:await bcrypt.hash('12345', 10),
        isAdmin:true
    },
]

export default users;