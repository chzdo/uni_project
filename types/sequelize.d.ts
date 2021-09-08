import { Model } from "sequelize";

interface testModelInstance extends Model {
 firstName: boolean;
 age: string;
 createdOn: number;
 isActive: boolean;
}

export { testModelInstance };
