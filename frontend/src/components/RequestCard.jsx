export default function RequestCard({
  image,
  title,
  tag,
  flexValue,
  onFund,
}) {
  // 🎨 Tailwind-first flex styling
  const flexStyle =
    flexValue >= 70
      ? "bg-red-500/10 text-red-600 ring-1 ring-red-500/30"
      : flexValue >= 40
      ? "bg-yellow-400/10 text-yellow-700 ring-1 ring-yellow-400/30"
      : "bg-green-500/10 text-green-600 ring-1 ring-green-500/30";

  return (
    <div
      className="
        group bg-white rounded-2xl shadow-sm
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        animate-fade-in
      "
    >
      {/* Image */}
      {image && (
        <div className="relative h-36 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Top meta */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600">
            #{tag}
          </span>

          <div className="flex items-center gap-2">
            {/* AI badge */}
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30">
              <span className="text-sm">✔</span>
              AI Verified
            </span>

            {/* Flex badge */}
            <span
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${flexStyle}`}
            >
              ⚡ {flexValue}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFund();
          }}
          className="
            mt-4 w-full py-2 rounded-xl
            bg-gradient-to-r from-yellow-400 to-yellow-300
            text-black font-semibold text-sm
            transition-all duration-300
            hover:from-yellow-300 hover:to-yellow-200
            hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-yellow-400/50
          "
        >
          FUND
        </button>
      </div>
    </div>
  );
}
