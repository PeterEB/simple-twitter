
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract tweets(): Tweet[] | Promise<Tweet[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;
}

export class Tweet {
    id: number;
    title: string;
    content?: string;
    user: User;
}

export class User {
    id: number;
    name: string;
    followers?: User[];
    tweets?: Tweet[];
}
