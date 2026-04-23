import { Modal } from 'bootstrap';

const Checkout = ({ user }) => {

    const getPrice = (plan) => {
        switch (plan) {
            case 'Daily': return 120;
            case 'Weekly': return 800;
            case 'Monthly': return 3000;
            default: return 0;
        }
    };

    const price = getPrice(user.plan);
    const discount = 50; 
    const finalTotal = price > 0 ? price - discount : 0;

    const handlePay = () => {
        const modalElement = document.getElementById('paymentModal');
        const paymentModal = new Modal(modalElement);
        paymentModal.show();
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Secure Checkout</h2>
            <div className="row g-5">

                <div className="col-md-7">
                    <h4 className="mb-3">Billing Details</h4>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={user.name} readOnly />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Plan Selected</label>
                            <input type="text" className="form-control" value={user.plan} readOnly />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" placeholder="Delivery Address" />
                        </div>
                    </form>
                </div>

                <div className="col-md-5">
                    <div className="card bg-light border-0 rounded-3 p-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-success">Your Order</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">{user.plan} Plan</h6>
                                    <small className="text-muted">Standard Tiffin</small>
                                </div>
                                <span className="text-muted">₹{price}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-accent">
                                    <h6 className="my-0">Promo Code</h6>
                                    <small>URBAN50</small>
                                </div>
                                <span className="text-accent">-₹{discount}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (INR)</span>
                                <strong>₹{finalTotal}</strong>
                            </li>
                        </ul>
                        <button className="w-100 btn btn-success btn-lg" type="button" onClick={handlePay}>
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="paymentModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Scan to Pay</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-3">Total Amount: <strong>₹{finalTotal}</strong></p>


                            <img
                                src="/paymentQr.jpg"
                                alt="UPI QR Code"
                                className="img-fluid border p-2 rounded"
                                style={{ maxWidth: "250px" }}
                            />

                            <p className="text-muted mt-3 small">Scan with GPay, PhonePe, or Paytm</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Checkout;