async function createNodeToArangoDb(neo4jNodeObj, count, arangoDb) {
    try {
        return new Promise(async (resolve, reject) => {
            console.log("neo4jNodeObj")
            console.log(neo4jNodeObj.id)
            console.log(count)
            var lableName;
            if (neo4jNodeObj.labels)
                lableName = neo4jNodeObj.labels[0];
            if (lableName) {
                console.log(lableName)
                var nodeProp = neo4jNodeObj.properties;
                console.log(nodeProp)
                collection = arangoDb.collection(lableName);
                if (! await hasCollection(arangoDb, lableName)) {
                    collection.create().then(
                        () => console.log('Collection created'),
                        err => console.error('Failed to create collection:', err)
                    );
                }

                if (nodeProp) {
                    nodeProp._key = neo4jNodeObj.id;
                    collection.save(nodeProp).then(
                        meta => console.log('Document saved:', meta._rev),
                        err => console.error('Failed to save document:', err)
                    );
                }
            } else {
                console.log(lableName)
                var nodeProp = neo4jNodeObj.properties;
                console.log(nodeProp)
                collection = arangoDb.collection(lableName);
                collection.create().then(
                    () => console.log('Collection created'),
                    err => console.error('Failed to create collection:', err)
                );
                if (nodeProp) {
                    nodeProp._key = neo4jNodeObj.id;
                    collection.save(nodeProp).then(
                        meta => console.log('Document saved:', meta._rev),
                        err => console.error('Failed to save document:', err)
                    );
                }
            }
            resolve();
        })
    } catch (error) {
        console.log("Error createNodeToArangoDb")
        console.log(error)
    }
}

async function createEdgeToArangoDb(neo4jRelationObj, count) {
    try {
        return new Promise(async (resolve, reject) => {
            console.log("neo4jRelationObj")
            console.log(neo4jRelationObj.id)
            console.log(count)
            var lableName;
            if (neo4jRelationObj.label)
                lableName = neo4jRelationObj.label;
            if (lableName) {
                console.log(lableName)
                var edgeProp = neo4jRelationObj.properties;
                console.log(edgeProp)
                collection = arangoDb.edgeCollection(lableName);
                if (! await hasCollection(arangoDb, lableName)) {
                    collection.create().then(
                        () => console.log('Collection created'),
                        err => console.error('Failed to create collection:', err)
                    );
                }
                if (await hasCollection(arangoDb, lableName)) {
                    var from_id = neo4jRelationObj.start.id;
                    var to_id = neo4jRelationObj.end.id;
                    if (neo4jRelationObj.start.labels && neo4jRelationObj.end.labels) {
                        var from_lable = neo4jRelationObj.start.labels[0];
                        var to_lable = neo4jRelationObj.end.labels[0];
                        var edgeProp = {};
                        edgeProp._key = neo4jRelationObj.id;
                        console.log(from_lable + '/' + from_id);
                        console.log(to_lable + '/' + to_id);
                        const info = await collection.save({
                            edgeProp,
                            _from: from_lable + '/' + from_id,
                            _to: to_lable + '/' + to_id
                        });
                    }
                } else {
                    collection.create().then(
                        () => console.log('Collection created'),
                        err => console.error('Failed to create collection:', err)
                    );
                }
            }
            resolve()
        })
    } catch (error) {
        console.log("Error createEdgeToArangoDb")
        console.log(error)
    }
}

async function hasCollection(arangoDb, lableName) {
    return new Promise(async (resolve, reject) => {
        var collections = await arangoDb.listCollections();
        collections.map(function (collection) {
            if (collection.name == lableName)
                resolve(true);
        })
        resolve(false);
    });
}

module.exports = {
    createNodeToArangoDb,
    createEdgeToArangoDb
};