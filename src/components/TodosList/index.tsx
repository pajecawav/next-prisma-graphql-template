import { TodosList_TodoFragment } from "@/__generated__/operations";
import { Stack } from "@chakra-ui/layout";
import gql from "graphql-tag";
import { TodosListEntry } from "./TodosListEntry";

const TodosList_todo = gql`
	${TodosListEntry.fragments.todo}

	fragment TodosList_todo on Todo {
		...TodosListEntry_todo
	}
`;

interface Props {
	todos: TodosList_TodoFragment[];
}

export function TodosList({ todos }: Props) {
	return (
		<Stack spacing={4}>
			{todos.map(todo => (
				<TodosListEntry todo={todo} key={todo.id} />
			))}
		</Stack>
	);
}

TodosList.fragments = {
	todo: TodosList_todo,
};
