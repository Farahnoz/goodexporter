import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

export const dynamic = 'force-dynamic'; // Safe

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-black text-neon text-center mb-12">CONTACT US</h1>
          <div className="bg-gray-900 p-10 rounded-xl border border-neon/20">
            <form className="space-y-6">
              <input type="text" placeholder="Your Name" className="w-full p-4 bg-black border border-neon/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon" required />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-black border border-neon/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon" required />
              <input type="tel" placeholder="Phone (with country code)" className="w-full p-4 bg-black border border-neon/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon" />
              <textarea placeholder="Message (include Stock ID if inquiring about a car)" rows={6} className="w-full p-4 bg-black border border-neon/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon" required />
              <button type="submit" className="w-full bg-neon text-black py-4 rounded-full font-bold text-lg hover:bg-white transition">SEND INQUIRY</button>
            </form>

            <div className="mt-10 text-center space-y-4">
              <p className="text-white text-lg font-semibold">Connect With Us</p>
              <div className="flex justify-center space-x-8">
                <a href="https://wa.me/818012345678" target="_blank" rel="noopener noreferrer" className="text-3xl text-green-500 hover:text-green-400 transition transform hover:scale-110" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
                <a href="https://instagram.com/goodexporter" target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-500 hover:text-pink-400 transition transform hover:scale-110" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com/goodexporter" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-500 transition transform hover:scale-110" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </div>
              <p className="text-gray-400 text-sm">Follow us for latest stock updates!</p>
            </div>

            <div className="mt-10 text-center space-y-2">
              <p className="text-neon"><strong>WhatsApp:</strong> <a href="https://wa.me/818012345678" className="underline">+81 80-1234-5678</a></p>
              <p className="text-white">Email: export@goodexporter.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}