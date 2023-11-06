import { ObjectId } from 'mongodb';

function _id(hex?: string) {
  if (hex?.length !== 24) return new ObjectId();
  return new ObjectId(hex);
}

function filter(object) {
  const newObject: Record<string, unknown> = {};
  for (const key in object) {
    const value = object[key];
    if (value === undefined || value === null) continue;
    if (key === 'id') {
      newObject._id = _id(value);
    } else {
      newObject[key] = value;
    }
  }
  return newObject;
}

export interface Converter {
  from(object: Record<string, any>);
  to(object: Record<string, any>);
}

export default {
  _id,
  filter,
};
