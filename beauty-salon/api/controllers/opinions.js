import Opinions from "../models/opinions.js";

export const createOpinion= async (req, res) => {
    const newOpinion = new Opinions(req.body);
    try {
        const savedOpinion = await newOpinion.save();
        res.status(200).json(savedOpinion)
    } catch(err){
        res.status(500).json(err);
    }
}


export const getOpinions = async (req, res) => {
    try {
        const opinions = await Opinions.find(req.query).limit(req.query.limit)
        res.status(200).json(opinions)
    } catch(err){
        res.status(500).json(err);
    }
}


export const sortOpinions = async (req, res) => {
    try {
        const query = req.query;
        const sortBy = query.sortBy || 'date'; 
        const sortOrder = query.sortOrder || 'desc'; 

        const opinions = await Opinions.find({})
            .sort({
                [sortBy]: sortOrder === 'desc' ? -1 : 1,
                'date': sortOrder === 'desc' && sortBy !== 'date' ? -1 : 1
            })
            .limit(query.limit);

        res.status(200).json(opinions);
    } catch (err) {
        res.status(500).json(err);
    }
};