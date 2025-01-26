let items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  dob: "2005-01-01",
}));

export const getItems = (req, res) => {
  console.log("hiii");
  
  res.json(items);
};
export const addItem = (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};
export const updateItem = (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  const index = items.findIndex((item) => item.id === parseInt(id));
  console.log(index);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== parseInt(id));
  res.json({ message: "Item deleted" });
};
