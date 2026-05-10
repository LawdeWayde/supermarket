export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
}

export interface LocationFee {
  id: string;
  name: string;
  fee: number;
  distance?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Red Apples',
    category: 'Fruits',
    price: 2500,
    stock: 50,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 1500,
    stock: 30,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Fresh Carrots',
    category: 'Vegetables',
    price: 800,
    stock: 100,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    price: 600,
    stock: 40,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Whole Milk (Peak)',
    category: 'Dairy',
    price: 2800,
    stock: 40,
    unit: 'carton',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Fresh Eggs',
    category: 'Dairy',
    price: 3500,
    stock: 20,
    unit: 'crate',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    name: 'Plantain (Unripe)',
    category: 'Fruits',
    price: 2000,
    stock: 60,
    unit: 'bunch',
    image: '/unripe-plantain.png',
  },
  {
    id: '8',
    name: 'Palm Oil (5L)',
    category: 'Vegetables',
    price: 8500,
    stock: 15,
    unit: 'bottle',
    image: '/palm-oil.png',
  },
  {
    id: '9',
    name: 'Agege Bread',
    category: 'Bakery',
    price: 800,
    stock: 50,
    unit: 'loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '10',
    name: 'Coca Cola (Pack)',
    category: 'Beverages',
    price: 4500,
    stock: 30,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '11',
    name: 'Broccoli Crown',
    category: 'Vegetables',
    price: 1200,
    stock: 25,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80',
  },
];

export const LOCATIONS: LocationFee[] = [
  { id: '1', name: 'Ikotun (Store Location)', fee: 500, distance: 'Store Area' },
  { id: '2', name: 'Ijegun', fee: 800, distance: '3.5km' },
  { id: '3', name: 'Igando', fee: 800, distance: '4km' },
  { id: '4', name: 'Egbeda', fee: 800, distance: '5km' },
  { id: '5', name: 'Iyana-Ipaja', fee: 800, distance: '7km' },
  { id: '6', name: 'Idimu', fee: 800, distance: '8km' },
  { id: '7', name: 'Oshodi', fee: 800, distance: '9km' },
  { id: '8', name: 'Mushin', fee: 800, distance: '10km' },
  { id: '9', name: 'Alimosho Central', fee: 800, distance: '11km' },
  { id: '10', name: 'Central Lagos', fee: 1200, distance: '15km' },
  { id: '11', name: 'Agege', fee: 1200, distance: '12km' },
  { id: '12', name: 'Ifako-Ijaiye', fee: 1200, distance: '13km' },
  { id: '13', name: 'Ikeja', fee: 1200, distance: '15km' },
  { id: '14', name: 'Surulere', fee: 1200, distance: '18km' },
  { id: '15', name: 'Yaba', fee: 1200, distance: '20km' },
  { id: '16', name: 'Island & South', fee: 1500, distance: '25km+' },
];

export const CATEGORIES = ['All Products', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'];
