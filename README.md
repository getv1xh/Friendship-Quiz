# 💖 Who Knows Me Best? — Quiz Template

A fully reusable, production-ready friendship quiz app built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.
Preveiw: https://preview-howwell.vercel.app
Everything configurable lives in one place → `config/site.ts`.

---

## 🚀 Quick Start

```bash
unzip quiz-app.zip && cd quiz-app
npm install
cp .env.local.example .env.local   # then set ADMIN_PASSWORD
npm run dev
```

👉 Visit: http://localhost:3000

---

## ⚙️ Configuration — `config/site.ts`

| Key                        | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `profile.name`             | Your name shown on the hero page               |
| `profile.bio`              | Short bio / tagline                            |
| `profile.profileImage`     | URL or `/public` path (empty = emoji fallback) |
| `quiz.questionsPerSession` | Questions per game (default: 5)                |
| `scoring.messages`         | Result messages by score                       |
| `certificate.titles`       | Certificate title per score                    |
| `admin.path`               | Hidden admin dashboard route                   |
| `theme.default`            | `"dark"` | `"pink"` | `"green"`                |

---

## 🎨 Themes

| Theme        | Style                                  |
| ------------ | -------------------------------------- |
| 🌑 **dark**  | Black / charcoal, premium glass UI     |
| 💖 **pink**  | Soft pink gradients, rounded aesthetic |
| 💚 **green** | Calm pastel green, clean vibe          |

---

## ❓ Questions — `data/questions.json`

Fully customizable. Only `questionsPerSession` are randomly used per game.

```json
[
  {
    "id": "q1",
    "question": "What's my go-to comfort food?",
    "options": ["Pizza", "Ice cream", "Ramen", "Chocolate"],
    "correctAnswer": 2
  }
]
```

---

## 🔐 Admin Dashboard

Access via configurable route:

```
/secret-logs
```

### Authentication

* Protected using `ADMIN_PASSWORD`
* Server-side validation only
* Password never exposed to client

### Features

* 📊 Total attempts + average score
* 🧠 Full Q&A breakdown per attempt
* ✅ Correct / ❌ incorrect highlighting
* 🧹 One-click clear logs

---

## 🔑 Environment Variables

| Variable         | Required     | Description                  |
| ---------------- | ------------ | ---------------------------- |
| `ADMIN_PASSWORD` | ✅ Yes (prod) | Password for admin dashboard |

---

## 🚀 Deploy to Vercel

```bash
npx vercel
```

Then add `ADMIN_PASSWORD` in:

**Vercel → Project → Settings → Environment Variables**

---

## 📁 Project Structure

```
/app
  /page.tsx              ← Welcome screen
  /quiz/page.tsx         ← Quiz flow
  /result/page.tsx       ← Results + certificate
  /secret-logs/page.tsx  ← Admin dashboard (configurable)

/api
  /config/
  /questions/
  /submit/
  /admin/

/config
  /site.ts               ⭐ central config
  /themes.ts

/components
  /Certificate.tsx
  /Footer.tsx

/lib
  /quiz-store.tsx
  /log-store.ts
  /utils.ts

/data
  /questions.json

/types
  /index.ts
```

---

## 🖼️ Screenshots

Add your screenshots inside `/public/screenshots` and reference them below:


![Home]https://cdn.discordapp.com/attachments/1496871968652398644/1500381525059829810/Screenshot_2026-05-03-11-46-29-933-edit_com.android.chrome.jpg?ex=69f83aaf&is=69f6e92f&hm=7b74374b14273f0af02b6cb648800945bf756bf531a944aade84252fc4a027bb&)
![Question](https://cdn.discordapp.com/attachments/1496871968652398644/1500381524825215027/Screenshot_2026-05-03-11-46-49-245-edit_com.android.chrome.jpg?ex=69f83aaf&is=69f6e92f&hm=159cbd11370f7c25eefa5c50d408d28e2dd7707db27832c6d41fb2c9d4de435f&)
![Result](https://cdn.discordapp.com/attachments/1496871968652398644/1500381524250333204/Screenshot_2026-05-03-11-47-16-582-edit_com.android.chrome.jpg?ex=69f83aaf&is=69f6e92f&hm=ea3464db4323f07c5c4da10177aafeadd437e42e2cbb17c273a79d1ef0c08aaa&)
![Certificate](https://cdn.discordapp.com/attachments/1496871968652398644/1500381523956858941/Screenshot_2026-05-03-11-47-28-848-edit_com.android.chrome.jpg?ex=69f83aaf&is=69f6e92f&hm=f67553bf21a5ada08455b9c7e4358df0ed10d113941edfd80a2b491d1371c46c&)
![Admin](phttps://cdn.discordapp.com/attachments/1496871968652398644/1500381523613057054/Screenshot_2026-05-03-11-48-16-699-edit_com.android.chrome.jpg?ex=69f83aae&is=69f6e92e&hm=9a47247b8c092b25675da7edf9d610b6479ee97220e73d698e69c1938b0f4fe3&)


---

## 🔒 Privacy

* ❌ No IP tracking

* ❌ No webhook / external logging

* ❌ No GPS / location access

* ❌ No third-party analytics

* ✅ Logs stored in-memory only

* ✅ Cleared on server restart

* ✅ Admin access is server-validated

---

## ❤️ Credits

Built by Vish 
👉 https://github.com/getv1xh | hello@vishlabs.xyz

---

