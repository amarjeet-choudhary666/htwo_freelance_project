const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL;

export interface Partner {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  description?: string;
  partnerType?: string;
  logoUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchPartners = async (): Promise<Partner[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/partners`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Filter only approved partners on the frontend as well for extra safety
    const partners = data.data || [];
    return partners.filter((partner: Partner) => partner.status === 'approved');
  } catch (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }
};