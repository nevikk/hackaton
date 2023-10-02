import { createSelector } from "@reduxjs/toolkit";

const items = (state) => state?.check?.items || {};

export const getCheckDataItems = createSelector(
  [items], (items) => items
)