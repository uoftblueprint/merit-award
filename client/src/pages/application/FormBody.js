import React, { useState, useEffect, useRef } from "react";
import { getQuestions } from "../../api/application";
import Form from "../../components/questions/forms";

function FormBody(props) {
  const [formsLoading, setLoading] = useState(true)
  const [forms, setForms] = useState([])
  const formsRef = useRef([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getQuestions(props.pageNum);
      setForms(data);
      setLoading(false);
    }
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [props.pageNum]);

  function updatePage(nextPage) {
    for (let i = 0; i < formsRef.current.length; i++) {
      if (formsRef.current[i]) {
        formsRef.current[i].submit();
      }
    }
    nextPage ? props.nextPage() : props.previousPage();
  }

  function getForms() {
    return (
      !formsLoading && forms.map((form, i) => {
        return (
          <div key={i}>
            <h1>{form.name}</h1>
            <Form questions={form.questions} ref={el => formsRef.current[i] = el} dataCallback={(d) => {console.log("form name: ", form.name)}} />
          </div>
        )
      })
    )
  }

  return (
    <div>
      { getForms() }
      <button onClick={() => updatePage(false)}>previous</button>
      <button onClick={() => updatePage(true)}>next</button>
    </div>
  );
}

export default FormBody;
