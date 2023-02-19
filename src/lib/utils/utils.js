
export function getScreenRanges(aspectRatio, width) {
    const screenHeight = width / aspectRatio;
    const widthStart = 0 - width / 2;
    const widthEnd = widthStart + width;
    const heightStart = 0 - screenHeight / 2;
    const heightEnd = heightStart + screenHeight;
    return {
        height: { from: heightStart, to: heightEnd },
        width: { from: widthStart, to: widthEnd }
    };
}

export function mapRangetoRange(from, point, range, invert = false) {
    let pointMagnitude = point / from;
    if (invert) pointMagnitude = 1 - pointMagnitude;
    const targetMagnitude = range.to - range.from;
    return targetMagnitude * pointMagnitude + range.from;
}