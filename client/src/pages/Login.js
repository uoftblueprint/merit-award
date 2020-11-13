import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

import { useSelector, useDispatch } from 'react-redux';
import { signUpUser, deleteUser } from '../actions/userStatusActions';

function Login() {
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.userStatus);

    const [username, setUserName] = useState("");
    const [pwd, setPwd] = useState("");

    let tempUser = {
        username: username,
        password: pwd
    }

    return (
        <div>
            <h1>Login</h1>

            <div>
                {/* Redux Demonstration */}
                <h2>Current Users</h2>
                <p>Type in the name of the User in the input and you can Add or Delete them</p>
                <p>{userStatus.map(user => <div key={user.username}>{user.username}</div>)}</p>
                <button onClick={() => dispatch(signUpUser(tempUser))}>Sign up User</button>
                <button onClick={() => dispatch(deleteUser(tempUser))}>Delete User</button>
            </div>

            <form>
                <div>
                <p>Username:</p>
                <input id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}/>
                </div>
                <div>
                <p>Password:</p>
                <input id="pwd"
                    type="password"
                    name="password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}/>
                </div>
                <Link to="/users"><button>User</button></Link>
                <Link to="/recommenders"><button>Recommender</button></Link>
                <Link to="/reviewers"><button>Reviewer</button></Link>
            </form>
        </div>
    );
}

export default Login;
