import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await API.get("/business");
        setBusiness(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusiness();
  }, []);

  return (
    <div>
      <h1>Welcome {user?.name}</h1>

      <p>{user?.email}</p>

      <hr />

      <h2>Business Information</h2>

      {business ? (
        <div>
          <h3>{business.businessName}</h3>

          <p>
            <strong>Category:</strong> {business.category}
          </p>

          <p>
            <strong>Description:</strong> {business.description}
          </p>

          <p>
            <strong>Location:</strong> {business.location}
          </p>
        </div>
      ) : (
        <div>
          <p>No business found.</p>

          <button onClick={() => navigate("/create-business")}>
            Create Business
          </button>
        </div>
      )}

      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;