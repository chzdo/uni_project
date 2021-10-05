
import axios from "axios";
import { logger } from "./winston";


async function makeAPICall(method: any, url: string, headers?: Record<any, any>, data?: Record<any, any>) {
  try {
    const response = await axios.request({
      url,
      method,
      data,
      headers,
    });

    return response.data;
  } catch (error: any) {
    const { response } = error;

    if (response && typeof response?.data == "object") {
      const { statusCode, message } = response.data;
      logger.error(message);
      return {
        status: statusCode,
        message,
      };
    }

    const { message, status } = error.toJSON();
    logger.error(message);
    return {
      status,
      message,
    };
  }
}

export { makeAPICall };
