const config = {
    host: 'postgres',
    port: 5432,
    user: 'admin',
    password: 'institute_of_cancer_research',
    database: 'genes'
};
const Pool = require('pg').Pool
const pool = new Pool(config);

const createGene = (req, res) => {
    try {
        const {id, is_druggable, is_enzyme, family, num_structures, num_compounds, description, full_name, short_name, image, publications} = req.body

        const gene = [id, is_druggable, is_enzyme, family, num_structures, num_compounds, description, full_name, short_name, image, publications];
        const insert_query = '' +
            'INSERT INTO genes (' +
                'id, ' +
                'is_druggable, ' +
                'is_enzyme, ' +
                'family, ' +
                'num_structures, ' +
                'num_compounds, ' +
                'description, ' +
                'full_name, ' +
                'short_name, ' +
                'image, ' +
                'publications' +
            ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

        pool.query(insert_query, gene, (err, results) => {
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
        pool.query('SELECT id, is_druggable, is_enzyme, short_name, image FROM genes', (err, results) => {
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

module.exports = function(app){

    app.post('/api/genes', createGene);
    app.get('/api/genes', getGenes);
    app.get('/api/genes/:id', getGenesById);

}
