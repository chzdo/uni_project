import { inspect } from "util";
import { options } from "../../types";

function processQueryOptions(options: options): {
 query: Record<string | symbol, any>;
 skip: number;
 limit: number;
 sort: string;
 project: string;
} {
 const { population, page, sort, project } = options?.query;

 const skip = page > 1 && population ? (parseInt(page) - 1) * parseInt(population) : 0;
 const limit = population ? parseInt(population) : Number.MAX_SAFE_INTEGER;
 const projectString = project ? project.split(",").join(" ") : "";
 const sortAdjusted = sort ? sort.split(",").map((value) => value.split(":")) : [];

 delete options.query.page;
 delete options.query.population;
 delete options.query.sort;
 delete options.query.project;
 const processedOptions: Record<symbol | string, any> = processQuery(options);

 return {
  query: {
   ...processedOptions,
   isDeleted: false,
  },
  skip,
  limit,
  sort: sortAdjusted,
  project: projectString,
 };
}

function processUpdateOptions(options: options): {
 query: Record<string | symbol, any>;

 body: Record<string | symbol, any>;
} {
 delete options.query.page;
 delete options.query.population;
 delete options.query.sort;

 const { body, ...others } = options;

 const processedOptions: Record<symbol | string, any> = processQuery(others);

 return {
  query: {
   ...processedOptions,
   isDeleted: false,
  },
  body,
 };
}

function processQuery(options: options): Record<symbol | string, any> {
 const { query, params, ...others } = options;

 const queryBuilder = [];
 if (query) {
  for (const fields in query) {
   const key = fields;
   const value = query[key];

   if (value.includes(",")) {
    queryBuilder.push(buildOrQuery(key, value));
   } else if (value.includes("!")) {
    queryBuilder.push(buildNotQuery(key, value));
   } else if (value.includes("~")) {
    queryBuilder.push(buildRangeQuery(key, value));
   } else if (value.includes("%")) {
    queryBuilder.push(buildLikeQuery(key, value));
   }
  }
 }

 if (params) Object.keys(params).length !== 0 && queryBuilder.push(params);

 if (others) Object.keys(others).length !== 0 && queryBuilder.push(others);

 return queryBuilder.length === 0
  ? {}
  : {
     $and: [...queryBuilder],
    };
}

function buildOrQuery(key: string, value: string): Record<symbol | string, any> {
 const orValues = value.split(",");
 let orQueryBuilder = [];

 for (const orField in orValues) {
  const value = orValues[orField];

  if (value.includes("!")) {
   const notQuery = buildNotQuery(key, value);
   orQueryBuilder = loadQuery(orQueryBuilder, notQuery);
  } else if (value.includes("%")) {
   orQueryBuilder = loadQuery(orQueryBuilder, buildLikeQuery(key, value));
  } else if (value.includes("~")) {
   orQueryBuilder = loadQuery(orQueryBuilder, buildRangeQuery(key, value));
  } else {
   orQueryBuilder = loadQuery(orQueryBuilder, {
    [key]: {
     $in: [value.split(":").join("")],
    },
   });
  }
 }

 return orQueryBuilder.length === 0
  ? {}
  : {
     $or: [...orQueryBuilder],
    };
}

function loadQuery(queryBuilder: Array<Record<symbol | string, any>>, value: Record<symbol | string, any>): Array<any> {
 if (Object.keys(value).length === 0) return queryBuilder;

 const key = Object.keys(value)[0];
 const actualQueries = Array.isArray(value[key]) ? value[key] : [value];
 for (const actualQueryIndex in actualQueries) {
  const actualQuery = actualQueries[actualQueryIndex];

  const field = Object.keys(actualQuery)[0];
  const operator = Object.keys(actualQuery[field])[0];

  if (queryBuilder.length === 0) {
   queryBuilder.push(actualQuery);
   continue;
  }

  const index = queryBuilder.findIndex((value) => (value[field][operator] ? true : false));

  if (index >= 0 && Array.isArray(queryBuilder[index][field][operator])) {
   queryBuilder[index][field][operator].push(actualQuery[field][operator][0]);
  } else {
   queryBuilder.push(actualQuery);
  }
 }

 return queryBuilder;
}

function buildNotQuery(key: string, value: string): Record<symbol | string, any> {
 const notValues = value.split("!");
 notValues.shift();
 let notQueryBuilder = [];

 for (const notField in notValues) {
  const value = notValues[notField];

  if (value.includes("~")) {
   notQueryBuilder = loadQuery(notQueryBuilder, buildNotRange(key, value));
  } else if (value.includes("%")) {
   notQueryBuilder = loadQuery(notQueryBuilder, buildNotLike(key, value));
  } else {
   notQueryBuilder = loadQuery(notQueryBuilder, {
    [key]: {
     $nin: [value.split(":").join("")],
    },
   });
  }
 }

 return notQueryBuilder.length === 0
  ? {}
  : {
     $or: [...notQueryBuilder],
    };
}

function buildRangeQuery(key, value): Record<symbol, any> {
 const valueArray = value.split("~");
 const gte = valueArray[0] ? { $gte: parseInt(valueArray[0]) } : {};
 const lte = valueArray[1] ? { $lte: parseInt(valueArray[1]) } : {};
 return {
  [key]: {
   ...gte,
   ...lte,
  },
 };
}

function buildNotRange(key, value): Record<symbol, any> {
 const valueArray = value.split("~");
 const gte = valueArray[0] ? { $gte: parseInt(valueArray[0]) } : {};
 const lte = valueArray[1] ? { $lte: parseInt(valueArray[1]) } : {};
 return {
  [key]: {
   $not: {
    ...gte,
    ...lte,
   },
  },
 };
}

function buildLikeQuery(key, value) {
 const likeValue = value.split("%");
 likeValue.shift();
 return {
  [key]: {
   $regex: `${likeValue[0].split("25").join("")}`,
   $options: "i",
  },
 };
}

function buildNotLike(key, value) {
 const likeValue = value.split("%");
 likeValue.shift();
 return {
  [key]: {
   $not: {
    $regex: `${likeValue[0].split("25").join("")}`,
    $options: "i",
   },
  },
 };
}

export { processQueryOptions, processUpdateOptions };
