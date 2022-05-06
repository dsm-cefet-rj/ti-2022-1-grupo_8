import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";


export default configureStore({
    reducer: {
        carrinho: carrinhoSlice.reducer,
    },
});
