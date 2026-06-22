/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= DATA ================= */

  const postcodeList = [
    "SW1A 1AA","SW1A 2AA","EC1A 1BB","EC2N 2DB",
    "W1A 0AX","SE1 9SG","E14 5AB","N1 9GU",
    "M1 1AE","B1 1AA","LS1 4AP","BS1 5TR",
    "CF10 1EP","EH1 1YZ","G1 2FF"
  ];

  const caseIdList = ["I123","I124","I125","I126","C200","C201","C202"];
  const frfIdList = ["FR-76929D8300004786","FR-76929D8300004787"];
  const ninoList = ["QQ123456C","QQ123457C","AB123456D"];

  const benefitTypes = ["Universal Credit","State Pension","Housing Benefit"];
  const riskIds = ["AAHO001","AAHS002"];
  const sourceList = ["CRE","Manual","Police"];

  const dataMap = {
    "Benefit type": benefitTypes,
    "Risk or allegation ID": riskIds,
    "Source": sourceList
  };

  /* ================= GENERIC AUTOCOMPLETE ================= */

  function setupAutocomplete(input, results, data, { startsWith = true, uppercase = true } = {}) {

    function render(query) {
      results.innerHTML = "";
      const q = (query || "").toUpperCase();

      let list = q
        ? data.filter(i => startsWith ? i.startsWith(q) : i.includes(q))
        : data;

      list.slice(0, 10).forEach(item => {
        const div = document.createElement("div");
        div.className = "govuk-autocomplete__item";

        div.innerHTML = q
          ? item.replace(new RegExp(`(${q})`, "gi"), "<strong>$1</strong>")
          : item;

        div.onclick = () => {
          input.value = item;
          results.style.display = "none";
        };

        results.appendChild(div);
      });

      results.style.display = list.length ? "block" : "none";
    }

    input.addEventListener("input", e => {
      if (uppercase) e.target.value = e.target.value.toUpperCase();
      render(e.target.value);
    });

    input.addEventListener("focus", () => render(input.value));

    return { render };
  }

  /* ================= ELEMENTS ================= */

  const postcodeInput = document.getElementById("postcode-input");
  const postcodeResults = document.getElementById("postcode-results");

  const caseInput = document.getElementById("caseid");
  const caseResults = document.getElementById("caseid-results");

  const frfInput = document.getElementById("frfid");
  const frfResults = document.getElementById("frfid-results");

  const ninoInput = document.getElementById("nino");
  const ninoResults = document.getElementById("nino-results");

  const criteriaSelect = document.getElementById("criteria");
  const inputEl = document.getElementById("priority-search");
  const resultsEl = document.getElementById("autocomplete-results");
  const hintEl = document.getElementById("priority-hint");

  const loadBtn = document.getElementById("load-cases");
  const tableBodyEl = document.getElementById("table-body");
  const paginationList = document.getElementById("pagination-list");
  const prevContainer = document.getElementById("prev-container");
  const nextContainer = document.getElementById("next-container");
  const captionEl = document.getElementById("results-caption");

  /* ================= SETUP AUTOCOMPLETE ================= */

  setupAutocomplete(postcodeInput, postcodeResults, postcodeList);
  setupAutocomplete(caseInput, caseResults, caseIdList);
  setupAutocomplete(frfInput, frfResults, frfIdList);
  setupAutocomplete(ninoInput, ninoResults, ninoList);

  let priorities = [];
  const priorityAuto = setupAutocomplete(inputEl, resultsEl, priorities, { startsWith: false });

  inputEl.disabled = true;

  criteriaSelect.addEventListener("change", () => {
    priorities.length = 0;
    const selected = criteriaSelect.value;

    if (dataMap[selected]) {
      priorities.push(...dataMap[selected]);
      inputEl.disabled = false;
      priorityAuto.render("");
    } else {
      inputEl.disabled = true;
      resultsEl.style.display = "none";
    }
  });

  /* ================= CLOSE ALL DROPDOWNS ================= */

  document.addEventListener("click", (e) => {
    [postcodeInput, caseInput, frfInput, ninoInput, inputEl].forEach((input, i) => {
      const results = [
        postcodeResults, caseResults,
        frfResults, ninoResults,
        resultsEl
      ][i];

      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.style.display = "none";
      }
    });
  });

  /* ================= TABLE + PAGINATION ================= */

  let allCases = [];
  let currentPage = 1;
  const pageSize = 20;

  function generateCases() {
    const list = [];
    const postcodes = ["SW1A 1AA","EC1A 1BB","W1A 0AX"];

    for (let i = 1; i <= 1000; i++) {
      list.push({
        item: i,
        caseId: "I" + (1000 + i),
        frf: "FR-" + (7000000000000000 + i),
        nino: "QQ" + (100000 + i) + "C",
        postcode: postcodes[i % postcodes.length],
        date: new Date(Date.now() - i * 86400000)
      });
    }

    return list;
  }

  function renderTable(page) {
    tableBodyEl.innerHTML = "";

    const start = (page - 1) * pageSize;
    const pageData = allCases.slice(start, start + pageSize);

    pageData.forEach(row => {
      const tr = document.createElement("tr");

      const date = new Date(row.date).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
      });

      tr.innerHTML = `
        <td class="govuk-table__cell">${row.item}</td>
        <td class="govuk-table__cell">${row.caseId}</td>
        <td class="govuk-table__cell">${row.frf}</td>
        <td class="govuk-table__cell">${row.nino}</td>
        <td class="govuk-table__cell">${row.postcode}</td>
        <td class="govuk-table__cell">${date}</td>
      `;

      tableBodyEl.appendChild(tr);
    });
  }

  function renderPagination() {
    paginationList.innerHTML = "";
    prevContainer.innerHTML = "";
    nextContainer.innerHTML = "";

    const totalPages = Math.ceil(allCases.length / pageSize);

    if (currentPage > 1) {
      prevContainer.innerHTML = `<a class="govuk-paginationContainer.querySelector("a").onclick = e => {
        e.preventDefault();
        currentPage--;
        update();
      };
    }

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "govuk-pagination__item";

      if (i === currentPage) {
        li.innerHTML = `<span class="govuk-pagination__link govuk-pagination__link--current">${i}</span>`;
      } else {
        li.innerHTML = `#${i}</a>`;
        li.querySelector("a").onclick = e => {
          e.preventDefault();
          currentPage = i;
          update();
        };
      }

      paginationList.appendChild(li);
    }

    if (currentPage < totalPages) {
      nextContainer.innerHTML = `<a class="govuk   nextContainer.querySelector("a").onclick = e => {
        e.preventDefault();
        currentPage++;
        update();
      };
    }
  }

  function update() {
    renderTable(currentPage);
    renderPagination();
  }

  /* ================= CLICK HANDLER ================= */

  loadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    allCases = generateCases();
    currentPage = 1;

    captionEl.textContent =
      "Showing 1,000 oldest cases (out of 15,525 total cases)";

    update();
  });

});
