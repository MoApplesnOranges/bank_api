export default function AccountBadge({ type }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        type === 'Checking'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-purple-100 text-purple-700'
      }`}
    >
      {type}
    </span>
  );
}
