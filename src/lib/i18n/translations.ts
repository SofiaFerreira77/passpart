export type Locale = 'en' | 'pt'

export const translations = {
  en: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Try Again',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      share: 'Share',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      viewAll: 'View All',
      seeMore: 'See More',
      back: 'Back',
      next: 'Next',
      done: 'Done',
      close: 'Close',
      openToday: 'Open today',
      closedToday: 'Closed today',
      verified: 'Verified',
      directions: 'Directions',
    },

    // Navigation
    nav: {
      map: 'Map',
      passport: 'Passport',
      discover: 'Discover',
      profile: 'Profile',
    },

    // Landing Page
    landing: {
      hero: {
        badge: 'Your cultural journey starts here',
        title: 'The digital passport for',
        titleHighlight: 'art lovers',
        subtitle: 'Discover masterpieces nearby, stamp your visits, and connect with a global community of art enthusiasts. Every artwork tells a story — make it part of yours.',
        cta: 'Start Your Journey',
        signIn: 'Sign In',
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Four simple steps to start documenting your cultural adventures',
        discover: {
          title: 'Discover',
          description: 'Find museums, galleries, and street art near you',
        },
        stamp: {
          title: 'Stamp',
          description: 'Check in and log your visits instantly',
        },
        reflect: {
          title: 'Reflect',
          description: 'Rate, take notes, and capture memories',
        },
        connect: {
          title: 'Connect',
          description: 'Share discoveries with fellow art lovers',
        },
      },
      features: {
        map: {
          title: 'Art at Your Fingertips',
          description: 'Explore an interactive map featuring museums, galleries, pop-up exhibitions, and hidden street art. Discover cultural gems you never knew existed, right in your neighborhood.',
          feature1: 'Real-time location-based discovery',
          feature2: 'Filter by art type, rating, or distance',
          feature3: 'See what friends are exploring',
        },
        passport: {
          title: 'Your Personal Art Diary',
          description: 'Build a beautiful collection of stamps from every artwork and venue you visit. Add photos, ratings, and personal notes to remember each experience forever.',
          feature1: 'Unique stamps for each venue',
          feature2: 'Add photos and personal notes',
          feature3: 'Track progress and achievements',
        },
      },
      cta: {
        title: 'Ready to start collecting experiences?',
        subtitle: 'Join thousands of art lovers documenting their cultural journeys. Your passport awaits.',
        button: 'Create Your Passport',
      },
      footer: {
        tagline: 'Your digital passport for art',
        about: 'About',
        privacy: 'Privacy',
        terms: 'Terms',
        contact: 'Contact',
        madeWith: 'Made with love for art lovers everywhere',
      },
    },

    // Auth
    auth: {
      login: {
        title: 'Sign In',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        submit: 'Sign In',
        orContinueWith: 'or continue with',
        google: 'Continue with Google',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        welcomeBack: 'Welcome back!',
      },
      signup: {
        title: 'Create Account',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        requirements: {
          length: 'At least 8 characters',
          uppercase: 'One uppercase letter',
          lowercase: 'One lowercase letter',
          number: 'One number',
        },
        terms: 'I agree to the',
        termsLink: 'Terms of Service',
        and: 'and',
        privacyLink: 'Privacy Policy',
        submit: 'Create Account',
        orContinueWith: 'or continue with',
        google: 'Continue with Google',
        hasAccount: 'Already have an account?',
        signIn: 'Sign in',
        success: 'Account created! Check your email to verify.',
      },
      errors: {
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordWeak: 'Password does not meet requirements',
        passwordMismatch: 'Passwords do not match',
        termsRequired: 'You must accept the terms',
        signInFailed: 'Failed to sign in',
        signUpFailed: 'Failed to create account',
      },
    },

    // Map Page
    map: {
      title: 'Discover Art Near You',
      subtitle: 'Explore museums, galleries, and street art on an interactive map. Find hidden gems and track your cultural journey.',
      nearbyVenues: 'Nearby Venues',
      noVenuesNearby: 'No art spots nearby',
      beFirst: 'Be the first to add an art spot!',
      enableLocation: 'Enable location to discover art near you',
      centerOnMe: 'Center on me',
      searchPlaceholder: 'Search venues, cities...',
    },

    // Passport Page
    passport: {
      title: 'Your Passport',
      subtitle: 'Collect stamps from every artwork and venue you visit. Build your personal cultural journey one stamp at a time.',
      stats: {
        stamps: 'Stamps',
        venues: 'Venues',
        cities: 'Cities',
        countries: 'Countries',
      },
      filters: {
        all: 'All',
        favorites: 'Favorites',
        byCity: 'By City',
        byType: 'By Type',
      },
      empty: {
        title: 'Your passport is empty',
        subtitle: 'Start collecting art experiences!',
        cta: 'Explore the Map',
      },
      level: {
        novice: 'Novice',
        explorer: 'Explorer',
        connoisseur: 'Connoisseur',
        master: 'Master',
      },
    },

    // Discover Page
    discover: {
      title: 'Discover',
      searchPlaceholder: 'Search venues, cities, or countries...',
      featured: 'Featured',
      famousArtworks: 'Famous Artworks',
      exploreAll: 'Explore All Venues',
      results: 'Results',
      noResults: 'No venues found matching your criteria',
      filters: {
        allCities: 'All Cities',
        allTypes: 'All Types',
      },
      types: {
        museum: 'Museum',
        gallery: 'Gallery',
        street_art: 'Street Art',
        popup: 'Pop-up',
        public_art: 'Public Art',
      },
      stats: {
        venues: 'Venues',
        artworks: 'Artworks',
        cities: 'Cities',
      },
    },

    // Profile Page
    profile: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      achievements: 'Achievements',
      recentStamps: 'Recent Stamps',
      favorites: 'Favorites',
      followers: 'Followers',
      following: 'Following',
      signOut: 'Sign Out',
      joined: 'Joined',
      stats: {
        stamps: 'Stamps',
        following: 'Following',
        followers: 'Followers',
      },
      edit: {
        title: 'Edit Profile',
        username: 'Username',
        displayName: 'Display Name',
        bio: 'Bio',
        bioPlaceholder: 'Tell us about yourself...',
        favoriteStyles: 'Favorite Art Styles',
        save: 'Save Changes',
      },
      settings: {
        title: 'Settings',
        notifications: 'Notifications',
        privacy: 'Privacy',
        language: 'Language',
        theme: 'Theme',
        about: 'About',
        logout: 'Log Out',
      },
    },

    // Venue Page
    venue: {
      highlights: 'Highlights',
      location: 'Location',
      openingHours: 'Opening Hours',
      website: 'Website',
      visitSite: 'Visit site',
      imHere: "I'm Here - Stamp!",
      tapToOpenMaps: 'Tap to open in Maps',
      today: 'Today',
      closed: 'Closed',
    },

    // Achievements
    achievements: {
      title: 'Achievements',
      unlocked: 'Unlocked',
      locked: 'Locked',
      progress: 'Progress',
      list: {
        first_steps: { name: 'First Steps', description: 'Make your first stamp' },
        art_lover: { name: 'Art Lover', description: 'Collect 10 stamps' },
        cultured: { name: 'Cultured', description: 'Collect 50 stamps' },
        connoisseur: { name: 'Connoisseur', description: 'Collect 100 stamps' },
        globe_trotter: { name: 'Globe Trotter', description: 'Visit art in 5 countries' },
        city_hopper: { name: 'City Hopper', description: 'Explore art in 10 cities' },
        art_critic: { name: 'Art Critic', description: 'Write 10 personal notes' },
        photographer: { name: 'Photographer', description: 'Add photos to 20 stamps' },
        influencer: { name: 'Influencer', description: 'Gain 10 followers' },
      },
    },

    // Stamps
    stamp: {
      createTitle: 'Create Stamp',
      verifyLocation: 'Verifying location...',
      youreHere: "You're here!",
      awayFrom: 'away from',
      addPhoto: 'Add Photo',
      selectArtwork: 'Select Artwork',
      rating: 'Rating',
      note: 'Personal Note',
      notePlaceholder: 'Share your thoughts about this experience...',
      moodTags: 'Mood Tags',
      favorite: 'Mark as Favorite',
      create: 'Create Stamp',
      success: 'Stamp created!',
      moods: {
        inspiring: 'Inspiring',
        peaceful: 'Peaceful',
        thought_provoking: 'Thought-provoking',
        breathtaking: 'Breathtaking',
        nostalgic: 'Nostalgic',
        playful: 'Playful',
        challenging: 'Challenging',
        moving: 'Moving',
        energizing: 'Energizing',
      },
    },
  },

  pt: {
    // Common
    common: {
      loading: 'A carregar...',
      error: 'Algo correu mal',
      retry: 'Tentar Novamente',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      share: 'Partilhar',
      search: 'Pesquisar',
      filter: 'Filtrar',
      all: 'Todos',
      viewAll: 'Ver Tudo',
      seeMore: 'Ver Mais',
      back: 'Voltar',
      next: 'Seguinte',
      done: 'Concluído',
      close: 'Fechar',
      openToday: 'Aberto hoje',
      closedToday: 'Fechado hoje',
      verified: 'Verificado',
      directions: 'Direções',
    },

    // Navigation
    nav: {
      map: 'Mapa',
      passport: 'Passaporte',
      discover: 'Descobrir',
      profile: 'Perfil',
    },

    // Landing Page
    landing: {
      hero: {
        badge: 'A tua jornada cultural começa aqui',
        title: 'O passaporte digital para',
        titleHighlight: 'amantes de arte',
        subtitle: 'Descobre obras-primas perto de ti, carimba as tuas visitas e conecta-te com uma comunidade global de entusiastas de arte. Cada obra conta uma história — faz dela parte da tua.',
        cta: 'Começa a Tua Jornada',
        signIn: 'Entrar',
      },
      howItWorks: {
        title: 'Como Funciona',
        subtitle: 'Quatro passos simples para documentar as tuas aventuras culturais',
        discover: {
          title: 'Descobre',
          description: 'Encontra museus, galerias e arte urbana perto de ti',
        },
        stamp: {
          title: 'Carimba',
          description: 'Regista as tuas visitas instantaneamente',
        },
        reflect: {
          title: 'Reflete',
          description: 'Avalia, toma notas e captura memórias',
        },
        connect: {
          title: 'Conecta',
          description: 'Partilha descobertas com outros amantes de arte',
        },
      },
      features: {
        map: {
          title: 'Arte na Ponta dos Dedos',
          description: 'Explora um mapa interativo com museus, galerias, exposições pop-up e arte urbana escondida. Descobre tesouros culturais que nem sabias que existiam, mesmo no teu bairro.',
          feature1: 'Descoberta baseada em localização em tempo real',
          feature2: 'Filtra por tipo de arte, avaliação ou distância',
          feature3: 'Vê o que os amigos estão a explorar',
        },
        passport: {
          title: 'O Teu Diário de Arte Pessoal',
          description: 'Constrói uma bela coleção de carimbos de cada obra e local que visitas. Adiciona fotos, avaliações e notas pessoais para recordar cada experiência para sempre.',
          feature1: 'Carimbos únicos para cada local',
          feature2: 'Adiciona fotos e notas pessoais',
          feature3: 'Acompanha o progresso e conquistas',
        },
      },
      cta: {
        title: 'Pronto para começar a colecionar experiências?',
        subtitle: 'Junta-te a milhares de amantes de arte a documentar as suas jornadas culturais. O teu passaporte espera-te.',
        button: 'Cria o Teu Passaporte',
      },
      footer: {
        tagline: 'O teu passaporte digital para arte',
        about: 'Sobre',
        privacy: 'Privacidade',
        terms: 'Termos',
        contact: 'Contacto',
        madeWith: 'Feito com amor para amantes de arte em todo o mundo',
      },
    },

    // Auth
    auth: {
      login: {
        title: 'Entrar',
        email: 'Email',
        password: 'Palavra-passe',
        forgotPassword: 'Esqueceste a palavra-passe?',
        submit: 'Entrar',
        orContinueWith: 'ou continua com',
        google: 'Continuar com Google',
        noAccount: 'Não tens conta?',
        signUp: 'Regista-te',
        welcomeBack: 'Bem-vindo de volta!',
      },
      signup: {
        title: 'Criar Conta',
        email: 'Email',
        password: 'Palavra-passe',
        confirmPassword: 'Confirmar Palavra-passe',
        requirements: {
          length: 'Pelo menos 8 caracteres',
          uppercase: 'Uma letra maiúscula',
          lowercase: 'Uma letra minúscula',
          number: 'Um número',
        },
        terms: 'Concordo com os',
        termsLink: 'Termos de Serviço',
        and: 'e',
        privacyLink: 'Política de Privacidade',
        submit: 'Criar Conta',
        orContinueWith: 'ou continua com',
        google: 'Continuar com Google',
        hasAccount: 'Já tens conta?',
        signIn: 'Entra',
        success: 'Conta criada! Verifica o teu email.',
      },
      errors: {
        emailRequired: 'Email é obrigatório',
        emailInvalid: 'Endereço de email inválido',
        passwordRequired: 'Palavra-passe é obrigatória',
        passwordWeak: 'Palavra-passe não cumpre os requisitos',
        passwordMismatch: 'As palavras-passe não coincidem',
        termsRequired: 'Deves aceitar os termos',
        signInFailed: 'Falha ao entrar',
        signUpFailed: 'Falha ao criar conta',
      },
    },

    // Map Page
    map: {
      title: 'Descobre Arte Perto de Ti',
      subtitle: 'Explora museus, galerias e arte urbana num mapa interativo. Encontra tesouros escondidos e acompanha a tua jornada cultural.',
      nearbyVenues: 'Locais Próximos',
      noVenuesNearby: 'Sem locais de arte por perto',
      beFirst: 'Sê o primeiro a adicionar um local de arte!',
      enableLocation: 'Ativa a localização para descobrir arte perto de ti',
      centerOnMe: 'Centrar em mim',
      searchPlaceholder: 'Pesquisar locais, cidades...',
    },

    // Passport Page
    passport: {
      title: 'O Teu Passaporte',
      subtitle: 'Coleciona carimbos de cada obra e local que visitas. Constrói a tua jornada cultural pessoal, um carimbo de cada vez.',
      stats: {
        stamps: 'Carimbos',
        venues: 'Locais',
        cities: 'Cidades',
        countries: 'Países',
      },
      filters: {
        all: 'Todos',
        favorites: 'Favoritos',
        byCity: 'Por Cidade',
        byType: 'Por Tipo',
      },
      empty: {
        title: 'O teu passaporte está vazio',
        subtitle: 'Começa a colecionar experiências artísticas!',
        cta: 'Explorar o Mapa',
      },
      level: {
        novice: 'Novato',
        explorer: 'Explorador',
        connoisseur: 'Conhecedor',
        master: 'Mestre',
      },
    },

    // Discover Page
    discover: {
      title: 'Descobrir',
      searchPlaceholder: 'Pesquisar locais, cidades ou países...',
      featured: 'Em Destaque',
      famousArtworks: 'Obras Famosas',
      exploreAll: 'Explorar Todos os Locais',
      results: 'Resultados',
      noResults: 'Nenhum local encontrado com esses critérios',
      filters: {
        allCities: 'Todas as Cidades',
        allTypes: 'Todos os Tipos',
      },
      types: {
        museum: 'Museu',
        gallery: 'Galeria',
        street_art: 'Arte Urbana',
        popup: 'Pop-up',
        public_art: 'Arte Pública',
      },
      stats: {
        venues: 'Locais',
        artworks: 'Obras',
        cities: 'Cidades',
      },
    },

    // Profile Page
    profile: {
      title: 'Perfil',
      editProfile: 'Editar Perfil',
      achievements: 'Conquistas',
      recentStamps: 'Carimbos Recentes',
      favorites: 'Favoritos',
      followers: 'Seguidores',
      following: 'A Seguir',
      signOut: 'Sair',
      joined: 'Membro desde',
      stats: {
        stamps: 'Carimbos',
        following: 'A Seguir',
        followers: 'Seguidores',
      },
      edit: {
        title: 'Editar Perfil',
        username: 'Nome de utilizador',
        displayName: 'Nome de Exibição',
        bio: 'Bio',
        bioPlaceholder: 'Conta-nos sobre ti...',
        favoriteStyles: 'Estilos de Arte Favoritos',
        save: 'Guardar Alterações',
      },
      settings: {
        title: 'Definições',
        notifications: 'Notificações',
        privacy: 'Privacidade',
        language: 'Idioma',
        theme: 'Tema',
        about: 'Sobre',
        logout: 'Terminar Sessão',
      },
    },

    // Venue Page
    venue: {
      highlights: 'Destaques',
      location: 'Localização',
      openingHours: 'Horário de Funcionamento',
      website: 'Website',
      visitSite: 'Visitar site',
      imHere: 'Estou Aqui - Carimbar!',
      tapToOpenMaps: 'Toca para abrir no Maps',
      today: 'Hoje',
      closed: 'Fechado',
    },

    // Achievements
    achievements: {
      title: 'Conquistas',
      unlocked: 'Desbloqueadas',
      locked: 'Bloqueadas',
      progress: 'Progresso',
      list: {
        first_steps: { name: 'Primeiros Passos', description: 'Faz o teu primeiro carimbo' },
        art_lover: { name: 'Amante de Arte', description: 'Coleciona 10 carimbos' },
        cultured: { name: 'Culto', description: 'Coleciona 50 carimbos' },
        connoisseur: { name: 'Conhecedor', description: 'Coleciona 100 carimbos' },
        globe_trotter: { name: 'Viajante Global', description: 'Visita arte em 5 países' },
        city_hopper: { name: 'Saltador de Cidades', description: 'Explora arte em 10 cidades' },
        art_critic: { name: 'Crítico de Arte', description: 'Escreve 10 notas pessoais' },
        photographer: { name: 'Fotógrafo', description: 'Adiciona fotos a 20 carimbos' },
        influencer: { name: 'Influenciador', description: 'Ganha 10 seguidores' },
      },
    },

    // Stamps
    stamp: {
      createTitle: 'Criar Carimbo',
      verifyLocation: 'A verificar localização...',
      youreHere: 'Estás aqui!',
      awayFrom: 'de distância de',
      addPhoto: 'Adicionar Foto',
      selectArtwork: 'Selecionar Obra',
      rating: 'Avaliação',
      note: 'Nota Pessoal',
      notePlaceholder: 'Partilha os teus pensamentos sobre esta experiência...',
      moodTags: 'Tags de Humor',
      favorite: 'Marcar como Favorito',
      create: 'Criar Carimbo',
      success: 'Carimbo criado!',
      moods: {
        inspiring: 'Inspirador',
        peaceful: 'Tranquilo',
        thought_provoking: 'Reflexivo',
        breathtaking: 'Deslumbrante',
        nostalgic: 'Nostálgico',
        playful: 'Divertido',
        challenging: 'Desafiante',
        moving: 'Comovente',
        energizing: 'Energizante',
      },
    },
  },
}

// Helper type to get nested object structure without literal string types
type DeepStringify<T> = T extends string
  ? string
  : T extends object
  ? { [K in keyof T]: DeepStringify<T[K]> }
  : T

export type TranslationKeys = DeepStringify<typeof translations.en>
