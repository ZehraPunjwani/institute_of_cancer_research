import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {GET_GENES} from "../../utils/api";
import './styles.css';

const Genes = () => {
    const [genes, setGenes] = useState(null);
    const [query] = useState('');
    const [clearFilter, setClearFilter] = useState(true);
    const [isDruggable, setIsDruggable] = useState(false);
    const [isEnzyme, setIsEnzyme] = useState(false);

    useEffect(() => {
        async function fetchGenes() {
            const response = await axios.get(GET_GENES + query, {timeout: 1000});

            return response;
        }

        fetchGenes().then(res => {
            const response = res.data;
            const genes = response;
            setGenes(genes);
        }).catch((err) => {
            console.log(err, "Error Fetching Genes");
        });
    }, [query]);

    let filterData = () => {
        if (clearFilter) {
            return genes;
        }
        return genes.filter((gene) => gene.features['is_druggable'] === isDruggable && gene.features['is_enzyme'] === isEnzyme);
    }

    const showFilterOptions = () => {
        return (
            <div className="card mb-3 filter">
                <div className="card-body">
                    <div className="form-check">
                        Features:
                        <div className="pl-3 form-check form-check-inline">
                            <button type="button"
                                    className="btn btn-outline-secondary btn-light mr-3"
                                    disabled={!genes || filterData().length === 0}
                                    onClick={() => {
                                        setClearFilter(true);
                                        setIsDruggable(false);
                                        setIsEnzyme(false);
                                    }}>Clear Filter
                            </button>
                        </div>
                        <div className="pl-3 form-check form-check-inline">
                            <input
                                disabled={!genes || filterData().length === 0}
                                className="form-check-input"
                                type="checkbox"
                                id="is_druggable"
                                checked={isDruggable}
                                onChange={() => {
                                    setIsDruggable(!isDruggable);
                                    setClearFilter(false);
                                }}
                            />
                            <label className="form-check-label" htmlFor="is_druggable">Is Druggable</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                disabled={!genes || filterData().length === 0}
                                className="form-check-input"
                                type="checkbox"
                                id="is_enzyme"
                                checked={isEnzyme}
                                onChange={() => {
                                    setIsEnzyme(!isEnzyme);
                                    setClearFilter(false);
                                }}
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
                                filterData().map((gene) => (
                                    <Link className="link" to={{pathname: gene.id, state: {id: gene.id}}}
                                          key={gene.id}>
                                        <div className="card">
                                            <img className="card-img-top" src={gene.image}
                                                 alt={gene['short_name']}/>
                                            <div className="card-body">
                                                <h5 className="card-title">{gene['short_name']}</h5>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <small
                                                        className={`col-6 text-muted ${!gene.features['is_druggable'] && 'strike-through'}`}>
                                                        Is Druggable
                                                    </small>
                                                    <small
                                                        className={`col-6 text-muted ${!gene.features['is_enzyme'] && 'strike-through'}`}>
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
