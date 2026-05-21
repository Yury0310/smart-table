import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  const searchRules = [rules.skipEmptyTargetValues];

  const compare = createComparison(searchRules);

  return (data, state, action) => {
    // 1. Проверяем кнопку сброса
    if (action === "clear" && state) {
      state[searchField] = "";
    }

    // 2. Если поле поиска пустое — возвращаем все данные (профилактика зависаний)
    if (
      !state ||
      !state[searchField] ||
      String(state[searchField]).trim() === ""
    ) {
      return data;
    }

    const query = String(state[searchField]).trim().toLowerCase();

    // @todo: #5.2 — применить компаратор / нативный поиск без зависаний библиотеки
    return data.filter((item) => {
      // Приводим поля проверяемой строки к нижнему регистру для регистронезависимого поиска
      const date = item.date ? String(item.date).toLowerCase() : "";
      const customer = item.customer ? String(item.customer).toLowerCase() : "";
      const seller = item.seller ? String(item.seller).toLowerCase() : "";

      // Возвращаем true, если совпадение найдено хотя бы в одном из трёх полей (Логика ИЛИ)
      return (
        date.includes(query) ||
        customer.includes(query) ||
        seller.includes(query)
      );
    });
  };
}
