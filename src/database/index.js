import { Sequelize } from "sequelize";
import dbConfig from "./config/indexES6.js";

import Blacklist from "../models/blacklist.js";
import Permission from "../models/permission.js";
import ProfilePermission from "../models/profile-permission.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";

const connection = new Sequelize(dbConfig);

Blacklist.init(connection);
Permission.init(connection);
ProfilePermission.init(connection);
Profile.init(connection);
User.init(connection);

Permission.associate(connection.models);
ProfilePermission.associate(connection.models);
Profile.associate(connection.models);
User.associate(connection.models);

export default connection;
