import { buildFeedbackPath, extractFeedback } from '.'
function handler(req, res) {
    const feedbackId = req.query.feedbackId
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(fb => feedbackId === fb.id)
    console.log("~", selectedFeedback)
    res.status(200).json({ feedback: selectedFeedback })
}
export default handler