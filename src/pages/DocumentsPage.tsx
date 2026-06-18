import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Upload, Search, Folder, Download, Eye, Trash2, User, File, PenLine } from 'lucide-react';
import type { Document as AppDocument } from '../types';
import Modal from '../components/Modal';
import SignaturePad from '../components/SignaturePad';

const categories = ['Contrats', 'Certificats', 'Rapports', 'Politiques', 'Autres'];
const typeLabels: Record<string, string> = {
  contract: 'Contrat', certificate: 'Certificat', report: 'Rapport', policy: 'Politique', other: 'Autre',
};
const typeColors: Record<string, string> = {
  contract: 'bg-blue-50 text-blue-600', certificate: 'bg-green-50 text-green-600',
  report: 'bg-purple-50 text-purple-600', policy: 'bg-orange-50 text-orange-600', other: 'bg-gray-50 text-gray-600',
};

export default function DocumentsPage() {
  const { documents, addDocument, deleteDocument, signDocument, signatures } = useApp();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState({ name: '', category: '', type: 'other' as AppDocument['type'], file: null as File | null });

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData((prev) => ({ ...prev, name: file.name, file }));
    }
  };

  const handleUpload = () => {
    if (!uploadData.name) return;
    const file = uploadData.file;
    const size = file ? formatFileSize(file.size) : '1.0 MB';
    addDocument({
      name: uploadData.name,
      type: uploadData.type,
      department: 'Ressources Humaines',
      uploadedBy: 'Kofi Mensah',
      uploadedAt: new Date(),
      size,
      category: uploadData.category || 'Autres',
    });
    setUploadData({ name: '', category: '', type: 'other', file: null });
    setShowUploadModal(false);
    addToast('Document téléchargé', 'success');
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Supprimer ce document ?')) return;
    deleteDocument(id);
    addToast('Document supprimé', 'success');
  };

  const categoryStats = categories.map(cat => ({
    name: cat,
    count: documents.filter(d => d.category === cat).length,
  })).filter(s => s.count > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Documents RH</h1>
          <p className="text-gray-500">Gérez les documents de votre entreprise</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => addToast('Export en cours...', 'info')} className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
            <Download size={18} /><span>Exporter</span>
          </button>
          <button onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Upload size={18} /><span>Uploader</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categoryStats.map((stat, i) => (
          <button key={i} onClick={() => setCategoryFilter(stat.name)}
            className={`p-4 rounded-xl border transition-colors ${categoryFilter === stat.name ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-blue-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Folder size={16} className={categoryFilter === stat.name ? 'text-blue-600' : 'text-gray-400'} />
              <span className="text-sm font-medium text-gray-700">{stat.name}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher un document..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            {['all', ...categories].map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'Toutes les catégories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${typeColors[doc.type]}`}>
                <File size={24} />
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addToast('Aperçu non disponible hors ligne', 'info')} className="p-1.5 hover:bg-gray-100 rounded-lg"><Eye size={16} className="text-gray-400" /></button>
                <button onClick={() => setShowSignModal(doc.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><PenLine size={16} className="text-gray-400" /></button>
                <button onClick={() => handleDelete(doc.id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
            <h3 className="font-medium text-gray-800 mb-1 truncate">{doc.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{typeLabels[doc.type]} • {doc.category}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{doc.size}</span>
              <span>{doc.uploadedAt.toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center mt-2 pt-2 border-t border-gray-50">
              <User size={12} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{doc.uploadedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Folder size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucun document trouvé</p>
        </div>
      )}

      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Télécharger un document">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fichier *</label>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            <div onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
              {uploadData.file ? (
                <div className="flex items-center justify-center space-x-2">
                  <File size={24} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{uploadData.file.name}</span>
                  <span className="text-xs text-gray-400">({formatFileSize(uploadData.file.size)})</span>
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Cliquez pour sélectionner un fichier</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLS (max 10MB)</p>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select value={uploadData.category} onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">Sélectionner</option>
              {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={uploadData.type} onChange={(e) => setUploadData({ ...uploadData, type: e.target.value as AppDocument['type'] })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="contract">Contrat</option>
              <option value="certificate">Certificat</option>
              <option value="report">Rapport</option>
              <option value="policy">Politique</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <button onClick={handleUpload} disabled={!uploadData.file}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Télécharger
          </button>
        </div>
      </Modal>

      <Modal open={!!showSignModal} onClose={() => setShowSignModal(null)} title="Signer le document" maxWidth="md">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Dessinez votre signature ci-dessous :</p>
          <SignaturePad onSave={(dataUrl) => { if (showSignModal) { signDocument(showSignModal, dataUrl); setShowSignModal(null); addToast('Document signé', 'success'); } }} />
          {showSignModal && signatures[showSignModal] && (
            <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg p-3">
              <PenLine size={16} /><span>Signé le {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
