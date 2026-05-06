
export function toDateTimeLocalValue(value: Date | string | null | undefined): string {
    if (!value) {
        return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    const pad = (part: number): string => String(part).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}