import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connections: [] as any[]
    },
    reducers: {
        addConnections: (state, action: { payload: unknown[] }) => {
            return {
                connections: action.payload
            }
        },
        removeConnections: () => {
            return {
                connections: []
            }
        }    
    }
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;

