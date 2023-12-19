// duration = seconds of track
export function formatTime(duration: number) {
    const min = Math.floor((duration / 1000 / 60) << 0);
    const sec = Math.floor((duration / 1000) % 60);
    const secEdit = sec < 10 ? `0${sec}` : sec;
    const minEdit = min < 10 ? `0${min}` : min;

    return `${minEdit}:${secEdit}`
}
