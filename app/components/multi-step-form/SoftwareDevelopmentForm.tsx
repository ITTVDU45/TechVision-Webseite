"use client";

import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SoftwareDevelopmentFormState } from "../../types/forms";

const SoftwareDevelopmentForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState<SoftwareDevelopmentFormState>({
    projectGoal: '',
    softwareType: '',
    platform: [],
    features: [],
    technology: '',
    budget: '',
    timeline: '',
    teamSize: '',
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
      title: "Ziel des Softwareprojekts",
      description: "Was möchten Sie mit Ihrer Software hauptsächlich erreichen?",
      field: 'projectGoal',
      options: [
        { icon: '🔄', name: 'Prozessautomatisierung', value: 'automation', gradient: "from-purple-500 to-blue-500" },
        { icon: '📊', name: 'Datenanalyse', value: 'analysis', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🤝', name: 'Kundenmanagement', value: 'crm', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📱', name: 'Mobile App', value: 'mobile', gradient: "from-purple-500 to-blue-500" },
        { icon: '🏢', name: 'Enterprise Software', value: 'enterprise', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🛠️', name: 'Entwicklertools', value: 'devtools', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    2: {
      title: "Art der Software",
      description: "Welche Art von Software möchten Sie entwickeln?",
      field: 'softwareType',
      options: [
        { icon: '💻', name: 'Desktop-Anwendung', value: 'desktop', gradient: "from-purple-500 to-blue-500" },
        { icon: '🌐', name: 'Web-Anwendung', value: 'web', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📱', name: 'Mobile App', value: 'mobile', gradient: "from-indigo-500 to-purple-500" },
        { icon: '☁️', name: 'Cloud-Lösung', value: 'cloud', gradient: "from-purple-500 to-blue-500" },
        { icon: '🤖', name: 'KI/ML-Anwendung', value: 'ai', gradient: "from-blue-500 to-indigo-500" }
      ]
    },
    3: {
      title: "Plattform / Betriebssystem",
      description: "Auf welchen Plattformen soll Ihre Software laufen?",
      field: 'platform',
      multiSelect: true,
      options: [
        { icon: '🪟', name: 'Windows', value: 'windows', gradient: "from-purple-500 to-blue-500" },
        { icon: '🍎', name: 'macOS', value: 'macos', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🐧', name: 'Linux', value: 'linux', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📱', name: 'iOS', value: 'ios', gradient: "from-purple-500 to-blue-500" },
        { icon: '🤖', name: 'Android', value: 'android', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🌐', name: 'Browser-basiert', value: 'web', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    4: {
      title: "Gewünschte Features",
      description: "Welche Hauptfunktionen soll Ihre Software haben?",
      field: 'features',
      multiSelect: true,
      options: [
        { icon: '👥', name: 'Benutzerverwaltung', value: 'user_management', gradient: "from-purple-500 to-blue-500" },
        { icon: '📊', name: 'Datenanalyse', value: 'data_analysis', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔄', name: 'API-Integration', value: 'api', gradient: "from-indigo-500 to-purple-500" },
        { icon: '📱', name: 'Offline-Modus', value: 'offline', gradient: "from-purple-500 to-blue-500" },
        { icon: '📈', name: 'Reporting', value: 'reporting', gradient: "from-blue-500 to-indigo-500" },
        { icon: '🔒', name: 'Sicherheitsfunktionen', value: 'security', gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    5: {
      title: "Technologie-Stack",
      description: "Welche Technologien bevorzugen Sie?",
      field: 'technology',
      options: [
        { icon: '⚛️', name: 'React/Node.js', value: 'react', gradient: "from-purple-500 to-blue-500" },
        { icon: '🐍', name: 'Python', value: 'python', gradient: "from-blue-500 to-indigo-500" },
        { icon: '☕', name: 'Java', value: 'java', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🎯', name: '.NET', value: 'dotnet', gradient: "from-purple-500 to-blue-500" },
        { icon: '📱', name: 'Native (iOS/Android)', value: 'native', gradient: "from-blue-500 to-indigo-500" }
      ]
    },
    6: {
      title: "Budget-Rahmen",
      description: "Welches Budget haben Sie für das Projekt eingeplant?",
      field: 'budget',
      options: [
        { icon: '💰', name: 'Basic (bis 10.000€)', value: 'basic', gradient: "from-purple-500 to-blue-500" },
        { icon: '💰💰', name: 'Standard (10.000€ - 25.000€)', value: 'standard', gradient: "from-blue-500 to-indigo-500" },
        { icon: '💰💰💰', name: 'Professional (25.000€ - 50.000€)', value: 'professional', gradient: "from-indigo-500 to-purple-500" },
        { icon: '💰💰💰💰', name: 'Enterprise (50.000€+)', value: 'enterprise', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    7: {
      title: "Zeitrahmen",
      description: "Wann soll Ihr Projekt fertiggestellt sein?",
      field: 'timeline',
      options: [
        { icon: '🚀', name: 'So schnell wie möglich', value: 'asap', gradient: "from-purple-500 to-blue-500" },
        { icon: '📅', name: '2-3 Monate', value: 'short', gradient: "from-blue-500 to-indigo-500" },
        { icon: '📆', name: '3-6 Monate', value: 'medium', gradient: "from-indigo-500 to-purple-500" },
        { icon: '🗓️', name: '6+ Monate', value: 'long', gradient: "from-purple-500 to-blue-500" }
      ]
    },
    8: {
      title: "Kontaktdaten",
      description: "Ihre Kontaktdaten für ein individuelles Angebot",
      field: 'contact',
      isContactForm: true
    }
  };

  const currentStepData = steps[currentStep as keyof typeof steps];
  const selectedValue =
    formData[currentStepData.field as keyof SoftwareDevelopmentFormState];
  const isMulti =
    "multiSelect" in currentStepData && Boolean(currentStepData.multiSelect);
  const isContactForm =
    "isContactForm" in currentStepData && Boolean(currentStepData.isContactForm);
  const isSelected = isMulti
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : selectedValue !== "" && selectedValue != null;

  const handleSelect = (value: string) => {
    const step = steps[currentStep as keyof typeof steps];
    const field = step.field as keyof SoftwareDevelopmentFormState;

    if ("multiSelect" in step && step.multiSelect) {
      const currentValues = (Array.isArray(formData[field])
        ? formData[field]
        : []) as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
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

  const formatFormDataForEmail = (data: SoftwareDevelopmentFormState) => {
    let emailContent = "";
    const label = <T extends Record<string, string>>(m: T, k: string) =>
      m[k as keyof T] ?? k;

    emailContent += "🎯 PROJEKTZIEL\n";
    if (data.projectGoal) {
      const goals = {
        automation: "Prozessautomatisierung",
        analysis: "Datenanalyse",
        crm: "Kundenmanagement",
        mobile: "Mobile App",
        enterprise: "Enterprise Software",
        devtools: "Entwicklertools",
      };
      emailContent += `► ${label(goals, data.projectGoal)}\n\n`;
    }

    emailContent += "💻 SOFTWARE-TYP\n";
    if (data.softwareType) {
      const types = {
        desktop: "Desktop-Anwendung",
        web: "Web-Anwendung",
        mobile: "Mobile App",
        cloud: "Cloud-Lösung",
        ai: "KI/ML-Anwendung",
      };
      emailContent += `► ${label(types, data.softwareType)}\n\n`;
    }

    emailContent += "🖥️ PLATTFORMEN\n";
    if (data.platform && data.platform.length > 0) {
      const platforms = {
        windows: "Windows",
        macos: "macOS",
        linux: "Linux",
        ios: "iOS",
        android: "Android",
        web: "Browser-basiert",
      };
      data.platform.forEach((platform) => {
        emailContent += `► ${label(platforms, platform)}\n`;
      });
      emailContent += "\n";
    }

    emailContent += "⚡ FEATURES\n";
    if (data.features && data.features.length > 0) {
      const features = {
        user_management: "Benutzerverwaltung",
        data_analysis: "Datenanalyse",
        api: "API-Integration",
        offline: "Offline-Modus",
        reporting: "Reporting",
        security: "Sicherheitsfunktionen",
      };
      data.features.forEach((feature) => {
        emailContent += `► ${label(features, feature)}\n`;
      });
      emailContent += "\n";
    }

    emailContent += "🛠️ TECHNOLOGIE\n";
    if (data.technology) {
      const technologies = {
        react: "React/Node.js",
        python: "Python",
        java: "Java",
        dotnet: ".NET",
        native: "Native (iOS/Android)",
      };
      emailContent += `► ${label(technologies, data.technology)}\n\n`;
    }

    emailContent += "💰 BUDGET\n";
    if (data.budget) {
      const budgets = {
        basic: "Basic (bis 10.000€)",
        standard: "Standard (10.000€ - 25.000€)",
        professional: "Professional (25.000€ - 50.000€)",
        enterprise: "Enterprise (50.000€+)",
      };
      emailContent += `► ${label(budgets, data.budget)}\n\n`;
    }

    emailContent += "⏱️ ZEITRAHMEN\n";
    if (data.timeline) {
      const timelines = {
        asap: "So schnell wie möglich",
        short: "2-3 Monate",
        medium: "3-6 Monate",
        long: "6+ Monate",
      };
      emailContent += `► ${label(timelines, data.timeline)}\n\n`;
    }

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
      console.error('Detaillierter Fehler:', error);
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
              {isContactForm ? (
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
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {("options" in currentStepData ? currentStepData.options : []).map((option) => (
                    <div
                      key={option.value}
                      className={`group h-32 flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 relative
                        ${isMulti
                          ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
                            ? "bg-blue-500/10"
                            : "bg-gray-800/50"
                          : selectedValue === option.value
                            ? "bg-blue-500/10"
                            : "bg-gray-800/50"}`}
                      onClick={() => handleSelect(option.value)}
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.gradient} transition-opacity duration-300
                        ${isMulti
                          ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                          : selectedValue === option.value
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"}`}
                        style={{ padding: "1px" }}
                      >
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
                    isContactForm
                      ? formData.contactName && formData.contactEmail
                        ? "hover:opacity-90"
                        : "opacity-50 cursor-not-allowed"
                      : isSelected
                        ? "hover:opacity-90"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={isContactForm ? !(formData.contactName && formData.contactEmail) : !isSelected}
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

export default SoftwareDevelopmentForm; 