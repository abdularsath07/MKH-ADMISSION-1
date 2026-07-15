
    // ---------------------------------------------------------------
// IMPORTANT: Replace YOUR_ACCESS_KEY below with the key Web3Forms
// gives you after you sign up (free) at https://web3forms.com
// using the email luca.arsath120186@gmail.com
// ---------------------------------------------------------------
const ACCESS_KEY = "c9013007-2015-4d98-b7db-710170c63743";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

const form = document.getElementById("admissionForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = form.querySelector(".submit-btn");
const successScreen = document.getElementById("successScreen");
const canvas = document.getElementById("admissionCanvas");
const downloadBtn = document.getElementById("downloadCardBtn");
const newApplicationBtn = document.getElementById("newApplicationBtn");

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = "status show " + type;
}

// ---------------- Printable admission card ----------------
function drawAdmissionCard(values) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Background
  ctx.fillStyle = "#faf6ec";
  ctx.fillRect(0, 0, W, H);

  // Header band
  ctx.fillStyle = "#0b3d2e";
  ctx.fillRect(0, 0, W, 190);

  // Gold border
  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, W - 20, H - 20);

  const finishText = () => {
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 34px Georgia, serif";
    ctx.fillText("M.K.H Admissions", W / 2, 130);
    ctx.font = "18px Georgia, serif";
    ctx.fillStyle = "#e6c65c";
    ctx.fillText("Academic Year 2026 - 2027", W / 2, 160);

    // Card title
    ctx.fillStyle = "#0b3d2e";
    ctx.font = "bold 26px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Admission Application", W / 2, 235);

    // Fields
    const fields = [
      ["Name", values.student_name],
      ["D.O.B", values.dob],
      ["Blood group", values.blood_group],
      ["Mother name", values.mother_name],
      ["Father name", values.father_name],
      ["Phone number", values.phone],
      ["Temporary address", values.temp_address],
      ["Permanent address", values.perm_address],
      ["Parents know to read the Quran", values.parents_quran],
      ["Class applying for", values.class_applying]
    ];

    let y = 290;
    const leftX = 60;
    const labelColor = "#5b655e";
    const valueColor = "#1a1f1c";

    fields.forEach(([label, value]) => {
      ctx.textAlign = "left";
      ctx.fillStyle = labelColor;
      ctx.font = "16px Arial, sans-serif";
      ctx.fillText(label, leftX, y);

      ctx.fillStyle = valueColor;
      ctx.font = "bold 20px Arial, sans-serif";
      const text = value || "-";
      const wrapped = wrapText(ctx, text, W - leftX * 2, 22);
      wrapped.forEach((line, i) => {
        ctx.fillText(line, leftX, y + 26 + i * 24);
      });
      y += 26 + wrapped.length * 24 + 20;

      ctx.strokeStyle = "#e5ddc8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftX, y - 12);
      ctx.lineTo(W - leftX, y - 12);
      ctx.stroke();
    });

    // Footer
    ctx.textAlign = "center";
    ctx.fillStyle = "#5b655e";
    ctx.font = "14px Arial, sans-serif";
    ctx.fillText("Generated on submission — present this at the madrasa office", W / 2, H - 30);

    downloadBtn.href = canvas.toDataURL("image/png");
  };

  // Try to draw the logo in the header; proceed either way
  const logo = new Image();
  logo.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, 60, 45, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logo, W / 2 - 45, 15, 90, 90);
    ctx.restore();
    finishText();
  };
  logo.onerror = finishText;
  logo.src = "logo.jpg";
}

function wrapText(ctx, text, maxWidth, lineHeightUnused) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (ACCESS_KEY.includes("YOUR_ACCESS_KEY")) {
    showStatus(
      "Setup needed: add your Web3Forms access key in script.js before this form can send emails.",
      "error"
    );
    return;
  }

  submitBtn.disabled = true;
  showStatus("Sending your application...", "sending");

  const formData = new FormData(form);
  formData.append("access_key", ACCESS_KEY);
  formData.append("subject", "New Admission Form Submission - M.K.H Admissions");

  // Capture values before reset, for the printable card
  const values = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data && data.success) {
      form.hidden = true;
      successScreen.hidden = false;
      drawAdmissionCard(values);
      form.reset();
    } else {
      const errMsg =
        data && data.message
          ? data.message
          : "Something went wrong. Please try again.";
      showStatus(errMsg, "error");
    }
  } catch (err) {
    showStatus(
      "Network error — please check your connection and try again.",
      "error"
    );
  } finally {
    submitBtn.disabled = false;
  }
});

newApplicationBtn.addEventListener("click", () => {
  successScreen.hidden = true;
  form.hidden = false;
  statusBox.className = "status";
});
