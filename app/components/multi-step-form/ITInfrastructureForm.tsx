
import type { GenericFormState } from '../../types/forms'


const ITInfrastructureForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<GenericFormState>({
    infrastructureType: '',
    currentSetup: '',
    services: [],
    budget: '',
    timeline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    message: ''
  });

  useEffect(() => {
    emailjs.init("6fXBwYJzy9W58xeK3");
  }, []);

  const steps = {
    1: {
      title: "Art der IT-Infrastruktur",
      description: "Welche Art von IT-Infrastruktur benötigen Sie?",
      field: 'infrastructureType',
      options: [
        { icon: '🖥️', name: 'Server', value: 'server', gradient: "from-purple-500 to-blue-500" },
        { icon: '☁️', name: 'Cloud-Lösungen', value: 'cloud', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔒', name: 'Sicherheitslösungen', value: 'security', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📡', name: 'Netzwerklösungen', value: 'network', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    2: {
      title: "Aktuelle IT-Umgebung",
      description: "Beschreiben Sie Ihre aktuelle IT-Umgebung",
      field: 'currentSetup',
      options: [
        { icon: '🏢', name: 'On-Premise', value: 'on-premise', gradient: "from-purple-500 to-blue-500" },
        { icon: '☁️', name: 'Cloud-basiert', value: 'cloud-based', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔄', name: 'Hybrid', value: 'hybrid', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    3: {
      title: "Benötigte Dienstleistungen",
      description: "Welche Dienstleistungen benötigen Sie?",
      field: 'services',
      multiSelect: true,
      options: [
        { icon: '🔧', name: 'Wartung', value: 'maintenance', gradient: "from-purple-500 to-blue-500" },
        { icon: '🛡️', name: 'Sicherheitsüberwachung', value: 'security_monitoring', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📊', name: 'Beratung', value: 'consulting', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    4: {
      title: "Kontaktdaten",
      description: "Ihre Kontaktdaten für ein individuelles Angebot",
      field: 'contact',
      isContactForm: true
    }
  };

  const handleNext = () => {
    if (currentStep < Object.keys(steps).length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/offer'); // Zurück zur OfferPage
    }
  };

  const handleSubmit = async () => {
    try {
      const emailContent = formatFormDataForEmail(formData);
      
      const templateParams = {
        to_name: "IT-TechVision",
        to_email: "info@it-techvision.de",
        from_name: formData.contactName || 'Nicht angegeben',
        from_email: formData.contactEmail || 'Nicht angegeben',
        phone: formData.contactPhone || 'Nicht angegeben',
        company: formData.companyName || 'Nicht angegeben',
        message: formData.message || 'Keine zusätzliche Nachricht',
        project_details: emailContent,
        reply_to: formData.contactEmail || 'info@it-techvision.de'
      };

      const response = await emailjs.send(
        'service_p6sv0tm',
        'template_nxs2n0e',
        templateParams,
        '6fXBwYJzy9W58xeK3'
      );

      if (response.status === 200) {
        router.push('/thank-you');
      } else {
        throw new Error(`Unerwarteter Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@it-techvision.de');
    }
  };

  const currentStepData = steps[currentStep];
  const selectedValue = formData[currentStepData.field];

  const handleSelect = (value) => {
    if (currentStepData.multiSelect) {
      setFormData({
        ...formData,
        [currentStepData.field]: formData[currentStepData.field].includes(value)
          ? formData[currentStepData.field].filter((v) => v !== value)
          : [...formData[currentStepData.field], value]
      });
    } else {
      setFormData({ ...formData, [currentStepData.field]: value });
    }
  };

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
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-400 mt-2">
                  {currentStepData.description}
                </p>
              </div>

              {/* Entweder Options Grid oder Kontaktformular */}
              {currentStepData.isContactForm ? (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Ihr vollständiger Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">E-Mail *</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="ihre@email.de"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Unternehmen</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Name Ihres Unternehmens"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Nachricht</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[140px]"
                      placeholder="Weitere Informationen oder Anmerkungen zu Ihrem Projekt..."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {currentStepData.options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`group relative rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedValue === option.value ? 'bg-blue-500/10' : 'bg-gray-800/50'
                      }`}
                    >
                      {/* Gradient Border */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.gradient} transition-opacity duration-300
                        ${selectedValue === option.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                         style={{ padding: '1px' }}>
                        <div className="absolute inset-0 rounded-xl bg-gray-900" style={{ margin: '1px' }}></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-gray-800/50 rounded-xl">
                        <span className="text-3xl mb-2">{option.icon}</span>
                        <span className="text-sm font-medium">{option.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button 
                  onClick={handleBack}
                  className="px-8 py-3 border border-blue-500 rounded-xl text-blue-500 hover:bg-blue-500/10 transition-colors"
                >
                  Zurück
                </button>
                <button 
                  onClick={handleNext}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white transition-all duration-300 ${
                    currentStepData.isContactForm 
                      ? (formData.contactName && formData.contactEmail ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed')
                      : (selectedValue ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed')
                  }`}
                  disabled={currentStepData.isContactForm ? !(formData.contactName && formData.contactEmail) : !selectedValue}
                >
                  {currentStep === Object.keys(steps).length ? 'Absenden' : 'Weiter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITInfrastructureForm; 