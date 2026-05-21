import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  const searchRules = [
    rules.skipEmptyTargetValues,
    rules.searchMultipleFields(
      searchField,
      ["date", "customer", "seller"],
      false, // Регистронезависимый поиск
    ),
  ];

  const compare = createComparison(searchRules);

  return (data, state, action) => {
    // Если в поле поиска ничего не введено — сразу возвращаем данные (профилактика зависаний)
    if (
      !state ||
      !state[searchField] ||
      String(state[searchField]).trim() === ""
    ) {
      return data;
    }

    // @todo: #5.2 — применить компаратор
    // Очищаем данные от null/undefined перед проверкой, чтобы компаратор не выбрасывал внутренние ошибки
    return data.filter((item) => {
      const safeItem = {
        ...item,
        date: item.date ? String(item.date) : "",
        customer: item.customer ? String(item.customer) : "",
        seller: item.seller ? String(item.seller) : "",
      };
      return compare(safeItem, state);
    });
  };
}
