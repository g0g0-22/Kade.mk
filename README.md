# kade.mk - MVP

Kade.mk is a mobile application that helps users discover curated locations in Skopje for coffee, drinks, and food based on their desired vibe and preferences. This is the MVP version of the app, focused on clean UI, fast filtering, and dynamic loading from a Firebase Firestore database.

## Features

- 🔥 Fetches real-time data from Firestore (`/locations` collection)
- 🏷️ Dynamic tag filtering (with multi-tag support and modals)
- 🧭 Locations include address, working hours, tags, photos, Instagram handles, and coordinates
- 🧩 Modular code (separated concerns: `Card`, `Tag`, `usePlaces`)

## Tech Stack

- React Native with Expo
- Firebase Firestore (NoSQL database)
- TypeScript
- Lucide Icons for visuals

## Database Schema (Firestore)

Each document:
{
"name": "Skara Bar",
"address": "Centar, Skopje",
"tags": ["grill", "cozy"],
"photos": ["url1", "url2"],
"location": {
"\_lat": 41.9981,
"\_long": 21.4254
},
"hours": ["Mon–Sun: 10AM–12AM"],
"phone": "070123456",
"instagram": "@skarabar"
}

## Note

This MVP was developed to validate the core concept of location-based discovery in Skopje through a fast, filterable, and minimal interface. The focus was on clean data loading, modular architecture, and intuitive UX to demonstrate technical execution and product thinking. Future iterations will explore personalized recommendations, live maps, and user-driven content.
