import axios from './axios'

export const homePageRecipe = async () => { 
  const { data } = await axios.post('/recipe/homePage');
  return data;
};

export const apiSearchRecipe = async search => {
  const { data } = await axios.get(`/recipe/search?search=${search}`)
  return data
};

export const apiGetRecipe = async id => {
  console.log('id', id)
  const { data } = await axios.get(`/recipe/${id}`)
  return data
}

export const apiCreatePrivateRecipe = async (recipe) => { 
  const { data } = await axios.post('/recipe/private', recipe);
  return data;
};

export const apiShowPrivateRecipes = async (userEmail) => {
  const { data } = await axios.get('/recipe/private', {}, { 
    params: { userEmail }
  });
  return data;
};

export const apiUpdatePrivateRecipe = async (recipe) => { 
  const { data } = await axios.put('/recipe/private', {}, { 
    params: { recipe } 
  });
  return data;
};

export const apiDeletePrivateRecipe = async (recipeID) => { 
  const { data } = await axios.delete('/recipe/private', { 
    params: { recipeID } 
  });
  return data;
};
