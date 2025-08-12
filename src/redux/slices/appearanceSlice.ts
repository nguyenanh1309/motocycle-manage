import { createSlice } from "@reduxjs/toolkit";

const appearanceSlice = createSlice(
    {
        name: 'appearance',
        initialState: {
            isExpanded: true,
        },
        reducers: {
            setIsExpanded: (state, action) => {
                state.isExpanded = action.payload;
            }
        }
    }
)

export const { setIsExpanded } = appearanceSlice.actions;
export default appearanceSlice.reducer;