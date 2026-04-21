/**
 * Uzmanın `workingHours` JSON'una göre şu an müsait olup olmadığını hesaplar.
 * Saatler Europe/Istanbul zaman dilimindedir (Türkiye).
 *
 * Slot formatı: `{ time: "HH:mm" }` veya `{ start: "HH:mm" }` (ExpertDashboard ile uyumlu).
 * "Müsait": mevcut zaman, herhangi bir slot için [slot - 15dk, slot + 50dk) aralığındadır
 * (yaklaşan seans veya devam eden 50 dk seans penceresi).
 */

const SESSION_MINUTES = 50;
const BEFORE_SLOT_MINUTES = 15;

const WEEKDAY_TO_KEY: Record<string, string> = {
    sunday: 'sunday',
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
    saturday: 'saturday',
};

function getIstanbulWeekdayAndMinutes(ref: Date): { dayKey: string; minutes: number } {
    const weekday = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Istanbul',
        weekday: 'long',
    })
        .format(ref)
        .toLowerCase();

    const dayKey = WEEKDAY_TO_KEY[weekday];
    if (!dayKey) {
        return { dayKey: 'monday', minutes: 0 };
    }

    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(ref);

    let hour = 0;
    let minute = 0;
    for (const p of parts) {
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
    }

    return { dayKey, minutes: hour * 60 + minute };
}

function parseTimeToMinutes(t: string): number | null {
    const m = t.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (h > 23 || min > 59) return null;
    return h * 60 + min;
}

export function isExpertAvailableNow(workingHours: unknown, ref: Date = new Date()): boolean {
    if (!workingHours || typeof workingHours !== 'object') return false;
    const wh = workingHours as Record<string, unknown>;
    const { dayKey, minutes: nowMin } = getIstanbulWeekdayAndMinutes(ref);
    const slots = wh[dayKey];
    if (!Array.isArray(slots) || slots.length === 0) return false;

    for (const slot of slots) {
        if (!slot || typeof slot !== 'object') continue;
        const raw = (slot as { time?: string; start?: string }).time ?? (slot as { start?: string }).start;
        if (typeof raw !== 'string') continue;
        const slotMin = parseTimeToMinutes(raw);
        if (slotMin === null) continue;

        const windowStart = slotMin - BEFORE_SLOT_MINUTES;
        const windowEnd = slotMin + SESSION_MINUTES;
        if (nowMin >= windowStart && nowMin < windowEnd) {
            return true;
        }
    }

    return false;
}
