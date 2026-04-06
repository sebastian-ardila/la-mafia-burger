export interface Ingredient {
  name: string
  nameEn: string
  emoji: string
  quantity?: string
}

export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  comboPrice?: number
  category: string
  isVegetarian?: boolean
  ingredients: Ingredient[]
}

export interface Category {
  id: string
  name: string
  nameEn: string
  icon: string
  products: Product[]
}

export const drinks: Product[] = [
  { id: 'drink-coca', name: 'Coca-Cola Original', nameEn: 'Coca-Cola Original', description: '', descriptionEn: '', price: 5500, category: 'bebidas', ingredients: [{ name: 'Coca-Cola Original', nameEn: 'Coca-Cola Original', emoji: '🥤' }] },
  { id: 'drink-zero', name: 'Coca-Cola Zero', nameEn: 'Coca-Cola Zero', description: '', descriptionEn: '', price: 5500, category: 'bebidas', ingredients: [{ name: 'Coca-Cola Zero', nameEn: 'Coca-Cola Zero', emoji: '🥤' }] },
  { id: 'drink-ginger', name: 'Ginger', nameEn: 'Ginger Ale', description: '', descriptionEn: '', price: 5500, category: 'bebidas', ingredients: [{ name: 'Ginger', nameEn: 'Ginger Ale', emoji: '🥤' }] },
  { id: 'drink-soda', name: 'Soda', nameEn: 'Soda', description: '', descriptionEn: '', price: 5500, category: 'bebidas', ingredients: [{ name: 'Soda', nameEn: 'Soda', emoji: '🥤' }] },
  { id: 'drink-agua', name: 'Agua', nameEn: 'Water', description: '', descriptionEn: '', price: 5500, category: 'bebidas', ingredients: [{ name: 'Agua', nameEn: 'Water', emoji: '💧' }] },
]

const entradas: Product[] = [
  {
    id: 'papas-mafiosas',
    name: 'Papas Mafiosas',
    nameEn: 'Mafia Fries',
    description: 'Papas, tocineta, salsas especiales de la casa y cebollín.',
    descriptionEn: 'Fries, bacon, house special sauces and chives.',
    price: 13000,
    category: 'entradas',
    ingredients: [
      { name: 'Papas', nameEn: 'Fries', emoji: '🍟' },
      { name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
      { name: 'Cebollín', nameEn: 'Chives', emoji: '🧅' },
    ],
  },
  {
    id: 'anillos-cebolla',
    name: 'Anillos de Cebolla',
    nameEn: 'Onion Rings',
    description: 'Crujientes anillos de cebolla apanados con salsas especiales de la casa.',
    descriptionEn: 'Crispy breaded onion rings with house special sauces.',
    price: 12000,
    category: 'entradas',
    isVegetarian: true,
    ingredients: [
      { name: 'Anillos de cebolla apanados', nameEn: 'Breaded onion rings', emoji: '🧅' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
]

const burgers: Product[] = [
  {
    id: 'don-bastiano',
    name: 'Don Bastiano',
    nameEn: 'Don Bastiano',
    description: 'Pan artesanal de orégano, 150gr de carne, queso Philadelphia, chutney de durazno, tocineta, chips de yuca, las dos salsas especiales de la casa.',
    descriptionEn: 'Artisan oregano bun, 150g beef patty, Philadelphia cheese, peach chutney, bacon, yuca chips, both house special sauces.',
    price: 30000,
    comboPrice: 40000,
    category: 'burgers',
    ingredients: [
      { name: 'Pan artesanal de orégano', nameEn: 'Artisan oregano bun', emoji: '🍞' },
      { name: 'Carne', nameEn: 'Beef patty', emoji: '🥩', quantity: '150gr' },
      { name: 'Queso Philadelphia', nameEn: 'Philadelphia cheese', emoji: '🧀' },
      { name: 'Chutney de durazno', nameEn: 'Peach chutney', emoji: '🍑' },
      { name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' },
      { name: 'Chips de yuca', nameEn: 'Yuca chips', emoji: '🥔' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
  {
    id: 'cosa-nostra',
    name: 'Cosa Nostra',
    nameEn: 'Cosa Nostra',
    description: 'Pan artesanal, 150gr de carne, queso, cebolla de la casa, tomate, tocineta, rúgula, salsa de la casa y tomkatsu.',
    descriptionEn: 'Artisan bun, 150g beef patty, cheese, house onion, tomato, bacon, arugula, house sauce and tonkatsu.',
    price: 25000,
    comboPrice: 35000,
    category: 'burgers',
    ingredients: [
      { name: 'Pan artesanal', nameEn: 'Artisan bun', emoji: '🍞' },
      { name: 'Carne', nameEn: 'Beef patty', emoji: '🥩', quantity: '150gr' },
      { name: 'Queso', nameEn: 'Cheese', emoji: '🧀' },
      { name: 'Cebolla de la casa', nameEn: 'House onion', emoji: '🧅' },
      { name: 'Tomate', nameEn: 'Tomato', emoji: '🍅' },
      { name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' },
      { name: 'Rúgula', nameEn: 'Arugula', emoji: '🥬' },
      { name: 'Salsa de la casa', nameEn: 'House sauce', emoji: '🫙' },
      { name: 'Tomkatsu', nameEn: 'Tonkatsu', emoji: '🫙' },
    ],
  },
  {
    id: 'sacra-corona',
    name: 'Sacra Corona',
    nameEn: 'Sacra Corona',
    description: 'Pan artesanal, 150gr de carne, queso Philadelphia, piña asada, tocineta, cebolla grillé, salsas especiales de la casa.',
    descriptionEn: 'Artisan bun, 150g beef patty, Philadelphia cheese, grilled pineapple, bacon, grilled onion, house special sauces.',
    price: 27000,
    comboPrice: 37000,
    category: 'burgers',
    ingredients: [
      { name: 'Pan artesanal', nameEn: 'Artisan bun', emoji: '🍞' },
      { name: 'Carne', nameEn: 'Beef patty', emoji: '🥩', quantity: '150gr' },
      { name: 'Queso Philadelphia', nameEn: 'Philadelphia cheese', emoji: '🧀' },
      { name: 'Piña asada', nameEn: 'Grilled pineapple', emoji: '🍍' },
      { name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' },
      { name: 'Cebolla grillé', nameEn: 'Grilled onion', emoji: '🧅' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
  {
    id: 'smash',
    name: 'Smash',
    nameEn: 'Smash',
    description: 'Pan artesanal, doble carne de 80gr c/u, doble queso, doble tocineta, cebolla grillé, salsas especiales de la casa.',
    descriptionEn: 'Artisan bun, double 80g beef patties, double cheese, double bacon, grilled onion, house special sauces.',
    price: 27000,
    comboPrice: 37000,
    category: 'burgers',
    ingredients: [
      { name: 'Pan artesanal', nameEn: 'Artisan bun', emoji: '🍞' },
      { name: 'Doble carne', nameEn: 'Double beef patty', emoji: '🥩', quantity: '80gr c/u' },
      { name: 'Doble queso', nameEn: 'Double cheese', emoji: '🧀' },
      { name: 'Doble tocineta', nameEn: 'Double bacon', emoji: '🥓' },
      { name: 'Cebolla grillé', nameEn: 'Grilled onion', emoji: '🧅' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
  {
    id: 'borgata',
    name: 'Borgata',
    nameEn: 'Borgata',
    description: 'Pan artesanal, 140gr de pollo crispy, queso Philadelphia, tocineta, cebolla de la casa, pepinillos, rúgula, salsas especiales de la casa.',
    descriptionEn: 'Artisan bun, 140g crispy chicken, Philadelphia cheese, bacon, house onion, pickles, arugula, house special sauces.',
    price: 25000,
    comboPrice: 35000,
    category: 'burgers',
    ingredients: [
      { name: 'Pan artesanal', nameEn: 'Artisan bun', emoji: '🍞' },
      { name: 'Pollo crispy', nameEn: 'Crispy chicken', emoji: '🍗', quantity: '140gr' },
      { name: 'Queso Philadelphia', nameEn: 'Philadelphia cheese', emoji: '🧀' },
      { name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' },
      { name: 'Cebolla de la casa', nameEn: 'House onion', emoji: '🧅' },
      { name: 'Pepinillos', nameEn: 'Pickles', emoji: '🥒' },
      { name: 'Rúgula', nameEn: 'Arugula', emoji: '🥬' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
  {
    id: 'vegi',
    name: 'Vegi Vegetariana',
    nameEn: 'Vegi Vegetarian',
    description: 'Pan artesanal, proteína de quinua y remolacha, cebolla grillé, queso, tomate, aros de cebolla, rúgula, salsas especiales de la casa.',
    descriptionEn: 'Artisan bun, quinoa and beet protein, grilled onion, cheese, tomato, onion rings, arugula, house special sauces.',
    price: 25000,
    comboPrice: 35000,
    category: 'burgers',
    isVegetarian: true,
    ingredients: [
      { name: 'Pan artesanal', nameEn: 'Artisan bun', emoji: '🍞' },
      { name: 'Proteína de quinua y remolacha', nameEn: 'Quinoa & beet protein', emoji: '🌱' },
      { name: 'Cebolla grillé', nameEn: 'Grilled onion', emoji: '🧅' },
      { name: 'Queso', nameEn: 'Cheese', emoji: '🧀' },
      { name: 'Tomate', nameEn: 'Tomato', emoji: '🍅' },
      { name: 'Aros de cebolla', nameEn: 'Onion rings', emoji: '🧅' },
      { name: 'Rúgula', nameEn: 'Arugula', emoji: '🥬' },
      { name: 'Salsas especiales de la casa', nameEn: 'House special sauces', emoji: '🫙' },
    ],
  },
]

const adiciones: Product[] = [
  { id: 'add-philadelphia', name: 'Philadelphia', nameEn: 'Philadelphia', description: '', descriptionEn: '', price: 4500, category: 'adiciones', ingredients: [{ name: 'Philadelphia', nameEn: 'Philadelphia', emoji: '🧀' }] },
  { id: 'add-mozzarella', name: 'Queso mozzarella', nameEn: 'Mozzarella cheese', description: '', descriptionEn: '', price: 2500, category: 'adiciones', ingredients: [{ name: 'Queso mozzarella', nameEn: 'Mozzarella cheese', emoji: '🧀' }] },
  { id: 'add-pepinillos', name: 'Pepinillos', nameEn: 'Pickles', description: '', descriptionEn: '', price: 2500, category: 'adiciones', ingredients: [{ name: 'Pepinillos', nameEn: 'Pickles', emoji: '🥒' }] },
  { id: 'add-pina', name: 'Piña', nameEn: 'Pineapple', description: '', descriptionEn: '', price: 2500, category: 'adiciones', ingredients: [{ name: 'Piña', nameEn: 'Pineapple', emoji: '🍍' }] },
  { id: 'add-rugula', name: 'Rúgula', nameEn: 'Arugula', description: '', descriptionEn: '', price: 1000, category: 'adiciones', ingredients: [{ name: 'Rúgula', nameEn: 'Arugula', emoji: '🥬' }] },
  { id: 'add-carne', name: 'Carne', nameEn: 'Beef patty', description: '', descriptionEn: '', price: 8000, category: 'adiciones', ingredients: [{ name: 'Carne', nameEn: 'Beef patty', emoji: '🥩' }] },
  { id: 'add-pollo', name: 'Pollo', nameEn: 'Chicken', description: '', descriptionEn: '', price: 8000, category: 'adiciones', ingredients: [{ name: 'Pollo', nameEn: 'Chicken', emoji: '🍗' }] },
  { id: 'add-tocineta', name: 'Tocineta', nameEn: 'Bacon', description: '', descriptionEn: '', price: 4500, category: 'adiciones', ingredients: [{ name: 'Tocineta', nameEn: 'Bacon', emoji: '🥓' }] },
  { id: 'add-cebolla-casa', name: 'Cebolla de la casa', nameEn: 'House onion', description: '', descriptionEn: '', price: 2000, category: 'adiciones', ingredients: [{ name: 'Cebolla de la casa', nameEn: 'House onion', emoji: '🧅' }] },
  { id: 'add-cebolla-grille', name: 'Cebolla grillé', nameEn: 'Grilled onion', description: '', descriptionEn: '', price: 2000, category: 'adiciones', ingredients: [{ name: 'Cebolla grillé', nameEn: 'Grilled onion', emoji: '🧅' }] },
  { id: 'add-papitas', name: 'Papitas', nameEn: 'Fries', description: '', descriptionEn: '', price: 7500, category: 'adiciones', ingredients: [{ name: 'Papitas', nameEn: 'Fries', emoji: '🍟' }] },
  { id: 'add-salsa', name: 'Salsa', nameEn: 'Sauce', description: '', descriptionEn: '', price: 1000, category: 'adiciones', ingredients: [{ name: 'Salsa', nameEn: 'Sauce', emoji: '🫙' }] },
]

const bebidasProducts: Product[] = [...drinks]

const vegetariano: Product[] = [
  entradas.find(p => p.id === 'anillos-cebolla')!,
  burgers.find(p => p.id === 'vegi')!,
]

export const categories: Category[] = [
  { id: 'entradas', name: 'Entradas', nameEn: 'Starters', icon: 'ForkKnife', products: entradas },
  { id: 'burgers', name: 'Burgers', nameEn: 'Burgers', icon: 'Hamburger', products: burgers },
  { id: 'adiciones', name: 'Adiciones', nameEn: 'Add-ons', icon: 'PlusCircle', products: adiciones },
  { id: 'bebidas', name: 'Bebidas', nameEn: 'Drinks', icon: 'Beer', products: bebidasProducts },
  { id: 'vegetariano', name: 'Vegetariano', nameEn: 'Vegetarian', icon: 'Plant', products: vegetariano },
]

export const allProducts: Product[] = [...entradas, ...burgers, ...adiciones, ...bebidasProducts]
