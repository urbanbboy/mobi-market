import { StateSchema } from "@app/providers/StoreProvider";

export const getProfileUsername = (state: StateSchema) => state?.profile?.data?.username || ''