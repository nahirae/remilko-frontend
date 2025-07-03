import { getAuth } from "./api";

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

// export const getSteps = async (recipeId: string, page: number = 1): Promise<Step[]> => {
//   try {
//     const response = await getAuth<StepsResponse>(
//       `/user/recipes/${recipeId}/steps?page=${page}`
//     );
//     const mappedSteps = response.data.steps.map((step) => ({
//       id: step.id,
//       recipe_id: step.recipe_id,
//       step_number: step.step_number,
//       step_description: step.step_description,
//       photo_step: step.photo_step || undefined, // Opsional, default undefined jika tidak ada
//     }));
//     return mappedSteps;
//   } catch (error) {
//     console.error(`Error fetching steps for recipe_id ${recipeId}:`, error);
//     return [];
//   }
// };

// export default { getSteps };

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