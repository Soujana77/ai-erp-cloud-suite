export default function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
      
      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </h2>

    </div>
  );
}