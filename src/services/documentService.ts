import api from '../lib/axios';

interface AppDocument {
  id: string;
  companyId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  department?: string;
  category?: string;
}

export async function getDocuments(params?: {
  department?: string;
  category?: string;
}): Promise<AppDocument[]> {
  const { data } = await api.get('/documents', { params });
  return data;
}

export async function createDocument(doc: Omit<AppDocument, 'id'>): Promise<AppDocument> {
  const { data } = await api.post('/documents', doc);
  return data;
}

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`/documents/${id}`);
}

export async function uploadDocument(file: File, metadata: Record<string, string>): Promise<AppDocument> {
  const formData = new FormData();
  formData.append('file', file);
  Object.entries(metadata).forEach(([k, v]) => formData.append(k, v));
  const { data } = await api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
