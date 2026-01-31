# 🍫 Willy Wonka Restaurant Website

A professional, mobile-responsive ordering website for Willy Wonka mini pancakes and fresh juices in Algiers, Algeria.

## ✨ Features

- **Beautiful Design**: Willy Wonka themed with purple, gold, and chocolate colors
- **Interactive Menu**: Mini pancakes with different toppings and fresh juices
- **Shopping Cart**: Real-time cart updates with total calculation
- **WhatsApp Integration**: Orders sent directly to your WhatsApp (0797416501)
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops
- **Order Form**: Collects customer name, phone, address, and area
- **Delivery Areas**: Pre-configured with your delivery zones

## 📋 Menu Items

### Mini Pancakes
- **Plain** (with free Optila chocolate): 25 DZD
- **+ Morjan Chocolate**: 75 DZD
- **+ Pistachio Particles**: 75 DZD
- **Deluxe** (Both toppings): 125 DZD

### Fresh Juices (150 DZD each)
- Lemonade
- Mojito
- Strawberry Juice

## 🚀 How It Works

1. **Customer browses menu** and adds items to cart
2. **Cart updates automatically** showing items and total
3. **Customer clicks "Complete Order"**
4. **Order form opens** - customer fills in details
5. **Order sent to WhatsApp** - opens WhatsApp with pre-filled message
6. **You receive the order** on your phone instantly!

## 📱 Delivery Areas

- Draria (main location)
- Achour
- Benaknoun
- Oued Taria
- Soula
- Baba Hassen
- Other nearby areas

## 🛠️ How to Update

### Change Phone Number
1. Open `index.html`
2. Find line with `https://wa.me/213797416501`
3. Replace `213797416501` with your new WhatsApp number (including country code)

### Update Prices
1. Open `index.html`
2. Find the menu item you want to change
3. Update the `data-price` value and the displayed price

Example:
```html
<span class="price">25 DZD</span>
<!-- AND -->
<input ... data-price="25">
```

### Add New Menu Items
1. Copy an existing menu item block
2. Change the name, price, and description
3. Give it a unique `data-item` name

### Change Colors
1. Open `css/style.css`
2. Look for color codes like `#6b46c1` (purple), `#fbbf24` (gold)
3. Replace with your preferred colors

### Add/Remove Delivery Areas
1. Open `index.html`
2. Find the `<select id="customer-area">` section
3. Add or remove `<option>` tags

## 📂 File Structure

```
restaurant-site/
├── index.html          # Main website file
├── css/
│   └── style.css      # All styling and colors
└── README.md          # This file
```

## 🔧 Deploying Updates

After making any changes:

1. Save your files (Ctrl+S)
2. Go to Source Control in github.dev
3. Type a commit message (e.g., "Updated prices")
4. Click commit and push
5. Wait 2-5 minutes
6. Refresh your website to see changes

## 💡 Tips

- **Test on mobile**: Most customers will order from phones
- **Update regularly**: Keep menu items current
- **Respond quickly**: WhatsApp orders need fast responses
- **Take good photos**: Add product images to make menu more attractive

## 🎨 Color Scheme

- **Purple** (`#6b46c1`, `#9333ea`): Main brand color
- **Gold** (`#fbbf24`, `#f59e0b`): Accent color
- **Red** (`#dc2626`): Call-to-action buttons
- **White** & **Light gray**: Backgrounds

## 📞 Contact Information

- **Phone**: 0797 41 65 01
- **Location**: Draria, Algiers
- **Website**: https://amine-333.github.io/restaurant-site/

## 🚀 Future Enhancements

Ideas for improving your website:
- Add product images
- Include customer reviews/testimonials
- Add an Instagram feed
- Create a gallery of your pancakes
- Add promotional banners for special offers
- Implement a loyalty program

## ⚡ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks needed
- **Mobile-first design** - Optimized for phones
- **No backend required** - Works entirely on GitHub Pages
- **WhatsApp API** - Direct order integration

---

Made with 🍫 for Willy Wonka
