const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const Pool = require('pg').Pool

// Declare a new client instance from Pool()
const pool = new Pool({
    host: 'postgres',
    port: 5432,
    user: 'admin',
    password: 'institute_of_cancer_research',
    database: 'genes'
})

// function createAdminRoleDatabaseTable() {
//     const featuresType = 'CREATE TYPE featuresType ( is_druggable = true, is_anzyme = true);'
//
//     return 'CREATE ROLE admin WITH LOGIN PASSWORD institute_of_cancer_research;'
//         + 'CREATE DATABASE genes WITH OWNER admin;'
//         + '\c genes admin;'
//         + 'CREATE TABLE genes (ID TEXT PRIMARY KEY, is_druggable BOOLEAN, is_enzyme BOOLEAN, family TEXT, num_structures integer, num_compounds integer, description TEXT, full_name TEXT, short_name TEXT, image Text, publications int[][]);'
// }

const createGene = (req, res) => {
    try {
        const {id, is_druggable, is_enzyme, family, num_structures, num_compounds, description, full_name, short_name, image, publications} = req.body

        pool.query('INSERT INTO genes (id, is_druggable, is_enzyme, family, num_structures, num_compounds, description, full_name, short_name, image, publications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [id, is_druggable, is_enzyme, family, num_structures, num_compounds, description, full_name, short_name, image, publications], (err, results) => {
            if (err) {
                res.status(500).send({error: err});
            } else {
                res.status(200).send(results.rows)
            }
        })
    } catch (ex) {
        res.status(500).send({error: ex});
    }
}

const getGenes = (req, res) => {
    try {
        pool.query('SELECT * FROM genes ORDER BY id ASC', (err, results) => {
            if (err) {
                res.status(500).send({error: err});
            } else {
                res.status(200).json(results.rows)
            }
        })
    } catch (ex) {
        res.status(500).send({error: ex});
    }
}

const getGenesById = (req, res) => {
    try {
        const id = req.params.id;

        pool.query('SELECT * FROM genes WHERE id = $1', [id], (err, results) => {
            if (err) {
                res.status(500).send({error: err});
            } else {
                res.status(200).json(results.rows)
            }
        })
    } catch (ex) {
        res.status(500).send({error: ex});
    }
}

app.post('/api/genes', createGene)
app.get('/api/genes', getGenes)
app.get('/api/genes/:id', getGenesById)

app.listen(port, () => {
    console.log(`running on port ${port}.`)
})
