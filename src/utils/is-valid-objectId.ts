import mongoose from 'mongoose';

export function isObjectId(id: string): boolean {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new mongoose.Types.ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
