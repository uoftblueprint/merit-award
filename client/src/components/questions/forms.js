import React from 'react';
import { Field, ErrorMessage } from 'formik';


export function InputText({name, label, hint, errors}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <Field component="input" type="text" name={name} placeholder={hint}/>
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}


export function TextArea({name, label, hint, errors}) {
  return (
    <div>
      <label>{label}</label>
      <Field component="textarea" type="text" name={name} placeholder="lmao"/>
      <ErrorMessage name={name} />
    </div>
  )
}

export function Checkbox({name, options, label, hint, register}) {
  const checkbox_options = []

  for (const [index, value] of options.entries()) {
    checkbox_options.push(
      <div key={index}>
        <Field name={name} type="checkbox" value={value} />
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
      <ErrorMessage name={name} />
    </div>
  )
}

export function SingleSelect({name, options, label, hint, register}) {
  const select_options = []

  for (const [index, value] of options.entries()) {
    select_options.push(
      <div key={index}>
        <Field name={name} type="radio" value={value} />
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
      <ErrorMessage name={name} />
    </div>
  )
}

export function Dropdown({name, options, label}) {
  const select_options = []
  select_options.push(<option key={0} name={name} value="" label={""}/>)

  for (const [index, value] of options.entries()) {
    select_options.push(
      <option key={index+1} name={name} value={value} label={value}/>
    )
  }

  return (
    <div>
      <label>{label}</label>
      <Field name={name} component="select">
        { select_options }
      </Field>
      <ErrorMessage name={name} />
    </div>
  )
}

export function Email({name, label}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <Field type="email" name={name} />
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}
