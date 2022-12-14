import { deleteUser, getUsers, postUser, updateUser } from "../../../controller/controller";
import connectMongo from "../../../data/dbConnection";


// this function handle ==> routing + call controller 
export default async function handler(req, res) {

    // MongoDB connection + Error Handel
    connectMongo().catch(() =>
        res.status(405).json({ error: 'Error in the Connection' })
    );

    // type of request ==> ['GET', 'POST', 'PUT', 'DELETE']
    const { method } = req;

    switch (method) {
        case 'GET':
            getUsers(req, res);
            break;
        case 'POST':
            postUser(req, res);
            break;
        case 'PUT':
            updateUser(req, res);
            break;
        case 'DELETE':
            deleteUser(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}