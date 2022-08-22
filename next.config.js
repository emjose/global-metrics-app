module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
};

const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
	},
});
