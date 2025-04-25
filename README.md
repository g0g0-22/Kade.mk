# kade.mk - MVP

Kade.mk is a mobile application that helps users discover curated locations in Skopje for coffee, drinks, and food based on their desired vibe and preferences. This is the MVP version of the app, focused on clean UI, fast filtering, and dynamic loading from a Firebase Firestore database.

## Features

- 🔥 Fetches real-time data from Firestore
- 🏷️ Dynamic tag filtering (with multi-tag support and modals)
- 🧭 Locations include address, working hours, tags, photos, Instagram handles, and coordinates
- 🧩 Modular code (separated concerns: `Card`, `Tag`, `usePlaces`)

## Tech Stack

- React Native with Expo
- Firebase Firestore (NoSQL database)
- TypeScript
- Lucide Icons for visuals

## ☁️ Data Storage

All location data is fetched dynamically from a Firestore database (/locations collection). Each entry represents a curated venue with associated metadata such as name, address, tags, coordinates, and contact info.

## Note

This MVP was developed to validate the core concept of location-based discovery in Skopje through a fast, filterable, and minimal interface. The focus was on clean data loading, modular architecture, and intuitive UX to demonstrate technical execution and product thinking. Future iterations will explore personalized recommendations, live maps, and user-driven content.
