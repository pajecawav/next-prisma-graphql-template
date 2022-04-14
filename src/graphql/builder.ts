import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import { AuthScopes, Context, Scalars } from "./types";

export const builder = new SchemaBuilder<{
	Scalars: Scalars;
	Context: Context;
	AuthScopes: AuthScopes;
}>({
	// NOTE: make sure that scope-auth plugin is listed first
	plugins: [ScopeAuthPlugin, ValidationPlugin],
	authScopes: async ctx => ({
		user: !!ctx.user,
	}),
});
