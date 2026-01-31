// Wait for auth
auth.onAuthStateChanged(user => {
  if (!user) {
    console.log("No user logged in");
    return;
  }

  console.log("Logged in UID:", user.uid);

  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = "";

  db.collection("notes")
    .where("uid", "==", user.uid)
    .get()
    .then(snapshot => {
      console.log("Notes found:", snapshot.size);

      if (snapshot.empty) {
        notesContainer.innerHTML = "<p>No notes found</p>";
        return;
      }

      snapshot.forEach(doc => {
        const note = doc.data();
        const noteId = doc.id; // 🔑 IMPORTANT

        const card = document.createElement("div");
        card.className = "note-card";

        card.innerHTML = `
          <h3>${note.title}</h3>
          <p class="subject"><b>Subject:</b> ${note.subject}</p>

          <div class="note-actions">
            <a href="${note.link}" target="_blank">📥 Open</a>
            <button onclick="editNote('${noteId}', '${note.title}', '${note.subject}', '${note.link}')">✏️ Edit</button>
            <button onclick="deleteNote('${noteId}')">🗑️ Delete</button>
          </div>
        `;

        notesContainer.appendChild(card);
      });
    })
    
    .catch(err => {
      console.error("Firestore error:", err);
    });
});

// 🗑️ DELETE NOTE
function deleteNote(id) {
  if (!confirm("Are you sure you want to delete this note?")) return;

  db.collection("notes").doc(id).delete()
    .then(() => {
      alert("🗑️ Note deleted");
      location.reload();
    })
    .catch(err => alert(err.message));
}

// ✏️ EDIT NOTE
function editNote(id, oldTitle, oldSubject, oldLink) {
  const title = prompt("Edit title:", oldTitle);
  const subject = prompt("Edit subject:", oldSubject);
  const link = prompt("Edit link:", oldLink);

  if (!title || !subject || !link) return;

  db.collection("notes").doc(id).update({
    title: title,
    subject: subject,
    link: link
  })
  .then(() => {
    alert("✏️ Note updated");
    location.reload();
  })
  .catch(err => alert(err.message));
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".note-card");

  cards.forEach(card => {
    const subjectText = card
      .querySelector(".subject")
      .innerText
      .toLowerCase();

    if (subjectText.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


