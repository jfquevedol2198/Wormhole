export const assetSymbol = (asset: string): string =>
    asset && /\(([^)]+)\)/.exec(asset)[1];
