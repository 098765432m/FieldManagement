const config = {
    app: {
        port: process.env.PORT || 6660,
    },

    db: {
        uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sportField"
    }
};

module.exports = config;