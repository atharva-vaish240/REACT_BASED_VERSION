import { useNavigate } from 'react-router-dom';
const Dashboard = ({ user, setUser }) => {
    const navigate = useNavigate();

    const Logout = () => {
        setUser({
            name: 'Guest',
            plan: 'Monthly',
            phone: ''
        });
        navigate('/');
    };
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" width="100" className="mb-3" />
                            <h4 className="fw-bold">{user.name}</h4>
                            <p className="text-muted">Plan: <span className="badge bg-accent">{user.plan}</span></p>

                            <div className="d-grid">
                                <button className="btn btn-outline-danger" onClick={Logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Subscription Status</h5>
                            <p className="mb-1">Active Plan: <strong>{user.plan} Subscription</strong></p>
                            <div className="progress mb-3" style={{ height: "20px" }}>
                                <div className="progress-bar bg-success" style={{ width: "30%" }}>30%</div>
                            </div>
                            <p className="small text-muted">Just started! Enjoy your meals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;