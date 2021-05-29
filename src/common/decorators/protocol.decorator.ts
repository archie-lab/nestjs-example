import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log("Protocol decorator data", data);
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
