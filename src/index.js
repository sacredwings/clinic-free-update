import { MongoClient, ObjectId } from "mongodb"
import Fs from "fs";
import Config from "../config.json"


setTimeout(() => handler(), 1000);

async function handler(req, res) {
    console.log('--- START ---')
    const client = new MongoClient(Config.mongo.connect.url)
    await client.connect()
    let mongoClient = client.db(Config.mongo.connect.dbName)

    //Пользователи
    let collectionUser = mongoClient.collection(`user`)
    let arFields = {
        login: 'test',
        password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
    }
    await collectionUser.insertOne(arFields)
    arFields = {
        login: 'admin',
        password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
    }
    await collectionUser.insertOne(arFields)

    //Клинтка
    let collectionClinic = mongoClient.collection(`clinic`)
    arFields = {
        title: 'test',
        legal_name: 'ООО Пульсар',
        inn: '5446012122',
        kpp: '544601001',
        ogrn: '1105472000787',

        create_user_id: new DB().ObjectID(arFields._id)
    }
    await collectionClinic.insertOne(arFields)

    //await collectionVideo.rename("video")
    //await collectionImg.rename("img")
    //await collectionAudio.rename("audio")
    //await collectionDoc.rename("doc")


    //let result = await collection.find({to_group_id: new ObjectId('61a9fdb494f73f29366ecddf')}).toArray()
    let result = await collection.find({dislike: null}).toArray()
    console.log(result)

    for (let item of result) {
        let arFields = {
            //_id: item._id,
            //from_id: new ObjectId('61a9fdb194f73f29366e9c22'),
            dislike: false,
            /*
            to_user_id: item.to_user_id,
            album_id: item.album_id,
            title: item.title,
            text: '',
            image_id: item.image_id,*/

        }

        let result = await collection.updateOne({_id: item._id}, {$set: arFields})
        console.log(item)
    }





    console.log('--- END ---')

    //let collection = mongoClient.collection('post')



/*
    let i = 0
    for (let item of arPosts) {

        console.log(i)
        i++
    }

    console.log(arPosts[381])
*/


/*
    let collection = mongoClient.collection('topic')

    await collection.updateMany( {}, { $rename: { "group_id": "to_group_id" } } )

    let newId = new DB().ObjectID('61a9fdb494f73f29366ecdde')
    await collection.updateMany({}, {$set: {to_group_id: newId, to_user_id: null}})
*/
    /*
    await collection.update({}, {
        $rename: {
            "group_id": "to_group_id"
        }
    }, false, true);*/
/*
    let newId = new DB().ObjectID('61a9fdb494f73f29366ecdde')
    await collection.update({}, {$set: {to_group_id: newId, to_user_id: null}}, false, true);*/

}
