import React, { useEffect } from "react"
import { Spinner } from "reactstrap";

const Spinners = ({size,color}) => {

    
    return (
        <React.Fragment>
            <Spinner color={color}  size={size} />
        </React.Fragment>
    )
}

export default Spinners;