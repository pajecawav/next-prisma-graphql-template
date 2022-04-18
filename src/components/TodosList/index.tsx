import { TodosListEntry_TodoFragment } from "@/__generated__/operations";
import { Stack } from "@chakra-ui/layout";
import { TodosListEntry } from "./TodosListEntry";

interface Props {
	todos: TodosListEntry_TodoFragment[];
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
