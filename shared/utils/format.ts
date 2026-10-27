export function formatDuration(seconds: number | string): string {
    const total = Math.max(0, Math.floor(Number(seconds) || 0))
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`
    return `${pad(m)}:${pad(s)}`
}

export function formatViews(count: number | string): string {
    const n = Number(count) || 0
    return new Intl.NumberFormat('fa-IR').format(n)
}

export function formatRelativeTime(
    timediffSeconds?: number | string | null,
    sdateFallback?: string,
): string {
    const diff = Number(timediffSeconds)
    if (!Number.isFinite(diff) || diff < 0) {
        return sdateFallback || ''
    }

    const minute = 60
    const hour = 60 * minute
    const day = 24 * hour
    const week = 7 * day
    const month = 30 * day
    const year = 365 * day

    if (diff < minute) return 'لحظاتی پیش'
    else if (diff < hour) {
        const m = Math.floor(diff / minute)
        return `${m} دقیقه پیش`
    } else if (diff < day) {
        const h = Math.floor(diff / hour)
        return `${h} ساعت پیش`
    } else if (diff < week) {
        const d = Math.floor(diff / day)
        return `${d} روز پیش`
    } else if (diff < month) {
        const w = Math.floor(diff / week)
        return `${w} هفته پیش`
    } else if (diff < year) {
        const mo = Math.floor(diff / month)
        return `${mo} ماه پیش`
    }
    const y = Math.floor(diff / year)
    return `${y} سال پیش`
}

export function parseTags(tagStr: string | null | undefined, tags: string[] | null | undefined): string[] {
    if (Array.isArray(tags) && tags.length) {
        return tags.map(t => String(t).replace(/^#/, '').trim()).filter(Boolean)
    }
    if (!tagStr) return []
    return tagStr.split(/[,،\-]/).map(t => t.trim().replace(/^#/, '')).filter(Boolean)
}

export function ensureHttps(url: string | null | undefined): string {
    if (!url) return ''
    return url.replace(/^http:\/\//i, 'https://')
}
