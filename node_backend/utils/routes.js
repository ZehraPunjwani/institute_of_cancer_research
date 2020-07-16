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

const getGenes = async (req, res) => {
    try {
        let finalObj = [];
        pool.query('SELECT id, short_name, image FROM genes').then((genesPromise) => {
            Promise.all(
                genesPromise.rows.map((gene) => {
                    const {id, short_name, image} = gene
                    pool.query('SELECT * FROM features').then((featuresPromise) => {
                        const filteredFeature = featuresPromise.rows.filter((feature) => feature.id === id)[0];
                        const {is_druggable, is_enzyme} = filteredFeature
                        return ({
                            id,
                            features: {
                                is_druggable,
                                is_enzyme
                            },
                            short_name,
                            image
                        });
                    }).then((obj) => {
                        finalObj.push(obj);
                        if (finalObj.length === genesPromise.rows.length) {
                            res.status(200).json(finalObj);
                        }
                    });
                })
            );
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).send({error: ex});
    }
}

const getGenesById = (req, res) => {
    try {
        const id = req.params.id;

        let finalObj = [];
        pool.query('SELECT * FROM genes WHERE id = $1', [id]).then((genesPromise) => {
            Promise.all(
                genesPromise.rows.map((gene) => {
                    const {id, family, num_structures, num_compounds, description, full_name, short_name, image, publications} = gene
                    pool.query('SELECT * FROM features').then((featuresPromise) => {
                        const filteredFeature = featuresPromise.rows.filter((feature) => feature.id === id)[0];
                        const {is_druggable, is_enzyme} = filteredFeature
                        return ({
                            id,
                            features: {
                                is_druggable,
                                is_enzyme
                            },
                            family,
                            num_structures,
                            num_compounds,
                            description,
                            full_name,
                            short_name,
                            image,
                            publications
                        });
                    }).then((obj) => {
                        finalObj.push(obj);
                        if (finalObj.length === genesPromise.rows.length) {
                            res.status(200).json(finalObj);
                        }
                    });
                })
            );
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).send({error: ex});
    }
}

module.exports = function (app) {

    app.post('/api/genes', createGene);
    app.get('/api/genes', getGenes);
    app.get('/api/genes/:id', getGenesById);

}
