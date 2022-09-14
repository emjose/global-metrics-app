import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Link from "next/link";

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
	const country = await res.json();
	return country[0];
};

const Country = ({ country }) => {
	const [borders, setBorders] = useState([]);

	const getBorders = async () => {
		const borders =
			country && country.borders && country.borders.length
				? await Promise.all(country.borders.map((border) => getCountry(border)))
				: [];
		setBorders(borders);
	};

	useEffect(() => {
		getBorders();
	}, [country]);

	return (
		<Layout title={country.name.common}>
			<div className={styles.container}>
				{/* Left Panel */}
				<div className={styles.container_left}>
					<div className={styles.overview_panel} tabIndex="0">
						{/* Flag and Name */}
						<img src={country.flags.png} alt={country.name.common}></img>
						<h1 className={styles.overview_name}>{country.name.common}</h1>
						<div className={styles.overview_region}>{country.region}</div>

						{/* Population and Area */}
						<div className={styles.overview_numbers}>
							<div className={styles.overview_population}>
								<div className={styles.overview_label}>Population</div>
								<div className={styles.overview_value}>{country.population}</div>
							</div>

							<div className={styles.overview_area}>
								<div className={styles.overview_label}>Area</div>
								<div className={styles.overview_value}>
									{country.area} km<sup style={{ fontSize: "0.5rem" }}>2</sup>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Panel */}
				<div className={styles.container_right}>
					<div className={styles.details_panel}>
						{/* Official Name */}
						<div className={styles.details_panel_row_official} tabIndex="0">
							<div className={styles.details_panel_label_official}>Official Name</div>
							<div className={styles.details_panel_value_official}>{country.name.official}</div>
						</div>
						{/* Native Names */}
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
						{/* Capital */}
						<div className={styles.details_panel_row} tabIndex="0">
							<div className={styles.details_panel_label}>Capital</div>
							<div className={styles.details_panel_value}>{country.capital}</div>
						</div>
						{/* Subregion */}
						<div className={styles.details_panel_row} tabIndex="0">
							<div className={styles.details_panel_label}>Subregion</div>
							<div className={styles.details_panel_value}>{country.subregion}</div>
						</div>
						{/* Languages */}
						<div className={styles.details_panel_row} tabIndex="0">
							<div className={styles.details_panel_label}>Languages</div>
							<div className={styles.details_panel_value}>
								{"languages" in country ? Object?.values(country.languages).join(", ") : "undefined"}
							</div>
						</div>
						{/* Currencies */}
						<div className={styles.details_panel_row} tabIndex="0">
							<div className={styles.details_panel_label}>Currencies</div>
							<div className={styles.details_panel_value}>
								{"currencies" in country ? Object?.values(country.currencies)[0]["name"] : "undefined"}
							</div>
						</div>
						{/* Gini */}
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
						{/* Border Countries */}
						{country.borders && country.borders.length && (
							<div className={styles.details_panel_borders}>
								<div className={styles.details_panel_borders_label}>Bordering Countries</div>

								<div className={styles.details_panel_borders_container}>
									{borders.map(({ flags, name, cca3 }) => (
										<Link key={name.common} href={`/country/${cca3}`}>
											<a title="View Country">
												<div className={styles.details_panel_borders_country}>
													<img src={flags.png} alt={name.common}></img>
													<div className={styles.details_panel_borders_name}>
														{name.common}
													</div>
												</div>
											</a>
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getStaticPaths = async () => {
	const res = await fetch("https://restcountries.com/v3.1/all");
	const countries = await res.json();
	const paths = countries.map((country) => {
		return {
			params: { id: country.cca3 },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: {
			...params,
			country,
		},
	};
};
