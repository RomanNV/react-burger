import React from "react";

export interface LocationState {
  from?: {
    pathname: string;
  };
}
export interface BunFields {
  name: string;
  price: number;
  image: string;
}
export interface IngredientCard {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}
export interface IngredientCardWithId {
  itemId: number;
  ingredient: IngredientCard;
}
export interface CloseModalType {
  closeModal: () => void;
}
export interface ModalType extends CloseModalType {
  children: React.ReactElement;
  isOpenModal: boolean;
}
export interface ColorRingType {
  visible: boolean;
  height: string;
  width: string;
  ariaLabel: string;
  wrapperStyle: Object;
  wrapperClass: string;
  colors: Array<string>;
}
export interface ErrorType {
  error: string;
}
export interface TotalPriceType {
  listIdOrder: string[];
  totalPrice: number;
}
export interface ConstructorItemType {
  index: number;
  item: IngredientCardWithId;
}
export interface ReorderItemType {
  drugIndex: number;
  hoverIndex: number;
}
export interface HoverItemType {
  index: number;
}
export interface DragItem {
  index: number;
  id: string;
  type: string;
}
export interface CounterStateType {
  bun: number;
  ingredient: number;
}
export interface BurgerIngredientsItemType {
  ingredient: IngredientCard;
  setBunId: (arg: string) => void;
  bunId: string;
}
