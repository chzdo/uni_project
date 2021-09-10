import { Model } from "sequelize";

interface testModelInstance extends Model {
 firstName: boolean;
 otherName: string;
 dob: Date;
 isDeleted: boolean;
}

export { testModelInstance };
