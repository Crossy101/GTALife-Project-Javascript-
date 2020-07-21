const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

class DatabaseHelper {
    constructor() {}

    static GetInstance() {
        if(this.Instance == null || this.Instance == undefined)
        {
            mongoose.connect("mongodb://127.0.0.1/GTALife", {useNewUrlParser: true});
            this.Instance = new DatabaseHelper();
            this.Instance.db = mongoose.connection;
        }
        return this.Instance;
    }

    async InsertDocuments(docs, collectionName) {
        return new Promise((resolve) => {
            setTimeout(() => {
                var collection = this.db.collection(collectionName);
                if(!Array.isArray(collection)) {
                    collection.insertOne(docs, {}, (err, result) => {
                        if(err) 
                            return resolve(false);
                        return resolve(true);
                    });
                } else {
                    collection.insertMany(docs, {}, (err, result) => {
                        if(err)
                            return resolve(false);
                        return resolve(true);
                    })
                }
            }, 5);
        });
    }

    async GetDocuments(collectionName, field, fieldValue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var collection = this.db.collection(collectionName);

                collection.countDocuments({}, (err, result) => {
                    if(err || result <= 0)
                        return reject('No documents were found!');
                    
                    let collectionQuery = collection.find({ [field]: fieldValue }).toArray();

                    collectionQuery.then(
                        (docs) => {
                            if (docs.length <= 0)
                                return reject('No documents were found!');
                            return resolve(docs);
                        },
                        (err) => {
                            return reject('No docunments were found!');
                        }
                    );
                })
            }, 5);
        });
    }

    async UpdateDocuments(docs, collectionName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var collection = this.db.collection(collectionName);

                if(!Array.isArray(docs)) {
                    collection.updateOne({ _id: docs._id}, { $set: docs}, (err, res) => {
                        if(err)
                            return reject([docs._id])
                        return resolve([docs._id]);
                    });
                } else {
                    var completed = [];
                    for (var i = docs.length - 1; i >= 0; i--) {
                        collection.updateOne({ _id: docs[i]._id }, { $set: docs[i] }, (err, res) => {
                            if(err)
                                return reject(docs);
                        });
                        completed.push(docs.pop().id);
                        continue;
                    }
                    return resolve(completed);
                }
            }, 5);
        });
    }

    async DeleteDocuments(doc, collectionName)
    {
        return new Promise((resolve) => {
            setTimeout(() => {
                var collection = this.db.collection(collectionName);

                if(!Array.isArray(doc)) {
                    collection.deleteOne({ _id: doc._id }, (err, result) => {
                        if(err)
                            return resolve(false);
                        return (true);
                    })
                } else {
                    for (var i = 0; i < doc.length; i++) {
                        collection.deleteOne({ _id: doc[i]._id }, (err) => {
                            if(err)
                                return resolve(false);
                        });
                        return resolve(true);
                    }
                }
            }, 5);
        });
    }
}

module.exports = DatabaseHelper;


/*
const PlayerInfo = new Schema({
    _id: {type: String, require: false},
    AccountID: String,
    Username: String,
    Password: String
});

var PlayerInfoModel = mongoose.model('PlayerInfo', PlayerInfo, 'playerinfo');
var newPlayerInfo = new PlayerInfoModel({ AccountID: uuidv4(), Username: 'Crossy1998', Password: 'test'});

DatabaseHelper.GetInstance().InsertDocuments(newPlayerInfo, 'playerinfo').then(
    (res) => {
        if(res) {
            console.log("==> Succesfully Added New Entry!");
        }
        else
        {
            console.log("==> Failed to Add Entry");
        }
    });
*/