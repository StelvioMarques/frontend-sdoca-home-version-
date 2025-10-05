
export function normalizePrazoGuarda(value = "") {
  let v = value.toString().replace(/^(\d+)([a-zA-ZÀ-ÿ]+)/, "$1 $2");
  v = v.trim().replace(/\s+/g, " ").toLowerCase();
  const parts = v.split(" ");
  const num = parseInt(parts[0], 10);
  const unidade = parts.slice(1).join(" ");
  if (!num || !unidade) return v;

  // normalizações básicas
  let u = unidade
    .replace(/^mes$/i, "mês")
    .replace(/^meses$/i, "meses")
    .replace(/^mes(es)?$/i, "meses")
    .replace(/^anos?$/i, "anos")
    .replace(/^semanas?$/i, "semanas")
    .replace(/^semana$/i, "semana");

  if (u.startsWith("mês")) u = num === 1 ? "mês" : "meses";
  else if (u.startsWith("ano")) u = num === 1 ? "ano" : "anos";
  else if (u.startsWith("semana")) u = num === 1 ? "semana" : "semanas";
  else return v;

  return `${num} ${u}`;
}