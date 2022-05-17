import ProjectServices from "./projectServices";
import UserServices from "./UserServices";
import ValidationService from "./validationService";

export const userServices = new UserServices();
export const validationService = new ValidationService();
export const projectService = new ProjectServices();
