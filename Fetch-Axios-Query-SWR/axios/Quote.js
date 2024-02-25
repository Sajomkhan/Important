import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'http://localhost:5010/api';

export default function Quote() {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await axios.get("/user");
            setQuote(res.data);
        };

        fetchQuote();
    }, []);

    return (
        <div>
            <h1>Get quotes using fetch API</h1>

            <div>{quote?.content}</div>
        </div>
    );
}
