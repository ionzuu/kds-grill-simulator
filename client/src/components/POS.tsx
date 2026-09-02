import { useState } from "react"
import { socket } from "../services/socket"
import type { Order, Product } from "../assets/interfaces/types"

export default function POS() {

  const [order, setOrder] = useState<Order>({ items: [], total: 0 , pattiesT: 0})

  const product: Product[] = [
    {
      name: 'Single SteakBurger',
      shortcut: 'SingleSteak',
      price: 5,
      patties: 1,
    },
    {
      name: 'Double SteakBurger',
      shortcut: 'DoubleSteak',
      price: 7.5,
      patties: 2,
    },
    {
      name: 'Triple SteakBurger',
      shortcut: 'TipleSteak',
      price: 10,
      patties: 3,
    }
  ]

  const onhandleSubmit = () => {
    const newOrder = {
      id: crypto.randomUUID(),
      numberOrder: Math.floor(Math.random() * 1000)+100,
      createdAt: new Date().toISOString(),
      items: [{
        ...order,
      }
      ],
      status: 'Pending',
    }
    socket.emit('order:create', newOrder);

    console.log('NewOrder:', newOrder)
  }

  const handleOrder = (item: string) => {
    const newItem:Product = product.find(pr => pr.name === item)
    setOrder({
      ...order,
      items: [...order.items, item],
      total: order.total + newItem?.price,
      pattiesT: order.pattiesT + newItem.patties,
    })
    console.log('Item: ', newItem)
    console.log('Order:', order);
  }

  const onHandleDelete = (index: number) => {
    console.log(index);
    let itemSelected:Product | undefined;
    let newOrder: Order;
    let newTotal: number;
    itemSelected = product.find((id) => id.name === order.items[index])
    newOrder = {...order}
    newOrder.items.splice(index, 1);
    newTotal = order.total - itemSelected.price;
    console.log('newTotal: ', newTotal)
    console.log('Price: ', itemSelected?.price)
    setOrder({
      ...order,
      items: newOrder.items,
      total: newTotal,
      pattiesT: order.pattiesT - itemSelected.patties,
    })
  }

  return (
    <div className="POS">
      <div className="grid-POS">
        <div className="grid-item">
          <div className="Receipt">
            <div className="grid-receipt">
              <div className="grid-item">Order #__</div>
              <div className="grid-item list">
                <h4>Order details</h4>
                {order.items.map((item, index) => (
                  <div className="order-details" key={index}>
                    <div className="order-item">{item}</div>
                    <div className="deleteItem" onClick={() => onHandleDelete(index)} >-</div>
                  </div>
                ))}
              </div>
              <div className="grid-item total">Total: ${order.total} </div>
              <div className="grid-item placeO"><button onClick={() => onhandleSubmit()}>Place Order</button></div>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="Menu">
            <div className="grid-menu">
              <div className="grid-item">
                <div className="MenuItem">
                {product.map((products, index) => (
                  <h2 className="item-POS" key={index} onClick={() => handleOrder(products.name)}>{products.name}</h2>
                ))

                }  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
