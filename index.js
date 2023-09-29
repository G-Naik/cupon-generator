const cuponSearch = document.querySelector("#cuponSearch");
const displayCuponContainer = document.querySelector(".displayCupon");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cuponCode = cuponSearch.value.trim().toLowerCase(); // Trim and convert to lowercase

  if (cuponCode === "") {
    alert("Please Enter the Brand Name");
    return;
  }

  try {
    const res = await fetch(`http://localhost:4000/cupons`);
    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await res.json();
    const filteredCupons = data.filter((x) => x.brand.toLowerCase() === cuponCode);
    displayCupon(filteredCupons);
  } catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred while fetching cupons.");
  }
});

function displayCupon(cupons) {
  if (cupons.length === 0) {
    alert("Sorry, the Brand cupon doesn't exist here");
  } else {
    displayCuponContainer.innerHTML = cupons
      .map((cupon) => `
        <h3 class="cupon">${cupon.cupon}</h3>
      `)
      .join('');
  }
}



