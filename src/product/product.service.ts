import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class ProductService {
    findOne(id: string) {
        throw new NotFoundException(`Not found id=${id}`, "description about Not Found");
    }
}
