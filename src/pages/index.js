import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
	// console.log(countries)
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
			<div className={styles.inputContainer}>
				<div className={styles.input}>
					<SearchInput placeholder="search by country, region, or subregion" onChange={onInputChange} />
				</div>
			</div>

			<CountriesTable countries={filteredCountries} />
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
