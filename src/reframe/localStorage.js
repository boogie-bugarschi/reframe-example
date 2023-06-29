export function input(key) {
  return () => JSON.parse(localStorage[key] || null);
}

export function output({ action, key, payload }) {
  switch (action) {
    case "save":
      localStorage[key] = JSON.stringify(payload);
      return;
    case "delete":
      delete localStorage[key];
      return;
  }
}
