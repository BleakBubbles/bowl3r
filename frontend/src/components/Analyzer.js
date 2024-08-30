import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Container";
import Image from "./Image";
import Throbber from "./Throbber";
import Loading from "./Loading";
import Upload from "./Upload";
import Button from "./Button";

export default function Analyzer({ children }) {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const analyze = async () => {
            setLoading(true);
            try {
                var form = new FormData();
                form.append("image", image);
                const response = await axios.post(
                    "http://localhost:5000/analyze",
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        responseType: "blob",
                    }
                );
                const objectURL = URL.createObjectURL(response.data);
                setResult(objectURL);
            } catch (error) {
                console.error("Error analyzing data: " + error);
            }
            setLoading(false);
        };
        image && analyze();
    }, [image]);

    return (
        <div className="row-span-5 grid grid-rows-1 w-1/2 h-[92%] self-start place-items-center bg-slate-200 dark:bg-slate-800 shadow-3xl rounded-3xl">
            {result ? (
                <Container>
                    <Image url={result}/>
                    <Button text="Back" action={() => setResult(null)} />
                </Container>
            ) : loading ? (
                <Container>
                    <Image url={URL.createObjectURL(image)}/>
                    <Throbber />
                    <Loading />
                </Container>
            ) : (
                <Upload handleUpload={setImage} />
            )}
        </div>
    );
}
