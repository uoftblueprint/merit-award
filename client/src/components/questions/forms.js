import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

function Form() {
  const [questions, setQuestions] = useState([]);
  const [formElements, setFormElements] = useState([]);

  const { register, handleSubmit, } = useForm();

  useEffect(() => {
    console.log("inside useEffect")

    async function fetchData() {
      // Get the data from the backend
      const result = await axios(
        'http://localhost:8080/getQuestions',
      );
      console.log("result from fetching the data")
      console.log(result)
      const list = []
      for (let i = 0; i < result.data.length; i++) {
        var current = result.data[i]
        list.push({
          id: current["ID"],
          page_number: current["page_number"],
          question_type: current["question_type"],
          text: current["text"],
          hint: current["hint"],
          options: current["options"].split(','),
        })
      }
      setQuestions(list);
    }

    fetchData();

  }, []);

  useEffect(() => {
    const list = [...formElements]
    for (const [index, value] of questions.entries()) {
      console.log("line 40")
      console.log(value.question_type)
      switch (value.question_type) {
        case "Input Text":
          list.push(
            <div key={index}>
              <InputText label={value.text} hint={value.hint} register={register} />
            </div>
          );
          break;
        case "Checkbox":
          list.push(
            <div key={index}>
              <Checkbox label={value.text} options={value.options} register={register} />
            </div>
          );
          break;
        case "Single Select":
          list.push(
            <div key={index}>
              <SingleSelect label={value.text} options={value.options} register={register} />
            </div>
          );
          break;
      }
    }
    setFormElements(list)
  }, [questions])

  return (
    <form onSubmit={handleSubmit(d => console.log(d))}>
      {formElements}
      <input type="submit" />
    </form>
  )
}

function InputText(props) {
  return (
    <div>
      <div>
        <label>{props.label}</label>
      </div>
      <div>
        <input type="text" name={props.label} placeholder={props.hint} ref={props.register} />
      </div>
    </div>
  )
}

function Checkbox(props) {
  const checkbox_options = []

  for (const [index, value] of props.options.entries()) {
    checkbox_options.push(
      <div key={index}>
        <input name={props.label + value} type="checkbox" ref={props.register} />
        <label>{value}</label>
      </div>
    )
  }

  return (
    <div>
      <div>
        <label htmlFor={props.label}>{props.label}</label>
      </div>
      {checkbox_options}
    </div>
  )
}

function SingleSelect(props) {
  const select_options = []

  for (const [index, value] of props.options.entries()) {
    select_options.push(
      <div key={index}>
        <input name={props.label} type="radio" ref={props.register({ required: true })} />
        <label>{value}</label>
      </div>
    )
  }

  return (
    <div>
      <div>
        <label htmlFor={props.label}>{props.label}</label>
      </div>
      {select_options}
    </div>
  )
}

export default Form;