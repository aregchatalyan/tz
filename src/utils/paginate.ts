export const paginate = <T>(array: T[], page: number, size: number = 10) => {
  const items = array.length;
  const pages = Math.ceil(items / size);

  if (page > pages || page < 1) {
    return { page, size, items, pages, data: [] }
  }

  const start = (page - 1) * size;
  const end = start + size;

  const data = array.slice(start, end);

  return { page, size, items, pages, data }
}

export const calcPages = (current: number, total: number): number[] => {
  let start = current - 5;

  if (start < 1) {
    start = 1;
  } else if (start + 9 > total) {
    start = total - 9;
  }

  return Array.from({ length: 10 }, (_, index) => start + index)
    .filter(number => number > 0 && number < total)
}
