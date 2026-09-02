import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import type { OrderPOS } from "../assets/interfaces/types";

export default function KDS(){
    const [Orders, setOrders] = useState<OrderPOS[]>([]);
    useEffect(()=>{
        function handleOrders(newOrder: OrderPOS) {
            setOrders((allOrders)=> [...allOrders, newOrder]);
    }
    socket.on('order:new', handleOrders);
    return () => {
        socket.off('order:new', handleOrders);
    };
},[]);

    return (
        <>
        <div className="KDS-menu">
            <div className="KDS-title">
                <h1>KDS</h1>
            </div>
            <div className="KDS-menuOrders">
                {
                    Orders != null && Orders.length > 0 ? Orders.map((order, key) => ( 
                    <div className='KDS-orderItem' key={key}>
                        <div className="KDS-orderHeader">
                            <h4>Order #{order.numberOrder}</h4>
                        </div>
                        {
                        order.items.map((item, itemKey) => (
                            <div className="KDS-orderItemDetails" key={itemKey}>
                                {item.items.map((subItem) => (
                                    <p>{subItem}</p>
                                ))}
                                <p>Patties:{item.pattiesT}</p>
                            </div>
                        ))}
                    </div>
                    )) : <h1>No orders yet...</h1>
                }
            </div>
        </div>
        </>
    )
}