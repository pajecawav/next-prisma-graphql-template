import { PrismaClient } from "@prisma/client";
import isCi from "is-ci";

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
declare global {
	var db: PrismaClient | undefined;
}

let prisma: PrismaClient;

// HACK: This module is imported during graphql types generation in CI where no
// `DATABASE_URL` env variable is specified so the prisma client throws an
// error and stops generation script from working. To avoid this we detect CI
// environment and avoid instantiating PrismaClient in those.
if (isCi) {
	prisma = null as any as PrismaClient;
} else {
	prisma = global.db || new PrismaClient();
}

if (process.env.NODE_ENV !== "production") {
	global.db = prisma;
}

export const db = prisma;
