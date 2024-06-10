use polodb_core::{Collection, Database, Error};
use serde::{Deserialize, Serialize};

const COLLECTION_NAME: &str = "log";

#[derive(Debug, Serialize, Deserialize)]
pub struct Log {
    pub _id: String,
    pub content: String,
    pub created: String,
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
