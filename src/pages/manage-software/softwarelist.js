import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const No = (cell) => {
    return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
};

const SoftwareName = (cell) => {
    return cell.value ? cell.value : "";
};

const StartDate = (cell) => {
    return cell.value ? cell.value : "";
};

const EndDate = (cell) => {
    return cell.value ? cell.value : "";
};

const Category = (cell) => {
    return cell.value ? cell.value : "";
};

const LicenseFile = (cell) => {
    return cell.value ? cell.value : "";
};
const Description = (cell) => {
    return cell.value ? cell.value : "";
};
const NumberOfUsers = (cell) => {
    return cell.value ? cell.value : "";
};






export { NumberOfUsers, Description , LicenseFile, Category , EndDate  , StartDate , SoftwareName , No  };