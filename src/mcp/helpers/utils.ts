function zodToJsonSchema(zodSchema: any): any {
  try {
    // In newer versions of Zod, shape is a function that needs to be called
    const shape =
      typeof zodSchema._def?.shape === "function"
        ? zodSchema._def.shape()
        : zodSchema._def?.shape;

    if (!shape) {
      return {
        type: "object",
        properties: {},
        required: [],
      };
    }

    const properties: Record<string, any> = {};
    const required: string[] = [];

    for (const [key, value] of Object.entries(shape)) {
      const fieldSchema: any = value;

      if (fieldSchema._def) {
        properties[key] = convertZodFieldToJsonSchema(fieldSchema);

        // A field is required if it's not optional and doesn't have a default value
        if (!isOptionalOrHasDefault(fieldSchema)) {
          required.push(key);
        }
      }
    }

    return {
      type: "object",
      properties,
      required,
    };
  } catch (error) {
    console.error("Error converting Zod schema to JSON schema:", error);
    return {
      type: "object",
      properties: {},
      required: [],
    };
  }
}

function isOptionalOrHasDefault(field: any): boolean {
  // Traverse the type chain to find optional or default modifiers
  let currentField = field;
  const visited = new Set(); // Prevent infinite loops

  while (currentField && currentField._def && !visited.has(currentField)) {
    visited.add(currentField);

    const typeName = currentField._def.typeName;

    // Check for optional wrapper
    if (typeName === "ZodOptional") {
      return true;
    }

    // Check for default wrapper
    if (typeName === "ZodDefault") {
      return true;
    }

    // Move to inner type if available
    if (currentField._def.innerType) {
      currentField = currentField._def.innerType;
    } else {
      break;
    }
  }

  // Additional check: if the field has the optional flag
  if (
    field._def &&
    field._def.hasOwnProperty("optional") &&
    field._def.optional
  ) {
    return true;
  }

  return false;
}

function convertZodFieldToJsonSchema(field: any): any {
  const def = field._def;

  if (!def) {
    return { type: "string" };
  }

  switch (def.typeName) {
    case "ZodString":
      return {
        type: "string",
        description: def.description || "",
      };
    case "ZodNumber":
      return {
        type: "number",
        minimum: def.checks?.find((c: any) => c.kind === "min")?.value,
        maximum: def.checks?.find((c: any) => c.kind === "max")?.value,
        description: def.description || "",
      };
    case "ZodBoolean":
      return {
        type: "boolean",
        description: def.description || "",
      };
    case "ZodArray":
      return {
        type: "array",
        items: convertZodFieldToJsonSchema(def.type),
        description: def.description || "",
      };
    case "ZodEnum":
      return {
        type: "string",
        enum: def.values,
        description: def.description || "",
      };
    case "ZodOptional":
      return convertZodFieldToJsonSchema(def.innerType);
    case "ZodDefault":
      const schema = convertZodFieldToJsonSchema(def.innerType);
      schema.default = def.defaultValue();
      return schema;
    default:
      return {
        type: "string",
        description: def.description || "",
      };
  }
}

export { zodToJsonSchema, convertZodFieldToJsonSchema };
