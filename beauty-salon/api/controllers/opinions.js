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
