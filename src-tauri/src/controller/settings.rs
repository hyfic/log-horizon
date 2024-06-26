use pwhash::bcrypt;
use tauri::State;

use crate::{
    model::{self, settings::Settings},
    state::AppState,
};

#[tauri::command]
pub fn settings_is_first_time(state: State<AppState>) -> Result<bool, String> {
    let db = &state.db;

    match model::settings::get(db) {
        Ok(result) => match result {
            Some(_) => Ok(false),
            None => Ok(true),
        },
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn settings_get_name(state: State<AppState>) -> Result<String, String> {
    let db = &state.db;

    match model::settings::get(db) {
        Ok(result) => match result {
            Some(val) => Ok(val.name),
            None => Err(String::from("User")),
        },
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn settings_validate_password(
    password: String,
    state: State<AppState>,
) -> Result<bool, String> {
    let db = &state.db;

    match model::settings::get(db) {
        Ok(result) => match result {
            Some(data) => Ok(bcrypt::verify(password, &data.password)),
            None => Err(String::from("Invalid password")),
        },
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn settings_add_data(
    name: String,
    password: String,
    state: State<AppState>,
) -> Result<bool, String> {
    let db = &state.db;

    let hash = bcrypt::hash(password).unwrap();

    match model::settings::insert(
        db,
        Settings {
            name,
            password: hash,
        },
    ) {
        Ok(_) => Ok(true),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn settings_update_data(
    name: String,
    password: String,
    state: State<AppState>,
) -> Result<bool, String> {
    let db = &state.db;

    let hash = bcrypt::hash(password).unwrap();

    match model::settings::update(
        db,
        Settings {
            name,
            password: hash,
        },
    ) {
        Ok(_) => Ok(true),
        Err(err) => Err(err.to_string()),
    }
}
