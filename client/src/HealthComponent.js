import React, { useState, useEffect } from 'react'
import axios from 'axios';

function HealthComponent() {
    const [health, setHealth] = useState("not running");
    
    useEffect(() => {
        axios.get('health')
        .then((response) => {
            setHealth(response.data.status);
        })
        .catch(function (error) {
            console.log(error);
        });
    })

    return (
        <h1>Status {health}</h1>
    )
}

export default HealthComponent;
