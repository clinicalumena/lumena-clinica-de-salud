
import React from 'react';

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  relatedServices?: string[];
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  imageUrl: string;
  shortBio: string;
  bio: string;
  specialties: string[];
  availability: string[];
  externalPublications: {
    title: string;
    url: string;
    source: string;
  }[];
  socials: {
    instagram?: string;
    x?: string;
    tiktok?: string;
    facebook?: string;
    linkedin?: string;
    email?: string;
  };
}


export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorSlug: string; // Changed from author: string
  date: string;
  imageUrl:string;
  category: string;
  // Optional properties that will be added dynamically
  author?: Author;
  readingTime?: number; 
}


export interface NavLink {
  href: string;
  label: string;
}

export interface Expert {
  name: string;
  specialty: string;
  imageUrl: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  imageUrl: string;
}

// --- NEW INTERFACES FOR DETAILED SERVICES ---

export interface SpecificService {
  slug: string; // Added slug for routing
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number;
}

export interface ServiceCategoryDetail {
  slug: string;
  name: string;
  description: string;
  services: SpecificService[];
}