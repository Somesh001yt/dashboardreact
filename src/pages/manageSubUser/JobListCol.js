import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';



const FirstName = (cell) => {
    return cell.value ? cell.value : "";
};

const Email = (cell) => {
    return cell.value ? cell.value : "";
};

const Address = (cell) => {
    return cell.value ? cell.value : "";
};

const Phone = (cell) => {
    return cell.value ? cell.value : "";
};

const Password = (cell) => {
    return cell.value ? cell.value : "";
};


const ProfileImage = (cell) => {
    return cell.value ? cell.value : "";
};
const ClassName = (cell) => {
    return cell.value ? cell.value : "";
};

const PostedDate = (cell) => {
    return cell.value ? cell.value : "";
};
const action = (cell) => {
    return cell.value ? cell.value : "";
};




export { FirstName , Email, Address, Phone, Password, ProfileImage, ClassName, PostedDate, action};