// https://howardhinnant.github.io/date_algorithms.html#days_from_civil
function unix2date(unix) {
  const doe = unix / 86400 + 719468;
  const coe = Math.floor(doe >= 0 ? doe : doe - 146096) / 146097 | 0;
  const doc = doe - coe * 146097;
  const yoc = Math.floor(
    (doc
      - Math.floor(doc / 1460)
      + Math.floor(doc / 36524)
      - Math.floor(doc / 146096)
    ) / 365
  );
  const year = Math.floor(yoc + coe * 400);
  const doy = Math.floor(
    doc - (yoc * 365 + Math.floor(yoc / 4) - Math.floor(yoc / 100))
  );
  return [year, doy];
}

document.addEventListener("DOMContentLoaded", () => {

  // --- Reformat dates ---
  document.querySelectorAll("p.date").forEach(div => {
    if (!div.textContent.includes("+")) {
      const sec = parseInt(div.textContent.trim(), 10);
      if (!isNaN(sec)) {
        const [y, d] = unix2date(sec);
        div.textContent =
          String(y).padStart(4, "0") + "+" +
          String(d).padStart(3, "0");
      }
    }
  });
});
