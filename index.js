import { object, string, bad, good } from "@robolex/sure";

const schema = object({
  name: string,

  age: (val) => {
    // Add for typescript
    if (typeof val !== "number") {
      // when relying on JsDoc, this can be an replacement for `as const`
      return /** @type {const} */ ([false, "age must be a number"]);
    }

    if (!Number.isInteger(val)) {
      // Or the `bad` function, since it's typed automatically, and takes
      return bad("age must be an integer");
    }

    if (val < 0) {
      return /** @type {const} */ ([false, "age must be a positive number"]);
    }

    if (val > 150) {
      return bad("age must be less than 150");
    }

    // Or you can use `[true, val] as const`
    return good(val);
  },
});

const [ok, value] = schema({ name: "John", age: -30 });

if (ok) {
  /*
  const value: {
      name: string;
      age: number;
  }
  */

  console.log(value.name);
} else {
  /* Infered type:
  
  const value: {
      name?: "not string" | undefined;
      age?: "age must be a number" | "age must be an integer" | "age must be a positive number" | "age must be less than 150" | undefined;
  }
  */
  console.log(value);
}
