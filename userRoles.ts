/*
  Dynamically generate "type:scope" access roles from:
  {
    type: [...scopes]
  }

  where type is either read or write

  This is made this way intentionally to excercise in retrieving keys from objects.
  Otherwise read and write could be hardcoded since they are only used types
*/

type AccessTypes = ["public", "none", "top_secret"];

type RoleMap = {
	read: AccessTypes;
	write: AccessTypes;
};

type GenerateRole<
	RoleMap extends Record<string, Array<string>>,
	T extends "write" | "read"
> = keyof {
	[K in keyof RoleMap as `${K extends T
		? K
		: never}:${RoleMap[K][number]}`]: never;
};

class User<RoleMap extends Record<string, Array<string>>> {
	assign(
		readRole: GenerateRole<RoleMap, "read">,
		writeRole: GenerateRole<RoleMap, "write">
	): void {
		// Implementation details
	}
}

const user = new User<RoleMap>();

user.assign("read:public", "write:none");

