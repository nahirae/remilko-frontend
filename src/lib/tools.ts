import { getAuth, postAuth, putAuth, deleteAuth } from './api';

export interface Tool {
  id: string;
  recipe_id: string;
  tool_name: string;
}

export interface ToolsApiResponse {
  data: {
    tools: Tool[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

interface SingleToolApiResponse {
  data: Tool;
}

export const getPublicRecipeTools = async (recipeId: string): Promise<Tool[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth<ToolsApiResponse>(`/user/recipes/${recipeId}/tools`);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching tools for recipe ${recipeId}:`, error);
    return [];
  }
};

export const getTools = async (recipeId: string): Promise<Tool[]> => {
  if (!recipeId) return [];

  try {
    const response = await getAuth<ToolsApiResponse>(
      `/user/recipes/${recipeId}/tools`
    );
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching tools for recipe_id ${recipeId}:`, error);
    return [];
  }
};

//creator
export const addToolToRecipe = async (recipeId: string, toolData: { tool_name: string }): Promise<Tool> => {
  const response = await postAuth<SingleToolApiResponse>(`/creator/recipes/${recipeId}/tools`, toolData);
  return response.data;
};

export const updateTool = async (recipeId: string, toolId: string, toolData: { tool_name: string }): Promise<Tool> => {
  const response = await putAuth<SingleToolApiResponse>(`/creator/recipes/${recipeId}/tools/${toolId}`, toolData);
  return response.data;
};

export const deleteTool = async (recipeId: string, toolId: string): Promise<void> => {
  await deleteAuth(`/creator/recipes/${recipeId}/tools/${toolId}`);
};