import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { ProductCreateDto } from "./dto/product-create.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { Public } from "../common/decorators/public.decorator";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Public()
    @Get()
    async getAll(@Query() paginationQueryDto: PaginationQueryDto) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return this.productService.findAll(paginationQueryDto);
    }

    @Get(":id")
    getById(@Param("id") id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() product: ProductCreateDto) {
        return this.productService.create(product);
    }

    @Patch(":id")
    update(@Param("id") id: number, @Body() product: ProductUpdateDto) {
        return this.productService.update(id, product);
    }

    @Delete(":id")
    delete(@Param("id") id: number) {
        return this.productService.delete(id);
    }

    @Post(":id/recommend")
    recommendProduct(@Param("id") id: number) {
        return this.productService.recommendProduct(id);
    }
}
