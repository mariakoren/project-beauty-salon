import Service from "../models/service.js";
import Time from "../models/times.js";

export const createService = async (req, res) => {
    const newService = new Service(req.body);
    try {
        const savedService = await newService.save();
        res.status(200).json(savedService)
    } catch(err){
        res.status(500).json(err);
    }
}

export const updatedService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
            )

        res.status(200).json(updatedService)
    } catch(err){
        res.status(500).json(err);
    }
}

export const deleteService = async (req, res) => {

    try {
       await Service.findByIdAndDelete(
            req.params.id
            )

        res.status(200).json("service has been deleted")
    } catch(err){
        res.status(500).json(err);
    }
}

export const getService = async (req, res) => {

    try {
        const service = await Service.findById(
            req.params.id, 
            )

        res.status(200).json(service)
    } catch(err){
        res.status(500).json(err);
    }
} 

export const getallService = async (req, res) => {

    try {
        const services = await Service.find(req.query).limit(req.query.limit)
        res.status(200).json(services)
    } catch(err){
        res.status(500).json(err);
    }
}

export const countByType = async (req, res, next) => {
    const types = req.query.types.split(',');
    try{
        const list = await Promise.all(types.map(type => {
            return Service.countDocuments({type:type})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const getServiceTimes = async (req, res, next) => {
    try {
      const service = await Service.findById(req.params.id);
      const list = await Promise.all(
        service.times.map((time) => {
          return Time.findById(time);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

//   export const getFilteredServices = async (req, res) => {
//     try {
//         const searchConditions = {
//             $or: [
//                 { type: { $regex: req.query.pattern, $options: 'i' } },
//                 { name: { $regex: req.query.pattern, $options: 'i' } },
//                 { desc: { $regex: req.query.pattern, $options: 'i' } }
//             ]
//         };
//         const services = await Service.find(searchConditions).limit(req.query.limit);
//         res.status(200).json(services);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


export const getFilteredServices = async (req, res) => {
    try {
        const pattern = req.query.pattern;
        const searchConditions = {
            $or: [
                { type: { $regex: pattern.split('').join('.*'), $options: 'i' } },
                { name: { $regex: pattern.split('').join('.*'), $options: 'i' } },
                { desc: { $regex: pattern.split('').join('.*'), $options: 'i' } }
            ]
        };
        const services = await Service.find(searchConditions).limit(req.query.limit);
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

