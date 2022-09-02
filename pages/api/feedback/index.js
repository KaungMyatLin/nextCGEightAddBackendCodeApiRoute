import fs from 'fs'
import path from 'path'
export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')
}
export function extractFeedback(filepath) {
    const fileData = fs.readFileSync(filepath)
    const data = JSON.parse(fileData)
    return data
}
function handler (req, res) {
    if(req.method === 'POST') {
        const em = req.body.email;
        const txt = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: em,
            text: txt
        };

        const filepath = buildFeedbackPath();
        const data = extractFeedback(filepath);
        data.push(newFeedback)
        fs.writeFileSync(filepath, JSON.stringify(data))
        res.status(201).json ({ message: "Success!", feedback: newFeedback})
    } else {
        const filepath = buildFeedbackPath();
        const data = extractFeedback(filepath);
        res.status(200).json({feedback: data})
    }
}
export default handler;