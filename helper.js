module.exports = {
    prepareId: (o) => {
        o._id = o._id.toString()
        return o
    }
}