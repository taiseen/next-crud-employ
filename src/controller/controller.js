// 🟨🟨🟨 ./pages/api/users/index.js <== call these function's 🟨🟨🟨
// router call this controller CURD function's...

import Users from '../model/user';


// GET : http://localhost:3000/api/users
export async function getUsers(req, res) {

    try {
        const users = await Users.find({})

        if (!users) return res.status(404).json({ error: "Data not found." })

        // send users data into frontend...
        res.status(200).json(users);

    } catch (error) {
        res.status(404).json({ error: 'Error while data fetching...' })
    }
}


// GET : http://localhost:3000/api/users/ID
// ID ==> come from query parameter
export async function getUser(req, res) {

    try {
        const { userID } = req.query;

        console.log(userID);

        if (userID) {
            // get single user data from backend database...
            const singleUser = await Users.findById(userID)
            return res.status(200).json(singleUser);
        }

        return res.status(404).json({ error: "User id not selected." })

    } catch (error) {
        res.status(404).json({ error: 'Can not get user...' })
    }
}



// POST : http://localhost:3000/api/users
export async function postUser(req, res) {

    try {
        const formData = req.body;

        if (!formData) return res.status(404).json({ error: "Form data not provided." })

        // save users data into backend database...
        await Users.create(formData, (err, data) => {
            return res.status(200).json(data)
        });

    } catch (error) {
        res.status(404).json({ error: 'Error while sending data...' })
    }
}



// PUT : http://localhost:3000/api/users/ID
// ID ==> come from query parameter
export async function updateUser(req, res) {

    try {
        const { userID } = req.query;
        const formData = req.body;

        if (userID && formData) {
            // update users data into backend database...
            const updatedUser = await Users.findByIdAndUpdate(userID, formData, { new: true })
                .select({ __v: 0, });

            return res.status(200).json(updatedUser);
        }

        return res.status(404).json({ error: "User not selected." })

    } catch (error) {
        res.status(404).json({ error: 'Error while sending data...' })
    }
}



// DELETE : http://localhost:3000/api/users/ID
// ID ==> come from query parameter
export async function deleteUser(req, res) {

    try {
        const { userID } = req.query;

        if (userID) {
            // delete users data from backend database...
            await Users.findByIdAndDelete(userID)
            return res.status(200).json({ deleted: userID });
        }

        return res.status(404).json({ error: "User not selected." })

    } catch (error) {
        res.status(404).json({ error: 'Error While Deleting User...' })
    }
}