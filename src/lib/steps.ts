import { getAuth, postAuth, putAuth, deleteAuth } from './api';

export interface Step {
  id: string;
  recipe_id: string;
  step_number: number;
  step_description: string;
  photo_step?: string | null;
}

export interface StepsApiResponse {
  data: {
    steps: Step[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

interface SingleStepApiResponse {
  data: Step;
}

export const getPublicRecipeSteps = async (recipeId: string): Promise<Step[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth<StepsApiResponse>(`/user/recipes/${recipeId}/steps`);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching steps for recipe ${recipeId}:`, error);
    return [];
  }
};

export const getSteps = async (recipeId: string): Promise<Step[]> => {
  if (!recipeId) return [];

  try {
    const response = await getAuth<StepsApiResponse>(
      `/user/recipes/${recipeId}/steps`
    );
    
    return response.data || [];

  } catch (error) {
    console.error(`Error fetching steps for recipe_id ${recipeId}:`, error);
    return [];
  }
};

//creator
export const getStepsForCreator = async (recipeId: string): Promise<Step[]> => {
  const response = await getAuth(`/creator/recipes/${recipeId}/steps`);
  return response.data || [];
};

export const addStepToRecipe = async (recipeId: string, data: FormData): Promise<Step> => {
  const response = await postAuth(`/creator/recipes/${recipeId}/steps`, data);
  return response.data;
};

export const updateStep = async (recipeId: string, stepId: string, data: FormData): Promise<Step> => {
  data.append('_method', 'PUT');
  const response = await postAuth(`/creator/recipes/${recipeId}/steps/${stepId}`, data);
  return response.data;
};

export const deleteStep = async (recipeId: string, stepId: string): Promise<void> => {
  await deleteAuth(`/creator/recipes/${recipeId}/steps/${stepId}`);
};