/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import {MongooseModule} from "@nestjs/mongoose"
import { CalendarEventSchema } from "./event.model";


@Module({
    imports:[MongooseModule.forFeature([{name:"Event",schema:CalendarEventSchema}])],
    controllers:[EventsController],
    providers:[EventsService]
})
export class EventsModule{}