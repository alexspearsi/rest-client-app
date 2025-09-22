import { VariablesLS } from '@/components/variables/variables';

export function parseVariable(string: string, lsData: VariablesLS[]): string {
  let result = string;
  const matchesWithTemplates = string.match(/{{.+?}}/g);
  const matches = string.match(/(?<={{).+?(?=}})/g);
  if (matches && matchesWithTemplates) {
    for (const [index, match] of matches.entries()) {
      const variable = lsData.find(
        (item) => item.variable === match.trim() && item.checked,
      );

      if (variable) {
        result = result.replace(matchesWithTemplates[index], variable.value);
      }
    }

    return result;
  }

  return result;
}
