import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GET_GENES} from "../../utils/api";
import './styles.css';
import {Link} from "react-router-dom";

const Genes = () => {
    const [genes, setGenes] = useState(null);
    const [query, setQuery] = useState('');
    const [isDruggable, setIsDruggable] = useState(true);
    const [isEnzyme, setIsEnzyme] = useState(true);

    useEffect(() => {
        setQuery('');

        function fetchGenesUrl() {
            return GET_GENES + query;
        }

        async function fetchArticles() {
            const response = await axios(fetchGenesUrl());

            return response;
        }

        fetchArticles().then(res => {
            const response = res.data;
            const genes = response;
            setGenes(genes);
        }).catch((err) => {
            console.log(err, "Error Fetching Genes");
        });
    }, [query]);

    const filterData = () => {
        return genes.filter((gene) => gene.features['is_druggable'] === isDruggable && gene.features['is_enzyme'] === isEnzyme);
    }

    const showFilterOptions = () => {
        return (
            <div className="card mb-3 filter">
                <div className="card-body">
                    <div className="form-check">
                        Features:
                        <div className="pl-3 form-check form-check-inline">
                            <input
                                disabled={!genes}
                                className="form-check-input"
                                type="checkbox"
                                id="is_druggable"
                                checked={isDruggable}
                                onChange={() => setIsDruggable(!isDruggable)}
                            />
                            <label className="form-check-label" htmlFor="is_druggable">Is Druggable</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                disabled={!genes}
                                className="form-check-input"
                                type="checkbox"
                                id="is_enzyme"
                                checked={isEnzyme}
                                onChange={() => setIsEnzyme(!isEnzyme)}
                            />
                            <label className="form-check-label" htmlFor="is_enzyme">Is Enzyme</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const showContent = () => {
        if (!genes) {
            return (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )
        } else if (genes && filterData().length === 0) {
            return (
                <div className="loading">
                    <p>No Data!</p>
                </div>
            )
        } else if (genes && filterData().length > 0) {
            return (
                <div className="records">
                    <div className="p-3">
                        <div className="card-group">
                            {
                                genes.map((gene) => (
                                    <Link className="link" to={{pathname: gene.id, state: {gene: gene}}} key={gene.id}>
                                        <div className="card">
                                            <img className="card-img-top" src={gene.image} alt={gene['short_name']}/>
                                            <div className="card-body">
                                                <h5 className="card-title">{gene['short_name']}</h5>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <small
                                                        className={`col-6 text-muted ${gene.features['is_druggable'] && 'strike-through'}`}>
                                                        Is Druggable
                                                    </small>
                                                    <small
                                                        className={`col-6 text-muted ${gene.features['is_enzyme'] && 'strike-through'}`}>
                                                        Is Enzyme
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="container-fluid p-3">
            {showFilterOptions()}
            {showContent()}
        </div>
    )
}

export default Genes;
