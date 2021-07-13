/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CalendarEvent } from './event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ok } from 'assert';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<CalendarEvent>,
  ) {}

  async insertEvent(date: string, name: string,isRepeating:boolean) {
    const newEvent = new this.eventModel({ name, date, isRepeating });
    const result = await newEvent.save();
    console.log(result);
    return result.id as string;
  }

  async getEvents() {
    const events = await this.eventModel.find().exec();
    return events.map((ev) => ({ id: ev.id, name: ev.name, date: ev.date,isRepeating:ev.isRepeating }));
  }

  private async findEvent(id:string):Promise<CalendarEvent>{
      let event:CalendarEvent;
      try{
          event=await this.eventModel.findById(id);
          throw new NotFoundException('Colud not find event with that id');
      }
      catch(error){}
      if(!event)
         throw new NotFoundException('Colud not find event with that id');
      return event;
  }

 async  deleteEvent(id:string){
   const event=await this.findEvent(id);
   const response=await  this.eventModel.deleteOne({_id:id}).exec();
   if(response.n===0)
   throw new NotFoundException('Colud not find event with that id');
   return { id: event.id, name: event.name, date: event.date,isRepeating:event.isRepeating };;


  }

  async deleteEvents(){
    await this.eventModel.deleteMany();
  }

  async deleteRepeatingEvent(eventName:string){
        const response=await this.eventModel.deleteMany({name:eventName,isRepeating:true});
        if(response.n===0)
        throw new NotFoundException('Colud not find events with that id');
        return {name:eventName};
  }
}
