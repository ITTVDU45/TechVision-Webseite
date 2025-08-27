import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';

const ToolsForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    openSourceTools: [],
    aiAgents: [],
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
      title: "Welche Open-Source-Tools benötigen Sie?",
      description: "Wählen Sie die gewünschten Open-Source-Tools aus",
      field: 'openSourceTools',
      multiSelect: true,
      options: [
        { icon: '📅', name: 'Cal.com', value: 'calcom', gradient: "from-purple-500 to-blue-500" },
        { icon: '⏱️', name: 'Zeiterfassung', value: 'time_tracking', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔐', name: 'Passwort-Tresor', value: 'password_vault', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🏢', name: 'ERP-System Idurar', value: 'erp_idurar', gradient: "from-purple-500 to-blue-500" },
        { icon: '🤝', name: 'CRM Perfex', value: 'crm_perfex', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📤', name: 'File-Transfer', value: 'file_transfer', gradient: "from-indigo-500 to-purple-500" },
        { icon: '☁️', name: 'Nextcloud', value: 'nextcloud', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    2: {
      title: "Welche KI-Agenten benötigen Sie?",
      description: "Wählen Sie die gewünschten KI-Agenten aus",
      field: 'aiAgents',
      multiSelect: true,
      options: [
        { icon: '👤', name: 'Personal Assistant', value: 'personal_assistant', gradient: "from-purple-500 to-blue-500" },
        { icon: '⚖️', name: 'Juristische KI-Agenten', value: 'legal_agents', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📊', name: 'Unternehmensberater-KI', value: 'business_consultant', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📞', name: 'Telefonbesprechungs-KI', value: 'phone_meeting', gradient: "from-purple-500 to-blue-500" },
        { icon: '📣', name: 'Marketing-KI-Agent', value: 'marketing_agent', gradient: "from-blue-500 to-indigo-500" },
        { icon: '💰', name: 'Finanz- & Buchhaltungs-KI', value: 'finance_accounting', gradient: "from-indigo-500 to-purple-500" },
        { icon: '👥', name: 'HR-Agent', value: 'hr_agent', gradient: "from-purple-500 to-blue-500" },
        { icon: '🎯', name: 'Vertriebs-KI', value: 'sales_ai', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🏥', name: 'Gesundheits-KI', value: 'healthcare_ai', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🏭', name: 'Produktions-KI', value: 'production_ai', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    3: {
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
    } else {
      router.push('/offer');
    }
  };

  const handleNext = () => {
    if (currentStep < Object.keys(steps).length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
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
      console.error('Detaillierter Fehler:', error);
      alert('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@it-techvision.de');
    }
  };

  const formatFormDataForEmail = (data) => {
    let emailContent = '';

    // Open-Source-Tools
    emailContent += '🛠️ OPEN-SOURCE-TOOLS\n';
    if (data.openSourceTools && data.openSourceTools.length > 0) {
      const tools = {
        'calcom': 'Cal.com',
        'time_tracking': 'Zeiterfassung',
        'password_vault': 'Passwort-Tresor',
        'erp_idurar': 'ERP-System Idurar',
        'crm_perfex': 'CRM Perfex',
        'file_transfer': 'File-Transfer',
        'nextcloud': 'Nextcloud'
      };
      data.openSourceTools.forEach(tool => {
        emailContent += `► ${tools[tool]}\n`;
      });
      emailContent += '\n';
    }

    // KI-Agenten
    emailContent += '🤖 KI-AGENTEN\n';
    if (data.aiAgents && data.aiAgents.length > 0) {
      const agents = {
        'personal_assistant': 'Personal Assistant',
        'legal_agents': 'Juristische KI-Agenten',
        'business_consultant': 'Unternehmensberater-KI',
        'phone_meeting': 'Telefonbesprechungs-KI',
        'marketing_agent': 'Marketing-KI-Agent',
        'finance_accounting': 'Finanz- & Buchhaltungs-KI',
        'hr_agent': 'HR-Agent',
        'sales_ai': 'Vertriebs-KI',
        'healthcare_ai': 'Gesundheits-KI',
        'production_ai': 'Produktions-KI'
      };
      data.aiAgents.forEach(agent => {
        emailContent += `► ${agents[agent]}\n`;
      });
      emailContent += '\n';
    }

    return emailContent;
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
                        ${selectedValue.includes(option.value) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
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

export default ToolsForm; 