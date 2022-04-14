import {
	CompleteTodoMutation,
	CompleteTodoMutationVariables,
	DeleteTodoMutation,
	DeleteTodoMutationVariables,
	TodosListEntry_TodoFragment,
} from "@/__generated__/operations";
import { useMutation } from "@apollo/client";
import { Button, HStack, Text } from "@chakra-ui/react";
import { gql } from "graphql-tag";
import React from "react";

const TodosListEntry_todo = gql`
	fragment TodosListEntry_todo on Todo {
		id
		title
		completed
	}
`;

const COMPLETE_TODO = gql`
	mutation CompleteTodo($todoId: String!) {
		updateTodo(id: $todoId, input: { completed: true }) {
			id
			completed
		}
	}
`;

const DELETE_TODO = gql`
	mutation DeleteTodo($todoId: String!) {
		deleteTodo(id: $todoId)
	}
`;

interface Props {
	todo: TodosListEntry_TodoFragment;
}

export function TodosListEntry({ todo }: Props) {
	const [completeTodo, { loading: completeTodoLoading }] = useMutation<
		CompleteTodoMutation,
		CompleteTodoMutationVariables
	>(COMPLETE_TODO);

	const [deleteTodo, { loading: deleteTodoLoading }] = useMutation<
		DeleteTodoMutation,
		DeleteTodoMutationVariables
	>(DELETE_TODO, {
		update: cache => {
			cache.evict({ id: cache.identify(todo) });
		},
	});

	return (
		<HStack>
			<Text
				flex={1}
				alignItems="center"
				fontSize="xl"
				isTruncated
				textDecoration={todo.completed ? "line-through" : undefined}
				color={todo.completed ? "gray.500" : undefined}
			>
				{todo.title}
			</Text>
			{!todo.completed && (
				<Button
					size="sm"
					isLoading={completeTodoLoading}
					onClick={() =>
						completeTodo({ variables: { todoId: todo.id } })
					}
				>
					Complete
				</Button>
			)}
			<Button
				size="sm"
				colorScheme="red"
				isLoading={deleteTodoLoading}
				onClick={() => deleteTodo({ variables: { todoId: todo.id } })}
			>
				Delete
			</Button>
		</HStack>
	);
}

TodosListEntry.fragments = {
	todo: TodosListEntry_todo,
};
