export async function imgNew(req, res) {
  try {
    const filename = req.file.filename;
    const path = `/files/${filename}`;
    res.json({ path });
  } catch (err) {
    next(err);
  }
}
