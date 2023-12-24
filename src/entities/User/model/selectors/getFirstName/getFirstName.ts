import { StateSchema } from "@app/providers/StoreProvider";

export const getFirstName = (state: StateSchema) => state.user.authData?.first_name