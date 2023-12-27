import { getAllCategories, createCategory, updateCategory, getCategoryById } from '../../../prisma/categoriesClient';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const categories = await getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching categories' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, name } = req.body;

      // Validación de los campos
      if (!id || !name) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Debes realizar más validaciones según tus necesidades. Por ejemplo, validar la longitud del nombre o el formato del ID.

      // Verificar si la categoría ya existe por su ID
      const existingCategory = await getCategoryById(id);

      if (existingCategory) {
        // Si la categoría existe, actualízala
        const updatedCategory = await updateCategory(id, { name });
        res.status(200).json(updatedCategory);
      } else {
        // Si la categoría no existe, créala como una nueva categoría
        const newCategory = await createCategory({ id, name, studyTypes });
        res.status(201).json(newCategory);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving category '+error });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
