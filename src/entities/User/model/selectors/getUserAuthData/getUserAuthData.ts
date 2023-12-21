import { StateSchema } from "@app/providers/StoreProvider";

export const getUserAuthData = ( state: StateSchema ) => state.user.authData
// я сделал user entiity, и теперь храню данные user в localstorage