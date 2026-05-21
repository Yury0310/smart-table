import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  // Передаем стандартное правило пропуска пустых значений
  const searchRules = [rules.skipEmptyTargetValues];

  const compare = createComparison(searchRules);

  return (data, state, action) => {
    const query =
      state && state[searchField]
        ? String(state[searchField]).trim().toLowerCase()
        : "";

    // Если поисковая строка пустая — возвращаем все данные без изменений
    if (!query) {
      return data;
    }

    // @todo: #5.2 — применить компаратор
    return data.filter((item) => {
      // 1. Проверяем базовые правила через компаратор (если они есть)
      const baseMatch = compare(item, state);
      if (!baseMatch) return false;

      // 2. Реализуем поиск по нескольким полям с логикой ИЛИ (как требует тест)
      const date = item.date ? String(item.date).toLowerCase() : "";
      const customer = item.customer ? String(item.customer).toLowerCase() : "";
      const seller = item.seller ? String(item.seller).toLowerCase() : "";

      return (
        date.includes(query) ||
        customer.includes(query) ||
        seller.includes(query)
      );
    });
  };
}
