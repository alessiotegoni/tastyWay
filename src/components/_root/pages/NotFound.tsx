import Navbar from "@/components/shared/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="hero">
      <Navbar />
      <main className="not-found">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-gray-100 tracking-widest">
            404
          </h1>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p
              className="px-1 rounded-md text-2xl font-semibold bg-gray-500
               text-gray-100"
            >
              Pagina non trovata
            </p>
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-100">
          Oops! La pagina che stai cercando non esiste.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Torna alla home
          </Link>
        </div>
        <div className="mb-2 mt-7 flex justify-center space-x-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
}
