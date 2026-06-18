import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import {
  Target, Star, Plus, Edit2, Trash2, Calendar, CheckCircle, XCircle, Clock, User as UserIcon
} from 'lucide-react';
import Modal from '../components/Modal';
import type { Objective, ObjectiveStatus } from '../types';

const statusConfig: Record<ObjectiveStatus, { label: string; class: string; icon: typeof Clock }> = {
  pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-700', icon: Clock },
  in_progress: { label: 'En cours', class: 'bg-blue-100 text-blue-700', icon: Target },
  completed: { label: 'Terminé', class: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Annulé', class: 'bg-red-100 text-red-700', icon: XCircle },
};

const categories = ['Performance', 'Formation', 'Projet', 'Carrière', 'Personnel'];

const objectiveFormDefault = {
  title: '',
  description: '',
  deadline: '',
  category: 'Performance',
  employeeId: '',
  status: 'pending' as ObjectiveStatus,
};

const reviewFormDefault = {
  employeeId: '',
  rating: 5,
  feedback: '',
  strengths: '',
  improvements: '',
};

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(star)}
          className={`${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            size={20}
            className={star <= value ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">{value}/5</span>
    </div>
  );
}

export default function ObjectivesPage() {
  const { employees, currentUser, objectives, performanceReviews, addObjective, updateObjective, deleteObjective, addPerformanceReview } = useApp();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'objectives' | 'reviews'>('objectives');

  // Objective modal state
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [editingObjective, setEditingObjective] = useState<string | null>(null);
  const [objectiveForm, setObjectiveForm] = useState(objectiveFormDefault);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState(reviewFormDefault);

  const activeEmployees = employees.filter((e) => e.status === 'active');

  const getEmployeeName = (id: string) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : '-';
  };

  // ---- Objective handlers ----

  const openCreateObjective = () => {
    setObjectiveForm(objectiveFormDefault);
    setEditingObjective(null);
    setShowObjectiveModal(true);
  };

  const openEditObjective = (obj: Objective) => {
    setObjectiveForm({
      title: obj.title,
      description: obj.description,
      deadline: obj.deadline instanceof Date ? obj.deadline.toISOString().split('T')[0] : String(obj.deadline).split('T')[0],
      category: obj.category,
      employeeId: obj.employeeId,
      status: obj.status,
    });
    setEditingObjective(obj.id);
    setShowObjectiveModal(true);
  };

  const handleSaveObjective = () => {
    if (!objectiveForm.title.trim() || !objectiveForm.employeeId || !objectiveForm.deadline) {
      addToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    const payload = {
      title: objectiveForm.title,
      description: objectiveForm.description,
      deadline: new Date(objectiveForm.deadline),
      category: objectiveForm.category,
      employeeId: objectiveForm.employeeId,
      status: objectiveForm.status,
      createdBy: currentUser?.id || '',
    };

    if (editingObjective) {
      updateObjective(editingObjective, payload);
      addToast('Objectif mis à jour', 'success');
    } else {
      addObjective(payload);
      addToast('Objectif créé', 'success');
    }

    setShowObjectiveModal(false);
    setObjectiveForm(objectiveFormDefault);
    setEditingObjective(null);
  };

  const handleDeleteObjective = (id: string) => {
    deleteObjective(id);
    addToast('Objectif supprimé', 'success');
  };

  // ---- Review handlers ----

  const openCreateReview = () => {
    setReviewForm(reviewFormDefault);
    setShowReviewModal(true);
  };

  const handleSaveReview = () => {
    if (!reviewForm.employeeId || !reviewForm.feedback.trim()) {
      addToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    addPerformanceReview({
      employeeId: reviewForm.employeeId,
      reviewerId: currentUser?.id || '',
      reviewDate: new Date(),
      rating: reviewForm.rating,
      feedback: reviewForm.feedback,
      strengths: reviewForm.strengths.split('\n').filter(Boolean),
      improvements: reviewForm.improvements.split('\n').filter(Boolean),
      objectiveIds: [],
      status: 'submitted',
    });

    addToast('Évaluation créée', 'success');
    setShowReviewModal(false);
    setReviewForm(reviewFormDefault);
  };

  const getReviewerName = (id: string) => getEmployeeName(id);

  const reviewsForEmployee = (empId: string) => performanceReviews.filter((r) => r.employeeId === empId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Objectifs & Évaluations</h1>
          <p className="text-gray-500 dark:text-gray-400">Suivez les objectifs et les performances des employés</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab('objectives')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'objectives'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Target size={18} />
          <span>Objectifs</span>
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'reviews'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Star size={18} />
          <span>Évaluations</span>
        </button>
      </div>

      {activeTab === 'objectives' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={openCreateObjective}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Nouvel objectif</span>
            </button>
          </div>

          <div className="space-y-3">
            {objectives.length === 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center border border-gray-200 dark:border-gray-700">
                <Target size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Aucun objectif pour le moment</p>
              </div>
            )}
            {objectives.map((obj) => {
              const StatusIcon = statusConfig[obj.status].icon;
              return (
                <div
                  key={obj.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">{obj.title}</h3>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[obj.status].class}`}>
                          <StatusIcon size={12} />
                          <span>{statusConfig[obj.status].label}</span>
                        </span>
                      </div>
                      {obj.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{obj.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <UserIcon size={14} />
                          <span>{getEmployeeName(obj.employeeId)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(obj.deadline).toLocaleDateString('fr-FR')}</span>
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">{obj.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditObjective(obj)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} className="text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteObjective(obj.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Modal
            open={showObjectiveModal}
            onClose={() => setShowObjectiveModal(false)}
            title={editingObjective ? "Modifier l'objectif" : 'Nouvel objectif'}
            maxWidth="lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre *</label>
                <input
                  type="text"
                  value={objectiveForm.title}
                  onChange={(e) => setObjectiveForm({ ...objectiveForm, title: e.target.value })}
                  placeholder="Titre de l'objectif"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={objectiveForm.description}
                  onChange={(e) => setObjectiveForm({ ...objectiveForm, description: e.target.value })}
                  rows={3}
                  placeholder="Description de l'objectif..."
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date limite *</label>
                  <input
                    type="date"
                    value={objectiveForm.deadline}
                    onChange={(e) => setObjectiveForm({ ...objectiveForm, deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
                  <select
                    value={objectiveForm.category}
                    onChange={(e) => setObjectiveForm({ ...objectiveForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employé *</label>
                <select
                  value={objectiveForm.employeeId}
                  onChange={(e) => setObjectiveForm({ ...objectiveForm, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Sélectionner un employé</option>
                  {activeEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                  ))}
                </select>
              </div>
              {editingObjective && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                  <select
                    value={objectiveForm.status}
                    onChange={(e) => setObjectiveForm({ ...objectiveForm, status: e.target.value as ObjectiveStatus })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {Object.entries(statusConfig).map(([key, cfg]) => (
                      <option key={key} value={key}>{cfg.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowObjectiveModal(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveObjective}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700"
                >
                  {editingObjective ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}

      {activeTab === 'reviews' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={openCreateReview}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Nouvelle évaluation</span>
            </button>
          </div>

          <div className="space-y-3">
            {performanceReviews.length === 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center border border-gray-200 dark:border-gray-700">
                <Star size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Aucune évaluation pour le moment</p>
              </div>
            )}
            {activeEmployees.map((emp) => {
              const reviews = reviewsForEmployee(emp.id);
              if (reviews.length === 0) return null;
              return (
                <div key={emp.id} className="space-y-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                    <UserIcon size={18} className="text-gray-400" />
                    <span>{emp.firstName} {emp.lastName}</span>
                    <span className="text-sm font-normal text-gray-500">({emp.position})</span>
                  </h3>
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 ml-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <StarRating value={review.rating} />
                            <span className="text-xs text-gray-400">
                              {new Date(review.reviewDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{review.feedback}</p>
                          {review.strengths.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Points forts</p>
                              <div className="flex flex-wrap gap-1">
                                {review.strengths.map((s, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs">{s}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {review.improvements.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">Axes d'amélioration</p>
                              <div className="flex flex-wrap gap-1">
                                {review.improvements.map((imp, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs">{imp}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 text-right flex-shrink-0">
                          <p>Évaluateur: {getReviewerName(review.reviewerId)}</p>
                          <span className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {review.status === 'draft' ? 'Brouillon' : review.status === 'submitted' ? 'Soumis' : 'Accepté'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <Modal
            open={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            title="Nouvelle évaluation"
            maxWidth="lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employé *</label>
                <select
                  value={reviewForm.employeeId}
                  onChange={(e) => setReviewForm({ ...reviewForm, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Sélectionner un employé</option>
                  {activeEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Évaluateur</label>
                <input
                  type="text"
                  value={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note *</label>
                <StarRating
                  value={reviewForm.rating}
                  onChange={(v) => setReviewForm({ ...reviewForm, rating: v })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feedback *</label>
                <textarea
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                  rows={4}
                  placeholder="Feedback détaillé..."
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Points forts</label>
                  <textarea
                    value={reviewForm.strengths}
                    onChange={(e) => setReviewForm({ ...reviewForm, strengths: e.target.value })}
                    rows={3}
                    placeholder="Un par ligne"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Axes d'amélioration</label>
                  <textarea
                    value={reviewForm.improvements}
                    onChange={(e) => setReviewForm({ ...reviewForm, improvements: e.target.value })}
                    rows={3}
                    placeholder="Un par ligne"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveReview}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700"
                >
                  Créer l'évaluation
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
