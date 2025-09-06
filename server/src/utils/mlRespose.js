import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const mlResponse = async function (path) {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(path));

    const mlRes = await axios.post(
        process.env.ML_URL,
        formData,
        { headers: formData.getHeaders()}
    );

    return mlRes.data;
}

export { mlResponse };