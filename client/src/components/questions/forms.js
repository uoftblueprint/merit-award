import React, { useEffect, useState } from 'react';
import { Question, getQuestions, convertQuestions } from './questions';
import { useForm } from 'react-hook-form';
import axios from "axios";

function Form() {
    const [questions, setQuestions] = useState([]);
    const { register, handleSubmit, watch, errors } = useForm();
    const form_elements = []

    useEffect(() => {
      console.log("inside useEffect")

      async function fetchData() {
        // You can await here
        const result = await axios(
          'http://localhost:8080/getQuestions',
        );
        setQuestions(result.data);
      }
      fetchData();
   
    }, []);

    console.log(questions)
    for (const [index, value] of questions.entries()) {
      form_elements.push(<input name={value.text} ref={register}/>)
    }

    return (
        <form onSubmit={handleSubmit(d => console.log(d))}>
            {form_elements}
            <input type="submit" />
        </form>
    )
}

export default Form;