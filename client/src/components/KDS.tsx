import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";
import type { OrderPOS } from "../assets/interfaces/types";

export default function KDS(){
    const [Orders, setOrders] = useState<OrderPOS[]>([]);
    const [timers, setTimers] = useState<Record<number, number>>({});
    const [minutes, setMinutes] = useState<number, number>({})

    useEffect(()=>{
        function handleOrders(newOrder: OrderPOS) {
            setOrders((allOrders)=> [...allOrders, newOrder]);
    }
    socket.on('order:new', handleOrders);
    return () => {
        socket.off('order:new', handleOrders);
    };
},[]);

const intervalRefs = useRef<Record<number, any>>({});

function handleTimers(orderNumber: number) {
    if (intervalRefs.current[orderNumber]) return;
    intervalRefs.current[orderNumber] = setInterval(() => {
        setTimers(prev => {
            const currentSeconds = prev[orderNumber] || 0;
            const nextSeconds = currentSeconds + 1;
            
            if (nextSeconds === 60) {
                setMinutes(prevMins => ({...prevMins, [orderNumber]: (prevMins[orderNumber] || 0) + 1}));
                setTimers(prev => ({ ...prev, [orderNumber]: 0 }));
            }

            return { ...prev, [orderNumber]: nextSeconds };
        });
    }, 1000);
}

useEffect(() => {
    return () => {
        Object.values(intervalRefs.current).forEach(clearInterval);
    };
}, []);


    
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
                <h1>Grill Orders</h1>
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
                                    Time: {minutes[order.numberOrder] || 0}:{timers[order.numberOrder] || 0}
                                    </div>
                            </div>
                        ))}
                    </div>
                    )) : <h1 className="not-yet">No orders yet...</h1>
                }
            </div>
        </div>
        </>
    )
}