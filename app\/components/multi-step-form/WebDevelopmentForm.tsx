import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';

const WebDevelopmentForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    websiteGoal: '',
    services: [],
    websiteType: '',
    design: '',
    features: [],
    budget: '',
    timeline: '',
    pages: '',
    languages: '',
    maintenance: '',
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
      title: "Ziel der Website",
      description: "Was möchten Sie mit Ihrer Website hauptsächlich erreichen?",
      field: 'websiteGoal',
      options: [
        { icon: '🎯', name: 'Kunden gewinnen', value: 'leads', gradient: "from-purple-500 to-blue-500" },
        { icon: '🛒', name: 'Produkte verkaufen', value: 'sales', gradient: "from-blue-500 to-indigo-500" },
        { icon: 'ℹ️', name: 'Informieren', value: 'inform', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🤝', name: 'Marke aufbauen', value: 'branding', gradient: "from-purple-500 to-blue-500" },
        { icon: '📱', name: 'Online Präsenz', value: 'presence', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔄', name: 'Prozesse digitalisieren', value: 'digitalize', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    2: {
      title: "Welche Leistungen benötigen Sie?",
      description: "Wählen Sie die gewünschten Dienstleistungen aus",
      field: 'services',
      multiSelect: true,
      options: [
        { icon: '🎨', name: 'Webdesign', value: 'webdesign', gradient: "from-purple-500 to-blue-500" },
        { icon: '💻', name: 'Web Entwicklung', value: 'development', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📸', name: 'Foto/Video', value: 'media', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🔍', name: 'SEO', value: 'seo', gradient: "from-purple-500 to-blue-500" },
        { icon: '📢', name: 'SEA', value: 'sea', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔧', name: 'Wartung', value: 'maintenance', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    3: {
      title: "Art der Website",
      description: "Wählen Sie die Art der Website, die Sie entwickeln möchten",
      field: 'websiteType',
      options: [
        { icon: '🏢', name: 'Business Website', value: 'business', gradient: "from-purple-500 to-blue-500" },
        { icon: '🛍️', name: 'Online-Shop', value: 'ecommerce', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📸', name: 'Portfolio', value: 'portfolio', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📝', name: 'Blog / Magazine', value: 'blog', gradient: "from-purple-500 to-blue-500" },
        { icon: '🎯', name: 'Landing Page', value: 'landing', gradient: "from-blue-500 to-indigo-500" }
      ]
    },
    4: {
      title: "Design-Präferenz",
      description: "Wählen Sie den Stil, der am besten zu Ihrem Projekt passt",
      field: 'design',
      options: [
        { icon: '⚡', name: 'Minimalistisch & Modern', value: 'minimal', gradient: "from-purple-500 to-blue-500" },
        { icon: '💼', name: 'Corporate & Professional', value: 'corporate', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🎨', name: 'Kreativ & Innovativ', value: 'creative', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🛒', name: 'E-Commerce optimiert', value: 'ecommerce', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    5: {
      title: "Gewünschte Features",
      description: "Wählen Sie die wichtigsten Funktionen für Ihre Website",
      field: 'features',
      multiSelect: true,
      options: [
        { icon: '📝', name: 'Content Management System', value: 'cms', gradient: "from-purple-500 to-blue-500" },
        { icon: '📱', name: 'Mobile Optimierung', value: 'mobile', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔍', name: 'SEO Optimierung', value: 'seo', gradient: "from-indigo-500 to-purple-500" },
        { icon: '💬', name: 'Kontaktformular', value: 'contact', gradient: "from-purple-500 to-blue-500" },
        { icon: '🔒', name: 'SSL Verschlüsselung', value: 'ssl', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📊', name: 'Analytics Integration', value: 'analytics', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    6: {
      title: "Budget-Rahmen",
      description: "Wählen Sie den gewünschten Investitionsrahmen",
      field: 'budget',
      options: [
        { icon: '💰', name: 'Basic (bis 5.000€)', value: 'basic', gradient: "from-purple-500 to-blue-500" },
        { icon: '💰💰', name: 'Professional (5.000€ - 10.000€)', value: 'professional', gradient: "from-blue-500 to-indigo-500" },
        { icon: '💰💰💰', name: 'Business (10.000€ - 20.000€)', value: 'business', gradient: "from-indigo-500 to-purple-500" },
        { icon: '💰💰💰💰', name: 'Enterprise (20.000€+)', value: 'enterprise', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    7: {
      title: "Zeitrahmen",
      description: "Wann soll Ihr Projekt fertiggestellt sein?",
      field: 'timeline',
      options: [
        { icon: '🚀', name: 'So schnell wie möglich', value: 'asap', gradient: "from-purple-500 to-blue-500" },
        { icon: '📅', name: '1-2 Monate', value: 'short', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📆', name: '2-4 Monate', value: 'medium', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🗓️', name: '4+ Monate', value: 'long', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    8: {
      title: "Anzahl der Seiten",
      description: "Wie umfangreich soll Ihre Website werden?",
      field: 'pages',
      options: [
        { icon: '📄', name: 'Landing Page (1-3 Seiten)', value: 'small', gradient: "from-purple-500 to-blue-500" },
        { icon: '📑', name: 'Standard (4-10 Seiten)', value: 'medium', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📚', name: 'Umfangreich (11-20 Seiten)', value: 'large', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📦', name: 'Enterprise (20+ Seiten)', value: 'xlarge', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    9: {
      title: "Sprachen",
      description: "In welchen Sprachen soll Ihre Website verfügbar sein?",
      field: 'languages',
      options: [
        { icon: '🇩🇪', name: 'Nur Deutsch', value: 'de', gradient: "from-purple-500 to-blue-500" },
        { icon: '🇬🇧', name: 'Deutsch & Englisch', value: 'de_en', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🌍', name: 'Mehrsprachig (3+ Sprachen)', value: 'multi', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    10: {
      title: "Wartung & Support",
      description: "Welches Wartungspaket wünschen Sie?",
      field: 'maintenance',
      options: [
        { icon: '🔧', name: 'Basic Support', value: 'basic', gradient: "from-purple-500 to-blue-500" },
        { icon: '⚡', name: 'Standard Support', value: 'standard', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🛡️', name: 'Premium Support', value: 'premium', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    11: {
      title: "Ihre Kontaktdaten",
      description: "Bitte hinterlassen Sie uns Ihre Kontaktdaten für ein individuelles Angebot",
      field: 'contact',
      isContactForm: true
    }
  };

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

  const handleSubmit = async () => {
    try {
      const emailContent = formatFormDataForEmail(formData);
      
      // Erstellen des Template-Parameters mit allen Details
      const templateParams = {
        to_name: "IT-TechVision",
        to_email: "info@it-techvision.de",
        from_name: formData.contactName || 'Nicht angegeben',
        from_email: formData.contactEmail || 'Nicht angegeben',
        phone: formData.contactPhone || 'Nicht angegeben',
        company: formData.companyName || 'Nicht angegeben',
        message: formData.message || 'Keine zusätzliche Nachricht',
        project_details: emailContent, // Detaillierte Projektinformationen
        reply_to: formData.contactEmail || 'info@it-techvision.de'
      };

      console.log('Sende E-Mail mit Details:', templateParams);

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
      router.push('/offer');
    }
  };

  const currentStepData = steps[currentStep];
  const selectedValue = formData[currentStepData.field];
  const isSelected = currentStepData.multiSelect 
    ? (selectedValue && selectedValue.length > 0)
    : selectedValue;

  const formatFormDataForEmail = (data) => {
    let emailContent = '';
    
    // Webseitenziel
    emailContent += '🎯 WEBSEITENZIEL\n';
    if (data.websiteGoal) {
      const goals = {
        'leads': 'Kunden gewinnen',
        'sales': 'Produkte verkaufen',
        'inform': 'Informieren',
        'branding': 'Marke aufbauen',
        'presence': 'Online Präsenz',
        'digitalize': 'Prozesse digitalisieren'
      };
      emailContent += `► ${goals[data.websiteGoal]}\n\n`;
    }

    // Leistungen
    emailContent += '💼 GEWÜNSCHTE LEISTUNGEN\n';
    if (data.services && data.services.length > 0) {
      const services = {
        'webdesign': 'Webdesign',
        'development': 'Web Entwicklung',
        'media': 'Foto/Video',
        'seo': 'SEO',
        'sea': 'SEA',
        'maintenance': 'Wartung'
      };
      data.services.forEach(service => {
        emailContent += `► ${services[service]}\n`;
      });
      emailContent += '\n';
    }

    // Website-Typ
    emailContent += '🌐 WEBSITE-TYP\n';
    if (data.websiteType) {
      const types = {
        'business': 'Business Website',
        'ecommerce': 'Online-Shop',
        'portfolio': 'Portfolio',
        'blog': 'Blog / Magazine',
        'landing': 'Landing Page'
      };
      emailContent += `► ${types[data.websiteType]}\n\n`;
    }

    // Design
    emailContent += '🎨 DESIGN-PRÄFERENZ\n';
    if (data.design) {
      const designs = {
        'minimal': 'Minimalistisch & Modern',
        'corporate': 'Corporate & Professional',
        'creative': 'Kreativ & Innovativ',
        'ecommerce': 'E-Commerce optimiert'
      };
      emailContent += `► ${designs[data.design]}\n\n`;
    }

    // Features
    emailContent += '⚡ GEWÜNSCHTE FEATURES\n';
    if (data.features && data.features.length > 0) {
      const features = {
        'cms': 'Content Management System',
        'mobile': 'Mobile Optimierung',
        'seo': 'SEO Optimierung',
        'contact': 'Kontaktformular',
        'ssl': 'SSL Verschlüsselung',
        'analytics': 'Analytics Integration'
      };
      data.features.forEach(feature => {
        emailContent += `► ${features[feature]}\n`;
      });
      emailContent += '\n';
    }

    // Budget
    emailContent += '💰 BUDGET\n';
    if (data.budget) {
      const budgets = {
        'basic': 'Basic (bis 5.000€)',
        'professional': 'Professional (5.000€ - 10.000€)',
        'business': 'Business (10.000€ - 20.000€)',
        'enterprise': 'Enterprise (20.000€+)'
      };
      emailContent += `► ${budgets[data.budget]}\n\n`;
    }

    // Timeline
    emailContent += '⏱️ ZEITRAHMEN\n';
    if (data.timeline) {
      const timelines = {
        'asap': 'So schnell wie möglich',
        'short': '1-2 Monate',
        'medium': '2-4 Monate',
        'long': '4+ Monate'
      };
      emailContent += `► ${timelines[data.timeline]}\n\n`;
    }

    // Seiten
    emailContent += '📑 ANZAHL DER SEITEN\n';
    if (data.pages) {
      const pages = {
        'small': 'Landing Page (1-3 Seiten)',
        'medium': 'Standard (4-10 Seiten)',
        'large': 'Umfangreich (11-20 Seiten)',
        'xlarge': 'Enterprise (20+ Seiten)'
      };
      emailContent += `► ${pages[data.pages]}\n\n`;
    }

    // Sprachen
    emailContent += '🌍 SPRACHEN\n';
    if (data.languages) {
      const languages = {
        'de': 'Nur Deutsch',
        'de_en': 'Deutsch & Englisch',
        'multi': 'Mehrsprachig (3+ Sprachen)'
      };
      emailContent += `► ${languages[data.languages]}\n\n`;
    }

    // Wartung
    emailContent += '🔧 WARTUNG & SUPPORT\n';
    if (data.maintenance) {
      const maintenances = {
        'basic': 'Basic Support',
        'standard': 'Standard Support',
        'premium': 'Premium Support'
      };
      emailContent += `► ${maintenances[data.maintenance]}\n\n`;
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
                // Bisheriger Options Grid Code
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {currentStepData.options.map((option) => (
                    <div
                      key={option.value}
                      className={`group h-32 flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 relative
                        ${currentStepData.multiSelect 
                          ? (selectedValue?.includes(option.value) ? 'bg-blue-500/10' : 'bg-gray-800/50')
                          : (selectedValue === option.value ? 'bg-blue-500/10' : 'bg-gray-800/50')}`}
                      onClick={() => handleSelect(option.value)}
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
                      <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl mb-2">{option.icon}</span>
                        <span className="text-sm font-medium">{option.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
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

export default WebDevelopmentForm; 