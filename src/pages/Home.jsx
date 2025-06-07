import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Home() {

  const [user, setUser] = useState(null);
  return (
   
      

      <main className="pt-20 bg-gray-100 w-full">
      <div className="max-w-2xl mx-auto p-6 border rounded shadow-lg bg-white mb-4">
        <h2 className="text-2xl font-bold mb-4">Home Page</h2>
        <p className="text-gray-700">Welcome to the home page!</p>
      </div>

      <div className="max-w-2xl mx-auto p-6 border rounded shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Another Section</h2>
        <p className="text-gray-700">This is another section below the header.</p>
      </div>
    </main>

  
  );
}
