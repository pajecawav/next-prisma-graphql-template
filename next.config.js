const path = require("path");

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias["@"] = path.join(process.cwd(), "src");
		return config;
	},
};

module.exports = config;
