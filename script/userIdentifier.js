import { valueGetter } from "./generic.js";
/*this function takes the username
after checking credintials and redirects to the suitable page */
export function redirect(value,key="Username") {
    let title = valueGetter(value, key, "Title", "users")
    if (title.toLocaleLowerCase() == "admin")
        window.location = "./admin.html";
    else if (title.toLocaleLowerCase() == "security")
        window.location = "./security.html";
    else
        window.location = "./employee.html";
}
