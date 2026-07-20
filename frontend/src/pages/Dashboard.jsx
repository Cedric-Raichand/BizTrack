import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";


function Dashboard() {

  const { user, logout } = useAuth();

  const [business, setBusiness] = useState(null);
  const [transactions, setTransactions] = useState([]);



  useEffect(() => {

    fetchBusiness();
    fetchTransactions();

  }, []);




  const fetchBusiness = async () => {

    try {

      const res = await API.get("/business");

      setBusiness(res.data);

    } catch(error){

      console.log(error);

    }

  };





  const fetchTransactions = async () => {

    try {

      const res = await API.get("/transactions");

      setTransactions(res.data.transactions);

    } catch(error){

      console.log(error);

    }

  };





  const deleteTransaction = async (id) => {

    try {

      await API.delete(`/transactions/${id}`);

      alert("Transaction deleted");

      fetchTransactions();


    } catch(error){

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };





  const totalIncome = transactions
    .filter(
      transaction => transaction.type === "income"
    )
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );



  const totalExpense = transactions
    .filter(
      transaction => transaction.type === "expense"
    )
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );



  const balance = totalIncome - totalExpense;





  return (

    <div>


      <h1>
        Welcome, {user?.name}
      </h1>


      <p>
        {user?.email}
      </p>


      <hr />


      <h2>
        Business Information
      </h2>



      {business ? (

        <div>

          <p>
            <b>Name:</b> {business.businessName}
          </p>

          <p>
            <b>Category:</b> {business.category}
          </p>

          <p>
            <b>Location:</b> {business.location}
          </p>

        </div>


      ) : (

        <p>
          No business found.
        </p>

      )}




      <hr />



      <h2>
        Financial Summary
      </h2>


      <p>
        Total Income: ₵{totalIncome}
      </p>


      <p>
        Total Expenses: ₵{totalExpense}
      </p>


      <p>
        Balance: ₵{balance}
      </p>




      <hr />



      <Link to="/create-business">

        <button>
          Create Business
        </button>

      </Link>


      {" "}


      <Link to="/create-transaction">

        <button>
          Add Transaction
        </button>

      </Link>


      {" "}


      <button onClick={logout}>
        Logout
      </button>



      <hr />



      <h2>
        Transactions
      </h2>



      {
        transactions.length === 0 ? (

          <p>
            No transactions yet.
          </p>


        ) : (


          <table border="1" cellPadding="8">

            <thead>

              <tr>

                <th>Title</th>

                <th>Type</th>

                <th>Amount</th>

                <th>Category</th>

                <th>Action</th>

              </tr>


            </thead>



            <tbody>


            {
              transactions.map(transaction => (

                <tr key={transaction._id}>


                  <td>
                    {transaction.title}
                  </td>


                  <td>
                    {transaction.type}
                  </td>


                  <td>
                    ₵{transaction.amount}
                  </td>


                  <td>
                    {transaction.category}
                  </td>


                  <td>

                    <button
                      onClick={() =>
                        deleteTransaction(transaction._id)
                      }
                    >

                      Delete

                    </button>


                  </td>


                </tr>

              ))
            }


            </tbody>


          </table>


        )
      }



    </div>

  );

}


export default Dashboard;