/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Head from "next/head";

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${id}`);
	const country = await res.json();
	return country;
};

const Country = ({ country }) => {
	const [borders, setBorders] = useState([]);

	const getBorders = async () => {
		if (country.borders) {
			const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
			setBorders(borders);
		}
	};

	useEffect(() => {
		getBorders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
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
			<Layout title={country.name.common}>
				<div className={styles.container}>
					<div className={styles.container_left}>
						<div className={styles.overview_panel} tabIndex="0">
							<img src={country.flags.png} alt={country.name.common} />

							<h1 className={styles.overview_name}>{country.name.common}</h1>
							<div className={styles.overview_region}>{country.region}</div>

							<div className={styles.overview_numbers}>
								<div className={styles.overview_population}>
									<div className={styles.overview_value}>{country.population}</div>
									<div className={styles.overview_label}>Population</div>
								</div>

								<div className={styles.overview_area}>
									<div className={styles.overview_value}>
										{country.area} km<sup style={{ fontSize: "0.5rem" }}>2</sup>
									</div>
									<div className={styles.overview_label}>Area</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.container_right}>
						<div className={styles.details_panel}>
							<div className={styles.details_panel_row_capital} tabIndex="0">
								<div className={styles.details_panel_label_capital}>Capital</div>
								<div className={styles.details_panel_value_capital}>{country.capital}</div>
							</div>

							{country.languages && (
								<div className={styles.details_panel_row} tabIndex="0">
									<div className={styles.details_panel_label}>Languages</div>
									<div className={styles.details_panel_value}>
										{Object.values(country.languages).join(", ")}
									</div>
								</div>
							)}

							{country.currencies && (
								<div className={styles.details_panel_row} tabIndex="0">
									<div className={styles.details_panel_label}>Currencies</div>
									<div className={styles.details_panel_value}>
										{Object.values(country.currencies)
											.flatMap((cur) => cur["name"])
											.toString()
											.replace(",", ", ")}
									</div>
								</div>
							)}

							{country.name.nativeName && (
								<div className={styles.details_panel_row} tabIndex="0">
									<div className={styles.details_panel_label}>Native Names</div>
									<div className={styles.details_panel_value}>
										{Object.values(country.name.nativeName)
											.flatMap((cur) => cur["official"])
											.toString()
											.replace(",", ", ")}
									</div>
								</div>
							)}

							{country.gini && (
								<div className={styles.details_panel_row} tabIndex="0">
									<div className={styles.details_panel_label}>Gini</div>
									<div className={styles.details_panel_value}>
										{country.gini &&
											Object.values(country.gini).flatMap((cur) => {
												return cur.toString() + "%";
											})}
									</div>
								</div>
							)}

							{borders.length > 0 && (
								<div className={styles.details_panel_borders} tabIndex="0">
									<div className={styles.details_panel_borders_label}>Bordering Countries</div>
									<div className={styles.details_panel_borders_container}>
										{borders.map((border, index) => (
											<div className={styles.details_panel_borders_country} key={index}>
												<img src={border[0].flags.png} alt={border[0].name.common} />
												<div className={styles.details_panel_borders_name}>
													{border[0].name.common}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Country;

// export const getStaticPaths = async () => {
// 	const res = await fetch("https://restcountries.com/v3.1/all");
// 	const countries = await res.json();

// 	const paths = countries.map((country) => ({
// 		params: { id: country.cca3 },
// 	}));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };

// export const getStaticProps = async ({ params }) => {
// 	const country = await getCountry(params.id);

// 	return {
// 		props: {
// 			country,
// 		},
// 	};
// };

export const getServerSideProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: {
			country: country[0],
		},
	};
};
