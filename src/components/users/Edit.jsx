import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../shared/Input.jsx';
import { validationUserData } from '../../validation/userValidation.js';
import Loader from '../loader/Loader.jsx';

export default function Edit() {
    
    const navigate = useNavigate();
    let [loader, setLoader] = useState(false);
    let [user, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { id } = useParams('id');
    const getUser = async () => {
        const { data } = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
        setUser(data.user);
    }
    useEffect(() => {
        getUser
    }, [])
    let [errors, setErrors] = useState({})
    let [errorBack, setErorrBack] = useState('');
    const handelData = (e) => {
        const { name, value } = e.target;
        setUsers({ ...user, [name]: value });
    }
    const sendData = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (Object.keys(validationUserData(user)).length > 0) {

            setErrors(validationUserData(user))
            setLoader(false);
        }
        else {
            try {
                const { data } = await axios.put(`https://crud-users-gold.vercel.app/users/${id}`, user);
                if (data.message == 'success') {
                    toast('User Updated Successfully')
                    navigate('/user/index');
                    setLoader(false);
                }
            }

            catch (error) {
                setErorrBack(error.response.data.message);
                setErrors([]);
                setLoader(false);
            }
        }
    }
    if (loader) {
        return (
            <Loader />
        )
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to={'/user/index'} className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Index</span>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/user/create'} className="nav-link px-0 align-middle">
                                    <i className="fs-4 " /> <span className="ms-1 d-none d-sm-inline">Create</span>
                                    
                                    </Link>
                            </li>
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1">loser</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    {errorBack && <p className='text text-danger'>{errorBack}</p>}
                    <form onSubmit={sendData}>
                        <Input errors={errors} id={'username'} title={' user name'} value={user.name} type={'text'} name={'name'} handelData={handelData} />
                        <Input errors={errors} id={'email'} title={'user email'} value={user.email} type={'email'} name={'email'} handelData={handelData} />
                        <Input errors={errors} id={'password'} title={'user password'} value={user.password} type={'password'} name={'password'} handelData={handelData} />

                        <div className="bm-3">
                            <input type="submit" className='form-control btn btn-info' value="Update User" />
                        </div>
                    </form>
                </div >
            </div>
        </div>
    )
}
