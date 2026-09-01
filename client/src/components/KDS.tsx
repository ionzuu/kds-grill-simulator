import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function KDS(){
    const [Orders, setOrders] = useState<Order[]>([]);
    useEffect(()=>{
        function handleOrders(newOrder: Order) {
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
                Orders != null && Orders.length > 0 ? Orders.map((order, key) => ( <h1 key={key}>{order.items}</h1>)) : <h1>No orders yet...</h1>
            }
        </div>
        </>
    )
}

``