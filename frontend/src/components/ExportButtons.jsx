import Papa from "papaparse";


function ExportButtons({ transactions }) {


  const exportCSV = () => {


    const csv = Papa.unparse(

      transactions.map((transaction) => ({

        Title: transaction.title,

        Type: transaction.type,

        Amount: transaction.amount,

        Category: transaction.category,

        Description: transaction.description,

        Date: new Date(
          transaction.createdAt
        ).toLocaleDateString(),

      }))

    );



    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;"
      }
    );



    const url = URL.createObjectURL(blob);



    const link = document.createElement("a");

    link.href = url;

    link.download = "biztrack-transactions.csv";

    link.click();


  };




  return (

    <button

      onClick={exportCSV}

      className="bg-purple-600 text-white px-5 py-3 rounded-lg"

    >

      Export CSV

    </button>

  );

}


export default ExportButtons;