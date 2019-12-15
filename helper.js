const crypto = require("crypto");

const setPassword = password => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return {
        salt,
        hash
    };
};

module.exports = {
    prepareId: o => {
        o._id = o._id.toString();
        return o;
    },
    setPassword
};
