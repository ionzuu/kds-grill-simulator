import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import type { OrderPOS } from "../assets/interfaces/types";

export default function KDS(){
    const [Orders, setOrders] = useState<OrderPOS[]>([]);
    const [timers, setTimers] = useState<Record<number, number>>({});
    const [minutes, setMinutes] = useState<number>(0);

    useEffect(()=>{
        function handleOrders(newOrder: OrderPOS) {
            setOrders((allOrders)=> [...allOrders, newOrder]);
    }
    socket.on('order:new', handleOrders);
    return () => {
        socket.off('order:new', handleOrders);
    };
},[]);

    function handleTimers(orderNumber: number) {
        setTimers(prev => (
            { ...prev, [orderNumber]: setInterval(() => {
            setTimers(prev => ({ ...prev, [orderNumber]: prev[orderNumber] + 1 }));
        }, 1000) }));
        if (timers[orderNumber] === 60) {
            alert(`Order #${orderNumber} has been in the queue for 1 minute!`);
            setMinutes(prev => prev + 1);
            setTimers(prev => ({ ...prev, [orderNumber]: 0 }));
        }
        
    }
    
    useEffect(() => {
        Orders.forEach(order => {
            if (!timers[order.numberOrder]) {
                handleTimers(order.numberOrder);
            }
        });
    }, [Orders]);

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
                                <div className="KDS-timer">
                                    Time: {minutes}:{timers[order.numberOrder] || 0}
                                    </div>
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