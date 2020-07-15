import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {


    return (
        <div>
            <div className="card card-header mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                <p className="card-title">
                    <button type="button" className="btn btn-outline-secondary btn-light mr-3">
                        <Link className="link" to={{pathname: '/'}}>
                            Back
                        </Link>
                    </button>
                </p>
            </div>
            <div className="mt-3 pt-3 mr-3 pr-3 ml-3 pl-3">
                <h1>Oops: Page not Found</h1>
            </div>
        </div>
    );
}

export default Error;
