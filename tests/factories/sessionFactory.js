const 
    Buffer = require('safe-buffer').Buffer,
    Keygrip = require('keygrip'),
    keys = require('../../config/keys'),
    keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
    // Create sessionObject to encode into cookie.
    const sessionObject = {
      passport: {
        // Converting id to string because `_id` is actually a mongoose model.
        user: user._id.toString()
      }
    };

    // Create session and session.sig cookies.
    const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
    const sig = keygrip.sign(`session=${session}`);

    return { session, sig };
};