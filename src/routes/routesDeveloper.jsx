import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Roles from "../pages/developer/settings/roles/Roles";

export const routerDeveloper = [
    {
        path:`${devNavUrl}/${urlDeveloper}/`,
        element: <>
        </>
    },
    {
        path:`${devNavUrl}/${urlDeveloper}/settings/users/roles`,
        element: <>
        <Roles />
        </>
    },
];