import { configureStore } from "@reduxjs/toolkit";

import assetsReducer  from "./assetSlice";

export const store = configureStore({
  reducer:{
    assets:assetsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>