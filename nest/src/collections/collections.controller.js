import { Bind, Controller, Dependencies, Get, Query, Param, Request } from '@nestjs/common';
import {CollectionsService} from "./collections.service";

@Dependencies(CollectionsService)
@Controller('api/collections')
export class CollectionsController {
    constructor(CollectionService) {
        this.CollectionsService = CollectionService;
    }

    @Get('get-all')
    @Bind(Query(), Request())
    getAll(query, request) {
        return this.CollectionsService.getCollections(query, request.cookies);
    }

    @Get(':slug')
    @Bind(Param('slug'))
    getSingle(slug) {
        return this.CollectionsService.getSingleCollection(slug);
    }

    @Get(':slug/graph')
    @Bind(Param('slug'), Query())
    getGraph(slug, query) {
        return this.CollectionsService.getGraphData(slug, query);
    }
}
