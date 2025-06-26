import { getAuth } from './api';
import type { Recipe } from './recipes'; 

// Interface lain yang spesifik untuk dashboard
interface RecookResult {
  id: string;
  photo_recook: string | null;
  recipe_id: string;
  user_id: string;
  status: string;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  trending: Recipe[];
  explore: Recipe[];
  recommended: Recipe[];
  creator_recipes: Recipe[];
  recook_results: RecookResult[];
}

interface DashboardApiResponse {
  data: DashboardData;
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await getAuth<DashboardApiResponse>('/user/Dashboard');
  
  return response.data;
};