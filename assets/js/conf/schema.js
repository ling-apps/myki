module.exports = {
    page: {
        key: { keyPath: 'id', autoIncrement: true},

        indexes: {
            title: { unique: true }
        }
    },
    files: {
        key: { keyPath: 'id', autoIncrement: true},
        indexes: {
            name: { unique: false }
        }
    }
}
