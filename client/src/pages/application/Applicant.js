import React, { useState, useEffect, useRef } from "react";
import { getQuestions } from "../../api/application";
import Form from "../../components/questions/forms";
function Applicant() {
  const [formsLoading, setLoading] = useState(true)
  const [forms, setForms] = useState([])
  const formRef = useRef();
  const formsRef = useRef([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getQuestions(1);
      console.log(data);
      setForms(data);
      setLoading(false);
    }
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const dataCallback = (d) => {
    console.log(d)
  }

  return (
    <div>
      {!formsLoading && forms.map((form, i) => {

        return (
          <div key={i}>
            <h1>{form.name}</h1>
            <Form questions={form.questions} ref={el => formsRef.current[i] = el} dataCallback={(d) => {console.log(form.name); console.log(d)}} />
          </div>
        )
      })}
      <button onClick={() => {
        for (let i = 0; i < formsRef.current.length; i++) {
          formsRef.current[i].submit();
        }
      }}>next</button>
    </div>
  );
}

export default Applicant;
