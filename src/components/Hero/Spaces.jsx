import React from "react";
import "./Hero.scss";
import clouds from "../../assets/clouds.png";

const Spaces = () => {
	return (
		<div className="spaces">
			<div className="sun" />
			<img id="cloud1" className="cloud" src={clouds} />
			<img id="cloud2" className="cloud" src={clouds} />
		</div>
	);
};

export default Spaces;
