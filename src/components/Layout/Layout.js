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

			<header className={styles.header}>
				<div>
					<div className={styles.buttoncontainer}>
						<button
							className={styles.themeSwitcher}
							onClick={switchTheme}
							tabIndex="0"
							aria-label="switch to light or dark mode"
							style={{ cursor: "pointer" }}
						>
							<FlareRoundedIcon style={{ fontSize: 30 }} alt="switch to light or dark mode" />
						</button>
					</div>

					<Link href="/">
						<a title="Back to home page" id="home-page-logo">
							<Image
								className={styles.logo}
								src="/gm-logo.png"
								alt="Global Metrics"
								width={1218}
								height={122}
								layout="intrinsic"
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
