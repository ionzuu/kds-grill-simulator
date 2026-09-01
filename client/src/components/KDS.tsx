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
        <div className="menu">
            <h1>KDS</h1>
            {
                Orders != null && Orders.length > 0 ? Orders.map((order, key) => ( 
                <h1 key={key}>{
                    order.items.map((item, itemKey) => (
                        <div key={itemKey}>
                            <span>{item.items.map((subItem) => (
                                <h5>{subItem}</h5>
                            ))}</span>
                            <span>Patties:{item.pattiesT}</span>
                        </div>
                    ))}
                </h1>
                )) : <h1>No orders yet...</h1>
            }
        </div>
        </>
    )
}