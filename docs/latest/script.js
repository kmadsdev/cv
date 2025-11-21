fetch(`https://api.github.com/repos/kmadsdev/curriculum/contents/assets?ref=main`)
.then(res => res.json())
.then(files => {
    const pdfs = files.filter(f => f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) throw new Error("No PDF files found.");

    const latest = pdfs.sort((a, b) => new Date(b.git_url) - new Date(a.git_url))[0];
    const viewer = document.createElement("embed");

    viewer.src = latest.download_url;
    viewer.type = "application/pdf";
    viewer.style.width = "100%";
    viewer.style.height = "100vh";
    viewer.style.border = "none";

    document.body.innerHTML = "";
document.body.appendChild(viewer);
})
.catch(err => {
document.body.innerHTML = `<p style="color:white;padding:20px;">Error: ${err.message}</p>`;
});
