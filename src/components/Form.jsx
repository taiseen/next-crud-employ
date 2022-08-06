import { FormAddUser, FormUpdateUser } from ".";

// This <Component /> call from 🟨 index.js 🟨
export default function Form() {

    const flag = false;

    return (
        <div className="container mx-auto py-5">
            {
                flag
                    ? <FormAddUser />
                    : <FormUpdateUser />
            }
        </div>
    );

}
