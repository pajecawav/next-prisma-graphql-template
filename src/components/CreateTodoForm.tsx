import { GET_ALL_TODOS } from "@/pages/todos";
import {
	CreateNewTodoMutation,
	CreateNewTodoMutationVariables,
	GetAllTodosQuery,
} from "@/__generated__/operations";
import { gql, useMutation } from "@apollo/client";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";

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
	const [title, setTitle] = useState("");

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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await createTodo({ variables: { input: { title } } });
		setTitle("");
	};

	return (
		<form onSubmit={e => handleSubmit(e)}>
			<HStack gap={2}>
				<Input
					flex="grow"
					type="text"
					placeholder="New todo"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<Button type="submit" colorScheme="teal" isLoading={loading}>
					Add
				</Button>
			</HStack>
		</form>
	);
}
