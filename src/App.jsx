import "./App.scss";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./assets/components/Footer";

function App() {
	return (
		<div className="App">
			<Header />
			<ScrollToTop />
			<Hero />
			<About />
			<Experience />
			<Skills />
			<Portfolio />
			<Contact />
			<Footer />
		</div>
	);
}

export default App;
