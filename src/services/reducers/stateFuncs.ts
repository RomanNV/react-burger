const getIngredientsFromState = (state: any) => state.ingredientsData;
const getConstructorData = (state: any) => state.constructorData;
const getConstructorModal = (state: any) => state.constructorModal;
const getIngredientsDataFromState = (state: any) => state.ingredientsData;
const getIngredientsModal = (state: any) => state.ingredientModal;
const authState = (state: any) => state.auth;
const totalPriceState = (state: any) => state.totalPrice;
const ingredientsDataState = (state: any) => state.ingredientsData;
export {
  getIngredientsFromState,
  getConstructorData,
  getConstructorModal,
  getIngredientsDataFromState,
  getIngredientsModal,
  authState,
  totalPriceState,
  ingredientsDataState,
};
