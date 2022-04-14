import { extendTheme, ThemeConfig } from "@chakra-ui/react";

/** @type {import("@chakra-ui/react").ThemeConfig} */
const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: false,
};

const font =
	"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif";

export const theme = extendTheme({
	config,
	fonts: {
		body: font,
		heading: font,
	},
});
