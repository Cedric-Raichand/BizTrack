import { Link } from "react-router-dom";


function TransactionTable({
  transactions,
  onDelete
}) {


  return (

    <div className="bg-white shadow rounded-xl p-6">


      <h2 className="text-2xl font-bold mb-5">
        Transactions
      </h2>



      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transactions yet.
        </p>


      ) : (


        <div className="overflow-x-auto">


          <table className="w-full">


            <thead>

              <tr className="border-b">


                <th className="p-3 text-left">
                  Title
                </th>


                <th className="p-3 text-left">
                  Type
                </th>


                <th className="p-3 text-left">
                  Amount
                </th>


                <th className="p-3 text-left">
                  Category
                </th>


                <th className="p-3 text-left">
                  Actions
                </th>


              </tr>


            </thead>





            <tbody>


              {transactions.map((transaction)=>(


                <tr

                  key={transaction._id}

                  className="border-b"

                >



                  <td className="p-3">

                    {transaction.title || "No title"}

                  </td>





                  <td className="p-3">


                    <span

                      className={

                        transaction.type === "income"

                        ?

                        "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                        :

                        "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

                      }

                    >

                      {transaction.type}


                    </span>


                  </td>







                  <td className="p-3 font-semibold">


                    ₵

                    {Number(transaction.amount)

                    .toLocaleString("en-US")}


                  </td>







                  <td className="p-3">

                    {transaction.category || "N/A"}

                  </td>









                  <td className="p-3 space-x-2">





                    <Link

                      to={`/edit-transaction/${transaction._id}`}

                    >


                      <button

                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"

                      >

                        Edit


                      </button>



                    </Link>








                    <button


                      onClick={() =>

                        onDelete(transaction._id)

                      }


                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"


                    >

                      Delete


                    </button>





                  </td>





                </tr>



              ))}



            </tbody>




          </table>



        </div>


      )}



    </div>


  );

}



export default TransactionTable;