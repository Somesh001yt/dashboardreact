import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';



const BlogUrlName = (cell) => {
    return cell.value ? cell.value : "";
};

const Url = (cell) => {
    return cell.value ? cell.value : "";
};

const PostedDate = (cell) => {
    return cell.value ? cell.value : "";
};

const Authorized = (cell) => {
    return cell.value ? cell.value : "";
};








export { BlogUrlName, Url , PostedDate, Authorized  };