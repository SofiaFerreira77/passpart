import type { Venue, Artwork, Achievement, VenueType } from '@/types'

// Mock venues from SQL seed data
export const MOCK_VENUES: Venue[] = [
  // Lisbon
  {
    id: '1',
    name: 'Museu Nacional de Arte Antiga',
    slug: 'mnaa-lisbon',
    type: 'museum' as VenueType,
    description: "Portugal's national museum with art from the 12th to 19th century",
    address: 'R. das Janelas Verdes',
    city: 'Lisbon',
    country: 'Portugal',
    latitude: 38.7033,
    longitude: -9.1631,
    cover_image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
    website: 'http://www.museudearteantiga.pt',
    opening_hours: {
      monday: null,
      tuesday: { open: '10:00', close: '18:00' },
      wednesday: { open: '10:00', close: '18:00' },
      thursday: { open: '10:00', close: '18:00' },
      friday: { open: '10:00', close: '18:00' },
      saturday: { open: '10:00', close: '18:00' },
      sunday: { open: '10:00', close: '14:00' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'MAAT - Museum of Art, Architecture and Technology',
    slug: 'maat-lisbon',
    type: 'museum' as VenueType,
    description: 'Contemporary museum on the Tagus riverfront with stunning architecture',
    address: 'Av. Brasília',
    city: 'Lisbon',
    country: 'Portugal',
    latitude: 38.6964,
    longitude: -9.1919,
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    website: 'https://www.maat.pt',
    opening_hours: {
      monday: null,
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '10:00', close: '19:00' },
      sunday: { open: '10:00', close: '19:00' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Berardo Collection Museum',
    slug: 'berardo-lisbon',
    type: 'museum' as VenueType,
    description: 'Modern and contemporary art museum in Belém featuring works from Picasso to Warhol',
    address: 'Praça do Império',
    city: 'Lisbon',
    country: 'Portugal',
    latitude: 38.6961,
    longitude: -9.2063,
    cover_image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    website: 'https://www.museuberardo.pt',
    opening_hours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '10:00', close: '19:00' },
      sunday: { open: '10:00', close: '19:00' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'LX Factory Street Art',
    slug: 'lx-factory-street-art',
    type: 'street_art' as VenueType,
    description: 'Vibrant street art in the creative hub of Alcântara, featuring local and international artists',
    address: 'R. Rodrigues de Faria 103',
    city: 'Lisbon',
    country: 'Portugal',
    latitude: 38.7037,
    longitude: -9.1778,
    cover_image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800',
    website: 'https://lxfactory.com',
    opening_hours: null,
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Underdogs Gallery',
    slug: 'underdogs-lisbon',
    type: 'gallery' as VenueType,
    description: 'Contemporary urban art gallery showcasing street art and new media',
    address: 'R. Fernando Palha 56',
    city: 'Lisbon',
    country: 'Portugal',
    latitude: 38.7267,
    longitude: -9.1056,
    cover_image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800',
    website: 'https://www.under-dogs.net',
    opening_hours: {
      monday: null,
      tuesday: { open: '14:00', close: '19:00' },
      wednesday: { open: '14:00', close: '19:00' },
      thursday: { open: '14:00', close: '19:00' },
      friday: { open: '14:00', close: '19:00' },
      saturday: { open: '14:00', close: '19:00' },
      sunday: null,
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  // Porto
  {
    id: '6',
    name: 'Serralves Museum',
    slug: 'serralves-porto',
    type: 'museum' as VenueType,
    description: 'Contemporary art museum with beautiful gardens and Art Deco villa',
    address: 'R. Dom João de Castro 210',
    city: 'Porto',
    country: 'Portugal',
    latitude: 41.1596,
    longitude: -8.6595,
    cover_image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800',
    website: 'https://www.serralves.pt',
    opening_hours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '10:00', close: '20:00' },
      sunday: { open: '10:00', close: '20:00' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'São Bento Station Azulejos',
    slug: 'sao-bento-azulejos',
    type: 'public_art' as VenueType,
    description: 'Historic train station with stunning Portuguese tiles depicting scenes from history',
    address: 'Praça de Almeida Garrett',
    city: 'Porto',
    country: 'Portugal',
    latitude: 41.1456,
    longitude: -8.6103,
    cover_image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
    website: null,
    opening_hours: null,
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Rua de Miguel Bombarda Galleries',
    slug: 'miguel-bombarda-porto',
    type: 'gallery' as VenueType,
    description: 'Street of contemporary art galleries in the heart of Porto',
    address: 'R. de Miguel Bombarda',
    city: 'Porto',
    country: 'Portugal',
    latitude: 41.1517,
    longitude: -8.6264,
    cover_image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=800',
    website: null,
    opening_hours: {
      monday: null,
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '10:00', close: '19:00' },
      sunday: null,
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  // Worldwide
  {
    id: '9',
    name: 'Louvre Museum',
    slug: 'louvre-paris',
    type: 'museum' as VenueType,
    description: "World's largest art museum and historic monument in the heart of Paris",
    address: 'Rue de Rivoli',
    city: 'Paris',
    country: 'France',
    latitude: 48.8606,
    longitude: 2.3376,
    cover_image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    website: 'https://www.louvre.fr',
    opening_hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: null,
      wednesday: { open: '09:00', close: '21:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '21:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '09:00', close: '18:00' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'MoMA - Museum of Modern Art',
    slug: 'moma-nyc',
    type: 'museum' as VenueType,
    description: 'Museum of Modern Art in Midtown Manhattan featuring iconic modern masterpieces',
    address: '11 W 53rd St',
    city: 'New York',
    country: 'United States',
    latitude: 40.7614,
    longitude: -73.9776,
    cover_image: 'https://images.unsplash.com/photo-1565060169194-19fabf79f058?w=800',
    website: 'https://www.moma.org',
    opening_hours: {
      monday: { open: '10:30', close: '17:30' },
      tuesday: { open: '10:30', close: '17:30' },
      wednesday: { open: '10:30', close: '17:30' },
      thursday: { open: '10:30', close: '17:30' },
      friday: { open: '10:30', close: '21:00' },
      saturday: { open: '10:30', close: '19:00' },
      sunday: { open: '10:30', close: '17:30' },
    },
    is_verified: true,
    submitted_by: null,
    created_at: new Date().toISOString(),
  },
]

// Mock artworks from SQL seed data
export const MOCK_ARTWORKS: Artwork[] = [
  // MNAA Lisbon
  {
    id: '1',
    venue_id: '1',
    title: 'Painéis de São Vicente',
    artist: 'Nuno Gonçalves',
    year: '1470-1480',
    medium: 'Oil on wood',
    description: 'Six panel polyptych, one of the most important works of Portuguese art',
    image_url: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800',
    location_within_venue: 'Main Gallery, Floor 2',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    venue_id: '1',
    title: 'The Temptation of St. Anthony',
    artist: 'Hieronymus Bosch',
    year: '1501',
    medium: 'Oil on oak panel',
    description: 'Triptych depicting the mental and spiritual torment of Saint Anthony',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    location_within_venue: 'Bosch Gallery, Floor 3',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  // Louvre Paris
  {
    id: '3',
    venue_id: '9',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: '1503-1519',
    medium: 'Oil on poplar panel',
    description: "The world's most famous portrait, known for her enigmatic smile",
    image_url: 'https://images.unsplash.com/photo-1423742774270-6884aac775fa?w=800',
    location_within_venue: 'Salle des États, Floor 1',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    venue_id: '9',
    title: 'Venus de Milo',
    artist: 'Alexandros of Antioch',
    year: '130-100 BC',
    medium: 'Marble sculpture',
    description: 'Ancient Greek sculpture depicting the goddess Aphrodite',
    image_url: 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=800',
    location_within_venue: 'Greek Antiquities, Ground Floor',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  // MoMA NYC
  {
    id: '5',
    venue_id: '10',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    medium: 'Oil on canvas',
    description: 'Post-Impressionist masterpiece depicting a swirling night sky',
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    location_within_venue: 'Gallery 502, Floor 5',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    venue_id: '10',
    title: "Les Demoiselles d'Avignon",
    artist: 'Pablo Picasso',
    year: '1907',
    medium: 'Oil on canvas',
    description: 'Proto-Cubist painting that revolutionized modern art',
    image_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
    location_within_venue: 'Gallery 503, Floor 5',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
  // Serralves Porto
  {
    id: '7',
    venue_id: '6',
    title: 'Walking and Thinking (and walking)',
    artist: 'Dan Graham',
    year: '2007',
    medium: 'Steel and glass pavilion',
    description: 'Site-specific installation in the Serralves gardens',
    image_url: 'https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?w=800',
    location_within_venue: 'Park Grounds',
    is_permanent: true,
    created_at: new Date().toISOString(),
  },
]

// Mock achievements
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', name: 'First Steps', description: 'Make your first stamp', icon: '👣', requirement_type: 'total_stamps', requirement_value: 1 },
  { id: '2', name: 'Art Lover', description: 'Collect 10 stamps', icon: '🎨', requirement_type: 'total_stamps', requirement_value: 10 },
  { id: '3', name: 'Cultured', description: 'Collect 50 stamps', icon: '🎭', requirement_type: 'total_stamps', requirement_value: 50 },
  { id: '4', name: 'Connoisseur', description: 'Collect 100 stamps', icon: '👑', requirement_type: 'total_stamps', requirement_value: 100 },
  { id: '5', name: 'Globe Trotter', description: 'Visit art in 5 countries', icon: '🌍', requirement_type: 'unique_countries', requirement_value: 5 },
  { id: '6', name: 'City Hopper', description: 'Explore art in 10 cities', icon: '🏙️', requirement_type: 'unique_cities', requirement_value: 10 },
  { id: '7', name: 'Art Critic', description: 'Write 10 personal notes', icon: '📝', requirement_type: 'stamps_with_notes', requirement_value: 10 },
  { id: '8', name: 'Photographer', description: 'Add photos to 20 stamps', icon: '📸', requirement_type: 'stamps_with_photos', requirement_value: 20 },
  { id: '9', name: 'Influencer', description: 'Gain 10 followers', icon: '⭐', requirement_type: 'followers', requirement_value: 10 },
]

// Helper functions
export function getVenuesByCity(city: string): Venue[] {
  return MOCK_VENUES.filter(v => v.city.toLowerCase() === city.toLowerCase())
}

export function getVenuesByCountry(country: string): Venue[] {
  return MOCK_VENUES.filter(v => v.country.toLowerCase() === country.toLowerCase())
}

export function getVenuesByType(type: VenueType): Venue[] {
  return MOCK_VENUES.filter(v => v.type === type)
}

export function getArtworksByVenue(venueId: string): Artwork[] {
  return MOCK_ARTWORKS.filter(a => a.venue_id === venueId)
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return MOCK_VENUES.find(v => v.slug === slug)
}

export function getFeaturedVenues(): Venue[] {
  return MOCK_VENUES.slice(0, 4)
}

export function getUniqueCities(): string[] {
  return [...new Set(MOCK_VENUES.map(v => v.city))]
}

export function getUniqueCountries(): string[] {
  return [...new Set(MOCK_VENUES.map(v => v.country))]
}

// Venue type labels and colors
export const VENUE_TYPE_CONFIG: Record<VenueType, { label: string; color: string; bgColor: string }> = {
  museum: { label: 'Museum', color: 'text-primary-700', bgColor: 'bg-primary-100' },
  gallery: { label: 'Gallery', color: 'text-pink-700', bgColor: 'bg-pink-100' },
  street_art: { label: 'Street Art', color: 'text-accent-700', bgColor: 'bg-accent-100' },
  popup: { label: 'Pop-up', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  public_art: { label: 'Public Art', color: 'text-blue-700', bgColor: 'bg-blue-100' },
}
