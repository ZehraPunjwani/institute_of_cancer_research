import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {


    return (
        <div>
            <div className="card card-header mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                <p className="card-title">
                    <Link type="button" className="link btn btn-outline-secondary btn-light mr-3"
                          to={{pathname: '/'}}>
                        Back
                    </Link>
                </p>
            </div>
            <div className="mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                <h1>Oops: Page not Found</h1>
            </div>
        </div>
    );
}

export default Error;
