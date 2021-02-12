import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get()
    getAll(@Query() query): string {
        const {limit, offset} = query;
        return `query limit=${limit} and offset=${offset}`;
    }

    @Get(":id")
    getById(@Param("id") id: string):string {
        this.productService.findOne(id);
        return "get id: " + id;
    }

    @Post()
    create(@Body() body: CreateProductDto): CreateProductDto {
        return body;
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: UpdateProductDto): string {
        return "updated";
    }

    @Delete(":id")
    delete(@Param("id") id: string): string {
        return "delete";
    }
}
