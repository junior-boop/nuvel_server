import { Hono } from 'hono'
import { Prisma } from '../utils/functions';


const Users = new Hono()

Users.get('/', async ({req, res, json, env}) => { 

	return json({
        message : 'je suis dans la place'
    })
});



Users.post('/signin', async({ req, res, json, env}) => {
    const prisma = Prisma(env)
    const user = await req.json()

    try {

        const check_user_exist = await prisma.users.findUnique({
            where: {
                email: user.email
            }
        })

        if(check_user_exist){
            const modifiedUser = await prisma.users.update({
                where: {
                    email: user.email
                },
                data: {
                    ...user,
                    lastlogin : "",
                }
            })
            return json({
                message : 'cet utilisateur existe deja',
                data : modifiedUser
            })
        }
    
        const data = await prisma.users.create({
            data : user
        })

        return json({
            message : 'un utilisateur a ete cree', 
            data : data
        })
    } catch (error) {
        console.log(error)
        return json({
            message : 'il y a une erreur '+ error, 
            data : null
        })
    }
})


Users.put('/:userId/update-infos', async({req, res, env, json}) => {
    const prisma = Prisma(env)
    const formData = await req.parseBody()

    try {
        const data = await prisma.users.create({
            data : formData
        })
    
        return json({
            message : 'un utilisateur a ete cree', 
            data : data
        })
    } catch (error) {
        console.log(error)
        return json({
            message : 'il y a une erreur '+ error, 
            data : null
        })
    }
})
export default Users