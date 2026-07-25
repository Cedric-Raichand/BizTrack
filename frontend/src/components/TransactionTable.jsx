function TransactionTable({ transactions }) {

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

          <table className="w-full border-collapse">


            <thead>

              <tr className="border-b">


                <th className="text-left p-3">
                  Title
                </th>


                <th className="text-left p-3">
                  Type
                </th>


                <th className="text-left p-3">
                  Amount
                </th>


                <th className="text-left p-3">
                  Category
                </th>


              </tr>

            </thead>



            <tbody>


              {transactions.map((transaction) => (

                <tr
                  key={transaction._id}
                  className="border-b"
                >


                  <td className="p-3">
                    {transaction.title}
                  </td>


                  <td className="p-3">
                    {transaction.type}
                  </td>


                  <td className="p-3">
                    ₵{transaction.amount}
                  </td>


                  <td className="p-3">
                    {transaction.category}
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