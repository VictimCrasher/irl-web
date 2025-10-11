import "./App.scss";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero/Hero";
import About from "./components/About";
import Experience from "./components/Experience";

function App() {
	return (
		<div className="App">
			<Header />
			<ScrollToTop />
			<Hero />
			<About />
			<Experience />
		</div>
	);
}

export default App;
