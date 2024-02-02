import User from "../models/User";

export const getUser = async (req, res) => { 
    try {   
         const { id } = req.params;
         const user = await User.findById(id);
         return res.status(200).json(user)
    } catch(error) {
        return res.status(404).json({ error: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedResponse = friends.map(({ id, firstName, lastName, location, occupation, picturePath }) => {
            return { id, firstName, lastName, location, occupation, picturePath }
        })
        return res.status(200).json(formattedResponse);
    } catch(error) {
        return res.status(404).json({ error: error.message });
    }
}

export const addRemoveFriend = async () => {
    try {
        const { id, friendid } = req.params;
        const user = await User.findById(id);
        
        if(user.friends.includes(friendid)) {
            user.friends = user.friends.filter((id) => id !== friendid);
        } else {
            user.friends.push(friendid);
        }
        await user.save()
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedResponse = friends.map(({ id, firstName, lastName, location, occupation, picturePath }) => {
            return { id, firstName, lastName, location, occupation, picturePath }
        })
        res.status(200).json(formattedResponse);

    } catch (err) {
        return res.status(404).json({ error: error.message });
    }
}