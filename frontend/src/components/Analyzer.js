import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Container";
import Image from "./Image";
import Throbber from "./Throbber";
import Loading from "./Loading";
import Upload from "./Upload";
import Back from "./Back";

export default function Analyzer({ children }) {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const listener = (e) => {
            if (e.clipboardData.files.length) {
                setImage(e.clipboardData.files[0]);
            }
        };
        window.addEventListener("paste", listener);

        return () => window.removeEventListener("paste", listener);
    }, []);

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
        <div className="row-span-3 grid w-1/2 h-5/6 place-items-center bg-blurple drop-shadow-2xl rounded-3xl">
            {result ? (
                <Container>
                    <Image url={result} pulse={false}/>
                    <Back handleBack={() => setResult(null)} />
                </Container>
            ) : loading ? (
                <Container>
                    <Image url={URL.createObjectURL(image)} pulse={true}/>
                    <Throbber />
                    <Loading />
                </Container>
            ) : (
                <Upload handleUpload={setImage} />
            )}
        </div>
    );
}
