import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Connection, Repository } from "typeorm";
import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { Label } from "./entities/label.entity";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { Event } from "../events/entities/event.entity";
import { EventType } from "../events/entities/event-type.enum";

@Injectable()
export class ProductService {

    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(Label)
      private readonly labelRepository: Repository<Label>,
      private readonly connection: Connection,
    ) {
    }

    findAll(paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        return this.productRepository.find({
            relations: ["labels"],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne(id, { relations: ["labels"] });
        if (!product) {
            throw new NotFoundException(`Product was not found id=${id}`, "description about Not Found");
        }
        return product;
    }

    async create(productCreateDto: ProductCreateDto) {
        const labels = await Promise.all(
          productCreateDto.labels.map(label => this.preloadLabelByName(label.name)),
        );
        const product = await this.productRepository.create({ ...productCreateDto, labels });
        return this.productRepository.save(product);
    }

    async update(id: number, productUpdateDto: ProductUpdateDto) {
        const labels = productUpdateDto.labels && (await Promise.all(
          productUpdateDto.labels.map(label => this.preloadLabelByName(label.name)),
        ));
        const product = await this.productRepository.preload({ id: 60, ...productUpdateDto, labels });
        if (!product) {
            throw new NotFoundException(`Product was not found id=${id}`, "description about Not Found");
        }
        return this.productRepository.save(product);
    }

    async delete(id: number) {
        const product = await this.findOne(id);
        return this.productRepository.remove(product);
    }

    async recommendProduct(productId: number) {
        const product = await this.findOne(productId);
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            product.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.type = EventType.PRODUCT;
            recommendEvent.name = "recommend_product";
            recommendEvent.payload = { productId: product.id };

            await queryRunner.manager.save(product);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            console.error("Failed to recommend product id=" + productId, err)
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async preloadLabelByName(name: string): Promise<Label> {
        const existingLabel = await this.labelRepository.findOne({ name });
        if (existingLabel) {
            return existingLabel;
        }
        return this.labelRepository.create({ name });
    }
}
