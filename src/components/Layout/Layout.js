import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import { useEffect, useState } from "react";
import FlareRoundedIcon from "@material-ui/icons/FlareRounded";
import { Github } from "../github";
import Image from "next/image";

const Layout = ({ children, title = "Global Metrics" }) => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));

		setTheme(localStorage.getItem("theme"));
	}, []);

	const switchTheme = () => {
		if (theme === "light") {
			saveTheme("dark");
		} else {
			saveTheme("light");
		}
	};

	const saveTheme = (theme) => {
		setTheme(theme);
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className={styles.header}>
				<div>
					<div className={styles.buttoncontainer}>
						<button
							className={styles.themeSwitcher}
							onClick={switchTheme}
							tabIndex="0"
							style={{ cursor: "pointer" }}
						>
							<FlareRoundedIcon style={{ fontSize: 30 }} alt="switch to light or dark mode" />
						</button>
					</div>

					<Link href="/">
						<a>
							<Image
								className={styles.logo}
								src="/gm-logo.png"
								alt="Global Metrics"
								width={847}
								height={84}
							/>
						</a>
					</Link>
				</div>
				<Github />
			</header>

			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>
				<Link href="https://github.com/emjose" target="_blank" rel="noopener noreferrer">
					<a>Made by Emmanuel Jose</a>
				</Link>
				&nbsp;•&nbsp;
				<Link
					href="https://github.com/emjose/global-metrics-app/#header"
					target="_blank"
					rel="noopener noreferrer"
				>
					<a>View Github</a>
				</Link>
			</footer>
		</div>
	);
};

export default Layout;
