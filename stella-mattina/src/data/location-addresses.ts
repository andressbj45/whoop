export interface PostalAddressData {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
}

export const LOCATION_ADDRESSES: Record<string, PostalAddressData> = {
  'gynecologist-dallas-bishop-arts': {
    streetAddress: '1135 N Bishop Ave',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75208',
  },
  'gynecologist-dallas-tx-samuell': {
    streetAddress: '6300 Samuell Blvd #154',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75228',
  },
  'obgyn-arlington-tx': {
    streetAddress: '2201 W Park Row Dr, Ste 200',
    addressLocality: 'Arlington',
    addressRegion: 'TX',
    postalCode: '76013',
  },
  'obgyn-in-mesquite': {
    streetAddress: '3000 Gus Thomasson Rd, Ste 127',
    addressLocality: 'Mesquite',
    addressRegion: 'TX',
    postalCode: '75150',
  },
  'primary-care-doctor-for-men': {
    streetAddress: '2727 W Buckner Blvd',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75217',
  },
  'primary-care-doctor-north-dallas': {
    streetAddress: '7777 Forest Ln, Ste A100',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75230',
  },
  'primary-care-physician-carrollton-tx': {
    streetAddress: '1606 W Hebron Pkwy, Ste 102',
    addressLocality: 'Carrollton',
    addressRegion: 'TX',
    postalCode: '75010',
  },
}
