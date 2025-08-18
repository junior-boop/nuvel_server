import { Hono } from 'hono'
import Metadata_images from './images_rename';
import IdGenerator from './id_generator';

const images = new Hono()

images.get('/', async ({req, res, json, env}) => { 
	const { results } = await Select(env, "Images")
	return json(results)
});

images.post('/', async ({req, res, json, env, text}) => {
	const bucket = env['nuvel-images']
    const { images } = await req.parseBody() 

	try {

		const metadata = Metadata_images(images)
        
        const object = {
            ...metadata,
            path :'/' + metadata.name,
            createdAt : Date.now(),
            key : IdGenerator(15, 5)
        };

		
        await bucket.put(object.name, images, {
            customMetadata : {
                name : object.name,
                size : object.size,
                type : object.minetype,
                lastModified : object.lastmodified,
            },
            httpMetadata : {
                contentType: object.minetype
            }
        })

		return json(object)

	} catch (error) {
		console.log(error)
		return text('il y a une erreur '+ error)
	}
});

images.get('/:images', async ({json, env, res, req}) => {
	const { images } =  req.param()
	const bucket = env['nuvel-images']
	

	const files = await bucket.get(images)

	if(files === null){
		return json('il y n\'a pas ce fichier')
	}

	const headers = new Headers()
	files.writeHttpMetadata(headers)
	headers.set('etag', files.httpEtag)

	return new Response(files.body, { headers })
})

export default images