import Contact from "../models/Contact.js";

// Public (user submits form)
export const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

// Admin view messages
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

// Delete message
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};