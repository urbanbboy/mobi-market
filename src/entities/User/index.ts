export {
    userReducer,
    userActions
} from "./model/slice/userSlice";

export type {
    User,
    UserSchema
} from './model/types/User';

export { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
export { getUsername } from './model/selectors/getUsername/getUsername';
export { getFirstName } from './model/selectors/getFirstName/getFirstName';
export { getUserInited } from "./model/selectors/getUserInited/getUserInited";