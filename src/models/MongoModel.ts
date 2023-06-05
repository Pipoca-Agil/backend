import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/iModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>; // cria a model para ser utilizada nessa classe do tipo Model<T> do mongoose

  constructor(model:Model<T>) {
    this._model = model; // o construtor da classe, a _model é qualquer parâmetro passado por parâmetro na model.
  }

  // métodos

  // criar usuário
  public async create(obj:T):Promise<T> { 
    return this._model.create({ ...obj }); 
  }

  // encontrar um usuário
  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findOne({ _id });
  }

  // atualizar um usuário
  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const updated = await this
      ._model.findByIdAndUpdate(_id, obj, { new: true });

    return updated;
  }

  // retornar uma lista de usuários
  public async read(): Promise<T[]> {
    return this._model.find();
  }

  // deletar usuário
  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    const deleted = await this._model.findByIdAndDelete({ _id });

    return deleted;
  }
}
