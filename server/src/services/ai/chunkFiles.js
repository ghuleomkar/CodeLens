const MAX_CHARS = 6000;

const chunkFiles = (sourceFiles) => {
  const chunks = [];

  for (const file of sourceFiles) {
    const content = file.content;

    if (content.length <= MAX_CHARS) {
      chunks.push({
        path: file.path,
        extension: file.extension,
        content,
      });

      continue;
    }

    let start = 0;
    let chunkNumber = 1;

    while (start < content.length) {
      const chunkContent = content.slice(
        start,
        start + MAX_CHARS
      );

      chunks.push({
        path: file.path,
        extension: file.extension,
        chunkNumber,
        content: chunkContent,
      });

      start += MAX_CHARS;
      chunkNumber++;
    }
  }

  return chunks;
};

module.exports = chunkFiles;