import { useZodForm } from "@/hooks/useZodForm";
import { GET_ALL_TODOS } from "@/pages/todos";
import {
	CreateNewTodoMutation,
	CreateNewTodoMutationVariables,
	GetAllTodosQuery,
} from "@/__generated__/operations";
import { gql, useMutation } from "@apollo/client";
import { Button, HStack, Input } from "@chakra-ui/react";
import React from "react";
import { object, string } from "zod";

const CREATE_NEW_TODO = gql`
	mutation CreateNewTodo($input: CreateTodoInput!) {
		createTodo(input: $input) {
			id
			title
			completed
		}
	}
`;

export function CreateTodoForm() {
	const form = useZodForm({
		schema: object({ title: string().min(1) }),
	});

	const [createTodo, { loading }] = useMutation<
		CreateNewTodoMutation,
		CreateNewTodoMutationVariables
	>(CREATE_NEW_TODO, {
		update: (cache, { data: newTodo }) => {
			if (!newTodo) return;

			cache.updateQuery<GetAllTodosQuery>(
				{ query: GET_ALL_TODOS },
				data => {
					if (!data) {
						return data;
					}

					return { todos: [newTodo.createTodo, ...data.todos] };
				}
			);
		},
	});

	return (
		<form
			onSubmit={form.handleSubmit(async values => {
				await createTodo({
					variables: { input: { title: values.title } },
				});
				form.reset();
			})}
		>
			<HStack gap={2}>
				<Input
					flex="grow"
					placeholder="New todo"
					{...form.register("title")}
				/>
				<Button type="submit" colorScheme="teal" isLoading={loading}>
					Add
				</Button>
			</HStack>
		</form>
	);
}
