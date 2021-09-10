import Sequelize, { Op, Sequelize as Seq } from "sequelize";
import { options } from "../../../types";

function processQueryOptions(
 attributes: Record<string, Array<string>>,
 options?: options,
 pagination: { page?: number; limit: number } = { page: 1, limit: 1000 }
): Sequelize.FindOptions {
 const processedOptions: Record<symbol | string, any> = options ? processQuery(options) : {};

 return {
  attributes: {
   include: [...attributes.include],
   exclude: ["isDeleted", ...attributes.exclude],
  },
  where: {
   ...processedOptions,
  },
  offset: pagination.page * pagination.limit,
  limit: pagination.limit || undefined,
 };
}

function processCountQueryOptions(attributes: Record<string, Array<string>>, options?: options) {
 const processedOptions: Record<symbol | string, any> = options ? processQuery(options) : {};

 return {
  where: {
   ...processedOptions,
  },
 };
}

function processQuery(options: options) {
 const { params, query, ...rest } = options;

 let paramsOptions = [];

 if (params) {
  const paramArray = [];
  for (const param in params) {
   paramArray.push({
    [param]: params[param],
   });
  }
  paramsOptions = [
   {
    [Op.and]: [...paramArray],
   },
  ];
 }

 const queryOptions = [];

 if (query) {
  for (const queries in query) {
   if (typeof query[queries] === "string") {
    if (query[queries].includes(",")) {
     queryOptions.push(buildOr(query[queries], queries));
    } else if (query[queries].includes("!")) {
     queryOptions.push(buildNot(query[queries], queries));
    } else if (query[queries].includes(":")) {
     queryOptions.push(buildIn(query[queries], queries));
    } else if (query[queries].includes("~")) {
     queryOptions.push(buildRange(query[queries], queries));
    } else if (query[queries].includes("%")) {
     queryOptions.push(buildLike(query[queries], queries));
    } else {
     queryOptions.push({ [queries]: query[queries] });
    }
   }
  }
 }

 return {
  [Op.and]: [...[{ ...rest }], ...paramsOptions, ...queryOptions],
 };
}

function buildOr(value, key): Array<Record<symbol | string, unknown>> {
 const orQuery = [];
 const valueArray = value.split(",");
 for (const vrray of valueArray) {
  if (vrray.includes("!")) {
   orQuery.push(buildNot(vrray, key));
  } else if (vrray.includes(":")) {
   orQuery.push(buildIn(vrray, key));
  } else if (vrray.includes("~")) {
   orQuery.push(buildRange(vrray, key));
  } else if (vrray.includes("%")) {
   orQuery.push(buildLike(vrray, key));
  } else {
   orQuery.push({
    [key]: {
     [Op.or]: valueArray,
    },
   });
  }
 }

 return [
  {
   [Op.or]: [...orQuery],
  },
 ];
}

function buildIn(value, key) {
 const inQuery = [];
 const valueArray = value.split(":");
 valueArray.shift();
 inQuery.push({
  [key]: {
   [Op.in]: [...valueArray],
  },
 });

 return inQuery;
}

function buildRange(value, key) {
 const rangeQuery = [];
 const valueArray = value.split("~");
 rangeQuery.push({
  [key]: {
   [Op.between]: valueArray,
  },
 });

 return rangeQuery;
}

function buildLike(value, key) {
 const likeQuery = [];

 likeQuery.push({
  [key]: {
   [Op.like]: value,
  },
 });

 return likeQuery;
}
// !:, !~, !  id=!2, !6
function buildNot(value: string, key: string): Array<Record<symbol | string, unknown>> {
 const notQuery = [];
 const valueArray = value.split("!");
 valueArray.shift();
 for (const vrray of valueArray) {
  if (!vrray) continue;
  if (vrray.includes(":")) {
   notQuery.push({ ...buildNotIn(vrray, key) });
  } else if (vrray.includes("~")) {
   notQuery.push({ ...buildNotBetween(vrray, key) });
  } else if (vrray.includes("%")) {
   notQuery.push({ ...buildNotLike(vrray, key) });
  } else {
   notQuery.push({
    [key]: {
     [Op.notIn]: valueArray,
    },
   });
  }
 }
 return notQuery;
}

function buildNotIn(value, key): Record<symbol | string, unknown> {
 const valueArray = value.split(":");

 return {
  [key]: {
   [Op.notIn]: valueArray,
  },
 };
}

function buildNotBetween(value, key): Record<symbol | string, unknown> {
 const valueArray = value.split("~");

 return {
  [key]: {
   [Op.notBetween]: valueArray,
  },
 };
}
function buildNotLike(value, key): Record<symbol | string, unknown> {
 return {
  [key]: {
   [Op.notLike]: value,
  },
 };
}

function buildQuery(array: Array<string>, queries: string, operator: symbol) {
 return {
  [queries]: {
   [operator]: array,
  },
 };
}

export { processQueryOptions };
