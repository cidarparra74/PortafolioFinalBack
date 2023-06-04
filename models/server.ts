import express, { Application } from "express";
import cors from "cors";
import db from "../db/conectionConfig";
import userRoutes from "../routes/routingUser";
import authRoutes from "../routes/auth";
import projectsRoutes from "../routes/routingProject";
import { errorHandler } from "../middlewares/errorHandler";
import tecnologyRoutes from "../routes/routingTecnology";
import experienceRoutes from "../routes/routingExperience";

class Server {
  private app: Application;
  private port: string | undefined;
  private apiPaths = {
    usuarios: "/api/users",
    auth: "/api/auth",
    project: "/api/project",
    Tecnology: "/api/tecnology",
    experience: "/api/experience",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.dbConnection();
    this.middlewares();
    this.routes();
    this.app.use(errorHandler);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("database online");
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/uploads", express.static("uploads"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.project, projectsRoutes);
    this.app.use(this.apiPaths.Tecnology, tecnologyRoutes);
    this.app.use(this.apiPaths.experience, experienceRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("SERVIDOR CORRIENDO EN EL PUERTO", this.port);
    });
  }
}

export default Server;
