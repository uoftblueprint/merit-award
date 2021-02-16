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
        {errors && <ErrorMessage name={name} />}
      </div>
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
