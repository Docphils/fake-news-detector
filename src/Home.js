import React from "react";

export default function Home() {
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://fake-news-detector-yp6z.onrender.com/api/chatgpt", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: input}),
            });
            const data = await res.json();
            if (data.reply) {
                const parsed = JSON.parse(data.reply);
                setResult(parsed);
                setInput("");
            }
        } catch (err) {
            console.error(err);
            alert("Error contacting AI service");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 70) return "#dc2626"; // red
        if (score >= 40) return "#f59e0b"; // yellow
        return "#16a34a"; // green
    };

    return (
        <section className='content'>
            <p>
                Welcome to Phils Fake News Detector. Paste the message or
                headline - lets use AI to tell the truth.
            </p>

            <div className='form'>
                <label htmlFor='text'>
                    Paste the message or headline you want to verify
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                />
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Checking..." : "Check for truth"}
                </button>
            </div>

            {result && (
                <div className='Results'>
                    <p
                        className='score'
                        style={{color: getScoreColor(result.score)}}
                    >
                        Fake Score: {result.score}%
                    </p>

                    {Array.isArray(result.redFlags) &&
                        result.redFlags.length > 0 && (
                            <ul className='reasons'>
                                {result.redFlags.map((flag, index) => (
                                    <li key={index}>{flag}</li>
                                ))}
                            </ul>
                        )}

                    {result.advice && (
                        <p className='advice'>
                            <strong>Advice:</strong> {result.advice}
                        </p>
                    )}
                </div>
            )}

            {result && (
                <div className='wiseQuote'>
                    <h5>Did You Know?</h5>
                    <p>{result.qouteAboutFacts}</p>
                </div>
            )}
        </section>
    );
}
