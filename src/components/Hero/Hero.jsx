import React from "react";
import "./Hero.scss";
import Spaces from "./Spaces";

const Hero = () => {
	return (
		<div className="hero">
			<Spaces />
			<div className="hero-flex">
				<h1 className="super-big-headline">
					Achmad <span className="hero-color">Firdaus</span> Adinegoro
				</h1>
				<h3 className="subheading">
					Frontend Developer • AI Developer • Freelancer
				</h3>
				<button className="primary-btn">
					More about me
				</button>
			</div>
		</div>
	);
};

export default Hero;
