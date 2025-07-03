import { getAuth } from "./api";

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

// export const getTools = async (recipeId: string, page: number = 1): Promise<Tool[]> => {
//   try {
//     const response = await getAuth<ToolsApiResponse>(
//       `/user/recipes/${recipeId}/tools?page=${page}`
//     );
//     return response.data.tools || [];
//   } catch (error) {
//     console.error(`Error fetching tools for recipe_id ${recipeId}:`, error);
//     return [];
//   }
// };

// export default { getTools };

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