import { Hono } from 'hono'
import Users from './routes/users'

const app = new Hono()


app.get('/', ({json}) => {
	const teste = {
		name : 'yaounde', 
		pays : 'Cameroun'
	}
	return json(teste)
})

app.get('/health', ({json}) => {
	return json({
		status: 'ok'
	})
})

// app.route('/image', images)
app.route('/users', Users)


/**
 * les elements que l'on doit retrouver dans les données d'un utilisateur
 * nous avons 
 * les informations de l'utilisateur { name, surname, phone, ...} - all that informations will be provide by google Auth
 * les informations liees a son utilisation de l'application { liste d'articles(les ids), la liste des articles lu, celle marker. }
 */

app.get('/note/:userid',async ({json, env, text, req}) => {
	const { userid } = req.param()
	const { results } = await selectWhere(env, "Notes", 'userId', userid) 
	return json(results)
})

app.post('/note/:userid/doc/:articleid', async ({
	json, 
	text, 
	env, 
	req, 
	status,
	body
}) => {
	const { userid, articleid } = req.param()
	const article = await req.json()
	const database = env.DB
	const object = {
		...article,
		id : articleid, 
		userid,
		createdAt : Date.now(),
		createdBy : JSON.stringify({
			userid, 
			user_name : "Daniel Seppo Eke"
		})
	}

	const { success } = await database.prepare('insert into Notes (noteId, userId, note_content, createdAt, createdBy, published, epingler, updatedAt) values (?, ?, ?, ?, ?, ?, ?, ?);').bind(object.id, object.userid, object.note_content, object.createdAt, object.createdBy, object.published, object.epingler, object.createdAt).run()
	const { results } = await selectWhere(env, "Notes", 'noteId', articleid)
	if(success){
		return json(results)
	} else {
		return text("Problème d'enregistrement")
	}
})

app.put('/note/:userid/doc/:articleid/content', async ({json, env, req, text }) => {
	const { articleid } = req.param()
	const article = await req.json()
	const database = env.DB

	console.log(article)
	const { success } = await database.prepare('update Notes SET note_content = ?, updatedAt = ? WHERE noteId = ?;').bind(article.note_content, Date.now(), articleid).run()
	if(success){
		return json({
			status : 'saved',
			message : 1
		})
	} else {
		return json({
			status : 'unsaved',
			message : 0
		})
	}
})
app.put('/note/:userid/doc/:articleid/publish', async ({json, env, req, text }) => {
	const { articleid } = req.param()
	const publish = await req.json()
	const database = env.DB

	const { success } = await database.prepare('update Notes SET published = ?, updatedAt = ? WHERE noteId = ?;').bind(publish, Date.now(), articleid).run()
	
	if(success){
		return json({
			status : 'saved',
			message : 1
		})
	} else {
		return json({
			status : 'unsaved',
			message : 0
		})
	}
})

export default app


// wrangler d1 execute note_database --file schemas/.sql