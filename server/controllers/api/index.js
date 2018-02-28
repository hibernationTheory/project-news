const axios = require("axios");
var Promise = require("bluebird");

const API_KEY = process.env.NEWSAPI_API_KEY;
if (!API_KEY) {
  throw new Error("Can't find Newsapi API Key");
}

const DB = {
  headlines: {}
};

/**
 * cache : TEMP to not abuse the 3rd party API
 */
function cache(typeKey, resourceKey, data) {
  if (DB[typeKey][resourceKey]) {
    console.log(`cache exists for ${resourceKey}`);
    return null;
  }

  if (!DB[typeKey]) {
    DB[typeKey] = {};
  }

  DB[typeKey][resourceKey] = data;
  console.log(`cache created for ${resourceKey}`);
  return true;
}

/**
 * getFromCache : TEMP to not abuse the 3rd party API
 */
function getFromCache(typeKey, resourceKey) {
  console.log(DB);
  if (DB[typeKey] && DB[typeKey][resourceKey]) {
    console.log(`reading from cache for ${resourceKey}`);
    return DB[typeKey][resourceKey];
  }

  return null;
}

function getArticlesFromUrl(url) {
  return axios({
    method: "get",
    url
  }).then(response => {
    const { data } = response;
    if (data.status !== "ok") {
      return [];
    }

    return data.articles;
  });
}

/**
 * TODO needs to be implemented
 * getTags returns an object of tags that are encountered and their amount of occurance.
 */
function getTags() {
  return {
    Russia: 10,
    Trump: 5,
    Budget: 3
  };
}

/**
 * TODO needs to be implemented fully.
 * getResourceData returns an object of resources that are used,
 * and their corresponding ideology and leaning amount.
 */
function getResourceData() {
  return {
    "fox-news": {
      name: "fox-news",
      leaning: 2,
      ideology: "conservative"
    },
    "the-huffington-post": {
      name: "the-huffington-post",
      leaning: 2,
      ideology: "liberal"
    }
  };
}

function getRecentHeadlines(resource, apiKey) {
  const base = "https://newsapi.org/v2/top-headlines";
  const url = `${base}?sources=${resource}&apiKey=${apiKey}`;

  const cachedData = getFromCache("headlines", resource);
  if (cachedData) {
    return cachedData;
  }

  return getArticlesFromUrl(url);
}

function getRecentNews(resource, apiKey) {
  const base = "https://newsapi.org/v2/everything";
  const url = `${base}?sources=${resource}&apiKey=${apiKey}`;

  return getArticlesFromUrl(url);
}

function getForMultiple(resources, apiKey, fn) {
  return Promise.map(
    resources,
    resource => {
      return fn(resource, apiKey);
    },
    { concurrency: 1 }
  );
}

function getRecentHeadlinesAll() {
  const apiKey = API_KEY;
  const resources = Object.keys(getResourceData());

  const result = getForMultiple(resources, apiKey, getRecentHeadlines);

  return result.then(news => {
    // flatten the results. it is an array (of all news resources)
    // of arrays (separate resources).
    let newsFlat = [];
    news.forEach(resourceData => {
      resourceData.forEach(news => {
        newsFlat.push(news);
      });
    });

    resources.forEach((resource, index) => {
      cache("headlines", resource, news[index]);
    });

    return newsFlat;
  });
}

module.exports = Object.freeze({
  getRecentHeadlinesAll,
  getResourceData,
  getTags
});
