# CSS Art Generator - MVP

Generate unique CSS portraits from text prompts, inspired by Diana Smith's (cyanHarlow) purecss-pink technique.

## 🚀 Quick Start

### Deploy to Vercel (Recommended for Testing)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gadgetboy27/purecss-pink&project-name=css-art-generator&root-directory=css-art-gen)

1. Click the button above
2. Sign in with GitHub
3. Configure:
   - **Root Directory:** `css-art-gen`
   - Click "Deploy"
4. Done! You'll get a live URL

### Or Deploy Manually

1. Fork/clone this repo
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set **Root Directory** to `css-art-gen`
5. Deploy!

### Local Development

```bash
cd css-art-gen
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Features (MVP)

✅ **Prompt-Based Generation** - Enter text, get unique CSS art
✅ **5 Mood Presets** - Melancholic, hopeful, dramatic, serene, joyful
✅ **Live Preview** - See artwork instantly
✅ **Download HTML** - Get standalone file
✅ **Generation Counter** - Every piece numbered
✅ **Provenance Tracking** - Cryptographic fingerprints
✅ **Rate Limiting** - 10 per hour (quality control)
✅ **Security** - Anti-spam, input validation
✅ **Scope Documentation** - Clear CAN/CANNOT lists

## 🎨 Test Prompts

Try these:

```
"serene portrait in blue tones with soft lighting"
"dramatic portrait with intense shadows"
"hopeful portrait in warm yellow colors"
"melancholic portrait in deep blue"
"joyful portrait with vibrant colors"
```

## 🔍 What to Test

1. **Visual Quality** - Do portraits look good?
2. **Variation** - Are results unique?
3. **Counter** - Does numbering work?
4. **Security** - Try 11 generations (should block)
5. **Downloads** - Do files work standalone?

## ⚠️ Important Notes

**Cloud Deployment (Vercel):**
- Counter uses in-memory storage (resets on deploy)
- For production, needs database (Supabase/PlanetScale)
- All generation features work, just counter doesn't persist

**Local Development:**
- Counter uses file-based storage
- Persists between runs
- Full functionality

## 📝 Testing Checklist

- [ ] Generate 5-10 artworks
- [ ] Try different moods
- [ ] Download HTML files
- [ ] Open downloads in browser
- [ ] Check visual quality
- [ ] Test rate limiting (generate 11 times)
- [ ] Verify generation numbers increment

## 🚧 Known Limitations (By Design)

**What We CAN Do:**
- Stylized CSS portraits
- Mood-based color palettes
- Unique variations
- Provable authenticity

**What We CANNOT Do:**
- Photorealistic portraits
- Multi-person scenes
- Fine details (wrinkles, pores)
- Non-portrait subjects

See `SCOPE_AND_LIMITATIONS.md` for full details.

## 📊 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Deployment (recommended)

## 🙏 Attribution

**Inspired by Diana Smith (cyanHarlow)**
- Original: [purecss-pink](https://github.com/cyanharlow/purecss-pink)
- Website: [diana-adrianne.com](http://diana-adrianne.com)

**Important:** Contact Diana before commercial use. She receives 15% of platform revenue.

## 📄 License

Not yet licensed - pending discussion with Diana Smith.

## 🎯 Next Steps

1. **Test quality** - Generate 20+ artworks
2. **Get feedback** - Show to others
3. **Assess results** - Good enough to proceed?
4. **Contact Diana** - If quality validated
5. **Phase 2** - Blockchain/NFT integration

---

**MVP Status:** ✅ Ready for testing
**Production Status:** ⏳ Awaiting validation & Diana's approval

**Questions?** Check documentation in this folder or open an issue.
