// category.action.js
import { createAction } from "@reduxjs/toolkit";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = createAction(
  CATEGORIES_ACTION_TYPES.SET_CATEGORIES
);
