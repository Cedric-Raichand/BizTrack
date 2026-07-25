import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
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


  const [business, setBusiness] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);



  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [periodFilter, setPeriodFilter] = useState("");






  useEffect(() => {

    fetchDashboardData();

  }, []);





  useEffect(() => {

    if (!loading) {

      fetchTransactions();

    }

  }, [typeFilter, periodFilter]);







  const fetchDashboardData = async () => {

    try {


      await fetchBusiness();

      await fetchTransactions();



    } finally {


      setLoading(false);


    }

  };







  const fetchBusiness = async () => {

    try {


      const res = await API.get("/business");


      setBusiness(res.data);



    } catch(error) {


      console.log(error);


    }

  };









  const fetchTransactions = async () => {

    try {


      let url = "/transactions?";



      if(typeFilter){

        url += `type=${typeFilter}&`;

      }



      if(periodFilter){

        url += `period=${periodFilter}`;

      }





      const res = await API.get(url);



      setTransactions(

        res.data.transactions || []

      );



    } catch(error) {


      console.log(error);



      toast.error(
        "Failed to load transactions"
      );


    }

  };









  const deleteTransaction = async (id) => {


    if(!window.confirm("Delete this transaction?"))

      return;



    try {


      await API.delete(

        `/transactions/${id}`

      );



      toast.success(

        "Transaction deleted successfully"

      );



      fetchTransactions();



    } catch(error) {


      toast.error(

        error.response?.data?.message ||

        "Delete failed"

      );


    }

  };









  const filteredTransactions = transactions.filter(

    (transaction) =>

      transaction.title

      .toLowerCase()

      .includes(search.toLowerCase())

  );







  const totalIncome = filteredTransactions

    .filter((t)=>t.type==="income")

    .reduce(

      (sum,t)=>sum + Number(t.amount),

      0

    );






  const totalExpenses = filteredTransactions

    .filter((t)=>t.type==="expense")

    .reduce(

      (sum,t)=>sum + Number(t.amount),

      0

    );






  const balance = totalIncome - totalExpenses;


  const totalTransactions = filteredTransactions.length;








  if(loading){


    return (

      <Layout>

        <div className="flex justify-center items-center h-64">

          <h2 className="text-xl font-semibold">

            Loading dashboard...

          </h2>

        </div>


      </Layout>

    );


  }









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

            Business Information

          </h2>





          {

          business ? (


            <div className="space-y-2">


              <p>

                <strong>Name:</strong> {business.businessName}

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



            <div className="text-center py-6">


              <h3 className="text-xl font-semibold mb-2">

                No business profile yet

              </h3>



              <p className="text-gray-500 mb-4">

                Create your business profile to start tracking your finances.

              </p>




              <Link to="/create-business">


                <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">

                  Create Business

                </button>


              </Link>


            </div>


          )

          }


        </div>









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

            business={business}

          />



        </div>









        <div className="grid md:grid-cols-3 gap-4">



          <input

            type="text"

            placeholder="Search..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="border rounded-lg p-3"

          />





          <select

            value={typeFilter}

            onChange={(e)=>setTypeFilter(e.target.value)}

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

            onChange={(e)=>setPeriodFilter(e.target.value)}

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









        {

        filteredTransactions.length === 0 ? (



          <div className="bg-white shadow rounded-xl p-8 text-center">


            <h3 className="text-xl font-semibold mb-2">

              No transactions yet

            </h3>



            <p className="text-gray-500 mb-4">

              Start adding income and expenses to track your business performance.

            </p>





            <Link to="/create-transaction">


              <button className="bg-green-600 text-white px-5 py-3 rounded-lg">


                Add Transaction


              </button>


            </Link>



          </div>



        ) : (



          <TransactionTable

            transactions={filteredTransactions}

            onDelete={deleteTransaction}

          />


        )


        }



      </div>


    </Layout>


  );

}



export default Dashboard;