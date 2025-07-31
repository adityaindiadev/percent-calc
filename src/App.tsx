import React from 'react';
import './index.css';
import Header from './components/Header';
import SimpleCalculator from './components/SimpleCalculator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-4 md:py-8 pb-24 md:pb-8">
        <Header />
        <main className="mt-4 md:mt-8">
          <SimpleCalculator />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App; 