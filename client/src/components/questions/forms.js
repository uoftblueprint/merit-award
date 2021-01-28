import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

const Form = forwardRef(({questions, dataCallback}, ref) => {
  const [formElements, setFormElements] = useState([]);

  const { register, handleSubmit, watch, errors} = useForm();

  useImperativeHandle(ref, () => ({
    submit () {
        handleSubmit(d => dataCallback(d))()
    },
  }))

  useEffect(() => {
    const formElementList = []
    for (let i = 0; i < questions.length; i++) {
      let question = questions[i];
      switch (question.type) {
        case "Input Text":
          formElementList.push(<InputText name={question._id} label={question.text} hint={question.hint} register={register}/>);
        break;
      }
    }
    /*for (const [index, value] of questions.entries()) {
      console.log("line 40")
      console.log(value.question_type)
      const label = value.text;
      switch (value.question_type) {
        case "Input Text":
          list.push(
            <div key={index}>
              <InputText label={value.text} hint={value.hint} register={register} error={errors[label]}/>
            </div>
          );
          break;
        case "Checkbox":
          list.push(
            <div key={index}>
              <Checkbox label={value.text} options={value.options} register={register} error={errors[label]}/>
            </div>
          );
          break;
        case "Single Select":
          list.push(
            <div key={index}>
              <SingleSelect label={value.text} options={value.options} register={register} error={errors[label]}/>
            </div>
          );
          break;
        case "Email":
          list.push(
            <div key={index}>
              <Email label={value.text} hint={value.hint} register={register} error={errors[label]}/>
            </div>
          );
          break;
        case "Phone Number":
          list.push(
            <div key={index}>
              <PhoneNumber label={value.text} hint={value.hint} register={register} error={errors[label]}/>
            </div>
          );
          break;
      }
    }*/
    setFormElements(formElementList)
  }, [questions, errors])

  return (
    <>
    <form onSubmit={handleSubmit(d => console.log(d))}>
      {formElements}
    </form>
    </>
  )
})

function InputText({name, label, hint, register}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input type="text" name={name} placeholder={hint} ref={register} />
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

function Email(props) {
  return (
    <div>
      <div>
        <label>{props.label}</label>
      </div>
      <div>
        <input type="text" name={props.label} placeholder={props.hint} ref={props.register({required: true, pattern: /^\S+@\S+$/i})} />
        {props.error && <div>Enter a valid email address.</div>}
      </div>
    </div>
  )
}

function PhoneNumber(props) {
  return (
    <div>
      <div>
        <label>{props.label}</label>
      </div>
      <div>
        <input type="tel" name={props.label} placeholder={props.hint} ref={props.register({required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/})} />
        {props.error && <div>Enter a valid phone number.</div>}
      </div>
    </div>
  )
}

export default Form;