import { Hono } from 'hono'

const articles = new Hono()

articles.get('/', async ({req, res, json, env}) => { 
	const { userid, topic } = req.query()

	return json({
        message : 'je suis dans la place'
    })
});


export default articles

// app.get('/articles/:userid/doc/', async ({json, env, req, text}) => {
// 	const { userid } = req.param()
// 	const { results } = await selectWhere(env, "Articles", 'userId', userid) 

// 	return json(results)
// })

// const { success } = await database.prepare('update Articles SET note_content = ?, updatedAt = ? WHERE noteId = ?;').bind(object.article, object.updatedAt, object.articleid).run()
//	const { success } = await database.prepare('insert into Articles (articleId, userId, article_content, description, reference, themes, titre, createdAt, createdBy, published_from, updatedAt) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);').bind(articleid, userid, JSON.stringify(object.article_content), object.description, object.reference, JSON.stringify(object.themes), object.title, object.createdAt, object.createdBy, JSON.stringify(object.published_from), object.createdAt).run()
 