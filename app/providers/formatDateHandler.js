export function formatDateHandler(item, dateOptions) {
    const defaultDateOptions = {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      ...dateOptions,
    };
    const formattedDate = new Date(item).toLocaleDateString('es-MX', defaultDateOptions);
    return formattedDate.replace(/de /g, '').replace(/ del /g, ' de ').replace(/ /g, '/');
  }
