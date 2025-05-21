import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isPatientForm = location.pathname === "/patient-form";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-xl font-bold text-[#212529]">
                PatientsLite
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isPatientForm && (
              <Link
                to="/"
                className="text-[#6C757D] hover:text-[#212529] px-3 py-2 rounded-md text-base font-medium transition duration-150"
              >
                Dashboard
              </Link>
            )}
            {isDashboard && (
              <Link
                to="/patient-form"
                className="text-[#6C757D] hover:text-[#212529] px-3 py-2 rounded-md text-base font-medium transition duration-150"
              >
                New Patient
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
