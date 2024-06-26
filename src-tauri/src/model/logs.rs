use polodb_core::{
    bson::doc,
    results::{InsertOneResult, UpdateResult},
    Collection, Database, Error,
};
use serde::{Deserialize, Serialize};

const COLLECTION_NAME: &str = "logs";

#[derive(Debug, Serialize, Deserialize)]
pub struct Log {
    pub content: String,
    pub created: String,
    pub updated: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LogOut {
    pub _id: String,
    pub content: String,
    pub created: String,
    pub updated: String,
}

pub fn get_all(db: &Database) -> Result<Vec<Log>, Error> {
    let collection: Collection<Log> = db.collection(COLLECTION_NAME);

    match collection.find(None) {
        Ok(result) => {
            return Ok(vec![]);
        }
        Err(err) => Err(err),
    }
}

pub fn create_log(db: &Database, created: String) -> Result<InsertOneResult, Error> {
    let collection: Collection<Log> = db.collection(COLLECTION_NAME);

    match collection.insert_one(Log {
        created: created.clone(),
        updated: created,
        content: String::from(""),
    }) {
        Ok(data) => Ok(data),
        Err(err) => Err(err),
    }
}

pub fn update_log(
    db: &Database,
    id: String,
    content: String,
    updated: String,
) -> Result<UpdateResult, Error> {
    let collection: Collection<Log> = db.collection(COLLECTION_NAME);

    match collection.update_one(
        doc! {
            "_id": id
        },
        doc! {
            "$set": doc! {
                "content": content,
                "updated": updated
            }
        },
    ) {
        Ok(data) => Ok(data),
        Err(err) => Err(err),
    }
}
