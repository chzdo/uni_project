import { Model } from "sequelize";

interface testModelInstance extends Model {
 firstName: string;
 otherName: string;
 dob: Date;
 isDeleted: boolean;
}

export { testModelInstance };
