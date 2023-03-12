import { useState } from "react";
import "./App.scss";
import Hero from "./components/Hero/Hero";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Hero />
		</div>
	);
}

export default App;
