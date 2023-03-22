import React, { useEffect } from "react";
import "./Hero.scss";
import clouds from "../../assets/clouds.png";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Spaces = () => {
    return (
        <div className="spaces" id="spaces">
            <div className="sun" />
            <img id="cloud1" className="cloud" src={clouds} />
            <img id="cloud2" className="cloud" src={clouds} />

            {/* Generate a randomly position stars */}
            {[...Array(150)]?.map((i, idx) => (
                <div
                    key={idx}
                    className="stars"
                    style={{
                        left: getRandomInt(5, 95) + "vw",
                        top: getRandomInt(5, 95) + "vh",
                        animationDelay: "-" + getRandomInt(0, 10) + "s",
                        animationDuration: getRandomInt(5, 20) + "s",
                        boxShadow: `0 0 ${getRandomInt(20, 100)}px ${getRandomInt(5, 15)}px rgba(255, 255, 255, ${getRandomInt(30, 40) * 0.01})`
                    }}
                />
            ))}
        </div>
    );
};

export default Spaces;
