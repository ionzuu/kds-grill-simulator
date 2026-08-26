export default function POS() {
  return (
    <div className="POS">
      <div className="grid-POS">
        <div className="grid-item">
          <div className="Receipt">
            <div className="grid-receipt">
              <div className="grid-item">Order #___</div>
              <div className="grid-item">Order details</div>
              <div className="grid-item">Total: </div>
              <div className="grid-item"><button>Place Order</button></div>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="Menu">
            <div className="grid-menu">
              <div className="grid-item">
                <div className="MenuItem">
                  <button>Single SteakBurger</button>
                  <button>Double SteakBurger</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
