import { Hono } from 'hono'
import { Prisma } from '../utils/functions';

const Users = new Hono()

Users.get('/', async ({req, res, json, env}) => { 
	const { userid, topic } = req.query()

	return json({
        message : 'je suis dans la place'
    })
});


Users.post('/signin', async({ req, res, json, env}) => {
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
} )


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