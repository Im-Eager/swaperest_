import { useState } from "react";
import { Header } from "../components/Header";
import { IPin, Pin } from "../components/Pin";
import { pinsData } from "../pages/pins-db";
import styles from "./home.module.css";

function Homepage() {
    const [pins, setPins] = useState(pinsData);

    return (
        <>
            <Header />
            <main>
                {pins.map((pin, index) => (
                    <Pin key={index} value={pin} />
                ))}
            </main>
        </>
    );
}

export default Homepage;
