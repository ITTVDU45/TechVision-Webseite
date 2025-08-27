
import type { WorkflowAutomationFormState } from '../../types/forms'


const WorkflowAutomationForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState<WorkflowAutomationFormState>({
    automationType: '',
    currentProcess: '',
    processComplexity: '',
    integration: [],
    features: [],
    dataVolume: '',
    timeline: '',
    budget: '',
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
      title: "Art der Automatisierung",
      description: "Welche Art von Workflow möchten Sie automatisieren?",
      field: 'automationType',
      options: [
        { icon: '📄', name: 'Dokumentenverarbeitung', value: 'document', gradient: "from-purple-500 to-blue-500" },
        { icon: '💼', name: 'Geschäftsprozesse', value: 'business', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🤖', name: 'KI-gestützte Automation', value: 'ai', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📊', name: 'Datenverarbeitung', value: 'data', gradient: "from-purple-500 to-blue-500" },
        { icon: '🔄', name: 'System Integration', value: 'integration', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📱', name: 'Mobile Workflows', value: 'mobile', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    2: {
      title: "Aktueller Prozess",
      description: "Wie wird der Prozess derzeit ausgeführt?",
      field: 'currentProcess',
      options: [
        { icon: '👤', name: 'Manuell', value: 'manual', gradient: "from-purple-500 to-blue-500" },
        { icon: '📑', name: 'Teilweise automatisiert', value: 'partial', gradient: "from-blue-500 to-indigo-500" },
        { icon: '⚡', name: 'Bereits automatisiert (Optimierung)', value: 'automated', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🆕', name: 'Neuer Prozess', value: 'new', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    3: {
      title: "Prozesskomplexität",
      description: "Wie komplex ist der zu automatisierende Prozess?",
      field: 'processComplexity',
      options: [
        { icon: '🟢', name: 'Einfach (1-3 Schritte)', value: 'simple', gradient: "from-purple-500 to-blue-500" },
        { icon: '🟡', name: 'Mittel (4-7 Schritte)', value: 'medium', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔴', name: 'Komplex (8+ Schritte)', value: 'complex', gradient: "from-indigo-500 to-purple-500" },
        { icon: '❓', name: 'Noch unklar', value: 'unknown', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    4: {
      title: "System-Integration",
      description: "Mit welchen Systemen soll der Workflow verbunden werden?",
      field: 'integration',
      multiSelect: true,
      options: [
        { icon: '📧', name: 'E-Mail (Outlook, etc.)', value: 'email', gradient: "from-purple-500 to-blue-500" },
        { icon: '💼', name: 'ERP-System', value: 'erp', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🤝', name: 'CRM-System', value: 'crm', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📁', name: 'Dokumentenmanagement', value: 'dms', gradient: "from-purple-500 to-blue-500" },
        { icon: '☁️', name: 'Cloud-Dienste', value: 'cloud', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔌', name: 'Andere APIs', value: 'api', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    5: {
      title: "Gewünschte Features",
      description: "Welche Funktionen benötigen Sie?",
      field: 'features',
      multiSelect: true,
      options: [
        { icon: '📊', name: 'Reporting & Analytics', value: 'reporting', gradient: "from-purple-500 to-blue-500" },
        { icon: '📱', name: 'Mobile Zugriff', value: 'mobile', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔔', name: 'Benachrichtigungen', value: 'notifications', gradient: "from-indigo-500 to-purple-500" },
        { icon: '👥', name: 'Benutzerrechte', value: 'permissions', gradient: "from-purple-500 to-blue-500" },
        { icon: '📈', name: 'Prozess-Monitoring', value: 'monitoring', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔄', name: 'Versionierung', value: 'versioning', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    6: {
      title: "Datenvolumen",
      description: "Wie viele Vorgänge sollen automatisiert werden?",
      field: 'dataVolume',
      options: [
        { icon: '🟦', name: 'Klein (bis 100/Monat)', value: 'small', gradient: "from-purple-500 to-blue-500" },
        { icon: '🟨', name: 'Mittel (100-1000/Monat)', value: 'medium', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🟧', name: 'Groß (1000+/Monat)', value: 'large', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📈', name: 'Wachsend/Variabel', value: 'variable', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    7: {
      title: "Budget-Rahmen",
      description: "Welches Budget haben Sie für das Projekt eingeplant?",
      field: 'budget',
      options: [
        { icon: '💰', name: 'Basic (bis 5.000€)', value: 'basic', gradient: "from-purple-500 to-blue-500" },
        { icon: '💰💰', name: 'Standard (5.000€ - 15.000€)', value: 'standard', gradient: "from-blue-500 to-indigo-500" },
        { icon: '💰💰💰', name: 'Professional (15.000€ - 30.000€)', value: 'professional', gradient: "from-indigo-500 to-purple-500" },
        { icon: '💰💰💰💰', name: 'Enterprise (30.000€+)', value: 'enterprise', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    8: {
      title: "Zeitrahmen",
      description: "Wann soll Ihr Workflow automatisiert sein?",
      field: 'timeline',
      options: [
        { icon: '🚀', name: 'Dringend (< 1 Monat)', value: 'urgent', gradient: "from-purple-500 to-blue-500" },
        { icon: '📅', name: '1-2 Monate', value: 'short', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📆', name: '2-4 Monate', value: 'medium', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🗓️', name: '4+ Monate', value: 'long', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    9: {
      title: "Kontaktdaten",
      description: "Ihre Kontaktdaten für ein individuelles Angebot",
      field: 'contact',
      isContactForm: true
    }
  };

  const currentStepData = steps[currentStep];
  const selectedValue = formData[currentStepData.field];
  const isSelected = currentStepData.multiSelect 
    ? selectedValue?.length > 0 
    : selectedValue !== '';

  const handleSelect = (value) => {
    const { field, multiSelect } = steps[currentStep];
    
    if (multiSelect) {
      const currentValues = formData[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setFormData({ ...formData, [field]: newValues });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < Object.keys(steps).length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const formatFormDataForEmail = (data) => {
    let emailContent = '';
    
    // Formatierung der Workflow-Automatisierungsdaten
    Object.entries(steps).forEach(([stepNumber, step]) => {
      if (step.field === 'contact') return;
      
      emailContent += `${step.title.toUpperCase()}\n`;
      const value = data[step.field];
      
      if (Array.isArray(value)) {
        emailContent += value.map(v => {
          const option = step.options.find(opt => opt.value === v);
          return option ? `- ${option.name}` : v;
        }).join('\n');
      } else {
        const option = step.options?.find(opt => opt.value === value);
        emailContent += option ? option.name : value;
      }
      emailContent += '\n\n';
    });
    
    return emailContent;
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
                  <div className="space-y-6">
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
                  </div>
                  
                  <div className="space-y-6">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Nachricht</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[140px]"
                        placeholder="Weitere Informationen oder Anmerkungen zu Ihrem Projekt..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {currentStepData.options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="group relative rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                      {/* Gradient Border */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.gradient} transition-opacity duration-300
                        ${currentStepData.multiSelect 
                          ? (selectedValue?.includes(option.value) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')
                          : (selectedValue === option.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}`} 
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
                {currentStep === 1 ? (
                  <button 
                    onClick={() => router.push('/offer')}
                    className="px-8 py-3 border border-blue-500 rounded-xl text-blue-500 hover:bg-blue-500/10 transition-colors"
                  >
                    Zurück zur Übersicht
                  </button>
                ) : (
                  <button 
                    onClick={handleBack}
                    className="px-8 py-3 border border-blue-500 rounded-xl text-blue-500 hover:bg-blue-500/10 transition-colors"
                  >
                    Zurück
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white transition-all duration-300 ${
                    currentStepData.isContactForm 
                      ? (formData.contactName && formData.contactEmail ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed')
                      : (isSelected ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed')
                  }`}
                  disabled={currentStepData.isContactForm ? !(formData.contactName && formData.contactEmail) : !isSelected}
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

export default WorkflowAutomationForm; 