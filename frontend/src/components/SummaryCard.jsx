function SummaryCard({ title, amount, prefix = "₵" }) {

  return (

    <div className="bg-white shadow rounded-xl p-6">

      <h3 className="text-gray-500 text-sm font-medium">

        {title}

      </h3>

      <p className="text-3xl font-bold mt-3">

        {prefix}{amount}

      </p>

    </div>

  );

}

export default SummaryCard;