import HeroBanner from "../components/HeroBanner";
import StatsRow from "../components/StatsRow";
import ActionCards from "../components/ActionCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10 page-animate">
      <div className="w-full max-w-4xl space-y-10">
        <HeroBanner />
        <StatsRow />
        <ActionCards />

        <p className="text-center text-xs text-gray-500">
          Powered by AI moderation (with fallback)
        </p>
      </div>
    </div>
  );
}
