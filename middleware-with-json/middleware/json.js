export async function json(req, res, next) {
    const buffer = [];
    for await (const chunk of req) {
        buffer.push(chunk); //push the chunk to the buffer
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffer).toString()); //convert the buffer to a string and then to a JSON object
    } catch (error) {
        req.body = null; //if there is an error, set the body to null
    }
    }