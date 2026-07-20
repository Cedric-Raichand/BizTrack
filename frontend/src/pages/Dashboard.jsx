import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function Dashboard() {
  const { user, logout } = useAuth();

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
      <h1>Welcome, {user?.name}</h1>

      <p>{user?.email}</p>

      <hr />

      <h2>Business Information</h2>

      {business ? (
        <div>
          <p>
            <strong>Business Name:</strong> {business.businessName}
          </p>

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
        <p>No business found.</p>
      )}

      <hr />

      <Link to="/create-business">
        <button>Create Business</button>
      </Link>

      {" "}

      <Link to="/create-transaction">
        <button>Add Transaction</button>
      </Link>

      {" "}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;