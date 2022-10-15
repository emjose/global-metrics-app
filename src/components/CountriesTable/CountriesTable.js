import Link from "next/link";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import { Tooltip } from "@nextui-org/react";

const orderBy = (countries, value, direction) => {
	if (direction === "asc") {
		return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
	}

	if (direction === "desc") {
		return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
	}

	return countries;
};

const SortArrow = ({ direction }) => {
	if (!direction) {
		return <></>;
	}

	if (direction === "desc") {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowDownRounded color="inherit" style={{ fontSize: 26 }} />
			</div>
		);
	} else {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowUpRounded color="inherit" style={{ fontSize: 26 }} />
			</div>
		);
	}
};

const CountriesTable = ({ countries }) => {
	const [direction, setDirection] = useState();
	const [value, setValue] = useState();
	const orderedCountries = orderBy(countries, value, direction);

	const switchDirection = () => {
		if (!direction) {
			setDirection("desc");
		} else if (direction === "desc") {
			setDirection("asc");
		} else {
			setDirection(null);
		}
	};

	const setValueAndDirection = (value) => {
		switchDirection();
		setValue(value);
	};

	return (
		<div>
			<div className={styles.heading}>
				<div className={styles.heading_flag}></div>

				<button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
					<div>Name</div>
					{value === "name" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
					<div>Population</div>
					{value === "population" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_area} onClick={() => setValueAndDirection("area")}>
					<div>Area</div>
					{value === "area" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_gini} onClick={() => setValueAndDirection("gini")}>
					<Tooltip content={"The Gini index measures income distribution."} color="error" hideArrow>
						<div>Gini</div>
					</Tooltip>
					{value === "gini" && <SortArrow direction={direction} />}
				</button>
			</div>

			{orderedCountries.map((country) => (
				<Link href={`/country/${country.cca3}`} key={country.name.common}>
					<a className={styles.row}>
						<div className={styles.flag}>
							<img src={country.flags.png} alt={country.name.common} />
						</div>

						<div className={styles.name}>{country.name.common}</div>

						<div className={styles.population}>{country.population}</div>

						<div className={styles.area}>
							{country.area || 0} km<sup style={{ fontSize: "0.5rem" }}>2</sup>
						</div>

						<div className={styles.gini}>
							{country.gini &&
								Object.values(country.gini).flatMap((cur) => {
									return cur.toString() + "%";
								})}

							{!country.gini && <p>N/A</p>}
						</div>
					</a>
				</Link>
			))}
		</div>
	);
};

export default CountriesTable;
