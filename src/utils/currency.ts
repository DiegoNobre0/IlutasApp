export const toCurrency = (
  value: number,
  symbols?: boolean,
  fractionDigits?: number,
  currency?: string
): string => {
  return (
    (symbols && value > 0 ? "+" : "") +
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: currency ?? "BRL",
      minimumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
      maximumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
    })
  );
};

export const toFormatNumber = (
  value: number,
  symbols?: boolean,
  fractionDigits?: number
): string => {
  return (
    (symbols && value > 0 ? "+" : "") +
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
      maximumFractionDigits: fractionDigits !== undefined ? fractionDigits : 2,
    })
  );
};

export const toAbbreviateCurrency = (
  value: number,
  currency?: string
): string => {
  const mil = 1000;
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;

  if (value >= trillion) {
    return toCurrency(value / trillion, false, 0, currency) + "T";
  } else if (value >= billion) {
    return toCurrency(value / billion, false, 0, currency) + "B";
  } else if (value >= million) {
    return toCurrency(value / million, false, 0, currency) + "M";
  } else if (value >= mil) {
    return toCurrency(value / mil, false, 0, currency) + "MIL";
  } else {
    return toCurrency(value, false, 2, currency);
  }
};

export const toAbbreviateNumber = (value: number): string => {
  const mil = 1000;
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;

  if (value >= trillion) {
    return toFormatNumber(value / trillion, false, 0) + "T";
  } else if (value >= billion) {
    return toFormatNumber(value / billion, false, 0) + "B";
  } else if (value >= million) {
    return toFormatNumber(value / million, false, 0) + "M";
  } else if (value >= mil) {
    return toFormatNumber(value / mil, false, 0) + "MIL";
  } else {
    return toFormatNumber(value, false, 2);
  }
};
