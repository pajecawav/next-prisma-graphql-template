import { Box, Stack } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import { Header } from "./Header";

interface Props {
	children?: ReactNode;
}

export function DefaultAppShell({ children }: Props) {
	return (
		<Stack w="full" maxW="2xl" mx="auto" px={2} mb={4}>
			<Header />
			<Box flex={1} mt={4}>
				{children}
			</Box>
		</Stack>
	);
}
