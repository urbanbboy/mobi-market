import { RouteProps } from "react-router-dom";


export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    hasSidebar?: boolean;
    isNewUser?: boolean;
}