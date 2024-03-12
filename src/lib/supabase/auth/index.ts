export const ROLES = {
	OWNER: 'OWNER',
	MAINTAINER: 'MAINTAINER',
	AUTHORIZED: 'AUTHORIZED'
};

export const ROLES_LIST = Object.values(ROLES);

export type ObjectValues<T> = T[keyof T];

export type Role = ObjectValues<typeof ROLES>;

export type Account = {
	id: string;
	role: Role;
	nickname?: string;
	firstname?: string;
	lastname?: string;
	groups: { id: number; title: string; color: string }[];
	initialized: boolean;
};
