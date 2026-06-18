import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { PAYROLL_COUNTRIES } from '../constants';
import { 
  User, Building2, Bell, Shield, Lock, Mail,
  Camera, Save, Check, DollarSign, Sun, Moon
} from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, currentCompany, updateEmployee, payrollConfig, updatePayrollConfig } = useApp();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = currentUser?.role === 'admin';
  const [activeTab, setActiveTab] = useState('profile');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    position: currentUser?.position || ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    leaveRequests: true,
    salarySlips: true,
    attendance: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [companyData, setCompanyData] = useState({
    name: currentCompany?.name || '',
    email: currentCompany?.email || '',
    phone: currentCompany?.phone || '',
    website: currentCompany?.website || '',
    address: currentCompany?.address || ''
  });

  const handleSave = () => {
    if (currentUser) {
      updateEmployee(currentUser.id, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        position: profileData.position,
      });
    }
    if (activeTab === 'notifications') {
      addToast('Préférences de notifications enregistrées', 'success');
    }
    if (activeTab === 'security' && security.newPassword) {
      if (security.newPassword !== security.confirmPassword) {
        addToast('Les mots de passe ne correspondent pas', 'error');
        return;
      }
      setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' });
      addToast('Mot de passe mis à jour', 'success');
    }
    if (activeTab === 'company') {
      addToast('Informations entreprise enregistrées', 'success');
    }
    setSaved(true);
    if (activeTab === 'profile') addToast('Paramètres enregistrés', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setPhotoPreview(dataUrl);
        updateEmployee(currentUser?.id || '', { photo: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoSettingsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setLogoPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'company', label: 'Entreprise', icon: Building2 },
    { id: 'salary', label: 'Paie', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: theme === 'dark' ? Sun : Moon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500">Gérez votre profil et vos préférences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <input type="file" ref={photoInputRef} accept="image/*" onChange={handlePhotoSelect} className="hidden" />
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                    {photoPreview || currentUser?.photo ? (
                      <img src={photoPreview || currentUser?.photo} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-600 font-bold text-3xl">
                        {currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button onClick={() => photoInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">{currentUser?.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {saved ? <Check size={18} /> : <Save size={18} />}
                <span>{saved ? 'Enregistré !' : 'Enregistrer'}</span>
              </button>
            </div>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && isAdmin && (
            <div className="space-y-6">
              {/* Company Logo */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <input type="file" ref={logoInputRef} accept="image/*" onChange={handleLogoSettingsSelect} className="hidden" />
                  <div className="w-24 h-24 bg-green-100 rounded-xl flex items-center justify-center overflow-hidden">
                    {logoPreview || currentCompany?.logo ? (
                      <img src={logoPreview || currentCompany?.logo} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-green-600 font-bold text-3xl">
                        {currentCompany?.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button onClick={() => logoInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{currentCompany?.name}</h3>
                  <p className="text-gray-500 text-sm">ID: {currentCompany?.uniqueId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input
                    type="text"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input
                    type="url"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={companyData.address}
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {saved ? <Check size={18} /> : <Save size={18} />}
                <span>{saved ? 'Enregistré !' : 'Enregistrer'}</span>
              </button>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Apparence</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">Mode sombre</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Basculer entre le mode clair et sombre</p>
                </div>
                <button onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform flex items-center justify-center ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'}`}>
                    {theme === 'dark' ? <Moon size={12} className="text-blue-600" /> : <Sun size={12} className="text-yellow-500" />}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Salary Tab */}
          {activeTab === 'salary' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">Configuration de la paie</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de paie</label>
                <select value={payrollConfig.country} onChange={(e) => { const cfg = PAYROLL_COUNTRIES.find((c) => c.country === e.target.value); if (cfg) updatePayrollConfig(cfg); }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  {PAYROLL_COUNTRIES.map((c) => <option key={c.country} value={c.country}>{c.countryName} ({c.currency})</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-2">Bonus: +{(payrollConfig.bonusRate * 100).toFixed(0)}% | Déductions: -{(payrollConfig.deductionRate * 100).toFixed(0)}% | Devise: {payrollConfig.currency}</p>
              </div>
              <button onClick={() => { addToast('Configuration paie mise à jour', 'success'); }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Save size={18} /><span>Enregistrer</span>
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Canaux de notification</h3>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email', description: 'Recevoir les notifications par email' },
                    { key: 'sms', label: 'SMS', description: 'Recevoir les notifications par SMS' },
                    { key: 'push', label: 'Notifications push', description: 'Recevoir les notifications dans l\'application' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Types de notifications</h3>
                <div className="space-y-3">
                  {[
                    { key: 'leaveRequests', label: 'Demandes de congé', description: 'Quand un employé demande un congé' },
                    { key: 'salarySlips', label: 'Bulletins de paie', description: 'Quand un bulletin de paie est disponible' },
                    { key: 'attendance', label: 'Présences', description: 'Alertes de retard et d\'absence' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {saved ? <Check size={18} /> : <Save size={18} />}
                <span>{saved ? 'Enregistré !' : 'Enregistrer'}</span>
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">2FA</p>
                    <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) => setSecurity({...security, twoFactor: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Changer le mot de passe</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        value={security.newPassword}
                        onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {saved ? <Check size={18} /> : <Save size={18} />}
                <span>{saved ? 'Enregistré !' : 'Enregistrer'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
