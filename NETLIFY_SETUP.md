# 🚀 Netlify Environment Variables Setup

## 📧 **EmailJS Configuration in Netlify**

### **Step 1: Access Netlify Dashboard**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your portfolio website project
3. Navigate to **Site settings** → **Environment variables**

### **Step 2: Add EmailJS Environment Variables**

Click **"Add a variable"** and add these three variables:

| **Variable Name** | **Value** | **Description** |
|-------------------|-----------|-----------------|
| `VITE_EMAILJS_SERVICE_ID` | `service_2cw323u` | Your EmailJS Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xfzn46s` | Your EmailJS Template ID |
| `VITE_EMAILJS_USER_ID` | `GiPj0de8CTRRFLwYK` | Your EmailJS User ID |

### **Step 3: Verify Your Supabase Variables**

Make sure you also have these variables set:

| **Variable Name** | **Value** | **Description** |
|-------------------|-----------|-----------------|
| `VITE_SUPABASE_URL` | `https://asujlhtftnrwczvrgpfs.supabase.co` | Your Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` | Your Supabase Anonymous Key |

### **Step 4: Trigger a New Deployment**

After adding the environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. This will rebuild your site with the new environment variables

### **Step 5: Test the Contact Form**

Once deployed:
1. Go to your live website
2. Navigate to the Contact section
3. Fill out and submit the contact form
4. Check your email (`debeermichael17@gmail.com`) for the notification

## 🔧 **Troubleshooting**

### **If emails aren't working:**
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Make sure your EmailJS template is configured properly
4. Check that your EmailJS service is active

### **To check environment variables:**
1. Go to **Site settings** → **Environment variables**
2. Verify all variables are listed and have correct values
3. Make sure there are no extra spaces or characters

## ✅ **Expected Result**

After setup, when someone submits the contact form:
- ✅ Message gets saved to Supabase database
- ✅ Email notification sent to `debeermichael17@gmail.com`
- ✅ Success message shown to user

**Your contact form should now work perfectly!** 🎉
