import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic'; // Safe

export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'Browse & Choose', desc: 'Select from 100+ inspected Japanese & Korean used cars' },
    { num: '2', title: 'Pay Deposit', desc: 'Secure your car with 10% deposit — refundable if not satisfied' },
    { num: '3', title: 'Inspection & Export', desc: 'We handle full inspection, documents, and loading' },
    { num: '4', title: 'Door to Door', desc: 'Shipped to your country — customs cleared — delivered' },
  ];

  return (
    <>
      <Header />
      <main className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black text-neon text-center mb-16">HOW IT WORKS</h1>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-neon text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}