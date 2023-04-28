export default function pipeDuration(totalMinutes) {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	return minutes > 9 ? `${hours}:${minutes}` : `${hours}:0${minutes}`;
}
