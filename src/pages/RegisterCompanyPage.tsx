import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Building2, User, Mail, Phone, MapPin, Globe, Lock, Camera } from 'lucide-react';

const countries = [
  { code: 'FR', name: 'France', indicator: '+33', city: 'Paris' },
  { code: 'BJ', name: 'Bénin', indicator: '+229', city: 'Cotonou' },
  { code: 'BF', name: 'Burkina Faso', indicator: '+226', city: 'Ouagadougou' },
  { code: 'BI', name: 'Burundi', indicator: '+257', city: 'Bujumbura' },
  { code: 'CM', name: 'Cameroun', indicator: '+237', city: 'Douala' },
  { code: 'CI', name: "Côte d'Ivoire", indicator: '+225', city: 'Abidjan' },
  { code: 'CG', name: 'Congo', indicator: '+242', city: 'Brazzaville' },
  { code: 'CD', name: 'Congo (RDC)', indicator: '+243', city: 'Kinshasa' },
  { code: 'DJ', name: 'Djibouti', indicator: '+253', city: 'Djibouti' },
  { code: 'EG', name: 'Égypte', indicator: '+20', city: 'Le Caire' },
  { code: 'ET', name: 'Éthiopie', indicator: '+251', city: 'Addis-Abeba' },
  { code: 'GA', name: 'Gabon', indicator: '+241', city: 'Libreville' },
  { code: 'GH', name: 'Ghana', indicator: '+233', city: 'Accra' },
  { code: 'GN', name: 'Guinée', indicator: '+224', city: 'Conakry' },
  { code: 'GW', name: 'Guinée-Bissau', indicator: '+245', city: 'Bissau' },
  { code: 'KE', name: 'Kenya', indicator: '+254', city: 'Nairobi' },
  { code: 'LU', name: 'Luxembourg', indicator: '+352', city: 'Luxembourg' },
  { code: 'MA', name: 'Maroc', indicator: '+212', city: 'Casablanca' },
  { code: 'ML', name: 'Mali', indicator: '+223', city: 'Bamako' },
  { code: 'MR', name: 'Mauritanie', indicator: '+222', city: 'Nouakchott' },
  { code: 'MU', name: 'Maurice', indicator: '+230', city: 'Port-Louis' },
  { code: 'MX', name: 'Mexique', indicator: '+52', city: 'Mexico' },
  { code: 'NE', name: 'Niger', indicator: '+227', city: 'Niamey' },
  { code: 'NG', name: 'Nigeria', indicator: '+234', city: 'Lagos' },
  { code: 'PL', name: 'Pologne', indicator: '+48', city: 'Varsovie' },
  { code: 'PT', name: 'Portugal', indicator: '+351', city: 'Lisbonne' },
  { code: 'QA', name: 'Qatar', indicator: '+974', city: 'Doha' },
  { code: 'RO', name: 'Roumanie', indicator: '+40', city: 'Bucarest' },
  { code: 'RW', name: 'Rwanda', indicator: '+250', city: 'Kigali' },
  { code: 'SA', name: 'Arabie Saoudite', indicator: '+966', city: 'Riyad' },
  { code: 'SC', name: 'Seychelles', indicator: '+248', city: 'Victoria' },
  { code: 'SN', name: 'Sénégal', indicator: '+221', city: 'Dakar' },
  { code: 'SL', name: 'Sierra Leone', indicator: '+232', city: 'Freetown' },
  { code: 'TN', name: 'Tunisie', indicator: '+216', city: 'Tunis' },
  { code: 'TG', name: 'Togo', indicator: '+228', city: 'Lomé' },
  { code: 'TR', name: 'Turquie', indicator: '+90', city: 'Istanbul' },
  { code: 'TZ', name: 'Tanzanie', indicator: '+255', city: 'Dar es Salaam' },
  { code: 'UG', name: 'Ouganda', indicator: '+256', city: 'Kampala' },
  { code: 'US', name: 'États-Unis', indicator: '+1', city: 'New York' },
  { code: 'AE', name: 'Émirats Arabes Unis', indicator: '+971', city: 'Dubaï' },
  { code: 'BE', name: 'Belgique', indicator: '+32', city: 'Bruxelles' },
  { code: 'CH', name: 'Suisse', indicator: '+41', city: 'Genève' },
  { code: 'DE', name: 'Allemagne', indicator: '+49', city: 'Berlin' },
  { code: 'ES', name: 'Espagne', indicator: '+34', city: 'Madrid' },
  { code: 'IT', name: 'Italie', indicator: '+39', city: 'Rome' },
  { code: 'BR', name: 'Brésil', indicator: '+55', city: 'São Paulo' },
  { code: 'AR', name: 'Argentine', indicator: '+54', city: 'Buenos Aires' },
  { code: 'CL', name: 'Chili', indicator: '+56', city: 'Santiago' },
  { code: 'CO', name: 'Colombie', indicator: '+57', city: 'Bogotá' },
  { code: 'PE', name: 'Pérou', indicator: '+51', city: 'Lima' },
  { code: 'IN', name: 'Inde', indicator: '+91', city: 'Mumbai' },
  { code: 'CN', name: 'Chine', indicator: '+86', city: 'Pékin' },
  { code: 'JP', name: 'Japon', indicator: '+81', city: 'Tokyo' },
  { code: 'KR', name: 'Corée du Sud', indicator: '+82', city: 'Séoul' },
  { code: 'SG', name: 'Singapour', indicator: '+65', city: 'Singapour' },
  { code: 'AU', name: 'Australie', indicator: '+61', city: 'Sydney' },
  { code: 'CA', name: 'Canada', indicator: '+1', city: 'Toronto' },
  { code: 'ZA', name: 'Afrique du Sud', indicator: '+27', city: 'Johannesburg' },
];

export default function RegisterCompanyPage() {
  const { registerCompany } = useApp();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', logo: '', ownerFirstName: '', ownerLastName: '',
    email: '', phoneCode: '+33', phone: '', country: '', city: '',
    employeeCount: '', address: '', website: '', password: '', confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setLogoPreview(dataUrl);
        setFormData((prev) => ({ ...prev, logo: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (code: string) => {
    const country = countries.find(c => c.code === code);
    if (country) {
      setFormData(prev => ({ ...prev, country: code, city: country.city, phoneCode: country.indicator }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); }
    else {
      if (formData.password.length < 6) {
        addToast('Le mot de passe doit faire au moins 6 caractères', 'error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        addToast('Les mots de passe ne correspondent pas', 'error');
        return;
      }
      registerCompany({
        name: formData.name, logo: formData.logo || '',
        ownerFirstName: formData.ownerFirstName, ownerLastName: formData.ownerLastName,
        email: formData.email, phone: formData.phone,
        employeeCount: parseFloat(formData.employeeCount) || 0,
        address: (formData.city || '') + (formData.country ? ', ' + countries.find(c => c.code === formData.country)?.name : ''),
        website: formData.website
      });
      addToast('Entreprise créée avec succès', 'success');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <img src="/images/logo.png" alt="EmployéPro" className="w-16 h-16 rounded-xl object-cover" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Creer votre entreprise</h1>
          <p className="text-gray-500 mt-1">Rejoignez EmployePro - Plateforme RH Globale</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations de l'entreprise</h2>

                <div className="flex justify-center">
                  <input type="file" ref={logoInputRef} accept="image/*" onChange={handleLogoSelect} className="hidden" />
                  <div onClick={() => logoInputRef.current?.click()}
                    className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={24} className="text-gray-400" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom de votre entreprise" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prenom du dirigeant *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input type="text" name="ownerFirstName" value={formData.ownerFirstName} onChange={handleChange} placeholder="Prenom" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du dirigeant *</label>
                    <input type="text" name="ownerLastName" value={formData.ownerLastName} onChange={handleChange} placeholder="Nom" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@entreprise.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
                    <select value={formData.country} onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" required>
                      <option value="">Sélectionner un pays</option>
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ville" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telephone *</label>
                  <div className="flex">
                    <select value={formData.phoneCode} onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                      className="px-3 py-3 border border-r-0 border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm min-w-[120px]">
                      {countries.map(c => (
                        <option key={c.code} value={c.indicator}>{c.name} ({c.indicator})</option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="XX XX XX XX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'employes</label>
                  <input type="number" name="employeeCount" value={formData.employeeCount} onChange={handleChange} placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site internet</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="www.votre-site.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Securite du compte</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 8 caracteres" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Votre entreprise sera creee avec :</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>- Identifiant unique auto-genere</li>
                    <li>- Dashboard administrateur</li>
                    <li>- capacite d'invitation des employs</li>
                    <li>- Support {countries.find(c => c.code === formData.country)?.name || 'international'}</li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex space-x-4">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">Retour</button>
              )}
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                {step === 1 ? 'Continuer' : 'Creer mon entreprise'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Deja un compte ? <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
}
