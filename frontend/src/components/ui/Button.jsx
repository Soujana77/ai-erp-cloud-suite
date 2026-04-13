export default function Button({ text }) {
  return (
    <button className="w-full bg-secondary text-white py-2 rounded-lg hover:opacity-90 transition font-medium">
      {text}
    </button>
  );
}