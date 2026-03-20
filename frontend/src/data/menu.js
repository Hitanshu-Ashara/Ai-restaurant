export const menu = [
// ═══════════════ PIZZA — Classic Range ═══════════════
  { 
    id: 1, 
    name: "Classic Margherita", 
    price: 720, 
    category: "pizza", 
    description: "Basil, parmesan, fresh buffalo mozzarella, San Marzano sauce",
    customizations: {
      spice: ["Mild", "Medium", "Spicy"],
      extras: [{ name: "Extra Cheese", price: 100 }, { name: "Mushrooms", price: 80 }, { name: "Fresh Chillies", price: 50 }]
    }
  },
  { 
    id: 2, 
    name: "D&d Margherita", 
    price: 720, 
    category: "pizza", 
    description: "Parmesan, fresh mozzarella, pesto drizzle, San Marzano",
    customizations: {
      spice: ["Mild", "Medium", "Spicy"],
      extras: [{ name: "Burrata", price: 150 }, { name: "Pesto Drizzle", price: 50 }]
    }
  },
  { 
    id: 3, 
    name: "Masala Margherita", 
    price: 720, 
    category: "pizza", 
    description: "Fresh mozzarella, arrabiata sauce, fresh chillies",
    customizations: {
      spice: ["Mild", "Medium", "Spicy"],
      extras: [{ name: "Extra Chillies", price: 30 }, { name: "Onions", price: 40 }]
    }
  },
  { id: 4, name: "Marinara", price: 550, category: "pizza", description: "San Marzano tomatoes, sliced garlic, parmesan", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  // Gourmet & Signature
  { id: 5, name: "Truffle Mushroom Florentine", price: 950, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"], extras: [{ name: "Extra Truffle Oil", price: 150 }] } },
  { id: 6, name: "Aglio Olio Pizza", price: 750, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 7, name: "Angry Spinyard", price: 850, category: "pizza", description: "Romasco base", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 8, name: "Spice Surprise Pizza", price: 850, category: "pizza", customizations: { spice: ["Medium", "Spicy"] } },
  { id: 9, name: "Veg Exotica Pizza", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 10, name: "Farm House", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 11, name: "Pesto Burrata", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 12, name: "Sun Rocket", price: 750, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 13, name: "Green Goddess", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 14, name: "Ortolano Pizza", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  // Premium Specials
  { id: 15, name: "Burrata Margherita", price: 800, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 16, name: "Stracciatella", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 17, name: "Pesto Mushroom", price: 950, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 18, name: "Fungi", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 19, name: "Avocado Pizza", price: 950, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 20, name: "Pizza Con Patete", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },
  { id: 21, name: "Popeye's Pick", price: 850, category: "pizza", customizations: { spice: ["Mild", "Medium", "Spicy"] } },

  // ═══════════════ BREADS & STARTERS ═══════════════
  { id: 22, name: "Avocado Panè", price: 650, category: "starters", customizations: { extras: [{ name: "Extra Avocado", price: 120 }] } },
  { id: 23, name: "Avocado Toast", price: 550, category: "starters", customizations: { extras: [{ name: "Poached Egg", price: 60 }] } },
  { id: 24, name: "Hand-Stretched Garlic Bread", price: 550, category: "starters", customizations: { extras: [{ name: "Extra Cheese", price: 80 }] } },
  { id: 25, name: "French Onion 3 Cheese Garlic Bread", price: 600, category: "starters" },
  { id: 26, name: "Cheese Chilly Garlic Bread", price: 550, category: "starters" },
  { id: 27, name: "Pizza Dough Sticks", price: 350, category: "starters" },
  { id: 28, name: "Pizza Dough Balls", price: 350, category: "starters" },
  { id: 29, name: "Pesto Tomato Bocconcini Panuozzo", price: 650, category: "starters" },
  { id: 30, name: "Rosmarino Panuozzo", price: 650, category: "starters" },
  { id: 31, name: "Selvatico Panuozzo", price: 650, category: "starters" },

  // ═══════════════ DIPS ═══════════════
  { id: 32, name: "Pesto Basil Dip", price: 100, category: "dips" },
  { id: 33, name: "Hot Honey Dip", price: 70, category: "dips" },
  { id: 34, name: "D&d Hot Dip", price: 70, category: "dips" },
  { id: 35, name: "Spanish Romasco Dip", price: 70, category: "dips" },
  { id: 36, name: "Olive Tapenade Dip", price: 70, category: "dips" },
  { id: 37, name: "Truffle Parmesan Dip", price: 100, category: "dips" },
  { id: 38, name: "Chimichurri Dip", price: 70, category: "dips" },

  // ═══════════════ SALADS ═══════════════
  { id: 39, name: "Panzanella", price: 450, category: "salads", description: "Pesto dressed" },
  { id: 40, name: "D&d Tossed Salad", price: 450, category: "salads" },

  // ═══════════════ COFFEE (COLD & SPECIAL) ═══════════════
  { id: 41, name: "Vietnamese Coffee", price: 260, category: "coffee", customizations: { extras: [{ name: "Extra Oat Milk", price: 40 }] } },
  { id: 42, name: "Coconut Vietnamese Coffee", price: 280, category: "coffee" },
  { id: 43, name: "Cold Brew Vietnamese", price: 300, category: "coffee" },
  { id: 44, name: "Iced Latte", price: 260, category: "coffee" },
  { id: 45, name: "Iced Doppio", price: 200, category: "coffee" },
  { id: 46, name: "Honey Lemon Espresso", price: 240, category: "coffee" },
  { id: 47, name: "Salted Pistachio", price: 300, category: "coffee" },
  { id: 48, name: "V60 Pour Over", price: 220, category: "coffee" },
  { id: 49, name: "Moka Pot", price: 220, category: "coffee" },
  { id: 50, name: "Aeropress", price: 220, category: "coffee" },
  { id: 51, name: "Geisha Coffee", price: 850, category: "coffee" },
  { id: 52, name: "Ethiopia Coffee", price: 650, category: "coffee" },
  { id: 53, name: "Classic Cold Brew", price: 280, category: "coffee" },
  { id: 54, name: "Barrel Aged Cold Brew", price: 280, category: "coffee" },
  { id: 55, name: "Cold Brew Platter", price: 300, category: "coffee" },

  // ═══════════════ FRAPPES & SHAKES ═══════════════
  { id: 56, name: "Classic Cold Coffee", price: 300, category: "frappes" },
  { id: 57, name: "Cookie Crumble Frappe", price: 320, category: "frappes" },
  { id: 58, name: "Date Frappe", price: 320, category: "frappes" },
  { id: 59, name: "Peanut Butter Frappe", price: 320, category: "frappes" },
  { id: 60, name: "Biscoff Shake", price: 350, category: "frappes" },
  { id: 61, name: "Mix Berry Shake", price: 350, category: "frappes" },

  // ═══════════════ MATCHA ═══════════════
  { id: 62, name: "Matcha Oat Latte", price: 340, category: "matcha" },
  { id: 63, name: "Yuzu Matcha", price: 340, category: "matcha" },
  { id: 64, name: "Pistachio Matcha", price: 340, category: "matcha" },
  { id: 65, name: "Almond Milk Iced Matcha", price: 340, category: "matcha" },
  { id: 66, name: "Sea Salt Caramel Matcha", price: 340, category: "matcha" },

  // ═══════════════ REFRESHERS ═══════════════
  { id: 67, name: "Lemongrass Peachy Breeze", price: 320, category: "refreshers" },
  { id: 68, name: "Sangria Mix", price: 350, category: "refreshers" },
  { id: 69, name: "Berry Burst", price: 320, category: "refreshers" },
  { id: 70, name: "Raspberry Punch", price: 300, category: "refreshers" },
  { id: 71, name: "Pink Grape", price: 300, category: "refreshers" },

  // ═══════════════ HOT DRINKS ═══════════════
  { id: 72, name: "Belgian Hot Chocolate", price: 330, category: "hot-drinks" },
  { id: 73, name: "Nutella Hot Chocolate", price: 330, category: "hot-drinks" },
  { id: 74, name: "Peppermint Hot Chocolate", price: 330, category: "hot-drinks" },

  // ═══════════════ DESSERTS ═══════════════
  { id: 75, name: "Grandmama's Tiramisu", price: 420, category: "desserts" },
  { id: 76, name: "Affogato", price: 220, category: "desserts" },
  { id: 77, name: "Blueberry Cheesecake Jar", price: 400, category: "desserts" },
  { id: 78, name: "Biscoff Cheesecake Jar", price: 400, category: "desserts" },
  { id: 79, name: "Nutella Cheesecake Jar", price: 400, category: "desserts" },
  { id: 80, name: "Opera Cake", price: 300, category: "desserts" },
  { id: 81, name: "Hazelnut Mousse", price: 250, category: "desserts" },
  { id: 82, name: "Berry Tart", price: 250, category: "desserts" },
  { id: 83, name: "Lotus Biscoff Brownie", price: 250, category: "desserts" },

  // ═══════════════ COOKIES ═══════════════
  { id: 84, name: "Almond Choco Cookies", price: 150, category: "cookies" },
  { id: 85, name: "Sea Salt Caramel Cookie", price: 150, category: "cookies" },
  { id: 86, name: "Oat & Jaggery Cookies", price: 150, category: "cookies" },

  // ═══════════════ HOT COFFEE ═══════════════
  { id: 87, name: "Espresso", price: 160, category: "hot-coffee" },
  { id: 88, name: "Doppio", price: 200, category: "hot-coffee" },
  { id: 89, name: "Americano", price: 200, category: "hot-coffee" },
  { id: 90, name: "Cappuccino", price: 260, category: "hot-coffee" },
  { id: 91, name: "Latte", price: 260, category: "hot-coffee" },
  { id: 92, name: "Mocha", price: 280, category: "hot-coffee" },
  { id: 93, name: "Irish Coffee", price: 300, category: "hot-coffee" },

  // ═══════════════ ICED TEA ═══════════════
  { id: 94, name: "Elderflower Iced Tea", price: 280, category: "iced-tea" },
  { id: 95, name: "Blueberry Lavender Iced Tea", price: 280, category: "iced-tea" },
  { id: 96, name: "Lemon Iced Tea", price: 280, category: "iced-tea" },
  { id: 97, name: "Peach Passionfruit Iced Tea", price: 280, category: "iced-tea" },
  { id: 98, name: "Hong Kong Style Thai Tea", price: 320, category: "iced-tea" },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "pizza", label: "Pizza" },
  { id: "starters", label: "Breads & Starters" },
  { id: "coffee", label: "Coffee" },
  { id: "frappes", label: "Frappes & Shakes" },
  { id: "matcha", label: "Matcha" },
  { id: "refreshers", label: "Refreshers" },
  { id: "hot-drinks", label: "Hot Drinks" },
  { id: "hot-coffee", label: "Hot Coffee" },
  { id: "iced-tea", label: "Iced Tea" },
  { id: "desserts", label: "Desserts" },
  { id: "cookies", label: "Cookies" },
  { id: "dips", label: "Dips" },
  { id: "salads", label: "Salads" },
];
