const form = document.getElementById("admissionForm");
const message = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  formData.append(
    "access_key",
    "c9013007-2015-4d98-b7db-710170c63743"
  );

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    message.innerHTML = "✅ Admission form submitted successfully!";
    form.reset();
  } else {
    message.innerHTML = "❌ Submission failed. Please try again.";
  }
});
