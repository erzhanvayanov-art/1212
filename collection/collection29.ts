type User = { active: boolean, progress: number }

export function calculateTotalProgress(users: User[]): number {
	const activeUsers = users.filter(user => user.active && user.progress > 50);

	if (activeUsers.length === 0) return 0;

	const sum = activeUsers.reduce((total, user) => total + user.progress, 0);
	return sum / activeUsers.length;
}