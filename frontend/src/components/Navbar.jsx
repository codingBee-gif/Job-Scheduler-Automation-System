import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black text-white flex items-center justify-center font-bold">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Dotix Job Scheduler
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            to="/create"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Create Job
          </Link>
        </nav>
      </div>
    </header>
  );
}
