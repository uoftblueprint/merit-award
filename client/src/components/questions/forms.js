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
          formElementList.push(<InputText key={i} name={question._id} label={question.text} hint={question.hint} register={register}/>);
          break;
        case "Multiple Select":
          formElementList.push(<Checkbox key={i} name={question._id} label={question.text} options={question.options} register={register} />);
          break;
        case "Single Select":
          console.log('question :>> ', question);
          formElementList.push(<SingleSelect key={i} name={question._id} label={question.text} options={question.options} register={register}/>);
          break;
        case "Email":
          formElementList.push(<Email key={i} name={question._id} label={question.text} hint={question.hint} register={register}/>);
          break
        case "Phone Number":
          formElementList.push(<PhoneNumber key={i} name={question._id} label={question.text} hint={question.hint} register={register}/>);
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

function Checkbox({name, options, label, hint, register}) {
  const checkbox_options = []

  for (const [index, value] of options.entries()) {
    checkbox_options.push(
      <div key={index}>
        <input name={name} type="checkbox" ref={register} value={value} />
        <label>{value}</label>
      </div>
    )
  }

  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      {checkbox_options}
    </div>
  )
}

function SingleSelect({name, options, label, hint, register}) {
  const select_options = []

  for (const [index, value] of options.entries()) {
    select_options.push(
      <div key={index}>
        <input name={name} type="radio" ref={register({ required: true })} />
        <label>{value}</label>
      </div>
    )
  }

  return (
    <div>
      <div>
        <label htmlFor={label}>{label}</label>
      </div>
      {select_options}
    </div>
  )
}

function Email({name, options, label, hint, register}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input type="text" name={name} placeholder={hint} ref={register({required: true, pattern: /^\S+@\S+$/i})} />
      </div>
    </div>
  )
}

function PhoneNumber({name, label, hint, register}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input type="tel" name={name} placeholder={hint} ref={register} />
      </div>
    </div>
  )
}

export default Form;