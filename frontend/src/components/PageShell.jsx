export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
