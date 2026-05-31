export type Task = { category: string; priority: string; completed: boolean };

export function groupUnfinishedHighPriorityTasks(tasks: Task[]): Map<string, Task[]> {
	const result = new Map<string, Task[]>();

	for (const task of tasks) {
		// Фильтруем: только незавершённые (completed === false) и высокоприоритетные (priority === "high")
		if (!task.completed && task.priority === "high") {
			const category = task.category;

			if (!result.has(category)) {
				result.set(category, []);
			}

			result.get(category)!.push(task);
		}
	}

	return result;
}