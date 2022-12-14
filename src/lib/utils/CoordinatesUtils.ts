export function getScreenRanges(aspectRatio: number, width: number): ScreenRange {
    const screenHeight: number = width / aspectRatio;
    const widthStart: number = 0 - width / 2;
    const widthEnd: number = widthStart + width;
    const heightStart: number = 0 - screenHeight / 2;
    const heightEnd: number = heightStart + screenHeight;
    return {
        height: { from: heightStart, to: heightEnd },
        width: { from: widthStart, to: widthEnd }
    };
}

export function mapRangetoRange(from: number, point: number, range: Range, invert = false): number {
    let pointMagnitude = point / from;
    if (invert) pointMagnitude = 1 - pointMagnitude;
    const targetMagnitude = range.to - range.from;
    return targetMagnitude * pointMagnitude + range.from;
}