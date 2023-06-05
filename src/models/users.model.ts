import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../interfaces/iUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>({
  nome: String,
  sobrenome: String,
  email: String,
  password: String,
}, { versionKey: false });

export default class UserModel extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }
}
