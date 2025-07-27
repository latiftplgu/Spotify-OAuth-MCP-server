function zodToJsonSchema(zodSchema: any): any {
  try {
    const shape = zodSchema._def?.shape;
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

        if (!fieldSchema.isOptional()) {
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
