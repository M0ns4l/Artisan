/** Maps a free-form technology name (e.g. "Laravel 12") to a TechIcon key, if one exists. */
const rules: Array<[RegExp, string]> = [
  [/react/i, 'react'],
  [/laravel/i, 'laravel'],
  [/tailwind/i, 'tailwind'],
  [/postgres/i, 'postgresql'],
  [/mysql/i, 'mysql'],
  [/\bphp\b/i, 'php'],
  [/html/i, 'html'],
  [/c#|\.net/i, 'csharp'],
]

export function techIconKey(name: string): string | undefined {
  return rules.find(([pattern]) => pattern.test(name))?.[1]
}
