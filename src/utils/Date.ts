

export function formatToFrDate(date: Date) {
    const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return dateFormatter.format(date);
}

export function formatToDeDate(date: Date) {
    const dateFormatter = new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return dateFormatter.format(date);
}