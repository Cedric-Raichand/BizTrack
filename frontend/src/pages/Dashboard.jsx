import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import API from "../api/axios";


const Dashboard = () => {


  const { user, logout } = useAuth();

  const navigate = useNavigate();


  const [business, setBusiness] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const fetchBusiness = async () => {


      try {


        const response = await API.get("/business");


        setBusiness(response.data);



      } catch(error){


        console.log(
          error.response?.data || error.message
        );


      } finally {


        setLoading(false);


      }


    };


    fetchBusiness();


  }, []);




  if(loading){

    return (
      <h2>
        Loading dashboard...
      </h2>
    );

  }




  return (

    <div>


      <h1>
        Welcome {user?.name}
      </h1>


      <p>
        Email: {user?.email}
      </p>


      <hr />


      <h2>
        Business Information
      </h2>




      {
        business ?


        (

          <div>

            <h3>
              {business.businessName}
            </h3>


            <p>
              Category: {business.category}
            </p>


            <p>
              Location: {business.location}
            </p>


            <p>
              Description: {business.description}
            </p>


          </div>


        )


        :


        (

          <div>

            <p>
              You have not created a business yet.
            </p>


            <button
              onClick={() => navigate("/create-business")}
            >
              Create Business
            </button>


          </div>


        )

      }



      <br />


      <button onClick={logout}>
        Logout
      </button>



    </div>

  );

};


export default Dashboard;