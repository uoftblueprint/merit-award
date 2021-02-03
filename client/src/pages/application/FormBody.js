import React, { useState, useEffect, useRef } from "react";
import { getQuestions, postResponses } from "../../api/application";
import Form from "../../components/questions/forms";

function FormBody(props) {
  const [formsLoading, setLoading] = useState(true)
  const [forms, setForms] = useState([])
  const formsRef = useRef([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setForms([]);
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

  function sendResponse(data) {
    console.log(data)
    console.log("send")
    try {
      postResponses(data);
    } catch (e) {
      console.log(e);
    }
  }

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
            <Form questions={form.questions} ref={el => formsRef.current[i] = el} dataCallback={(d) => sendResponse(d)} />
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
