import { useState } from "react"

interface Order {
  id: number;
  items: string[]
  total: number
}

export default function POS() {

  const [order, setOrder] = useState<Order>({ id: 0, items: [], total: 0 })

  const handleOrder = (item: string, price: number) => {
    setOrder({
      ...order,
      id: order.id + 1,
      items: [...order.items, item],
      total: order.total + price,
    })
    console.log(order);
  }

  const onHandleDelete = (index: number) => {
    console.log(index);
  }

  return (
    <div className="POS">
      <div className="grid-POS">
        <div className="grid-item">
          <div className="Receipt">
            <div className="grid-receipt">
              <div className="grid-item">Order #___</div>
              <div className="grid-item list">
                <h4>Order details</h4>
                {order.items.map((item, index) => (
                  <div className="order-details">
                    <div className="order-item" key={index}>{item}</div>
                    <div className="deleteItem" onClick={() => onHandleDelete(index)} >X</div>
                  </div>
                ))}
              </div>
              <div className="grid-item">Total: ${order.total} </div>
              <div className="grid-item"><button>Place Order</button></div>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="Menu">
            <div className="grid-menu">
              <div className="grid-item">
                <div className="MenuItem">
                  <h2 className="item-POS" onClick={() => handleOrder('Single SteakBurger', 5)}>Single SteakBurger</h2>
                  <h2 className="item-POS" onClick={() => handleOrder('Double SteakBurger', 10)}>Double SteakBurger</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
