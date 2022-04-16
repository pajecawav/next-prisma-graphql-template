import {
	Avatar,
	Button,
	HStack,
	IconButton,
	Spacer,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export function Header() {
	const session = useSession();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<HStack w="full" gap={2} py={3}>
			<IconButton
				icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
				flex="0"
				size="xs"
				variant="ghost"
				onClick={() => toggleColorMode()}
				aria-label="Toggle theme"
			/>

			<Spacer />

			{session.status !== "loading" &&
				(session.status === "authenticated" ? (
					<Button
						variant="link"
						display="flex"
						gap={2}
						alignItems="center"
						onClick={() => signOut()}
					>
						<Text>{session.data.user?.name}</Text>
						{session.data.user?.image && (
							<Avatar size="xs" src={session.data.user.image} />
						)}
					</Button>
				) : (
					<Button onClick={() => signIn()}>Sign In</Button>
				))}
		</HStack>
	);
}
