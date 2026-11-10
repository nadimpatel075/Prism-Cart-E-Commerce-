
import { useMemo, useState } from "react";
import "./index.css";
import AuthPage from "./AuthPage.jsx";

const products = [
  {
    id: 1,
    name: "Studio Everyday Sneakers",
    category: "Fashion",
    color: "Coral Red",
    price: 4299,
    oldPrice: 5499,
    rating: "4.9",
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 2,
    name: "Minimal Wireless Headphones",
    category: "Electronics",
    color: "Sandstone",
    price: 6999,
    rating: "4.8",
    badge: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 3,
    name: "Everyday Leather Carryall",
    category: "Accessories",
    color: "Classic Tan",
    price: 3499,
    oldPrice: 4299,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 4,
    name: "Sculpted Ceramic Vase",
    category: "Home",
    color: "Ivory",
    price: 1899,
    rating: "4.9",
    badge: "EDITOR'S PICK",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 5,
    name: "Cloud Runner Sneakers",
    category: "Fashion",
    color: "Cloud White",
    price: 3899,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 6,
    name: "Premium Studio Headphones",
    category: "Electronics",
    color: "Midnight",
    price: 8499,
    oldPrice: 9999,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 7,
    name: "Modern Crossbody Bag",
    category: "Accessories",
    color: "Espresso",
    price: 2799,
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=850&q=85",
  },
  {
    id: 8,
    name: "Minimal Living Decor",
    category: "Home",
    color: "Natural",
    price: 1599,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=850&q=85",
  },
];

const categories = [
  "All products",
  "Fashion",
  "Electronics",
  "Accessories",
  "Home",
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Icon({ name, size = 20, fill = "none" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    heart: (
      <path d="M20.8 8.7c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
    ),
    arrow: (
      <>
        <path d="M4 12h15" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    close: (
      <>
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v12H3z" />
        <path d="M14 10h4l3 4v4h-7z" />
        <circle cx="7.5" cy="19" r="1.8" />
        <circle cx="17.5" cy="19" r="1.8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
        <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };

  return <svg {...common}>{paths[name] || paths.sparkles}</svg>;
}

export default function App() {
  const [category, setCategory] = useState("All products");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All products" || product.category === category;

      const matchesSearch = [
        product.name,
        product.category,
        product.color,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartItems = products.filter((product) => cart[product.id] > 0);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  function addToCart(product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));

    setMessage(`${product.name} added to your bag.`);
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });

    setMessage("");
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function selectCategory(item) {
    setCategory(item);
    setMobileMenu(false);
  }

  function scrollToShop(item) {
    if (item) selectCategory(item);

    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleSubscribe(event) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <div className="store">
      <div className="announcement">
        <Icon name="sparkles" size={13} />
        <span>COMPLIMENTARY SHIPPING ON ORDERS OVER ₹2,999</span>
      </div>

      <header className="navbar">
        <div className="nav-inner">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMobileMenu((open) => !open)}
            aria-label="Toggle navigation"
          >
            <Icon name={mobileMenu ? "close" : "menu"} />
          </button>

          <a className="brand" href="#home">
            Prism<span>Kart.</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {categories.map((item) => (
              <button
                key={item}
                className={`nav-link ${
                  category === item ? "active" : ""
                }`}
                onClick={() => scrollToShop(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <label className="nav-search">
              <Icon name="search" size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                aria-label="Search products"
              />
            </label>

            <button
              className="bag-trigger"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <Icon name="bag" size={21} />
              <span>Bag</span>
              <span className="bag-count">{cartCount}</span>
            </button>
          </div>
        </div>

        {mobileMenu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => scrollToShop(item)}
                className="mobile-nav-link"
              >
                {item}
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="hero page-width">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
            alt="Beautiful contemporary living room with natural textures"
            fetchPriority="high"
          />

          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="eyebrow-pill">
              <Icon name="sparkles" size={14} />
              PREMIUM CONTEMPORARY RETAIL
            </div>

            <h1>
              The art of
              <br />
              everyday living.
              <br />
              <em>Less, but better.</em>
            </h1>

            <p>
              Thoughtfully selected essentials. Exceptional design.
              Everyday pieces that feel anything but ordinary.
            </p>

            <a className="button button-light" href="#shop">
              EXPLORE COLLECTION
              <Icon name="arrow" size={16} />
            </a>

            <div className="hero-note">
              <span />
              CONSIDERED DESIGN. EVERYDAY LUXURY.
            </div>
          </div>

          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>03</span>
          </div>
        </section>

        <section className="values page-width">
          <div className="value-item">
            <span className="value-number">01</span>
            <Icon name="sparkles" />
            <span>Thoughtfully curated</span>
          </div>
          <div className="value-item">
            <span className="value-number">02</span>
            <Icon name="check" />
            <span>Quality first</span>
          </div>
          <div className="value-item">
            <span className="value-number">03</span>
            <Icon name="shield" />
            <span>Secure shopping</span>
          </div>
          <div className="value-item">
            <span className="value-number">04</span>
            <Icon name="truck" />
            <span>Customer care</span>
          </div>
        </section>

        <section id="shop" className="collection section-padding">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GOOD THINGS, WELL CHOSEN</p>
              <h2>
                The collection<span className="accent">.</span>
              </h2>
              <p className="section-description">
                Discover pieces made to earn their place in your life.
              </p>
            </div>

            <div className="result-count">
              {filteredProducts.length} thoughtfully selected pieces
            </div>
          </div>

          <div className="category-bar">
            <div className="category-filters">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => selectCategory(item)}
                  className={`category-button ${
                    category === item ? "selected" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="mobile-search">
              <Icon name="search" size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the collection"
                aria-label="Search the collection"
              />
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-results">
              <Icon name="search" size={30} />
              <h3>Nothing found just yet.</h3>
              <p>Try a different search or explore all products.</p>
              <button
                className="button button-dark"
                onClick={() => {
                  setSearch("");
                  setCategory("All products");
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    {product.badge && (
                      <span className="product-badge">
                        {product.badge}
                      </span>
                    )}

                    <button
                      className={`wishlist-button ${
                        wishlist.includes(product.id) ? "wishlisted" : ""
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        wishlist.includes(product.id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Icon
                        name="heart"
                        size={19}
                        fill={
                          wishlist.includes(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO BAG
                      <Icon name="plus" size={16} />
                    </button>
                  </div>

                  <div className="product-details">
                    <div className="product-meta">
                      <span>
                        {product.category} / {product.color}
                      </span>
                      <span className="rating">
                        <Icon name="star" size={12} fill="currentColor" />
                        {product.rating}
                      </span>
                    </div>

                    <h3>{product.name}</h3>

                    <div className="product-price">
                      <span>{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <del>{formatPrice(product.oldPrice)}</del>
                      )}
                    </div>

                    <button
                      className="mobile-add"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO BAG
                      <Icon name="plus" size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="collection-bottom">
            <button
              className="button button-outline"
              onClick={() => {
                setSearch("");
                setCategory("All products");
              }}
            >
              DISCOVER ALL PRODUCTS
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-content">
            <p className="eyebrow">A DIFFERENT WAY TO SHOP</p>
            <h2>
              Fewer things.
              <br />
              <em>More meaning.</em>
            </h2>
            <p className="story-description">
              We believe the best things don't shout for attention.
              They earn it through thoughtful design and everyday
              usefulness. Less noise, better choices, and objects
              that bring a little more meaning to daily life.
            </p>
            <a href="#shop" className="button button-dark">
              DISCOVER THE COLLECTION
              <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className="story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85"
              alt="Minimal living space with considered decor"
              loading="lazy"
            />
            <span className="story-image-label">
              OBJECTS WITH INTENTION · EST. 2026
            </span>
          </div>
        </section>

        <section className="newsletter">
          <p className="eyebrow">THE GOOD LIST</p>
          <h2>Good things come to your inbox.</h2>
          <p>
            Get first looks at new arrivals, curated collections,
            and occasional little surprises.
          </p>

          {subscribed ? (
            <div className="subscribe-success">
              <Icon name="check" size={19} />
              Thank you for joining the Good List.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button type="submit">
                SIGN ME UP
                <Icon name="arrow" size={16} />
              </button>
            </form>
          )}
          <span className="newsletter-note">
            A little inspiration. No unnecessary noise.
          </span>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <a href="#home" className="brand footer-brand">
              commerce<span>hub.</span>
            </a>
            <p>
              Considered products. Thoughtful design. A little more
              meaning in the everyday.
            </p>
            <a href="#story" className="footer-social">
              OUR STORY <Icon name="arrow" size={14} />
            </a>
          </div>

          <div className="footer-column">
            <h3>EXPLORE</h3>
            <a href="#shop">Shop all</a>
            <a href="#shop" onClick={() => selectCategory("Fashion")}>
              Fashion
            </a>
            <a href="#shop" onClick={() => selectCategory("Electronics")}>
              Electronics
            </a>
            <a href="#story">Our story</a>
          </div>

          <div className="footer-column">
            <h3>CUSTOMER CARE</h3>
            <a href="#footer-info">Shipping & delivery</a>
            <a href="#footer-info">Returns & exchanges</a>
            <a href="#footer-info">Privacy policy</a>
            <a href="#footer-info">Terms of service</a>
          </div>

          <div className="footer-column footer-promise">
            <Icon name="shield" size={23} />
            <h3>SHOP WITH CONFIDENCE</h3>
            <p>
              A thoughtful experience from browsing to delivery.
            </p>
          </div>
        </div>

        <div className="footer-bottom" id="footer-info">
          <span>© 2026 CommerceHub. All rights reserved.</span>
          <span>Designed for the everyday, elevated.</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="drawer-layer">
          <button
            className="drawer-backdrop"
            onClick={() => setCartOpen(false)}
            aria-label="Close shopping bag"
          />

          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping bag"
          >
            <div className="drawer-header">
              <div>
                <h2>Your bag<span className="accent">.</span></h2>
                <p>{message || `${cartCount} items in your bag`}</p>
              </div>
              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
              >
                <Icon name="close" size={23} />
              </button>
            </div>

            <div className="drawer-items">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <Icon name="bag" size={38} />
                  <h3>Your bag is empty.</h3>
                  <p>Discover something you'll love.</p>
                  <button
                    className="button button-dark"
                    onClick={() => setCartOpen(false)}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <img src={product.image} alt={product.name} />

                    <div className="cart-item-info">
                      <h3>{product.name}</h3>
                      <p>{product.color}</p>
                      <strong>
                        {formatPrice(product.price * cart[product.id])}
                      </strong>

                      <div className="quantity-control">
                        <button
                          onClick={() => changeQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <span>{cart[product.id]}</span>
                        <button
                          onClick={() => changeQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        changeQuantity(product.id, -cart[product.id])
                      }
                      aria-label={`Remove ${product.name}`}
                    >
                      <Icon name="close" size={17} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="shipping-progress">
                  <Icon name="truck" size={17} />
                  {subtotal >= 2999
                    ? "You've unlocked complimentary shipping."
                    : `Add ${formatPrice(2999 - subtotal)} for complimentary shipping.`}
                </div>

                <div className="subtotal-row">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <p className="tax-note">
                  Shipping and applicable taxes are calculated at checkout.
                </p>

                <button
                  className="checkout-button"
                  onClick={() =>
                    setMessage(
                      "Demo checkout only. Connect your Spring Boot order API and payment gateway to place an order."
                    )
                  }
                >
                  CONTINUE TO CHECKOUT
                  <Icon name="arrow" size={17} />
                </button>

                <p className="checkout-note">
                  Secure shopping · Thoughtfully chosen
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
