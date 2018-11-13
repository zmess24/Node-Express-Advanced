const 
    mongoose = require('mongoose'),
    redis = require('redis'),
    redisUrl = 'redis://127.0.0.1:6379',
    util = require('util');

// Create Redis instance & promisfy the `.get` method.
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get);

// Preserver the exec method on the Query prototype to invoke later.
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
    // Strinify the query object to create a key.
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    // See if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    // If we do, return the cached value.
    // REMEMBER: Redis returns JSON, so need to parse before sending back.
    if (cacheValue) return JSON.parse(cacheValue);

    // Otherwise, issue the query and store the result in Redis.
    const result = await exec.apply(this, arguments);
    // Update the value of the `key` in Redis;
    client.set(key, JSON.stringify(result));
    return result;
};