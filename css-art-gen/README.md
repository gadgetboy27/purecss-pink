# CSS Art Generator - MVP

Generate unique CSS portraits from text prompts, inspired by Diana Smith's (cyanHarlow) purecss-pink technique.

## 🚀 Quick Start

### Installation

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features (MVP)

✅ **Prompt-Based Generation** - Enter a text prompt and generate unique CSS art
✅ **Mood Presets** - 5 mood presets (melancholic, hopeful, dramatic, serene, joyful)
✅ **Live Preview** - See your artwork in real-time
✅ **Download HTML** - Get the complete HTML+CSS file
✅ **Provenance Tracking** - Cryptographic fingerprint for each artwork
✅ **Certificate of Authenticity** - Verifiable certificate embedded in code

## 🎨 How It Works

1. **Enter a Prompt** - Describe the mood and colors you want
2. **Generate** - Algorithm creates unique CSS parameters from your prompt
3. **Preview** - See the artwork rendered instantly
4. **Download** - Get standalone HTML file with embedded certificate

## 💻 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Seeded Randomness** - Deterministic but unique generation

## 📂 Project Structure

```
css-art-gen/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Main generator UI
│   │   └── layout.tsx    # Root layout
│   ├── lib/              # Core logic
│   │   ├── types.ts      # TypeScript types
│   │   ├── randomness.ts # Random number generation
│   │   ├── parameter-generator.ts  # Parameter system
│   │   ├── css-generator.ts        # CSS generation
│   │   └── provenance.ts           # Provenance tracking
│   └── components/       # React components (future)
├── public/               # Static assets
└── package.json
```

## 🎯 What's NOT in This MVP

❌ Blockchain/NFT minting (Phase 2)
❌ Payment processing (Phase 2)
❌ Chainlink VRF randomness (Phase 3)
❌ User accounts (Phase 3)
❌ Gallery/showcase (Phase 3)

## 🧪 Testing

Try these prompts to see different results:

- "serene portrait in blue tones with soft lighting"
- "dramatic portrait with intense shadows"
- "hopeful portrait in warm yellow colors"
- "melancholic portrait in deep blue"
- "joyful portrait with vibrant colors"

## 📝 Provenance & Attribution

Every artwork includes:
- Unique cryptographic fingerprint
- Prompt and timestamp
- Parameter snapshot
- Attribution to Diana Smith (cyanHarlow)

**Important:** This project uses techniques pioneered by Diana Smith. Before any commercial use, we MUST:
1. Contact Diana for permission
2. Set up revenue sharing (15% proposed)
3. Get her approval of the implementation

## 🚧 Development Roadmap

### Phase 1: MVP (Current)
- [x] Basic generator
- [x] 5 mood presets
- [x] Provenance tracking
- [x] Download functionality

### Phase 2: Blockchain (Next)
- [ ] Smart contract for revenue splits
- [ ] NFT minting
- [ ] IPFS upload
- [ ] Wallet connection

### Phase 3: Advanced Features
- [ ] Chainlink VRF randomness
- [ ] Multi-tier pricing
- [ ] User gallery
- [ ] Admin dashboard

### Phase 4: Production
- [ ] Contact Diana Smith
- [ ] Legal review
- [ ] Security audit
- [ ] Mainnet deployment

## 🔒 Security Notes

This MVP uses:
- Seeded pseudorandom generation (deterministic)
- Client-side only (no server storage)
- No authentication required
- No blockchain transactions

Production will require:
- Smart contract audit
- Secure key management
- Rate limiting
- Input validation

## 🤝 Contributing

This is currently a private MVP. Before contributing:
1. Understand we need Diana Smith's permission
2. Read the BUILD_PLAN.md for context
3. Follow TypeScript and React best practices

## 📄 License

Not yet licensed - pending discussion with Diana Smith.

Original technique by Diana Smith (cyanHarlow) - https://github.com/cyanharlow/purecss-pink

## 🙏 Attribution

**This project is inspired by and based on the pioneering work of:**
- **Diana Smith** (cyanHarlow)
- Original project: [purecss-pink](https://github.com/cyanharlow/purecss-pink)
- Website: [diana-adrianne.com](http://diana-adrianne.com)

Diana Smith invented this technique of creating detailed portraits using only CSS and HTML. This generator extends her concept into a prompt-based system.

**Revenue Sharing:** Diana Smith will receive 15% of all platform revenue once commercialized (pending her approval).

## 📞 Next Steps Before Launch

1. **Contact Diana Smith** - Get permission and wallet address
2. **Legal Review** - Terms of service, licensing
3. **Security Audit** - Smart contracts and payment flows
4. **User Testing** - Get feedback from beta users
5. **Marketing** - Build community before launch

---

**MVP Status:** ✅ Complete and ready for demo
**Production Status:** ⏳ Awaiting Diana Smith's approval
**Estimated Timeline:** 2-3 months to production-ready
