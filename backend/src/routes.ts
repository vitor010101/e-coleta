import express from "express";
import itemsController from "./controllers/itemsController";
import pointsController from "./controllers/pointsController";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", itemsController.index);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
