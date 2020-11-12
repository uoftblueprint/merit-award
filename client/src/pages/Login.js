import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

import { useSelector, useDispatch } from 'react-redux';
import { signUpUser, deleteUser } from '../actions/sampleActions';

function Login() {
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.userStatus);

    let tempUser = {
        username: "Alex",
        password: "Shi"
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                <p>Test redux</p>
                <button onClick={() => dispatch(signUpUser(tempUser))}>Sign up User</button>
                <button onClick={() => dispatch(deleteUser(tempUser))}>Delete User</button>
                <p>{userStatus}</p>
            </div>
            <form>
                <div>
                <p>Username:</p>
                <input type="text" name="username" />
                </div>
                <div>
                <p>Password:</p>
                <input type="password" name="password" />
                </div>
                <Link to="/users"><button>User</button></Link>
                <Link to="/recommenders"><button>Recommender</button></Link>
                <Link to="/reviewers"><button>Reviewer</button></Link>
            </form>
        </div>
    );
}

export default Login;
