
export const updateUser = (req, res)=>{
    try {
        res.json("success")
    } catch (error) {
        res.status(500).json(error)
    }
}