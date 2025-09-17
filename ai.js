const $ = (id) => document.getElementById(id);

// ---------- Section 1: Suggest ----------
$("btnSuggest").addEventListener("click", async () => {
  const parts = {
    motherboard: $("mb").value,
    cpu: $("cpu").value,
    gpu: $("gpu").value,
    psu: $("psu").value,
    ram: $("ram").value,
    storage: $("storage").value,
    cooling: $("cooling").value,
    case: $("case").value
  };

  if (!parts.motherboard) {
    $("s1Result").hidden = false;
    $("s1Result").innerHTML = "<pre>Please select a motherboard first.</pre>";
    return;
  }

  $("s1Status").textContent = "Generating suggestions…";
  $("btnSuggest").disabled = true;
  $("btnSuggest").classList.add("loading");

  try {
    const res = await fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parts })
    });
    const data = await res.json();
    $("s1Result").hidden = false;
    $("s1Result").innerHTML = `<pre>${data.suggestions || "No response."}</pre>`;
  } catch (e) {
    $("s1Result").hidden = false;
    $("s1Result").innerHTML = `<pre>❌ Error getting suggestions.</pre>`;
  } finally {
    $("s1Status").textContent = "";
    $("btnSuggest").disabled = false;
    $("btnSuggest").classList.remove("loading");
  }
});

// ---------- Section 2: Compatibility ----------
$("btnCompat").addEventListener("click", async () => {
  const setup = $("setup").value.trim();
  if (!setup) {
    $("s2Result").hidden = false;
    $("s2Result").innerHTML = "<pre>Please enter your setup first.</pre>";
    return;
  }

  $("s2Status").textContent = "Checking compatibility…";
  $("btnCompat").disabled = true;
  $("btnCompat").classList.add("loading");

  try {
    const res = await fetch("/api/compatibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ setup })
    });
    const data = await res.json();
    $("s2Result").hidden = false;
    $("s2Result").innerHTML = `<pre>${data.suggestions || "No response."}</pre>`;
  } catch (e) {
    $("s2Result").hidden = false;
    $("s2Result").innerHTML = `<pre>❌ Error checking compatibility.</pre>`;
  } finally {
    $("s2Status").textContent = "";
    $("btnCompat").disabled = false;
    $("btnCompat").classList.remove("loading");
  }
});
