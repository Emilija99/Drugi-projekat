/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const CalendarEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  isRepeating: {type:Boolean, required:true}
});

export interface CalendarEvent extends mongoose.Document {
   id: string;
   date: string;
   name: string;
   isRepeating:boolean;
}
