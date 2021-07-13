/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Get,Delete,Param,Request } from '@nestjs/common';

import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post()
  async addEvent(@Body('date') date: string, @Body('name') name: string, @Body('isRepeating') isRep:boolean){
    const generatedId = await this.eventsService.insertEvent(date, name, isRep);
    return{id: generatedId};
  }


  @Get()
  async getAllEvents() {
     return await this.eventsService.getEvents();
     
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id:string){
    return await this.eventsService.deleteEvent(id);
    


  }

  @Delete()
  async DeleteAllEvents(){
    this.eventsService.deleteEvents();
  }

  @Delete('/deleteRepeatingEvent/:name')
  async DeleteRepeatingEvents(@Param('name') eventName:string){
     return  await this.eventsService.deleteRepeatingEvent(eventName);

  }
}
