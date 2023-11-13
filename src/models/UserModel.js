import { userRolesConst } from "../constants/userRolesConst";
import { commonConst } from "../constants/commonConst";
import { EntityModel } from "./EntityModel";
import { DBService } from "../services/DBService";
import { collectionsConst } from "../constants/collectionsConst";

export class UserModel extends EntityModel {
  static collection = collectionsConst.users;
  constructor(user) {
    super(user);
    this.name = user.name || "My first name";
    this.firebaseId = user.firebaseId;
    this.pic = user.pic || commonConst.noPicUser;
    this.role = user.role || userRolesConst.user;
  }

  validateCustom(user) {
    if (!user.firebaseId) {
      throw new Error("no firebaseId");
    }
  }
  static async create(model) {
    this.validate(model);
    // UserModel.validate;
    console.log(model);
    //TODO createUserWithEmailAndPassword
    // TODO save in DB
    // TODO return new UserModel()
  }

  update() {
    this.validate(this);
    return DBService.saveDocumentById(this, UserModel.collection);
  }

  static async getById(id) {
    const entityData = await DBService.getDocumentById(
      id,
      UserModel.collection,
    );
    return new UserModel(entityData);
  }
}
