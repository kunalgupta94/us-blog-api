const { Client } = require('pg');
const database = require('./pgVar');
// const client = new Client(database);

// client.connect()
// .then(() => console.log("connected"))
// .then(() => client.query("SELECT * from  main.users"))
// .then((res) => console.log(res.rows))
// .catch(err => console.log(err))
// .finally(() => client.end())


class Database {
    constructor() {
        this.client = new Client(database);
        this.client.connect()
    }

    create(table, data) {
        const columns = Object.keys(data);
        const values = columns.map(col => data[col]);
        const columnText = `${Object.keys(data).map(key => key)}`
        const valuesText = `${[...Object(new Array(columns.length + 1)).keys()].splice(1).map(val => `$${val}`)}`
        const query = `INSERT INTO main.${table}(${columnText})VALUES(${valuesText})`
        console.log(values)
        this.client.query(query, values)
    }

    getUsers() {
        this.client.query("SELECT * from  main.users")
        .then((res) => console.log(res.rows))
        .catch((err) => console.log(err))
    }
}

const db = new Database();

db.create("articles", {
    reads: 56,
    user_id: 4,
    read_time: 12,
    body: "SOME DATA TO TEST",
    title: "A title",
    description: "a descrption",
    created_at: new Date(),
})