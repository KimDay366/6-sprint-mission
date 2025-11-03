export async function imgNew(req, res) {
  const filename = req.file.filename;
  const path = `/files/${filename}`;
  res.json({ path });
}
