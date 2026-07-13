// ---------------------------------------------------------------
// IMPORTANT: Replace YOUR_ACCESS_KEY below with the key Web3Forms
// gives you after you sign up (free) at https://web3forms.com
// using the email luca.arsath120186@gmail.com
// ---------------------------------------------------------------
const ACCESS_KEY = "YOUR_ACCESS_KEY";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

const form = document.getElementById("admissionForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = form.querySelector(".submit-btn");

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = "status show " + type;
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

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data && data.success) {
      showStatus(
        "Application submitted successfully! We'll be in touch by email soon, in shaa Allah.",
        "success"
      );
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
