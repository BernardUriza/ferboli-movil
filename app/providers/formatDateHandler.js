export function formatDateHandler(item, dateOptions) {
    // Definiendo opciones por defecto para mostrar el mes completo y otros componentes
    const defaultDateOptions = {
      year: 'numeric',
      month: 'long', // 'long' para el nombre completo del mes
      day: 'numeric',
      ...dateOptions, // Permite sobrescribir o añadir nuevas opciones
    };
    
    // Formateando la fecha
    const formattedDate = new Date(item.date).toLocaleDateString('es-MX', defaultDateOptions);
    
    // Removiendo "de" y posiblemente "del" para fechas en español (ajusta según sea necesario)
    return formattedDate.replace(/de /g, '').replace(/ del /g, ' de ');
  }
  