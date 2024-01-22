import express from "express";
import { createService, deleteService, getService, getallService, updatedService, countByType,  getFilteredServices } from "../controllers/service.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import Service from "../models/service.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createService)

//UPDATE
router.put("/:id", verifyAdmin, updatedService)

//DELETE
router.delete("/:id",verifyUser, deleteService)

//GET
router.get("/find/:id", getService)

//GET ALL
router.get("/", getallService)
router.get("/search", getFilteredServices)

//GET BY TYPE
router.get("/countByType", countByType)



// router.get("/time/:id", getServiceTimes )


//  Pobranie danych o dostępnych dniach oraz terminach
router.get('/:serviceId/dates', async (req, res) => {
    const { serviceId } = req.params;
    try {
        const service = await Service.findById(serviceId, 'dates');
        const avaible = service.dates.reduce((acc, day) => {
            const timesForDay = day.times.reduce((ac, time) => {
                if (time.isAvaible === true) {
                    ac.push(time.title);
                }
                return ac;
            }, []);
            acc.push({ [day.dayTitle]: timesForDay });
            return acc;
        }, []);
        res.json(avaible);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
    }
});

// Wyświetlenie dostępnych godzin dla danej usługi i dnia
router.get('/:serviceId/availability', async (req, res) => {
    const { serviceId } = req.params;
    const { dayTitle } = req.query;

    try {
        const service = await Service.findById(serviceId, 'dates');
        const selectedDay = service.dates.find(day => day.dayTitle === dayTitle);

        if (selectedDay) {
            const selectedTimes = selectedDay.times.filter(time => time.isAvaible);
            res.json(selectedTimes);
        } else {
            res.status(404).json({ message: 'Brak danych dla wybranego dnia.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
    }
});



export default router;
