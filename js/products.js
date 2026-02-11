const grid = document.getElementById("productsGrid");

const savedUser = JSON.parse(localStorage.getItem("manualUser"));
const userEmail = savedUser ? savedUser.email : null;

const availableProducts = [
  { name: "Pro Book 16", price: 2499, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { name: "Slate Phone X", price: 1099, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { name: "Studio Pods", price: 349, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" }
];

function displayProducts(productsList) {
  if (!grid) return;
  grid.innerHTML = ""; 
  productsList.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "group relative bg-[#16191d] border border-white/5 overflow-hidden rounded-xl";
    card.innerHTML = `
      <div class="aspect-square overflow-hidden bg-[#0a0c0e]">
        <img src="${p.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500">
      </div>
      <div class="p-6">
        <span class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Hardware</span>
        <h4 class="text-lg font-bold text-white mt-1">${p.name}</h4>
        <p class="text-slate-400 mt-2 font-mono">$${p.price.toLocaleString()}</p>
        <div class="flex gap-2 mt-4">
            <button onclick="addToDatabase(${index})" class="w-full bg-emerald-600 text-black px-4 py-2 text-xs font-bold rounded hover:bg-emerald-500 transition">
              ADD TO ARCHIVE (SAVE)
            </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

async function addToDatabase(index) {
  const p = availableProducts[index];
  
  if (!userEmail) {
    alert("Please LOGIN first to map products to your account.");
    window.location.href = "login.html";
    return;
  }

  const productData = {
    name: p.name,
    price: p.price,
    imageUrl: p.image,
    ownerEmail: userEmail 
  };

  try {
    const response = await fetch(PRODUCTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      alert(`${p.name} successfully saved to MongoDB!`);
      
      // SYNC: Add to Local Cart for UI visibility
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(p);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart local sync complete.");
    }
  } catch (error) {
    console.error("Backend Error:", error);
    alert("Cannot connect to Java backend.");
  }
}

displayProducts(availableProducts);