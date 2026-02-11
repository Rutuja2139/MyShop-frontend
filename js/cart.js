/**
 * CART.JS
 * Manages the display and lifecycle of selected hardware.
 */

function renderCart() {
  const cartSection = document.getElementById("cartItems");
  if (!cartSection) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartSection.innerHTML = "";

  if (cart.length === 0) {
    cartSection.innerHTML = `
      <div class="text-center py-32 border border-dashed border-white/10 rounded-2xl">
        <p class="text-slate-500 uppercase tracking-[0.3em] text-xs">Archive is currently empty</p>
        <a href="products.html" class="inline-block mt-8 text-emerald-500 font-bold hover:text-white transition uppercase text-xs tracking-widest">
          Browse Hardware →
        </a>
      </div>`;
    return;
  }

  let html = `<div class="max-w-4xl mx-auto space-y-6">`;
  
  cart.forEach((item, index) => {
    // Handle both 'image' and 'imageUrl' keys for compatibility
    const imgPath = item.image || item.imageUrl;
    
    html += `
      <div class="bg-[#16191d] border border-white/5 p-8 rounded-xl flex justify-between items-center group transition-all hover:border-white/10">
        <div class="flex items-center gap-6">
          <img src="${imgPath}" class="w-16 h-16 object-cover rounded grayscale group-hover:grayscale-0 transition duration-500">
          <div>
            <span class="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">Item _0${index + 1}</span>
            <h4 class="text-xl font-bold text-white mt-1">${item.name}</h4>
            <p class="text-slate-400 font-mono text-sm mt-1">$${item.price.toLocaleString()}</p>
          </div>
        </div>
        <button onclick="removeItem(${index})" class="text-slate-600 hover:text-red-500 transition-colors font-bold text-[10px] uppercase tracking-widest">
          [ Terminate ]
        </button>
      </div>`;
  });

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  html += `
    <div class="pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div>
        <p class="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold">Total Investment</p>
        <h3 class="text-5xl font-extrabold text-white tracking-tighter mt-2">$${total.toLocaleString()}</h3>
      </div>
      <button onclick="processCheckout()" class="w-full md:w-auto bg-white text-black px-12 py-5 font-bold hover:bg-emerald-500 transition-all transform active:scale-95 uppercase text-xs tracking-[0.2em]">
        Initialize Checkout
      </button>
    </div>
  </div>`;

  cartSection.innerHTML = html;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function processCheckout() {
  if (confirm("System: Confirm hardware acquisition?")) {
    localStorage.removeItem("cart");
    const cartSection = document.getElementById("cartItems");
    cartSection.innerHTML = `
      <div class="text-center py-32">
        <div class="inline-block p-4 rounded-full bg-emerald-500/10 mb-6">
           <svg class="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
           </svg>
        </div>
        <h2 class="text-3xl font-bold text-white tracking-tighter uppercase">Transaction Complete</h2>
        <p class="text-slate-500 mt-4 uppercase tracking-widest text-xs">Your hardware is being prepared for dispatch.</p>
        <a href="index.html" class="inline-block mt-10 bg-white text-black px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition">Return to Home</a>
      </div>
    `;
  }
}

renderCart();