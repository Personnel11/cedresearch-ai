/* eslint-disable @typescript-eslint/no-explicit-any */
// types/database.ts

// Type pour la table documents
export interface Document {
  id: string;
  title: string;
  file_url: string;
  file_type: 'pdf' | 'docx';
  total_pages: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Type pour la table document_chunks
export interface DocumentChunk {
  id: string;
  document_id: string;
  content: string;
  embedding: number[]; // Array de 384 floats
  page_number: number;
  chunk_index: number;
  metadata: Record<string, any>;
  created_at: string;
}

// Type pour la table search_history
export interface SearchHistory {
  id: string;
  user_id: string;
  query: string;
  response: string | null;
  sources: Array<{
    doc_id: string;
    title: string;
    page: number;
    excerpt: string;
  }>;
  created_at: string;
}

// Type pour les résultats de recherche
export interface SearchResult {
  id: string;
  document_id: string;
  content: string;
  page_number: number;
  similarity: number;
}

// Type Database regroupant toutes les tables
export type Database = {
  public: {
    Tables: {
      documents: {
        Row: Document;
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Document, 'id' | 'created_at'>>;
      };
      document_chunks: {
        Row: DocumentChunk;
        Insert: Omit<DocumentChunk, 'id' | 'created_at'>;
        Update: Partial<Omit<DocumentChunk, 'id' | 'created_at'>>;
      };
      search_history: {
        Row: SearchHistory;
        Insert: Omit<SearchHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<SearchHistory, 'id' | 'created_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      file_type: 'pdf' | 'docx';
    };
  };
};