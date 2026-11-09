const PRODUCTS = {
  "goat-original": {name:"Sữa dê tươi nguyên chất", image:"assets/goat-milk.svg", category:"Sữa dê tươi"},
  "goat-low": {name:"Sữa dê tươi ít đường", image:"assets/goat-milk.svg", category:"Sữa dê tươi"},
  "goat-organic": {name:"Sữa dê Organic", image:"assets/goat-milk.svg", category:"Sữa dê tươi"},
  "almond": {name:"Sữa hạt hạnh nhân", image:"assets/nut-milk.svg", category:"Sữa hạt"},
  "yogurt": {name:"Sữa chua YoooMILK", image:"assets/yogurt.svg", category:"Sữa chua"}
};
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let cart = {};
try { cart = JSON.parse(localStorage.getItem("yoomilk-cart") || "{}"); } catch { cart = {}; }
const money = n => new Intl.NumberFormat("vi-VN").format(n) + "đ";
function saveCart(){ localStorage.setItem("yoomilk-cart", JSON.stringify(cart)); renderCart(); }
function countCart(){ return Object.values(cart).reduce((a,b)=>a+b,0); }
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toast.timer); toast.timer=setTimeout(()=>t.classList.remove("show"),2400); }
function addItem(id){ cart[id]=(cart[id]||0)+1; saveCart(); toast("Đã thêm sản phẩm vào giỏ hàng."); }
function renderCart(){
  const count=countCart(); $("#cartCount").textContent=count; $("#drawerCount").textContent=`(${count})`;
  const box=$("#cartItems");
  if(!count){box.innerHTML='<div class="cart-empty">Giỏ hàng đang trống.<br><a href="#products" id="continueShopping">Khám phá sản phẩm ↗</a></div>';return;}
  box.innerHTML=Object.entries(cart).filter(([id,q])=>q>0).map(([id,q])=>{
    const p=PRODUCTS[id]; return `<div class="cart-row"><div class="cart-thumb"><img src="${p.image}" alt=""></div><div><h4>${p.name}</h4><small>${p.category} · Giá đang cập nhật</small><div class="qty"><button data-qty="${id}" data-delta="-1" aria-label="Giảm">−</button><b>${q}</b><button data-qty="${id}" data-delta="1" aria-label="Tăng">+</button></div></div><button class="remove-btn" data-remove="${id}">Xóa</button></div>`;
  }).join("");
}
function openCart(){ $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("show"); $("#cartDrawer").setAttribute("aria-hidden","false"); }
function closeCart(){ $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("show"); $("#cartDrawer").setAttribute("aria-hidden","true"); }
$$("[data-add]").forEach(b=>b.addEventListener("click",()=>addItem(b.dataset.add)));
$("#cartOpen").addEventListener("click",openCart); $("#cartClose").addEventListener("click",closeCart); $("#overlay").addEventListener("click",closeCart);
$("#cartItems").addEventListener("click",e=>{
  const qty=e.target.closest("[data-qty]"), remove=e.target.closest("[data-remove]");
  if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.delta);if(cart[id]<=0)delete cart[id];saveCart();}
  if(remove){delete cart[remove.dataset.remove];saveCart();}
  if(e.target.id==="continueShopping")closeCart();
});
$("#checkoutBtn").addEventListener("click",()=>{
  if(!countCart()){toast("Bạn chưa chọn sản phẩm nào.");return;}
  const lines=Object.entries(cart).map(([id,q])=>`${PRODUCTS[id].name} x ${q}`).join("\n");
  const summary=`YÊU CẦU ĐẶT HÀNG YOOOMILK\n${lines}\nGiá và phí giao hàng: vui lòng xác nhận với khách hàng.`;
  navigator.clipboard?.writeText(summary).then(()=>toast("Đã sao chép nội dung đơn hàng. Bạn có thể gửi cho YoooMILK." )).catch(()=>toast(summary));
});
$$(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");filterProducts();
}));
function filterProducts(){
  const cat=$(".filter-btn.active")?.dataset.filter||"all", q=$("#productSearch").value.trim().toLocaleLowerCase("vi");
  let visible=0;
  $$(".product-card").forEach(card=>{
    const okCat=cat==="all"||card.dataset.category===cat, okText=card.dataset.name.toLocaleLowerCase("vi").includes(q);
    card.hidden=!(okCat&&okText);if(!card.hidden)visible++;
  });
  $("#emptyState").hidden=visible!==0;
}
$("#productSearch").addEventListener("input",filterProducts);
$$("[data-category-link]").forEach(a=>a.addEventListener("click",()=>{const b=$(`.filter-btn[data-filter="${a.dataset.categoryLink}"]`);if(b)b.click();}));
$("#searchToggle").addEventListener("click",()=>{ $("#productSearch").focus(); $("#products").scrollIntoView({behavior:"smooth"}); });
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();const d=new FormData(e.currentTarget);
  const msg=`YÊU CẦU TƯ VẤN YOOOMILK\nHọ tên: ${d.get("name")}\nLiên hệ: ${d.get("contact")}\nNội dung: ${d.get("message")||"Chưa cung cấp"}`;
  if(navigator.clipboard?.writeText){navigator.clipboard.writeText(msg).then(()=>toast("Đã sao chép yêu cầu tư vấn. Vui lòng gửi đến kênh liên hệ của YoooMILK."));}
  else toast("Vui lòng sao chép nội dung yêu cầu và gửi đến YoooMILK.");
  e.currentTarget.reset();
});
$("#year").textContent=new Date().getFullYear();
renderCart();
