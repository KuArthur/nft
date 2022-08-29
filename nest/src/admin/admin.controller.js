import { Bind, Controller, Dependencies, Get, Query, Param, Request } from '@nestjs/common';
import { AdminService } from "./admin.service";

@Dependencies(AdminService)
@Controller('api/admin')
export class AdminController {
    constructor(AdminService) {
        this.AdminService = AdminService;
    }

    @Get('collections/add')
    @Bind(Query(), Request())
    addCollection(query, request) {
        return this.AdminService.addCollection(query, request);
    }

    @Get('collections/disable')
    @Bind(Query(), Request())
    disableCollection(query, request) {
        return this.AdminService.disableCollection(query, request);
    }

    @Get('collections/stats')
    @Bind(Query(), Request())
    showAllStats(query, request) {
        return this.AdminService.showAllStats(query, request);
    }

    @Get('collections/stats/:slug')
    @Bind(Param('slug'), Query())
    showSingleStat(slug, query) {
        return this.AdminService.showSingleStat(slug, query);
    }
}
