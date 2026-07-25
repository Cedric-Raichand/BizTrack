import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import API from "../api/axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";


function TransactionDetails() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [transaction, setTransaction] = useState(null);

  const [loading, setLoading] = useState(true);






  useEffect(() => {

    fetchTransaction();

  }, []);







  const fetchTransaction = async () => {


    try {


      const res = await API.get(
        `/transactions/${id}`
      );


      setTransaction(res.data);



    } catch (error) {


      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Failed to load transaction"
      );


    } finally {


      setLoading(false);


    }


  };









  if (loading) {


    return (

      <Layout>

        <div className="text-center p-10">

          Loading transaction...

        </div>


      </Layout>

    );

  }








  if (!transaction) {


    return (

      <Layout>


        <div className="text-center p-10">


          Transaction not found


        </div>


      </Layout>

    );

  }









  return (

    <Layout>


      <div className="max-w-xl mx-auto">


        <div className="bg-white shadow rounded-xl p-8">



          <h1 className="text-3xl font-bold mb-6">

            Transaction Details

          </h1>






          <div className="space-y-4">



            <p>

              <strong>ID:</strong>{" "}

              {transaction._id}

            </p>





            <p>

              <strong>Title:</strong>{" "}

              {transaction.title}

            </p>







            <p>

              <strong>Type:</strong>{" "}


              <span

              className={

                transaction.type === "income"

                ?

                "text-green-600 font-semibold"

                :

                "text-red-600 font-semibold"

              }

              >

                {transaction.type}

              </span>


            </p>







            <p>

              <strong>Amount:</strong>{" "}


              ₵

              {Number(transaction.amount)
              .toLocaleString("en-US")}


            </p>







            <p>

              <strong>Category:</strong>{" "}

              {transaction.category}


            </p>







            <p>

              <strong>Description:</strong>{" "}


              {transaction.description || "No description"}


            </p>







            <p>

              <strong>Date:</strong>{" "}


              {new Date(transaction.createdAt)
              .toLocaleDateString()}


            </p>



          </div>









          <div className="flex gap-4 mt-8">



            <Link

              to={`/edit-transaction/${transaction._id}`}

            >


              <button

              className="bg-blue-600 text-white px-5 py-2 rounded-lg"

              >

                Edit

              </button>



            </Link>







            <button


            onClick={() => navigate(-1)}


            className="bg-gray-700 text-white px-5 py-2 rounded-lg"


            >

              Back


            </button>



          </div>





        </div>


      </div>


    </Layout>

  );

}



export default TransactionDetails;