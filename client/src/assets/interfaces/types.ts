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

interface OrderPOS {
    id: string,
    numberOrder: number,
    createdAt: string,
    items: Order[],
    status: 'Pending',
}
}

export type { Order, Product, OrderPOS };