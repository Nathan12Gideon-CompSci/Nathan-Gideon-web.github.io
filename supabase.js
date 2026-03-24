
// ── Supabase config ─────────────────────────────────────────────
// Replace these two values with YOUR project URL and anon key
const SUPABASE_URL = "https://xlcmgmsftrvwxvzvipbs.supabase.co";
const SUPABASE_ANON = "sb_publishable_Hk9wsUAoCubAtloMYJoYdg_yjZagmgY";
// ── Form submission handler ──────────────────────────────────────
document.getElementById("contact-form")
.addEventListener("submit", async function (event) {
// Prevent the default browser form submission (page reload)
event.preventDefault();
// Grab the form values
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();
const btn = document.getElementById("submit-btn");
const status = document.getElementById("form-status");
// Disable the button while we send (prevents double-submit)
btn.disabled = true;
btn.textContent = "Sending...";
status.textContent = "";
try {
// Call the Supabase REST API to insert a row
const response = await fetch(
`${SUPABASE_URL}/rest/v1/contact_messages`,
{
method: "POST",
headers: {
"Content-Type": "application/json",
"apikey": SUPABASE_ANON,
"Authorization": `Bearer ${SUPABASE_ANON}`,
"Prefer": "return=minimal"
},
body: JSON.stringify({ name, email, message })
}
);
if (response.ok) {
// Success — show confirmation and reset the form
status.textContent = "✓ Message sent! I will be in touch soon.";
status.style.color = "#1A7A4A";
event.target.reset();
} else {
// Supabase returned an error — log it for debugging
const err = await response.json();
console.error("Supabase error:", err);
status.textContent = "Something went wrong. Please try again.";
status.style.color = "#DC2626";
}
} catch (networkError) {
// Network/connectivity problem
console.error("Network error:", networkError);
status.textContent = "Could not connect. Check your internet connection.";
status.style.color = "#DC2626";
} finally {
// Always re-enable the button
btn.disabled = false;
btn.textContent = "Send Message";
}
});

