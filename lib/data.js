import { Zap, Wrench, Settings, Home, Laptop, Anchor, ShoppingBag, Recycle } from 'lucide-react';

export const categories = [
  {
    id: 'electrical',
    name: 'Electrical & Automation',
    icon: Zap,
    items: [
      {
        title: 'SWITCH GEAR',
        image: '/services/Electrical.webp',
        link: '#'
      },
      {
        title: 'AUTOMATION & CONTROL EQUIPMENTS',
        image: '/services/Electronic-2.webp',
        link: '#'
      },
      {
        title: 'WIRES & CABLES',
        image: '/services/Electronic-3.webp',
        link: '#'
      },
      {
        title: 'SWITCH & SOCKETS',
        image: '/services/Electronic-4.webp',
        link: '#'
      },
      {
        title: 'ELECTRONICS & LIGHTING',
        image: '/services/Electronic-5.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Equipments',
    icon: Wrench,
    items: [
      {
        title: 'HAND TOOLS',
        image: '/services/Tools-1.webp',
        link: '#'
      },
      {
        title: 'POWER TOOLS',
        image: '/services/Tools-2.webp',
        link: '#'
      },
      {
        title: 'CUTTING TOOLS',
        image: '/services/Tools-3.webp',
        link: '#'
      },
      {
        title: 'MEASURING TOOLS',
        image: '/services/Tools-4.webp',
        link: '#'
      },
      {
        title: 'FASTENING TOOLS',
        image: '/services/Tools-5.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial Equipments & Components',
    icon: Settings,
    items: [
      {
        title: 'MACHINERY',
        image: '/services/Industrial-1.webp',
        link: '#'
      },
      {
        title: 'BEARINGS',
        image: '/services/Industrial-2.webp',
        link: '#'
      },
      {
        title: 'HYDRAULIC COMPONENTS',
        image: '/services/Industrial-3.webp',
        link: '#'
      },
      {
        title: 'MOTORS',
        image: '/services/Industrial-4.webp',
        link: '#'
      },
      {
        title: 'GENERATORS',
        image: '/services/Industrial-5.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'construction',
    name: 'Construction & Building Material',
    icon: Home,
    items: [
      {
        title: 'HVAC SYSTEMS',
        image: '/services/Construction-1.webp',
        link: '#'
      },
      {
        title: 'FIRE & SAFETY',
        image: '/services/Construction-2.webp',
        link: '#'
      },
      {
        title: 'BUILDING MATERIALS',
        image: '/services/Construction-3.webp',
        link: '#'
      },
      {
        title: 'PLUMBING SYSTEMS',
        image: '/services/Construction-4.webp',
        link: '#'
      },
      {
        title: 'CONSTRUCTION TOOLS & EQUIPMENTS',
        image: '/services/Construction-5.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Power Solution',
    icon: Laptop,
    items: [
      {
        title: 'IT EQUIPMENTS',
        image: '/services/Technology-1.webp',
        link: '#'
      },
      {
        title: 'BATTERIES',
        image: '/services/Technology-2.webp',
        link: '#'
      },
      {
        title: 'NETWORKING DEVICES',
        image: '/services/Technology-3.webp',
        link: '#'
      },
      {
        title: 'DATA STORAGE',
        image: '/services/Technology-4.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'maritime',
    name: 'Maritime & Aviation',
    icon: Anchor,
    items: [
      {
        title: 'OIL & GAS EQUIPMENTS',
        image: '/services/Energy-1.webp',
        link: '#'
      },
      {
        title: 'MARINE SUPPLIES',
        image: '/services/Energy-2.webp',
        link: '#'
      },
      {
        title: 'AEROSPACE & AIRCRAFT MATERIALS',
        image: '/services/Energy-3.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'consumer',
    name: 'Consumers Goods & Lifestyle',
    icon: ShoppingBag,
    items: [
      {
        title: 'GARMENTS',
        image: '/services/Consumer-1.webp',
        link: '#'
      },
      {
        title: 'COSMETICS & PERSONAL CARECARE',
        image: '/services/Consumer-2.webp',
        link: '#'
      },
      {
        title: 'TOYS & GAMES',
        image: '/services/Consumer-3.webp',
        link: '#'
      },
      {
        title: 'KIDS ESSENTIALS',
        image: '/services/Consumer-4.webp',
        link: '#'
      },
      {
        title: 'FOOTWEAR',
        image: '/services/Consumer-5.webp',
        link: '#'
      }
    ]
  },
  {
    id: 'scrap',
    name: 'Scrap',
    icon: Recycle,
    items: [
      {
        title: 'METAL SCRAP',
        image: '/services/Scrap-1.webp',
        link: '#'
      },
      {
        title: 'ELECTRONIC WASTE',
        image: '/services/Scrap-2.webp',
        link: '#'
      }
    ]
  }
];


export const services = [
  { id: 1, name: 'Electronics Scrap Buyer in Dubai', href: '/services/electronics-scrap' },
  { id: 2, name: 'Metal Scrap Buyer in Dubai, UAE', href: '/services/metal-scrap' },
  { id: 3, name: 'Copper Scrap Buyer in Dubai', href: '/services/copper-scrap' },
  { id: 4, name: 'Computer Scrap Buyer in Dubai', href: '/services/computer-scrap' },
  { id: 5, name: 'We buy dead stocks', href: '/services/we-buy-dead-stocks' },
  { id: 6, name: 'Services', href: '/services/services' },
  { id: 7, name: 'Surplus Electrical Supply', href: '/services/surpluselectricalsupply' },
  { id: 8, name: 'Preferred Stock', href: '/services/prefered-stock' },
  { id: 9, name: 'Scrap Buyer in Mussafah', href: '/services/scrap-buyer-in-mussafah' },
  { id: 10, name: 'Free Collection', href: '/services/free-collection' },
  { id: 11, name: 'Scrap Buyer in Sharjah', href: '/services/scrap-buyer-in-sharjah' },
  { id: 12, name: 'Scrap Buyer in Jebel Ali', href: '/services/scrap-buyer-in-jebel-ali' },
  { id: 13, name: 'Scrap Buyer in Al Quoz', href: '/services/scrap-buyer-in-al-quoz' },
  { id: 14, name: 'Scrap Buyer in Abu Dhabi', href: '/services/scrap-buyer-in-abu-dhabi' },
  { id: 15, name: 'Scrap Buyer Near Me', href: '/services/scrap-buyers-near-me' },
  { id: 16, name: 'Electronic Scrap Buyers Near Me', href: '/services/electronic-scrap-buyers' },
  { id: 17, name: 'E-waste', href: '/services/e-waste' },
  { id: 18, name: 'Cosmetics', href: '/services/cosmetics' },
  { id: 19, name: 'Free Valuation', href: 'https://www.webuydeadstock.com/get-free-valuation-dead-stocks' },
];