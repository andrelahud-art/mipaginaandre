import { redirect } from "next/navigation";

// Simple authentication check
function checkAuth() {
  // In production, implement proper authentication
  const isAuthenticated = true; // Replace with real auth logic
  if (!isAuthenticated) {
    redirect("/");
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  checkAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Panel de Administración - André Lahud
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-500 hover:text-gray-700">
                Ver Sitio
              </a>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}