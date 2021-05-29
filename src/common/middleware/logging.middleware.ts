import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const logLabel = "Request time";
    console.time(logLabel);
    console.log("LoggingMiddleware...");
    res.on("finish", () => console.timeEnd(logLabel));
    next();
  }
}
