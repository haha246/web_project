import {
    apiGetRecipe,
    apiSearchRecipe,
    apiCreatePrivateRecipe,
    apiShowPrivateRecipes,
    apiUpdatePrivateRecipe,
    apiDeletePrivateRecipe
} from '../axios/recipe'

const useRecipe = (dispatch) => {
    const getPrivateRecipe = async (id) => {
        const recipe = await apiGetRecipe(id)
        return recipe;
    }

    const searchRecipe = async (search = '') => {
        const recipes = await apiSearchRecipe(search)
        dispatch({ type: 'SET_RECIPES', payload: { recipes } });
        return recipes;
    }

    // call this function when user create a recipe, and the privateRecipes will
    // automatic update
    const createPrivateRecipe = async (recipe) => {
        const newRecipe = await apiCreatePrivateRecipe(recipe)
        return newRecipe
    };
  
    // call this function to fetch personal recipes
    const showPrivateRecipes = async (userEmail) => {
        const showRecipes = await apiShowPrivateRecipes(userEmail)
        return showRecipes
    };

    // call this function to update the recipe, and the privateRecipes will
    // automatic update
    const updatePrivateRecipe = async (recipe) => {
        const updateRecipe = await apiUpdatePrivateRecipe(recipe)
        return updateRecipe
    };

    // call this function to delete the recipe, and the privateRecipes will
    // automatic update
    const deletePrivateRecipe = async (rid) => {
        await apiDeletePrivateRecipe(rid)
        dispatch({ type: 'DELETE_RECIPE', payload: { deleteId: rid } });
    };

    return {
        searchRecipe,
        getPrivateRecipe,
        createPrivateRecipe,
        showPrivateRecipes,
        updatePrivateRecipe,
        deletePrivateRecipe,
    };
};

export default useRecipe;