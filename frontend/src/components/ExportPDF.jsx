import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function ExportPDF({
  transactions,
  business
}) {


  const generatePDF = () => {


    const doc = new jsPDF();



    const income = transactions

      .filter(
        (transaction) =>
          transaction.type === "income"
      )

      .reduce(
        (sum, transaction) =>
          sum + Number(transaction.amount),
        0
      );



    const expenses = transactions

      .filter(
        (transaction) =>
          transaction.type === "expense"
      )

      .reduce(
        (sum, transaction) =>
          sum + Number(transaction.amount),
        0
      );



    const balance = income - expenses;




    // Title

    doc.setFontSize(20);

    doc.text(
      "BizTrack Financial Report",
      14,
      20
    );



    doc.setFontSize(12);


    doc.text(
      `Business: ${
        business?.businessName || "N/A"
      }`,
      14,
      35
    );


    doc.text(
      `Generated: ${
        new Date().toLocaleDateString()
      }`,
      14,
      45
    );




    // Summary

    doc.text(
      `Total Income: $${income}`,
      14,
      60
    );


    doc.text(
      `Total Expenses: $${expenses}`,
      14,
      70
    );


    doc.text(
      `Balance: $${balance}`,
      14,
      80
    );





    // Transaction table

    autoTable(doc, {

      startY: 95,

      head: [
        [
          "Date",
          "Title",
          "Type",
          "Amount",
          "Category"
        ]
      ],


      body: transactions.map(
        (transaction) => [

          new Date(
            transaction.createdAt
          )
          .toISOString()
          .split("T")[0],


          transaction.title,


          transaction.type,


          `$${transaction.amount}`,


          transaction.category

        ]
      )

    });





    doc.save(
      "biztrack-report.pdf"
    );

  };





  return (

    <button

      onClick={generatePDF}

      className="bg-red-600 text-white px-5 py-3 rounded-lg"

    >

      Export PDF

    </button>

  );

}


export default ExportPDF;