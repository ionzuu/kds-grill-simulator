import { useState } from "react";
import POS from "./POS";

export default function roleSelection() {
  const [role, setRole] = useState<string>('');

  if (role === 'POS') {
    return <POS/>
  } else if (role === 'KDS') {
    return <KDS />
  }

    return(
        <div className="Modalrole">
            <div className="top-button">
                <button onClick={() => setRole('POS')}>Order taker</button>
            </div>
            <div className="bottom-button">
                <button onClick={() => setRole('KDS')}>KDS</button>
            </div>
        </div>
    )
}
