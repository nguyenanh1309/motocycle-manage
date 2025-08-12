import { configureStore } from "@reduxjs/toolkit";
import appearanceSlice from "@/redux/slices/appearanceSlice"

export const store = configureStore({
    reducer: {
        appearance: appearanceSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;