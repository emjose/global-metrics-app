import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";
import ScrollButton from "../components/ScrollButton";

export default function Home({ countries }) {
	const [keyword, setKeyword] = useState("");

	const filteredCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(keyword) ||
			country.region.toLowerCase().includes(keyword) ||
			country.subregion.toLowerCase().includes(keyword)
	);

	const onInputChange = (e) => {
		e.preventDefault();

		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<Layout>
			<Head>
				<title>Global Metrics</title>
				<meta charSet="UTF-8" />
				<meta property="og:title" content="Global Metrics" />
				<meta property="og:image" content="https://global-metrics-app.vercel.app/meta-029-global-3.png" />
				<meta
					property="og:image:alt"
					content="A diagram table of 250 countries and territories. Click to visit website."
				/>
				<meta property="og:description" content="Project by Emmanuel Jose" />
				<meta property="og:url" content="https://global-metrics-app.vercel.app/" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary" />
				<meta
					name="description"
					content="An app about 250 countries and territories. Click to visit website."
				/>
				<meta name="theme-color" content="#fff9f9" />
				<meta name="keywords" content="HTML, CSS, JavaScript, React, Next.js, countries, global, API" />
				<meta name="author" content="Emmanuel Jose" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.inputContainer}>
				<div className={styles.input}>
					<SearchInput placeholder="search by country, region, or subregion" onChange={onInputChange} />
				</div>
			</div>

			<CountriesTable countries={filteredCountries} />
			<ScrollButton scrollPoint={100} />
		</Layout>
	);
}

// export const getStaticProps = async () => {
export const getStaticProps = async () => {
	// const res = await fetch("https://restcountries.eu/rest/v2/all");
	const res = await fetch("https://restcountries.com/v2/all");
	const countries = await res.json();

	return {
		props: {
			countries,
		},
	};
};

// API: https://restcountries.eu/

// Emmanuel Jose logo, Global Metrics logo, and favicon. © Emmanuel Jose. All Rights Reserved.
