import React from 'react'
import { Spinner } from 'react-bootstrap'

//Loader element is called into the application when a request is loading, to show the user that something is happening... This is customisable through different react-bootstrap classes...

const Loader = () => {
    return (
        <Spinner animation='grow' role='status' style={{ width: '200px', height: '200px', margin: 'auto', display: 'block' }}>
            <span class='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
