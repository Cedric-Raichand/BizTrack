import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Dashboard = () => {

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

      <h1>Welcome {user?.name}</h1>

      <p>{user?.email}</p>

      <hr />

      <h2>Business Information</h2>

      {business ? (

        <pre>{JSON.stringify(business, null, 2)}</pre>

      ) : (

        <p>No business found.</p>

      )}

      <button onClick={logout}>
        Logout
      </button>

    </div>

  );

};

export default Dashboard;