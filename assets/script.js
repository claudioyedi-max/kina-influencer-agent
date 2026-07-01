document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const previous = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = previous;
      }, 1600);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Select text";
    }
  });
});

const backendForm = document.getElementById("backend-form");
const backendUrlInput = document.getElementById("backend-url");
const connectorStatus = document.getElementById("connector-status");
const reviewConsole = document.getElementById("review-console");

function addConsoleRow(label, title, detail) {
  if (!reviewConsole) return;
  const row = document.createElement("div");
  row.className = "console-row";
  row.innerHTML = `<span>${label}</span><strong>${title}</strong><small>${detail}</small>`;
  reviewConsole.prepend(row);
}

function setConnectorStatus(text, state) {
  if (!connectorStatus) return;
  connectorStatus.textContent = text;
  connectorStatus.dataset.state = state;
}

function getBackendUrl() {
  const value = backendUrlInput?.value?.trim() || "http://localhost:8000";
  return value.replace(/\/$/, "");
}

if (backendUrlInput) {
  const stored = window.localStorage.getItem("kinaBackendUrl");
  if (stored) backendUrlInput.value = stored;
}

backendForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const backendUrl = getBackendUrl();
  window.localStorage.setItem("kinaBackendUrl", backendUrl);
  setConnectorStatus("Testing", "pending");
  addConsoleRow("Backend", "Checking FastAPI backend", backendUrl);

  try {
    const response = await fetch(`${backendUrl}/jobs?limit=3`, { method: "GET" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();
    setConnectorStatus("Connected", "ok");
    addConsoleRow("Backend", "Connected to app backend", `${Array.isArray(jobs) ? jobs.length : 0} jobs returned from /jobs.`);
  } catch (error) {
    setConnectorStatus("Demo mode", "warn");
    addConsoleRow("Backend", "Backend not reachable from this browser", "The site is still safe for review. Run the FastAPI app and allow browser access/CORS to connect live.");
  }
});

document.querySelectorAll("[data-app-action]").forEach((button) => {
  button.addEventListener("click", async () => {
    const action = button.dataset.appAction;
    const backendUrl = getBackendUrl();
    window.localStorage.setItem("kinaBackendUrl", backendUrl);

    if (action === "run-demo") {
      setConnectorStatus("Demo mode", "warn");
      addConsoleRow("Pipeline", "Sample job created", "AI/tech video topic prepared by Trend, Research, Strategy, Script, Platform, and Compliance agents.");
      addConsoleRow("Approval", "Human approval required", "The app will not publish until a creator/operator approves the job.");
      addConsoleRow("TikTok", "Draft upload queued", "After approval and approved TikTok credentials, backend calls Content Posting API video.upload.");
      return;
    }

    if (action === "connect-tiktok") {
      const oauthUrl = `${backendUrl}/api/auth/tiktok/start`;
      addConsoleRow("TikTok OAuth", "Open backend OAuth start endpoint", oauthUrl);
      window.location.href = oauthUrl;
      return;
    }

    if (action === "list-jobs") {
      setConnectorStatus("Loading", "pending");
      try {
        const response = await fetch(`${backendUrl}/jobs?limit=5`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const jobs = await response.json();
        setConnectorStatus("Connected", "ok");
        if (!Array.isArray(jobs) || jobs.length === 0) {
          addConsoleRow("Jobs", "No jobs returned", "The backend is reachable, but there are no recent jobs yet.");
          return;
        }
        jobs.forEach((job) => {
          addConsoleRow("Job", `${job.topic || job.id || "Untitled job"}`, `Status: ${job.status || "unknown"} · Viral score: ${job.viral ?? "n/a"}`);
        });
      } catch (error) {
        setConnectorStatus("Demo mode", "warn");
        addConsoleRow("Jobs", "Could not load live jobs", "Run the local FastAPI backend or use the sample workflow for review.");
      }
    }
  });
});
