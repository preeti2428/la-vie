import { PortfolioItem, InstagramReel } from '../types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'living-harmony',
    title: 'The Serene Living Sanctuary',
    category: 'feng_shui',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Living Room',
    location: 'Zürich, Switzerland',
    description: 'Transforming an awkward high-ceiling living space into a harmonized sanctuary using the 5 Elements of Feng Shui and 60-30-10 color balance.',
    keyChanges: [
      'Command position seating facing main entry',
      'Warm Oak Earth elements grounding central energy',
      'Soft diffused lighting eliminating sharp Chi arrows'
    ],
    roiMetric: '+85% Interest Rate',
    hotspots: [
      {
        id: 'hs-1',
        x: 35,
        y: 65,
        title: '60-30-10 Color Rule Applied',
        ruleTag: 'Color Psychology',
        description: '60% Warm Sand Base, 30% Muted Oak Wood Furniture, 10% Terracotta & Lavender Accent Pillows creating optical peace.'
      },
      {
        id: 'hs-2',
        x: 70,
        y: 40,
        title: 'Sheng Qi Energy Flow',
        ruleTag: 'Feng Shui Flow',
        description: 'Arranged modular seating to allow vital energy to circulate freely without bouncing off sharp corners or dead angles.'
      },
      {
        id: 'hs-3',
        x: 50,
        y: 25,
        title: 'Five Elements Balance',
        ruleTag: 'Harmonization',
        description: 'Integrated Wood (Potted Ficus), Fire (Warm Brass Pendant), Earth (Textured Linen Rug), Metal (Sculptural Frame), and Water (Curved Glass).'
      }
    ]
  },
  {
    id: 'penthouse-staging',
    title: 'Luxury Penthouse Virtual Staging',
    category: 'virtual_staging',
    beforeImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Penthouse Lounge',
    location: 'Munich, Germany',
    description: '100% photorealistic 3D virtual staging for an empty premium property listing, cutting time-on-market from 120 days to 14 days.',
    keyChanges: [
      'Proportional 3D custom curved sofa placement',
      'Realistic architectural illumination and glass reflection mapping',
      'Warm organic materials creating emotional buyer attachment'
    ],
    roiMetric: 'Sold in 14 Days',
    hotspots: [
      {
        id: 'hs-4',
        x: 45,
        y: 55,
        title: 'Photorealistic 3D Furniture',
        ruleTag: 'Virtual Staging',
        description: 'Custom modelled Bouclé sofa with light bounce physics matching exact floor-to-ceiling window sun angles.'
      },
      {
        id: 'hs-5',
        x: 80,
        y: 35,
        title: 'Panoramic Sightline Anchor',
        ruleTag: 'Spatial Staging',
        description: 'Low-profile furniture maintains unobstructed panoramic mountain views, amplifying perceived floor area by 30%.'
      }
    ]
  },
  {
    id: 'zen-bedroom',
    title: 'Master Bedroom Zen Suite',
    category: 'feng_shui',
    beforeImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Master Bedroom',
    location: 'Lucerne, Switzerland',
    description: 'Restorative bedroom design eliminating electromagnetic stress and balancing bedroom Feng Shui for deeper sleep and relaxation.',
    keyChanges: [
      'Grounded upholstered headboard against solid wall',
      'Symmetrical bedside nightstands for partnership balance',
      'Earthy muted linen palette promoting melatonin production'
    ],
    roiMetric: '100% Sleep Quality Improvement',
    hotspots: [
      {
        id: 'hs-6',
        x: 50,
        y: 50,
        title: 'Command Bed Position',
        ruleTag: 'Bedroom Feng Shui',
        description: 'Bed positioned diagonally opposite the entry door, providing full visual awareness of the room without being directly in door energy line.'
      },
      {
        id: 'hs-7',
        x: 20,
        y: 60,
        title: 'Yin Energy Harmonization',
        ruleTag: 'Restorative Design',
        description: 'Soft tactile fabrics, matte clay wall finishes, and warm 2700K indirect cove lighting to soothe the central nervous system.'
      }
    ]
  },
  {
    id: 'executive-office',
    title: 'Executive Focus Home Studio',
    category: 'interior_design',
    beforeImage: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Home Office',
    location: 'Basel, Switzerland',
    description: 'Empowering workspace designed to enhance deep focus, leadership confidence, and creative clarity for remote executives.',
    keyChanges: [
      'Desk placed facing the room with solid wall behind back',
      'Acoustic wood slat panels for sound absorption & warmth',
      'Integrated hidden cable management & clutter-free surfaces'
    ],
    roiMetric: '+40% Productivity Gain',
    hotspots: [
      {
        id: 'hs-8',
        x: 60,
        y: 45,
        title: 'Power Back Wall',
        ruleTag: 'Executive Feng Shui',
        description: 'Solid textured wall behind chair provides subconscious security and authority during video conferences and high-stakes calls.'
      }
    ]
  }
];

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 'reel-1',
    title: '5 Crucial Feng Shui Rules for Your Bedroom 🛏️',
    handle: '@cornelia.lavie',
    thumbnail: 'https://images.unsplash.com/photo-1540518614846-7ede433c51f3?auto=format&fit=crop&w=600&q=80',
    views: '128.4K',
    likes: '14.2K',
    duration: '0:45',
    tags: ['#FengShui', '#BedroomDesign', '#InteriorHarmonies'],
    summary: 'Why you should never place your bed under a heavy ceiling beam or directly opposite the mirror, and how to fix it in 3 simple steps.'
  },
  {
    id: 'reel-2',
    title: 'Virtual Staging vs Real Staging: Value Comparison ✨',
    handle: '@cornelia.lavie',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    views: '94.1K',
    likes: '9.8K',
    duration: '0:58',
    tags: ['#RealEstate', '#VirtualStaging', '#Immobilien'],
    summary: 'Traditional physical staging incurs extensive shipping and rental fees. 3D Virtual Staging delivers photorealistic perfection quickly and sustainably.'
  },
  {
    id: 'reel-3',
    title: 'The 60-30-10 Color Rule Secret Revealed 🎨',
    handle: '@cornelia.lavie',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    views: '210.5K',
    likes: '22.6K',
    duration: '0:38',
    tags: ['#ColorPsychology', '#DesignTips', '#InteriorDesign'],
    summary: 'How professional designers balance primary neutrals, rich secondary textures, and lavender accent pops effortlessly.'
  },
  {
    id: 'reel-4',
    title: 'Call a Designer: 1-Hour Transformation Magic ✨',
    handle: '@cornelia.lavie',
    thumbnail: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    views: '76.3K',
    likes: '8.1K',
    duration: '0:50',
    tags: ['#CallADesigner', '#LAVIEAcademy', '#SpatialConsulting'],
    summary: 'Inside a live 1-on-1 video session with Cornelia Schmid solving floor plan flow issues in real time.'
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    name: 'Beatrix von Stauffenberg',
    role: 'Homeowner',
    location: 'Zürich',
    quote: 'Cornelia transformed our chaotic living room into a serene oasis. The 1-hour "Call a Designer" session gave us immediate clarity on color palettes and energy placement!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Markus Weber',
    role: 'Senior Broker at Luxury Real Estate AG',
    location: 'Munich',
    quote: 'The 3D Virtual Staging by LA VIE Academy helped us sell an empty penthouse listing within 14 days at full asking price. Photorealistic quality!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Sabine Meier',
    role: 'Architect & Interior Designer',
    location: 'Basel',
    quote: 'Cornelia’s deep mastery of Feng Shui and 3D spatial acoustics added immense value to our high-end residential renovation project.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  }
];

export const CONSULTATION_TYPES = [
  {
    id: 'call_a_designer',
    title: 'Call a Designer',
    subtitle: '1-Hour Express Video Consultation',
    price: 'Individual Consultation',
    duration: '60 Minutes',
    badge: 'Most Popular for Quick Results',
    popular: true,
    description: 'Direct 1-on-1 video call with Cornelia Schmid. Perfect for solving specific design dilemmas, choosing color palettes, floor plan review, or instant Feng Shui advice.',
    features: [
      'Live floor plan & video walkthrough analysis',
      'Custom 60-30-10 Color & Material recommendation',
      'Instant Feng Shui energy alignment tips',
      'Actionable PDF summary & shopping guide after call'
    ]
  },
  {
    id: 'virtual_staging_pack',
    title: '3D Virtual Staging Package',
    subtitle: 'Photorealistic Property Transformation',
    price: 'Upon Request',
    duration: '2-3 Days Delivery',
    badge: 'For Real Estate & Developers',
    popular: false,
    description: 'Transform empty, cold, or outdated property photos into high-converting 3D luxury spaces that sell listings up to 85% faster.',
    features: [
      'High-resolution 4K 3D photorealistic renderings',
      'Multiple furniture style choices (Modern, Japandi, Luxury)',
      'Before/After interactive web viewer widget',
      'Revision guarantee for 100% satisfaction'
    ]
  },
  {
    id: 'full_feng_shui',
    title: 'Holistic Feng Shui Consultation',
    subtitle: 'Complete Spatial Harmonization',
    price: 'Bespoke Package',
    duration: 'Full Project Support',
    badge: 'Full Property Transformation',
    popular: false,
    description: 'Comprehensive Feng Shui compass analysis, Bagua energy mapping, material sourcing, and 3D interior design for entire residences or commercial offices.',
    features: [
      'Bagua Map overlay & Lo Shu square analysis',
      'Five Elements balancing for all main living zones',
      'Electrosmog & acoustic environment optimization',
      'Full 3D digital floor plan rendering & execution plan'
    ]
  }
];

export const GRID_PORTFOLIO_ITEMS: import('../types').GridPortfolioItem[] = [
  { id: '1', title: 'Modern Living', category: 'privat', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
  { id: '2', title: 'Office Space', category: 'business', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: '3', title: 'Cozy Bedroom', category: 'privat', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80' },
  { id: '4', title: 'Meeting Room', category: 'business', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80' }
];

