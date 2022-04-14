import { User } from "@prisma/client";
import { builder } from "../builder";

export const UserObject = builder.objectRef<User>("User").implement({
	fields: t => ({
		id: t.exposeID("id"),
		name: t.exposeString("name", { nullable: true }),
		image: t.exposeString("image", { nullable: true }),
	}),
});

builder.queryField("me", t =>
	t.field({
		type: UserObject,
		nullable: true,
		resolve: (_root, _args, { user }) => user,
	})
);
