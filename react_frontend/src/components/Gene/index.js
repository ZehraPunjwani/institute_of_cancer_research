import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Chart from "react-google-charts";
import axios from "axios";

import Error from "../Error";
import {GET_GENES} from "../../utils/api";
import './styles.css';

const Gene = (props) => {
    let id = props.location.state ? props.location.state.id : props.location.pathname.split('/')[1];

    const [gene, setGene] = useState([]);
    const [query] = useState(id);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(true);
    let data = [['Year', 'Quantity']];

    useEffect(() => {
        if (query) {
            async function fetchGene() {
                const response = await axios.get(GET_GENES + query, {timeout: 1000});
                return response;
            }

            fetchGene().then(res => {
                const response = res.data;
                const gene = response.length > 0 && response;
                setGene(gene);
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
        } else if ((!loading && errors) || (!loading && gene.length === 0)) {
            return (
                <Error/>
            );
        } else {
            const firstIndex = gene[0];
            firstIndex['publications'].map((entry) => data.push(entry));
            return (
                <div>
                    <div className="card card-header mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                        <p className="card-title">
                            <Link type="button" className="link btn btn-outline-secondary btn-light mr-3"
                                  to={{pathname: '/'}}>
                                Back
                            </Link>
                            ({firstIndex.id} - {firstIndex['full_name']} ({firstIndex['short_name']})
                        </p>
                    </div>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <img src={firstIndex.image} alt={firstIndex['short_name']}/>
                            <h6 className="card-title"><b>Is
                                Druggable</b>: {firstIndex.features['is_druggable'] ? 'True' : 'False'}
                            </h6>
                            <h6 className="card-title"><b>Is
                                Enzyme</b>: {firstIndex.features['is_enzyme'] ? 'True' : 'False'}
                            </h6>
                        </div>

                        <div className="media-body m-3 p-3">
                            <p className="card-title"><b>Family</b>: {firstIndex.family}</p>

                            <div className="chart row">
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Type', 'Quantity'],
                                        ['Structure', firstIndex['num_structures']],
                                        ['Compound', firstIndex['num_compounds']],
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
                            <p>{firstIndex.description}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return showContent();
}

export default Gene;
