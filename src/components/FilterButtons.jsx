export default function FilterButtons({ current, onChange }) {
    return (
      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'pending'].map((status) => (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`px-3 py-1 rounded ${
              current === status
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    );
  }
  