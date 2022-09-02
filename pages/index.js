import { useRef, useState } from 'react'
function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInpRef = useRef();
  const feedbackInpRef = useRef();
  function submitFormHandler(event) {
    event.preventDefault();
    const entem = emailInpRef.current.value;
    const entfb = feedbackInpRef.current.value;
    const reqBody = {email: entem, text: entfb}
    fetch('/api/feedback', {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback' )
    .then(resp => resp.json())
    .then(data => setFeedbackItems(data.feedback))
  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email"> Your email address </label>
          <input type="email" id="email" ref={emailInpRef} />
        </div>
        <div>
          <label htmlFor="feedback"> feedback </label>
          <textarea id="feedback" rows="5" ref={feedbackInpRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>get Feedback</button>
      <ul>
        {feedbackItems.map(itm => <li key={itm.id}>{itm.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
