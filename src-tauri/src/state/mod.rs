use polodb_core::Database;

use crate::model;

pub struct AppState {
    pub db: Database,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            db: model::init_database(),
        }
    }
}
