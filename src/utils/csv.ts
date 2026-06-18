export function exportToCSV<T extends Record<string, unknown>>(data: T[], headers: string[], keys: (keyof T)[], filename: string) {
  const headerLine = headers.join(',');
  const rows = data.map((row) =>
    keys.map((key) => {
      const val = row[key];
      const str = val instanceof Date ? val.toLocaleDateString('fr-FR') : String(val ?? '');
      return str.includes(',') ? `"${str}"` : str;
    }).join(','),
  );
  const csv = [headerLine, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split('\n').filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"(.*)"$/, '$1'));
  return lines.slice(1).map((line) => {
    const vals: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { vals.push(current.trim()); current = ''; continue; }
      current += ch;
    }
    vals.push(current.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = vals[i] ?? ''; });
    return row;
  });
}
