import StatBadge from "./StatBadge";

export default function RequestCard({
  image,
  title,
  tag,
  flexValue,
  onFund,
}) {
  return (
    <div
      className="
        group bg-white rounded-2xl shadow-md
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        animate-fade-in
      "
    >
      {/* Image */}
      {image && (
        <div className="relative h-40 w-full overflow-hidden bg-gray-100">
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
      <div className="p-5">
        {/* Top row: tag + badges */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600">
            #{tag}
          </span>

          <div className="flex items-center gap-2">
            <StatBadge type="ai" />
            <StatBadge type="flex" value={flexValue} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
          {title}
        </h3>

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFund();
          }}
          className="
            mt-5 w-full py-2.5 rounded-xl
            bg-gradient-to-r from-yellow-400 to-yellow-300
            text-black font-semibold text-sm
            transition-all duration-300
            hover:from-yellow-300 hover:to-yellow-200
            hover:scale-[1.03]
            focus:outline-none focus:ring-2 focus:ring-yellow-400/50
          "
        >
          Fund This
        </button>
      </div>
    </div>
  );
}
