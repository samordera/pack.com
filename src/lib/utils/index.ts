export function transformArrayToObject<T, K extends keyof T, V extends keyof T>(
    sourceArray: T[], 
    keyProperty: K, 
    valueProperty: V
): Record<string, any> {
    return sourceArray.reduce((acc, item) => {
        const key = String(item[keyProperty]);
        const value = item[valueProperty];
        acc[key] = value;
        return acc;
    }, {} as Record<string, any>);
}