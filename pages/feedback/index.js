import { buildFeedbackPath, extractFeedback } from '../api/feedback'
import { useState } from 'react'
import { Fragment } from 'react/cjs/react'
function feedbackPage(props) {
    const [feedbackData, setFeedbackData ] = useState()
    function loadFeedbackHandler(id) {
        fetch(`/api/feedback/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setFeedbackData(data.feedback)
        })
    }
    return (
    <Fragment>
        { console.log("~", props)}
        {feedbackData && <p>{feedbackData.email}</p>}
        <ul>
            {props.feedbackItems.map( itm =>
                <li key={itm.id}>{itm.text}{' '}<button onClick={loadFeedbackHandler.bind(null, itm.id)}> Show Detail </button>
                </li>
            )}
        </ul>
    </Fragment>
    )
}
export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath)
    return {
        props: {
            feedbackItems: data,
        }
    }
}
export default feedbackPage