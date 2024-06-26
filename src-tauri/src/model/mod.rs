pub mod logs;
pub mod settings;

use std::process;

use polodb_core::Database;

const DB_NAME: &str = "data.db";

pub fn init_database() -> Database {
    let db = match Database::open_file(DB_NAME) {
        Ok(db) => db,
        Err(err) => {
            println!("{}", err.to_string());
            process::exit(0);
        }
    };

    db
}
