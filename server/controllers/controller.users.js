const UserModel = require('../Models/Model.User');


module.exports.AllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors with a 500 status code
    }
}


module.exports.AddUser = async (req, res) => {
    try {

        console.log("req.file", formData);
        // console.log("reqfile", reqfile);
        // Here, you can save the user data and the file to your database or perform other actions

        res.status(200).json({ message: 'Form data received successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
