formatDuration = seconds => {
    if (seconds < 0) return "A negative integer is not allowed";
    if (seconds === 0) return "now";

    let formattedDuration = '';
    
    const increments = [31557600, 86400, 3600, 60, 1];
    const labels = ['year', 'day', 'hour', 'minute', 'second'];
    const map = new Map([['year', 0], ['day', 0], ['hour', 0], ['minute', 0], ['second', 0]]);

    for (let i = 0; i < labels.length; i++) {
        const quantity = Math.floor(seconds / increments[i]);
        if (quantity === 0) map.delete(labels[i]);
        else map.set(labels[i], quantity);
        seconds -= quantity * increments[i];
    }

    const entries = Array.from(map);

    for (let i = 0; i < entries.length; i++) {
        const label = entries[i][0];
        const quantity = entries[i][1];
        const prefix = quantity + ' ' + label + (quantity > 1 ? 's' : '');
        
        if (i === entries.length - 2) {
            formattedDuration += prefix + ' and ';
        } else if (i === entries.length - 1) {
            formattedDuration += prefix;
        } else {
            formattedDuration += prefix + ', ';
        }
    }

    return formattedDuration;
}