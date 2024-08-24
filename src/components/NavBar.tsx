export function NavBar() {
    return (
      <div>
        <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 via-purple-800 to-purple-900 shadow-md">
          <a className="text-2xl font-bold text-white" href="#">
            Navbar
          </a>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
              About
            </a>
            <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
              Contact
            </a>
          </div>
        </nav>
      </div>
    );
  }
  