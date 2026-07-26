import { useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import { useBusiness } from "../context/BusinessContext";

import { MdAdd, MdCheckCircle } from "react-icons/md";


function Businesses() {


  const {

    businesses,

    selectedBusiness,

    selectBusiness,

    fetchBusinesses


  } = useBusiness();





  useEffect(()=>{

    fetchBusinesses();

  },[]);







  return (

    <Layout>


      <div className="space-y-6">



        <div className="flex justify-between items-center">


          <div>

            <h1 className="text-3xl font-bold">

              Businesses

            </h1>


            <p className="text-gray-500">

              Manage your businesses

            </p>


          </div>





          <Link

          to="/create-business"

          >

            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">


              <MdAdd size={22}/>

              Create Business


            </button>


          </Link>


        </div>









        {

        businesses.length === 0 ? (


          <div className="bg-white rounded-xl shadow p-8 text-center">


            <p className="text-gray-500 mb-4">

              No businesses created yet.

            </p>



            <Link to="/create-business">


              <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">

                Create your first business

              </button>


            </Link>


          </div>


        )

        :


        (



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">





        {

        businesses.map((business)=>(


          <div

          key={business._id}

          className="bg-white shadow rounded-xl p-6"

          >



            <h2 className="text-xl font-bold">

              {business.businessName}

            </h2>



            <p className="text-gray-500 mt-2">

              {business.category}

            </p>



            <p className="mt-3">

              📍 {business.location}

            </p>



            <p className="text-gray-600 mt-2">

              {business.description}

            </p>







            {

            selectedBusiness?._id === business._id && (


              <div className="flex items-center gap-2 text-green-600 font-semibold mt-4">


                <MdCheckCircle/>

                Current Business


              </div>


            )

            }








            <button


            onClick={()=>selectBusiness(business)}


            className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"


            >


              Select Business


            </button>





          </div>


        ))


        }



        </div>


        )

        }




      </div>


    </Layout>


  );

}


export default Businesses;