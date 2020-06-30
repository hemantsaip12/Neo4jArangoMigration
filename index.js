const fs = require('fs');
Database = require('arangojs').Database;
arangoDb = new Database('http://127.0.0.1:8529');
arangoDb.useBasicAuth("root", "admin");
arangoDb.useDatabase('mydb');
const { createNodeToArangoDb, createEdgeToArangoDb } = require("./arango.js")

startReadAndInserNeo4j()

//To delete listed collection
//deleteCollection()

//To delete listed edge collection
//deleteEdgeCollection()

async function deleteCollection() {
    collection = arangoDb.collection('Group');
    collection.drop().then(
        () => console.log('Deleted collection'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('Depot');
    collection.drop().then(
        () => console.log('Deleted collection Depot'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('Incentive');
    collection.drop().then(
        () => console.log('Deleted collection Incentive'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('Location');
    collection.drop().then(
        () => console.log('Deleted collection Location'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('PlatoonRoute');
    collection.drop().then(
        () => console.log('Deleted collection PlatoonRoute'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('PlatoonRouteNode');
    collection.drop().then(
        () => console.log('Deleted collection PlatoonRouteNode'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('PlatoonVia');
    collection.drop().then(
        () => console.log('Deleted collection PlatoonVia'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('ReferenceNode');
    collection.drop().then(
        () => console.log('Deleted collection ReferenceNode'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RoadPoint');
    collection.drop().then(
        () => console.log('Deleted collection RoadPoint'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('Vehicle');
    collection.drop().then(
        () => console.log('Deleted collection Vehicle'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('VehicleSet');
    collection.drop().then(
        () => console.log('Deleted collection VehicleSet'),
        err => console.error('Failed to delete collection:', err)
    );
}

async function startReadAndInserNeo4j() {
    try {
        let rawdata = await fs.readFileSync('./neo4jData.json');
        let neo4jJSON = JSON.parse(rawdata);
        console.log("obj count")
        console.log(neo4jJSON.length)
        for (let index = 0; index < neo4jJSON.length; index++) {
            // Node Creation
            if (neo4jJSON[index].type && neo4jJSON[index].type == "node")
                var results = await createNodeToArangoDb(neo4jJSON[index], index, arangoDb)

            // Edge Creation
            if (neo4jJSON[index].type && neo4jJSON[index].type == "relationship")
                var results = await createEdgeToArangoDb(neo4jJSON[index], index, arangoDb)
        }
    } catch (error) {
        console.log("error")
        console.log(error)
    }
}

async function deleteEdgeCollection() {
    collection = arangoDb.collection('CONSISTS_OF');
    collection.drop().then(
        () => console.log('Deleted collection CONSISTS_OF'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('HAS');
    collection.drop().then(
        () => console.log('Deleted collection HAS'),
        err => console.error('Failed to delete collection:', err)
    );

    collection = arangoDb.collection('END_AT');
    collection.drop().then(
        () => console.log('Deleted collection END_AT'),
        err => console.error('Failed to delete collection:', err)
    );

    collection = arangoDb.collection('IN');
    collection.drop().then(
        () => console.log('Deleted collection IN'),
        err => console.error('Failed to delete collection:', err)
    );

    collection = arangoDb.collection('LAYER');
    collection.drop().then(
        () => console.log('Deleted collection LAYER'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('LOCATED_AT');
    collection.drop().then(
        () => console.log('Deleted collection LOCATED_AT'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('LOCATION');
    collection.drop().then(
        () => console.log('Deleted collection LOCATION'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('NEXT');
    collection.drop().then(
        () => console.log('Deleted collection NEXT'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('PLATOON_AT');
    collection.drop().then(
        () => console.log('Deleted collection PLATOON_AT'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('PLATOON_VIA');
    collection.drop().then(
        () => console.log('Deleted collection PLATOON_VIA'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('ROAD_SEGMENT');
    collection.drop().then(
        () => console.log('Deleted collection ROAD_SEGMENT'),
        err => console.error('Failed to delete collection:', err)
    );

    collection = arangoDb.collection('ROUTE_NODES');
    collection.drop().then(
        () => console.log('Deleted collection ROUTE_NODES'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RTREE_CHILD');
    collection.drop().then(
        () => console.log('Deleted collection RTREE_CHILD'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RTREE_CHILD');
    collection.drop().then(
        () => console.log('Deleted collection RTREE_CHILD'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RTREE_METADATA');
    collection.drop().then(
        () => console.log('Deleted collection RTREE_METADATA'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RTREE_REFERENCE');
    collection.drop().then(
        () => console.log('Deleted collection RTREE_REFERENCE'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('RTREE_ROOT');
    collection.drop().then(
        () => console.log('Deleted collection RTREE_ROOT'),
        err => console.error('Failed to delete collection:', err)
    );
    collection = arangoDb.collection('START_AT');
    collection.drop().then(
        () => console.log('Deleted collection START_AT'),
        err => console.error('Failed to delete collection:', err)
    );
}


// const neo4j = require('neo4j-driver')
// const driver = neo4j.driver("bolt://192.168.1.15:7677", neo4j.auth.basic("neo4j", "changeme"))
// const session = driver.session()

// createPerson()

// async function createPerson() {
//     try {
//         const result = await session.run(
//             `MATCH (usr:User) return
//             coalesce(usr.id, "") as id,
//             coalesce(usr.name,"") as name,
//             coalesce(usr.email, "") as email,
//             coalesce(usr.isRedeemedMapped, 0) as isRedeemedMapped,
//             coalesce(usr.isActive, 0) as isActive,
//             coalesce(usr.createdAt, 0) as createdAt,
//             coalesce(usr.updatedAt, 0) as updatedAt,
//             coalesce(usr.lastLogin, 0) as lastLogin,
//             coalesce(usr.mobileNo, "") as mobileNo,
//             coalesce(usr.userTypeId, "") as userTypeId`
//         )

//         const singleRecord = result.records[0]
//         const node = singleRecord.get(0)
//         console.log("node.properties.name")
//         console.log(node)
//         result.records.map(record => { 
//             console.log( record.get("id")); 
//             console.log( record.get("name")); 
//             console.log( record.get("email")); 
//             console.log( record.get("isRedeemedMapped")); 
//             console.log( record.get("isActive")); 
//             console.log( record.get("createdAt")); 
//             console.log( record.get("updatedAt")); 
//             console.log( record.get("lastLogin")); 
//             console.log( record.get("mobileNo")); 
//             console.log( record.get("userTypeId")); 
//         });
//     } finally {
//         await session.close()
//     }
//     // on application exit:
//     await driver.close()
// }


// arangoDb.createDatabase('mydb').then(
//     () => console.log('Database created'),
//     err => console.error('Failed to create database:', err)
// );

// arangoDb.useDatabase('mydb');
// collection = arangoDb.collection('firstCollection');

// collection.create().then(
//     () => console.log('Collection created'),
//     err => console.error('Failed to create collection:', err)
// );

// doc = {
//     _key: 'firstDocument',
//     a: 'foo',
//     b: 'bar',
//     c: Date()
// };

// collection.save(doc).then(
//     meta => console.log('Document saved:', meta._rev),
//     err => console.error('Failed to save document:', err)
// );

// collection.update('firstDocument', { d: 'qux' }).then(
//     meta => console.log('Document updated:', meta._rev),
//     err => console.error('Failed to update document:', err)
// );

