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
export interface ModalType {
  children: React.ReactElement;
  isOpenModal: boolean;
  closeModal: () => void;
}
