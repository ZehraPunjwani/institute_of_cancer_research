import React, {useEffect, useState} from 'react';
import Chart from "react-google-charts";
import axios from "axios";

import Error from "../Error";
import {GET_GENES} from "../../utils/api";
import './styles.css';

const Gene = (props) => {
    let id = props.location.state ? props.location.state.id : props.location.pathname.split('/')[1];
    console.log("Bottom", id);

    const [gene, setGene] = useState(null);
    const [query] = useState(id);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(true);
    let data = [['Year', 'Quantity']];

    useEffect(() => {
        if(id) {
            async function fetchArticles() {
                console.log('Entered', GET_GENES + query);
                const response = await axios(GET_GENES + query);
                return response;
            }

            fetchArticles().then(res => {
                const response = res.data;
                const gene = response.length > 0 ? response[0] : [];
                setGene(gene);
                console.log('Hi', gene);
                setErrors(false);
                setLoading(false);
            }).catch((err) => {
                setErrors(true);
                setLoading(false);
                console.log(err, "Error Fetching Gene with ID");
            });
        }
    }, [query]);

    const showContent = () => {
        if ((loading && !errors) || (loading && errors)) {
            return (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )
        } else if ((gene && gene.length === 0) || (!loading && errors)) {
            return (
                <Error/>
            );
        } else {
            gene['publications'].map((entry) => data.push(entry));
            return (
                <div>
                    <div className="card card-header mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                        <p className="card-title">
                            <button type="button" className="btn btn-outline-secondary btn-light mr-3"
                                    onClick={() => props.history.goBack()}>Back
                            </button>
                            ({gene.id} - {gene['full_name']} ({gene['short_name']})
                        </p>
                    </div>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <img src={gene.image} alt={gene['short_name']}/>
                            <h6 className="card-title"><b>Is Druggable</b>: {gene['is_druggable'] ? 'True' : 'False'}
                            </h6>
                            <h6 className="card-title"><b>Is Enzyme</b>: {gene['is_enzyme'] ? 'True' : 'False'}</h6>
                        </div>

                        <div className="media-body m-3 p-3">
                            <p className="card-title"><b>Family</b>: {gene.family}</p>

                            <div className="chart row">
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Type', 'Quantity'],
                                        ['Structure', gene['num_structures']],
                                        ['Compound', gene['num_compounds']],
                                    ]}
                                    options={{
                                        title: 'No. of Structures vs Compounds',
                                        pieSliceText: 'label',
                                        pieStartAngle: 100,
                                        sliceVisibilityThreshold: 0,
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                />

                                <Chart
                                    height={400}
                                    width={500}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Chart</div>}
                                    data={data}
                                    options={{
                                        title: 'Number of Publications by Year',
                                        chartArea: {width: '80%'},
                                        legend: 'none',
                                        hAxis: {
                                            title: 'Year',
                                            minValue: data[0][0],
                                        },
                                        vAxis: {
                                            title: 'N0. of Publications',
                                            minValue: 0
                                        }
                                    }}
                                    legendToggle
                                />
                            </div>
                            <p><b>Description</b></p>
                            <p>{gene.description}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return showContent();
}

export default Gene;
