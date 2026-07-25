import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useBusiness } from "../context/BusinessContext";

import API from "../api/axios";

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import FinanceChart from "../components/FinanceChart";
import TransactionTable from "../components/TransactionTable";
import ExportButtons from "../components/ExportButtons";
import ExportPDF from "../components/ExportPDF";

import { toast } from "react-toastify";



function Dashboard() {


  const { user } = useAuth();



  const {

    businesses,

    selectedBusiness,

    selectBusiness

  } = useBusiness();





  const [transactions,setTransactions] = useState([]);

  const [search,setSearch] = useState("");

  const [typeFilter,setTypeFilter] = useState("");

  const [periodFilter,setPeriodFilter] = useState("");








  useEffect(()=>{


    if(selectedBusiness){

      fetchTransactions();

    }


  },[
    selectedBusiness,
    typeFilter,
    periodFilter
  ]);










  const fetchTransactions = async()=>{


    try{


      let url =
      `/transactions?businessId=${selectedBusiness._id}`;



      if(typeFilter){

        url += `&type=${typeFilter}`;

      }



      if(periodFilter){

        url += `&period=${periodFilter}`;

      }




      const res = await API.get(url);




      setTransactions(

        res.data.transactions || []

      );




    }catch(error){


      console.log(error);


      toast.error(

        "Failed to load transactions"

      );


    }


  };









  const deleteTransaction = async(id)=>{


    if(
      !window.confirm(
        "Delete this transaction?"
      )
    ) return;





    try{


      await API.delete(

        `/transactions/${id}`

      );




      toast.success(

        "Transaction deleted successfully"

      );



      fetchTransactions();




    }catch(error){



      toast.error(

        error.response?.data?.message ||

        "Delete failed"

      );


    }


  };









  const filteredTransactions =

  transactions.filter((transaction)=>

    transaction.title

    .toLowerCase()

    .includes(

      search.toLowerCase()

    )

  );









  const totalIncome =

  filteredTransactions

  .filter(
    (t)=>t.type==="income"
  )

  .reduce(

    (sum,t)=>

    sum + Number(t.amount),

    0

  );








  const totalExpenses =

  filteredTransactions

  .filter(
    (t)=>t.type==="expense"
  )

  .reduce(

    (sum,t)=>

    sum + Number(t.amount),

    0

  );







  const balance =
  totalIncome-totalExpenses;





  const totalTransactions =
  filteredTransactions.length;









  return (


    <Layout>


      <div className="space-y-8">






        <div>


          <h1 className="text-3xl font-bold">

            Welcome, {user?.name}

          </h1>



          <p className="text-gray-500">

            {user?.email}

          </p>


        </div>









        <div className="bg-white shadow rounded-xl p-6">


          <h2 className="text-2xl font-bold mb-4">

            Select Business

          </h2>





          <select


            value={
              selectedBusiness?._id || ""
            }


            onChange={(e)=>{


              const business =

              businesses.find(

                (b)=>

                b._id === e.target.value

              );



              selectBusiness(business);


            }}


            className="border rounded-lg p-3 w-full"

          >



            <option value="">

              Select Business

            </option>




            {

            businesses.map((business)=>(


              <option

              key={business._id}

              value={business._id}

              >

                {business.businessName}


              </option>


            ))

            }


          </select>



        </div>









        {

        selectedBusiness && (


        <div className="bg-white shadow rounded-xl p-6">


          <h2 className="text-2xl font-bold mb-4">

            Business Information

          </h2>




          <div className="space-y-2">


            <p>

            <strong>Name:</strong>

            {" "}

            {selectedBusiness.businessName}

            </p>




            <p>

            <strong>Category:</strong>

            {" "}

            {selectedBusiness.category}

            </p>




            <p>

            <strong>Description:</strong>

            {" "}

            {selectedBusiness.description}

            </p>




            <p>

            <strong>Location:</strong>

            {" "}

            {selectedBusiness.location}

            </p>



          </div>


        </div>


        )

        }









        <div>


        <h2 className="text-2xl font-bold mb-5">

          Financial Summary

        </h2>





        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



        <SummaryCard

        title="Total Income"

        amount={totalIncome}

        />




        <SummaryCard

        title="Total Expenses"

        amount={totalExpenses}

        />




        <SummaryCard

        title="Balance"

        amount={balance}

        />




        <SummaryCard

        title="Transactions"

        amount={totalTransactions}

        prefix=""

        />



        </div>



        </div>









        <FinanceChart

        income={totalIncome}

        expense={totalExpenses}

        />









        <div className="flex gap-4 flex-wrap">



        <Link to="/create-business">


        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">


        Create Business


        </button>


        </Link>






        <Link to="/create-transaction">


        <button className="bg-green-600 text-white px-5 py-3 rounded-lg">


        Add Transaction


        </button>


        </Link>






        <ExportButtons

        transactions={filteredTransactions}

        />






        <ExportPDF

        transactions={filteredTransactions}

        business={selectedBusiness}

        />




        </div>









        <div className="grid md:grid-cols-3 gap-4">



        <input

        type="text"

        placeholder="Search..."

        value={search}

        onChange={(e)=>

        setSearch(e.target.value)

        }

        className="border rounded-lg p-3"

        />







        <select

        value={typeFilter}

        onChange={(e)=>

        setTypeFilter(e.target.value)

        }

        className="border rounded-lg p-3"

        >


        <option value="">

        All Types

        </option>


        <option value="income">

        Income

        </option>


        <option value="expense">

        Expense

        </option>


        </select>









        <select

        value={periodFilter}

        onChange={(e)=>

        setPeriodFilter(e.target.value)

        }

        className="border rounded-lg p-3"

        >


        <option value="">

        All Time

        </option>


        <option value="today">

        Today

        </option>


        <option value="month">

        This Month

        </option>


        <option value="year">

        This Year

        </option>


        </select>




        </div>









        <TransactionTable

        transactions={filteredTransactions}

        onDelete={deleteTransaction}

        />







      </div>


    </Layout>


  );


}



export default Dashboard;