
import type { GenericFormState } from '../../types/forms'

const ThankYouPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-[1600px]">
        <div className="relative rounded-2xl">
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" 
               style={{ padding: '1px' }}>
            <div className="absolute inset-0 rounded-2xl bg-black" style={{ margin: '1px' }}></div>
          </div>
          
          {/* Main Content */}
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col items-center justify-center text-center gap-8 py-12">
              {/* Success Icon */}
              <div className="text-6xl mb-4">✨</div>
              
              {/* Thank You Message */}
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Vielen Dank für Ihre Anfrage!
              </h2>
              
              <p className="text-gray-400 max-w-2xl">
                Wir haben Ihre Projektanfrage erfolgreich erhalten und werden uns zeitnah mit Ihnen in Verbindung setzen. 
                Unser Team freut sich darauf, Ihr Projekt kennenzulernen und Sie bestmöglich zu unterstützen.
              </p>

              {/* What's Next Section */}
              <div className="mt-8 text-left w-full max-w-2xl">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Die nächsten Schritte:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500">1.</span>
                    <p className="text-gray-300">Wir prüfen Ihre Anfrage und bereiten ein individuelles Angebot vor</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500">2.</span>
                    <p className="text-gray-300">Sie erhalten innerhalb von 24-48 Stunden eine Antwort von unserem Team</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500">3.</span>
                    <p className="text-gray-300">Wir vereinbaren ein kostenloses Beratungsgespräch zur Detailbesprechung</p>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-gray-400">
                <p>Bei Fragen erreichen Sie uns unter:</p>
                <a href="mailto:info@it-techvision.de" className="text-blue-400 hover:text-blue-300 transition-colors">
                  info@it-techvision.de
                </a>
              </div>

              {/* Back to Home Button */}
              <button 
                onClick={() => router.push('/')}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white hover:opacity-90 transition-opacity"
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 