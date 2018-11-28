const 
    mongoose = require('mongoose'),
    redis = require('redis'),
    keys = require('../config/keys'),
    util = require('util');

// Create Redis instance & promisfy the `.get` method.
const client = redis.createClient(keys.redisUrl)
client.hget = util.promisify(client.hget);

// Preserve the exec method on the Query prototype to invoke later.
const exec = mongoose.Query.prototype.exec;

// Adding 'cache' property to Query prototype to allow for cache toggle.
mongoose.Query.prototype.cache = function(options = {}) {
    // 'this' refers to the query instance.
    // Properties are arbitrary values.
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    // returning 'this' allows function to be chainable.
    return this;
};

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) { 
        return exec.apply(this, arguments)
    }

    // Stringify the query object to create a key.
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    // See if we have a value for 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key);

    // If we do, return the cached value.
    // REMEMBER: Redis returns JSON, so need to parse before sending back.
    if (cacheValue) {
        // Mongoose `exec` functions expects to return mongoose model.
        const doc = JSON.parse(cacheValue);
        // Hydrate all returned values depending on whether the 'cacheValue' is
        // an array or object.
        return Array.isArray(doc) 
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    };

    // Otherwise, issue the query and store the result in Redis.
    const result = await exec.apply(this, arguments);
    // Update the value of the `key` in Redis; 
    // Set Expiration time in seconds.
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};