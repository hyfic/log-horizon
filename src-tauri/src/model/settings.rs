use polodb_core::bson::doc;
use polodb_core::results::UpdateResult;
use polodb_core::{results::InsertOneResult, Database, Error};
use serde::{Deserialize, Serialize};

const COLLECTION_NAME: &str = "settings";

#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    pub name: String,
    pub password: String,
}

pub fn get(db: &Database) -> Result<Option<Settings>, Error> {
    let collection: polodb_core::Collection<Settings> = db.collection(COLLECTION_NAME);
    match collection.find_one(None) {
        Ok(result) => Ok(result),
        Err(err) => Err(err),
    }
}

pub fn insert(db: &Database, data: Settings) -> Result<InsertOneResult, Error> {
    let collection = db.collection(COLLECTION_NAME);
    match collection.insert_one(data) {
        Ok(result) => Ok(result),
        Err(err) => Err(err),
    }
}

pub fn update(db: &Database, data: Settings) -> Result<UpdateResult, Error> {
    let collection: polodb_core::Collection<Settings> = db.collection(COLLECTION_NAME);
    match collection.update_many(
        doc! {},
        doc! {
          "name": data.name,
          "password": data.password
        },
    ) {
        Ok(result) => Ok(result),
        Err(err) => Err(err),
    }
}
