export const ger_facilities = {
    "open_24_hours": "24 Stunden geöffnet",
    "car_wash": "Waschanlage",
    "jet_wash": "JetWash",
    "special_car_wash": "Besondere Waschanlage",
    "car_wash_plant": "Waschstrasse",
    "super_wash": "SuperWash",
    "recup": "RECUP - Pfandbecher",
    "shop": "Aral Store",
    "bistro": "PetitBistro",
    "pay_at_pump_supported": "Bezahlen an der Zapfsäule",
    "outdoor_payment_terminal": "Outdoor-Zahlungsterminal",
    "loyalty": "PAYBACK & Aral FuelCard",
    "vda": "VDA Konform Siegel",
    "open_saturday": "Samstags geöffnet",
    "open_sunday": "Sonntags geöffnet",
    "rewe_to_go": "Rewe to Go",
    "too_good_to_go": "Too Good To Go",
    "super_boxes": "SB Waschplätze",
    "cash_point": "Geldautomat",
    "electric_charging": "Ladesäulen",
    "truck_parking": "Autohof",
    "motorway_site": "Autobahnnah",
    "truck_wash": "Truck Wash",
    "restaurant": "Restaurant"
}

export const ger_fuel: string[] = [
    "ultimate",
    "ultimate_diesel",
    "lpg",
    "ad_blue",
    "super_e5",
    "e10",
    "truck_diesel",
    "super_98",
    "natural_gas",
    "electric_charging"
]

export interface Stats {
    id: number;
    aral_id: string;
    name: string;
    icon: string;
    price: any;
}

export type stationdata = {
    id: string,
    name: string,
    lat: string,
    lng: string,
    adress: string,
    city: string,
    state: string,
    postcode: string,
    country_code: string,
    telephone: string,
    facilities: string[],
    products: string[],
    opening_hours: string[],
    open_status: string,
    site_brand: string,
    watchlist_id: string,
    website: string
}

export interface Data {
    results: stationdata[];
    query: string;
    facilities: string[];
    fuel: string[];
}