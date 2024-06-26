// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use state::AppState;

mod controller;
mod model;
mod state;

fn main() {
    tauri::Builder::default()
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            // settings
            controller::settings::settings_is_first_time,
            controller::settings::settings_get_name,
            controller::settings::settings_validate_password,
            controller::settings::settings_add_data,
            controller::settings::settings_update_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
