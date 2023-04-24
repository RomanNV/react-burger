export const OPEN_CONSTRUCTOR_MODAL: "OPEN_CONSTRUCTOR_MODAL" =
  "OPEN_CONSTRUCTOR_MODAL";
export const CLOSE_CONSTRUCTOR_MODAL: "CLOSE_CONSTRUCTOR_MODAL" =
  "CLOSE_CONSTRUCTOR_MODAL";

export interface CloseConstructorModal {
  type: typeof CLOSE_CONSTRUCTOR_MODAL;
}
export interface OpenConstructorModal {
  type: typeof OPEN_CONSTRUCTOR_MODAL;
}
export type constructorModalActions =
  | CloseConstructorModal
  | OpenConstructorModal;

export function closeConstructorModalAction(): CloseConstructorModal {
  return { type: CLOSE_CONSTRUCTOR_MODAL };
}
export function openConstructorModalAction(): OpenConstructorModal {
  return { type: OPEN_CONSTRUCTOR_MODAL };
}
