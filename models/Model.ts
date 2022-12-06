import { Model as MongooseModel, Document, UpdateQuery } from 'mongoose';
import { Model } from '../interfaces/Model';

export default abstract class MongoModel<T> implements Model<T> {
    protected model: MongooseModel<T & Document>;

    constructor(model: MongooseModel<T & Document>) {
        this.model = model;
    }

    create = async (obj: T): Promise<T> => this.model.create({ ...obj });

    read = async (): Promise<T[]> => this.model.find({}, { __v: 0 });

    readOne = async (id: string): Promise<T | null> => this.model.findOne({ _id: id }, { __v: 0 });

    update = async (id: string, obj: UpdateQuery<T>): Promise<T
    | null> => this.model.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });

    delete = async (id: string): Promise<T | null> => this.model.findOneAndRemove(({ _id: id }));

    findByEmail = async (email: string): Promise<T | null> => this.model.findOne({
        email,
        active: true
    });
}