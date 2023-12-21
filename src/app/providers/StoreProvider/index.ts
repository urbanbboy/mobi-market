import { StateSchema, ThunkExtraArg } from './config/stateSchema';
import { AppDispatch, store } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";

export {
    store,
    StoreProvider,
}

export type {
    AppDispatch,
    StateSchema,
    ThunkExtraArg
}