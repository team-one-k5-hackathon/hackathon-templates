// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import { z, ZodTypeAny } from "zod"

export const extractSchemaStructure = (schema: ZodTypeAny): any => {
  // Trackers
  let result: any
  let description = null

  // Try to access description if it exists on the schema
  if (typeof schema.description === "string") {
    description = schema.description
  }

  // Handle ZodObject (including nested objects)
  if (schema instanceof z.ZodObject) {
    const objResult: Record<string, any> = {}
    Object.entries(schema.shape).forEach(([key, value]) => {
      objResult[key] = extractSchemaStructure(value as ZodTypeAny)
    })
    result = objResult
  }

  // Handle primitive types
  else if (schema instanceof z.ZodString) result = "string"
  else if (schema instanceof z.ZodNumber) result = "number"
  else if (schema instanceof z.ZodBoolean) result = "boolean"
  else if (schema instanceof z.ZodNull) result = "null"
  else if (schema instanceof z.ZodUndefined) result = "undefined"
  else if (schema instanceof z.ZodAny) result = "any"
  else if (schema instanceof z.ZodUnknown) result = "unknown"
  else if (schema instanceof z.ZodDate) result = "date"
  else if (schema instanceof z.ZodVoid) result = "void"
  // Handle arrays, including arrays of objects
  else if (schema instanceof z.ZodArray) {
    const elementType = extractSchemaStructure(schema.element as ZodTypeAny)
    result = [elementType]
  }

  // Handle optional and nullable fields
  else if (schema instanceof z.ZodOptional) {
    const innerType = extractSchemaStructure(
      schema._def.innerType as ZodTypeAny
    )
    // For objects, we want to maintain their structure rather than adding a string marker
    if (
      typeof innerType === "object" &&
      innerType !== null &&
      !Array.isArray(innerType)
    ) {
      result = { ...innerType, optional: true }
    } else {
      result = { type: innerType, optional: true }
    }
  } else if (schema instanceof z.ZodNullable) {
    const innerType = extractSchemaStructure(
      schema._def.innerType as ZodTypeAny
    )
    if (
      typeof innerType === "object" &&
      innerType !== null &&
      !Array.isArray(innerType)
    ) {
      result = { ...innerType, nullable: true }
    } else {
      result = { type: innerType, nullable: true }
    }
  }

  // Handle enums
  else if (schema instanceof z.ZodEnum) {
    result = {
      type: "enum",
      values: schema._def.values,
    }
  } else if (schema instanceof z.ZodNativeEnum) {
    const enumValues = Object.values(schema._def.values).filter(
      (value) => typeof value === "string"
    ) // Keep only string values
    result = {
      type: "enum",
      values: enumValues,
    }
  }

  // Handle union types (including optional via undefined union)
  else if (schema instanceof z.ZodUnion) {
    result = {
      type: "union",
      options: schema._def.options.map((option: ZodTypeAny) =>
        extractSchemaStructure(option)
      ),
    }
  }

  // Handle literal values
  else if (schema instanceof z.ZodLiteral) {
    result = {
      type: "literal",
      value: schema._def.value,
    }
  }

  // Handle record types (key-value objects)
  else if (schema instanceof z.ZodRecord) {
    result = {
      type: "record",
      keyType: extractSchemaStructure(schema._def.keyType as ZodTypeAny),
      valueType: extractSchemaStructure(schema._def.valueType as ZodTypeAny),
    }
  }

  // Handle intersection types
  else if (schema instanceof z.ZodIntersection) {
    result = {
      type: "intersection",
      left: extractSchemaStructure(schema._def.left as ZodTypeAny),
      right: extractSchemaStructure(schema._def.right as ZodTypeAny),
    }
  }

  // Handle tuple types
  else if (schema instanceof z.ZodTuple) {
    result = {
      type: "tuple",
      items: schema._def.items.map((item: ZodTypeAny) =>
        extractSchemaStructure(item)
      ),
    }
  }

  // Default case for unsupported types
  else {
    result = "unknown"
  }

  // Add description if it exists
  if (description) {
    if (
      typeof result === "object" &&
      result !== null &&
      !Array.isArray(result)
    ) {
      return { ...result, description }
    } else {
      return { type: result, description }
    }
  }

  return result
}
