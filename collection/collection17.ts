export type User = { email: string, verified: boolean };

export function getVerifiedEmails(users: User[]): string[] {
	return users
		.filter(user => user.verified)
		.map(user => user.email);
}