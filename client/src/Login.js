import React from 'react';
import {
    Link
  } from "react-router-dom";

export default class Login extends React.Component{
    render(){
        return (
            <div>
                <h1>Login</h1>
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
}