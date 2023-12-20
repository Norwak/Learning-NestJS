import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassConstructor {
  new (...args: any[]): {};
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

    // Run something before the request is handled by the request handler

    return handler.handle().pipe(
      map((data: any) => {

        // run something before the response is sent out

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });

      })
    );

  }

}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}