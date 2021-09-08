interface errResponseObjectType {
 success: boolean;
 message: string;
 statusCode: number;
}

interface successResponseObjectType {
 success: boolean;
 payload: Record<string, unknown>;
 statusCode: number;
}

export { errResponseObjectType, successResponseObjectType };
