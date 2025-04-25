import { collection, getDocs, GeoPoint } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

export type Place = {
  id: string;
  name: string;
  address: string;
  tags: string[];
  photos: string[];
  location: GeoPoint;
  hours: string[];
  phone?: string;
  instagram: string;
};

export async function fetchPlaces(): Promise<Place[]> {
  const querySnapshot = await getDocs(collection(db, "locations"));

  const places: Place[] = querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      address: data.address,
      tags: data.tags,
      photos: data.photos,
      location: data.location,
      hours: data.hours,
      phone: data.phone,
      instagram: data.instagram,
    };
  });

  return places;
}
