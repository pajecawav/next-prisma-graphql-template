import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodosList } from "@/components/TodosList";
import { GetAllTodosQuery } from "@/__generated__/operations";
import { useQuery } from "@apollo/client";
import { Center, Spinner, Stack } from "@chakra-ui/react";
import gql from "graphql-tag";
import React from "react";

export const GET_ALL_TODOS = gql`
	${TodosList.fragments.todo}

	query GetAllTodos {
		todos {
			id
			...TodosList_todo
		}
	}
`;

export default function TodosPage() {
	const { data, loading } = useQuery<GetAllTodosQuery>(GET_ALL_TODOS);

	if (!data || loading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Stack direction="column" gap={4}>
			<CreateTodoForm />
			<TodosList todos={data.todos} />
		</Stack>
	);
}
