import { errResponseObjectType, successResponseObjectType } from "../../types";
import { logger } from "../../utils/winston";

function processError(e: unknown, service: string): errResponseObjectType {
 let message = "";
 if (typeof e == "string") {
  message = e;
 } else if (e instanceof Error) {
  message = e.message;
 }

 logger.error(`[${service}] error - ${message}`);

 return {
  success: false,
  statusCode: 500,
  message,
 };
}

function processFailedResponse(code: number | 400, message: string, service: string): errResponseObjectType {
 logger.error(`[${service}] error - ${message}`);
 return {
  success: false,
  statusCode: code,
  message,
 };
}
function processUpdateResponse(response: Record<any, any> | null, body: Record<any, any>, service: string) {
 if (!response) return processFailedResponse(404, "resouce not found", service);

 if (response.matchedCount === 0) return processFailedResponse(404, "resouce not found", service);

 if (response.modifiedCount === 0) return processResponse(200, "Resource up to date!");

 return processResponse(200, body);
}

function processDeleteResponse(response: Record<any, any> | null, service: string) {
 if (!response) return processFailedResponse(404, "resouce not found", service);

 if (response.deletedCount === 0) return processFailedResponse(404, "resouce not found", service);

 return processResponse(200, "Item deleted successfully");
}

function processResponse(
 code: number | 200,
 // eslint-disable-next-line @typescript-eslint/ban-types
 payload: Record<string, unknown> | Record<string, unknown>[] | string | Record<string, never> | object
): successResponseObjectType {
 let newPayload;
 if (Array.isArray(payload)) {
  newPayload = payload.map((load) => {
   load["_id"] = undefined;
   load["createdOn"] = undefined;
   load["__v"] = undefined;

   return load;
  });
 } else if (typeof payload == "object") {
  newPayload = payload;
  newPayload["_id"] = undefined;
  newPayload["createdOn"] = undefined;
  newPayload["__v"] = undefined;
 } else {
  newPayload = payload;
 }

 return {
  success: true,
  statusCode: code,
  payload: newPayload,
 };
}
export { processError, processFailedResponse, processResponse, processUpdateResponse, processDeleteResponse };
