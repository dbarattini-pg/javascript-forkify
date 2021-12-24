export const replaceSnakeCaseToCamelCaseKeys = object =>
  Object.entries(object).reduce((acc, [k, v]) => {
    const parsedKey = k
      .split('_')
      .map((kPortion, index) =>
        index > 0
          ? `${kPortion[0].toUpperCase()}${kPortion.slice(1)}`
          : kPortion
      )
      .join('');
    acc[parsedKey] = v;
    return acc;
  }, {});
