export const navbarBrand = "Новости";
// export const header = (category) => `News - Top ${category} Headlines`;
export const header = " ";
export const navs = [
    { nav: "Рекомендованное", page: "/" },
    { nav: "Общее", page: "/general" },
    { nav: "Бизнес", page: "/business" },
    { nav: "Спорт", page: "/sports" },
    { nav: "Наука", page: "/science" },
    { nav: "Здоровье", page: "/health" },
    { nav: "Развлечения", page: "/entertainment" },
    { nav: "Технологии", page: "/technology" },
    { nav: "Авторизация", page: "/login" }
]

export const router = [
    { path: "/", key: "general", category: "general", country: "ru" },
    { path: "/general", key: "general", category: "general", country: "ru" },
    { path: "/business", key: "business", category: "business", country: "ru" },
    { path: "/sports", key: "sports", category: "sports", country: "ru" },
    { path: "/science", key: "science", category: "science", country: "ru" },
    { path: "/health", key: "health", category: "health", country: "ru" },
    { path: "/entertainment", key: "entertainment", category: "entertainment", country: "ru" },
    { path: "/technology", key: "technology", category: "technology", country: "ru" }
]

export const summary = "Автор, источник и дата";
export const author = (author) => `Автор: ${!author ? "Не известен" : author}`;
export const channel = (channel) => `Источник: ${channel}`;
export const lastUpdate = (date) => `Обновлено: ${new Date(date).toLocaleDateString()}`;
