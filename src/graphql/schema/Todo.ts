import { Todo } from "@prisma/client";
import { db } from "prisma/client";
import { builder } from "../builder";

export const TodoObject = builder.objectRef<Todo>("Todo").implement({
	fields: t => ({
		id: t.exposeID("id"),
		title: t.exposeString("title"),
		completed: t.exposeBoolean("completed"),
	}),
});

builder.queryField("todos", t =>
	t.field({
		type: [TodoObject],
		authScopes: {
			user: true,
		},
		resolve: (_root, _args, { user }) => {
			return db.todo.findMany({
				where: { userId: user!.id },
				orderBy: { createdAt: "desc" },
			});
		},
	})
);

builder.queryField("todo", t =>
	t.field({
		type: TodoObject,
		nullable: true,
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: async (_root, { id }, { user }) => {
			return db.todo.findFirst({
				where: { id, userId: user!.id },
				rejectOnNotFound: true,
			});
		},
	})
);

const CreateTodoInput = builder.inputType("CreateTodoInput", {
	fields: t => ({
		title: t.string({
			required: true,
			validate: { minLength: 1, maxLength: 100 },
		}),
	}),
});
builder.mutationField("createTodo", t =>
	t.field({
		type: TodoObject,
		nullable: false,
		args: {
			input: t.arg({
				type: CreateTodoInput,
				required: true,
			}),
		},
		resolve: async (_, { input }, { user }) => {
			return db.todo.create({
				data: { ...input, userId: user!.id },
			});
		},
	})
);

const UpdateTodoInput = builder.inputType("UpdateTodoInput", {
	fields: t => ({
		title: t.string({
			required: false,
			validate: { minLength: 1, maxLength: 100 },
		}),
		completed: t.boolean({
			required: false,
		}),
	}),
});
builder.mutationField("updateTodo", t =>
	t.field({
		type: TodoObject,
		nullable: false,
		args: {
			id: t.arg.string({ required: true }),
			input: t.arg({
				type: UpdateTodoInput,
				required: true,
			}),
		},
		resolve: async (_, { id, input }, { user }) => {
			const todo = await db.todo.findFirst({
				where: { id, userId: user!.id },
				rejectOnNotFound: true,
			});

			return db.todo.update({
				where: { id },
				data: {
					title: input.title ?? todo.title,
					completed: input.completed ?? todo.completed,
				},
			});
		},
	})
);

builder.mutationField("deleteTodo", t =>
	t.boolean({
		nullable: false,
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: async (_, args, { user }) => {
			await db.todo.findFirst({
				where: { id: args.id, userId: user!.id },
				rejectOnNotFound: true,
			});

			await db.todo.delete({ where: { id: args.id } });
			return true;
		},
	})
);
