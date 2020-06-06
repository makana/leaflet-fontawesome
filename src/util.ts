import type { Dictionary } from 'ts-essentials';

/**
 * Ensures that the given laue is an array.
 * @param v The value.
 */
export function castArray<T>(v: T | T[]): T[]
{
  return Array.isArray(v) ? v : [v];
}

/**
 * Creates a list of classes from the object keys that have a truthy value.
 * @param classes The class map.
 */
export function classList(classes: Dictionary<boolean, string>): string[]
{
  const result: string[] = [];

  for (const cls in classes)
  {
    if (classes[cls])
    {
      result.push(cls);
    }
  }

  return result;
}
