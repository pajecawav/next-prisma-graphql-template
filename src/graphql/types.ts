import { User } from "@prisma/client";

export type Scalars = {};

export type Context = {
	user: User | null;
};

export type AuthScopes = {
	user: boolean;
};
