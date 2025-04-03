export default function MobileHeader() {
  return (
    <div className="bg-gray-800 text-white px-4 py-1 flex items-center justify-between">
      <div className="flex items-center">
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">0:31</span>
      </div>
      <div className="flex items-center space-x-2 text-xs">
        <span>●●</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}
