export type LocationZone = 'zona-7'
| 'zona-10' 
| 'zona-11' 
| 'zona-15' 
| 'zona-16';
export type LocationType = 'gym' 
| 'office' 
| 'university' 
| 'mall' 
| 'clinic';

export type Location = {
  id: string;
  name: string;
  address: string;
  zone: LocationZone;
  type: LocationType;
  hours: string;
  mapsUrl: string;
};

export const ZONE_LABELS: Record<LocationZone, string> = {
  'zona-7': 'Zona 7',
  'zona-10': 'Zona 10',
  'zona-11': 'Zona 11',
  'zona-15': 'Zona 15',
  'zona-16': 'Zona 16',
};

export const locations: Location[] = [
  {
    id: 'golds-z10',
    name: "Gold's Gym Zona 7",
    address: 'Av. La Reforma 1-61, Zona 7',
    zone: 'zona-7',
    type: 'gym',
    hours: 'Lun–Vie 5am–11pm · Sáb–Dom 7am–9pm',
    mapsUrl: 'https://maps.google.com/?q=Av+La+Reforma+1-61+Zona+10+Guatemala+City',
  },
  {
    id: 'wework-z10',
    name: 'WeWork 99, Zona 10',
    address: '99 Calle Zona 10, Boulevard Los Próceres',
    zone: 'zona-10',
    type: 'office',
    hours: 'Lun–Vie 7am–8pm',
    mapsUrl: 'https://maps.google.com/?q=99+Calle+Zona+10+Guatemala+City',
  },
];
