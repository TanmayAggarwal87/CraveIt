# 🍽️ CraveIt – A React Native Food Ordering App

**CraveIt** is a modern mobile food ordering app built using **React Native (Expo)**, **Appwrite**, **NativeWind**, and **Zustand** for state management.

This project marks my **first real dive into mobile app development**. I started by following a tutorial, but I didn’t stop there — I took things further by adding my own features like **dynamic routing for each food item**, and **secure database handling** for user cart and address data.

---

## 🚀 Features

* 🍕 **Real-Time Menu & Categories** – Powered by Appwrite collections
* 🔍 **Search & Filter** – Easily find what you're craving
* 🛒 **Persistent Cart** – Save customizations like toppings (e.g., extra cheese, jalapeños)
* 📦 **Address Management** – Store and retrieve user delivery addresses securely
* 🧭 **Dynamic Food Routes** – Built using `expo-router`
* ⚙️ **State Management** – Powered by Zustand
* 💅 **Clean UI** – Styled using NativeWind (Tailwind for React Native)

---

## 🛠 Tech Stack

| Tech         | Description                                  |
| ------------ | -------------------------------------------- |
| React Native | Cross-platform mobile app development (Expo) |
| Appwrite     | Backend-as-a-service: DB, Auth, File storage |
| Zustand      | Minimal state management for React           |
| NativeWind   | Utility-first CSS styling for React Native   |
| Expo Router  | File-based routing for Expo projects         |

---

## 📂 Environment Variables

All sensitive data is loaded via environment variables for safety and flexibility.

```.env
EXPO_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
EXPO_PUBLIC_PLATFORM=your-platform-name
EXPO_PUBLIC_DATABASE_ID=your-database-id
EXPO_PUBLIC_BUCKET_ID=your-storage-bucket-id

EXPO_PUBLIC_USER_COLLECTION_ID=user-collection-id
EXPO_PUBLIC_CATEGORIES_COLLECTION_ID=categories-collection-id
EXPO_PUBLIC_MENU_COLLECTION_ID=menu-collection-id
EXPO_PUBLIC_CUSTOMIZATIONS_COLLECTION_ID=customizations-collection-id
EXPO_PUBLIC_MENU_CUSTOMIZATIONS_COLLECTION_ID=menu-customizations-collection-id
EXPO_PUBLIC_ADDRESS_COLLECTION_ID=address-collection-id

```

> 🛡️ Ensure all the above variables are defined in your `.env` file and match your Appwrite project settings.

---
🗃️ Appwrite Database Structure
Below is a high-level overview of the collections used in CraveIt:

| Collection Name      | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `users`              | Stores user profiles and info                   |
| `categories`         | Menu categories like Pizza, Drinks, etc.        |
| `menu`               | Individual food items                           |
| `customizations`     | Customizable options (e.g., toppings)           |
| `menuCustomizations` | Mapping of menu items to allowed customizations |
| `address`            | Stores user delivery addresses                  |

---

## 📲 Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/CraveIt.git
   cd CraveIt
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment**
   Create a `.env` file in the root and define the Appwrite variables listed above.

4. **Run the App**

   ```bash
   npx expo start
   ```

---

## 🧠 What I Learned

* Basics of React Native and navigation with `expo-router`
* State handling with Zustand (and why it's awesome)
* Setting up and connecting to a backend (Appwrite)
* Working with environment variables and secure data handling
* Extending a tutorial into a real-world use case

---

## 🧑‍💻 Author

**Tanmay Aggarwal**
Aspiring full-stack developer | Exploring mobile dev | [GitHub](https://github.com/TanmayAggarwal87) | [LinkedIn](https://www.linkedin.com/in/tanmay-aggarwal-2aa95632a)

---

## ⭐️ Show Some Love

If you liked this project or found it helpful, feel free to leave a ⭐ on the repo!

---

