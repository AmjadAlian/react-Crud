import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader.jsx';


export default function Index() {
    const [users, setUsers] = useState([]);
    let [loader, setLoader] = useState(false);
    const getUsers = async () => {
        const { data } = await axios.get('https://crud-users-gold.vercel.app/users/');
        setUsers(data.users);
        setLoader(false);
    }
    const deleteUser = async (id) => {
        setLoader(true);
        const { data } = await axios.delete(`https://crud-users-gold.vercel.app/users/${id}`);
        console.log(data);
        if (data.message == 'success') {
            toast('user deleted successfully');
            setLoader(false);
            getUsers();
        }
        else {
            setLoader(false);
        }
    }
    useEffect(() => {
        setLoader(true);
        getUsers();
    }, [])


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
                            <li>
                            <Link href="#" to={'/user/create'} className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Create</span> 
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                                <th scope="col">password</th>
                                <th scope='col'>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((user, index) =>
                            (
                                <React.Fragment key={user._id}>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td className='btn btn-danger me-auto ' onClick={() => deleteUser(user._id)}>Delete</td>
                                        <td className='btn btn-info mx-3 my-1'><Link className='text-decoration-none text-dark' to={`/user/${user._id}`}>Details</Link></td>
                                        <td className='btn btn-warning'><Link className='text-decoration-none text-dark' to={`/user/edit/${user._id}`}>Edit</Link></td>

                                    </tr>
                                </React.Fragment>

                            )
                            ) : <h2>no users found</h2>}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
