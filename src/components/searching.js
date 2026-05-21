import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  const searchRules = [
    // Обращаемся к правилу через объект rules.skipEmptyTargetValues
    rules.skipEmptyTargetValues,
    rules.searchMultipleFields(
      searchField,
      ["date", "customer", "seller"],
      false,
    ),
  ];

  const compare = createComparison(searchRules);

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор
    return data.filter((item) => compare(item, state));
  };
}
