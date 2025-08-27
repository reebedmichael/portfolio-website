# 📱 Social Media Preview Card Setup

## ✅ **What I've Done:**

### 1. **Updated `index.html` with Complete Meta Tags**
- ✅ Open Graph tags for Facebook, WhatsApp, LinkedIn
- ✅ Twitter Card tags for Twitter/X
- ✅ SEO meta tags for better search visibility
- ✅ Proper title and description

### 2. **Created Preview Card Generator**
- ✅ `public/preview-card.html` - Beautiful preview card template
- ✅ 1200x630px dimensions (perfect for social media)
- ✅ Professional design with your branding

## 🎨 **How to Create Your Preview Image:**

### **Option 1: Use the Generator (Recommended)**

1. **Open the generator:**
   ```bash
   # Open this file in your browser:
   public/preview-card.html
   ```

2. **Take a screenshot:**
   - Set browser zoom to 100%
   - Take a screenshot at exactly **1200x630px**
   - Save as `preview-card.png`

3. **Upload to your website:**
   - Place `preview-card.png` in your `public/` folder
   - It will be available at `https://michaeldevbear.com/preview-card.png`

### **Option 2: Create Your Own**

If you want to create a custom preview image:
- **Dimensions:** 1200x630px
- **Format:** PNG or JPG
- **Content:** Your name, title, and a professional photo/design
- **Upload:** Save as `preview-card.png` in the `public/` folder

## 🔧 **Test Your Preview Cards:**

### **Facebook/WhatsApp/Instagram:**
1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Paste your URL: `https://michaeldevbear.com`
3. Click **"Scrape Again"**
4. Check the preview

### **Twitter/X:**
1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Paste your URL
3. Click **"Preview card"**

### **LinkedIn:**
1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Paste your URL
3. Check the preview

## 🚀 **Deploy and Test:**

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add social media preview cards"
   git push origin main
   ```

2. **Wait for deployment** (Netlify will auto-deploy)

3. **Test the preview** using the tools above

4. **Clear cache** if needed:
   - Facebook: Use the debugger to "Scrape Again"
   - WhatsApp: May take a few hours to update
   - LinkedIn: Usually updates immediately

## 📋 **What Your Preview Will Show:**

When someone shares your portfolio link, they'll see:

```
┌─────────────────────────────────────────────────────────┐
│ Michael de Beer | Software Engineer & FlutterFlow Dev   │
│                                                         │
│ Portfolio of Michael de Beer — BSc Computer Science     │
│ student, FlutterFlow developer, and full-stack engineer │
│                                                         │
│ [Your beautiful preview image]                          │
│                                                         │
│ michaeldevbear.com                                      │
└─────────────────────────────────────────────────────────┘
```

## 🎯 **Expected Results:**

- ✅ **WhatsApp:** Professional preview with image
- ✅ **LinkedIn:** Clean card with your info
- ✅ **Twitter:** Large image preview
- ✅ **Facebook:** Rich preview with description
- ✅ **Discord:** Nice preview card
- ✅ **Slack:** Professional appearance

## 🔍 **Troubleshooting:**

### **If preview doesn't update:**
1. **Clear cache** using the debugger tools
2. **Wait 24 hours** for WhatsApp/Instagram
3. **Check image URL** is accessible
4. **Verify meta tags** are in the HTML

### **If image doesn't show:**
1. **Check image URL** in browser
2. **Verify file exists** in public folder
3. **Check image dimensions** (1200x630px)
4. **Try different image format** (PNG/JPG)

## 🎉 **You're All Set!**

Your portfolio will now look professional when shared on any social media platform!

**Next steps:**
1. Create the preview image using the generator
2. Deploy your changes
3. Test with the debugger tools
4. Share your portfolio confidently! 🚀
