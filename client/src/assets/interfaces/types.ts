interface Order {
  items: string[],
  total: number,
  pattiesT: number,
}

interface Product {
  name: string,
  shortcut: string,
  price: number,
  patties: number,
}

export type { Order, Product };