# CSS Art Generator - Tech Stack & Build Plan

## Tech Stack Decision

### Frontend
- **Next.js 14** (App Router) - React framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Rapid UI development
- **Shadcn/ui** - High-quality component library
- **React Hook Form** - Form management
- **Zustand** - State management (lightweight)

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - Database ORM
- **PostgreSQL** - Database (or SQLite for dev)
- **IPFS (Pinata)** - Decentralized storage

### Blockchain
- **Hardhat** - Smart contract development
- **Ethers.js v6** - Blockchain interaction
- **Chainlink VRF** - Verifiable randomness
- **Polygon** - L2 for cheap gas fees
- **OpenZeppelin** - Secure contract templates

### Randomness Strategy (Phased)
- **Phase 1 (MVP):** Deterministic seed (timestamp + address + nonce)
- **Phase 2:** Chainlink VRF integration
- **Phase 3:** Random.org for premium tier

### Testing & Quality
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **ESLint + Prettier** - Code quality

### Deployment
- **Vercel** - Frontend/API hosting (free tier)
- **Supabase** - PostgreSQL hosting (free tier)
- **Polygon Mumbai** - Testnet (free)
- **Polygon Mainnet** - Production

## Project Structure

```
css-art-generator/
├── apps/
│   ├── web/                    # Next.js app
│   │   ├── src/
│   │   │   ├── app/           # App router pages
│   │   │   ├── components/    # React components
│   │   │   ├── lib/           # Utilities
│   │   │   └── styles/        # Global styles
│   │   ├── public/            # Static assets
│   │   └── package.json
│   │
│   └── contracts/             # Smart contracts
│       ├── contracts/         # Solidity files
│       ├── scripts/           # Deployment scripts
│       ├── test/              # Contract tests
│       └── hardhat.config.ts
│
├── packages/
│   ├── generator/             # Core generation logic
│   │   ├── src/
│   │   │   ├── parameters.ts  # Parameter system
│   │   │   ├── css-gen.ts     # CSS generation
│   │   │   ├── randomness.ts  # Randomness utils
│   │   │   └── provenance.ts  # Provenance tracking
│   │   └── package.json
│   │
│   └── ui/                    # Shared UI components
│       └── src/
│           └── components/
│
├── docs/                      # Documentation
├── .github/                   # CI/CD workflows
└── package.json              # Root package.json
```

## Development Phases

### Phase 1: MVP (Week 1-2)
**Goal:** Working generator with basic features

- [ ] Project setup (Next.js + TypeScript)
- [ ] Basic UI (prompt input, generate button)
- [ ] Parameter generation system
- [ ] CSS generation from parameters
- [ ] Live preview rendering
- [ ] Download HTML/CSS
- [ ] Simple deterministic randomness

**No blockchain yet** - Focus on core functionality

### Phase 2: Blockchain Integration (Week 3-4)
**Goal:** Add smart contracts and NFT minting

- [ ] Smart contract for revenue splits
- [ ] Deploy to Polygon Mumbai (testnet)
- [ ] Wallet connection (MetaMask)
- [ ] Minting functionality
- [ ] Provenance tracking on-chain
- [ ] IPFS upload integration

### Phase 3: Randomness & Polish (Week 5-6)
**Goal:** Add Chainlink VRF and polish UX

- [ ] Chainlink VRF integration
- [ ] Multi-tier pricing
- [ ] Certificate generation
- [ ] Gallery/showcase
- [ ] Admin dashboard
- [ ] Analytics

### Phase 4: Production Ready (Week 7-8)
**Goal:** Deploy to mainnet

- [ ] Security audit
- [ ] Comprehensive testing
- [ ] Deploy to Polygon mainnet
- [ ] Set Diana's address (after contact)
- [ ] Production monitoring
- [ ] Documentation

## Why This Stack?

### Next.js
✅ Best React framework
✅ Built-in API routes (no separate backend)
✅ Great performance
✅ Easy deployment to Vercel
✅ TypeScript support

### Chainlink VRF
✅ Cheaper than Random.org ($0.50 vs $100/month)
✅ Verifiable on-chain
✅ Industry standard for Web3
✅ Battle-tested

### Polygon
✅ Extremely cheap gas (~$0.01 per transaction)
✅ Ethereum compatible
✅ Large ecosystem
✅ Good for NFTs

### Tailwind + Shadcn/ui
✅ Rapid development
✅ Beautiful components out of the box
✅ Fully customizable
✅ Great DX

## Cost Breakdown (Development)

### Free Tier Services
- Vercel: Free (hobby plan)
- Supabase: Free (500MB database)
- Polygon Mumbai: Free (testnet)
- GitHub: Free
- IPFS via Pinata: Free (1GB)

**Total MVP cost: $0** ✅

### Production Costs (Month 1)
- Polygon gas fees: ~$10/month
- IPFS (Pinata): $20/month (100GB)
- Domain: $12/year
- Vercel Pro (optional): $20/month

**Total: ~$50/month**

### When to Upgrade
- Vercel Pro: When traffic > 100GB/month
- Supabase Pro: When database > 500MB
- Chainlink VRF: Pay per use (~$0.50/request)
- Random.org: When we have Exclusive tier demand

## Development Timeline

### Week 1: Foundation
```
Monday:    Project setup, basic UI
Tuesday:   Parameter system
Wednesday: CSS generation
Thursday:  Preview rendering
Friday:    Download functionality
Weekend:   Testing & refinement
```

### Week 2: Generator Core
```
Monday:    Mood presets
Tuesday:   Color variations
Wednesday: Hair/features variations
Thursday:  Provenance system
Friday:    Polish UI/UX
Weekend:   User testing
```

### Week 3: Smart Contracts
```
Monday:    Revenue split contract
Tuesday:   NFT contract (ERC-721)
Wednesday: Deploy to testnet
Thursday:  Frontend integration
Friday:    Wallet connection
Weekend:   Testing transactions
```

### Week 4: Integration
```
Monday:    IPFS upload
Tuesday:   Minting flow
Wednesday: Certificate generation
Thursday:  Testing end-to-end
Friday:    Bug fixes
Weekend:   Documentation
```

## Quality Checkpoints

### Before Moving to Next Phase
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] UI/UX reviewed
- [ ] Performance acceptable
- [ ] Security basics covered

### Before Contacting Diana
- [ ] Full working prototype
- [ ] Smart contract deployed (testnet)
- [ ] 10+ example artworks generated
- [ ] Revenue split verified on testnet
- [ ] Professional demo ready

### Before Mainnet Deploy
- [ ] Diana's permission obtained
- [ ] Diana's wallet address set
- [ ] Smart contract audited
- [ ] All edge cases tested
- [ ] Monitoring in place

## MVP Feature Set (Phase 1)

### What We're Building First

**User Experience:**
1. Land on homepage
2. Enter prompt ("serene portrait in blue")
3. Select style preset (optional)
4. Click "Generate"
5. See preview in real-time
6. Download HTML+CSS file
7. View certificate of authenticity

**Technical Features:**
- ✅ Parameter generation from prompt
- ✅ 5 mood presets
- ✅ CSS generation
- ✅ Live preview
- ✅ Download functionality
- ✅ Provenance tracking (JSON)
- ✅ Certificate generation

**NOT in MVP:**
- ❌ Blockchain/NFT (Phase 2)
- ❌ Payment processing (Phase 2)
- ❌ Chainlink VRF (Phase 3)
- ❌ User accounts (Phase 3)
- ❌ Gallery (Phase 3)

### Why This Approach?

**Validate core concept first:**
- Can we generate good-looking CSS art?
- Do the parameters create enough variation?
- Is the UI intuitive?
- Do people actually want this?

**Then add complexity:**
- Blockchain is complex - add after core works
- Payment processing requires legal setup
- Focus on the art generation first

## Success Criteria

### Phase 1 Success (MVP)
- [ ] Generate 10 distinct artworks
- [ ] Each looks unique and high quality
- [ ] Generation time < 3 seconds
- [ ] Preview renders correctly
- [ ] Downloaded HTML works standalone
- [ ] 5 beta testers give positive feedback

### Phase 2 Success (Blockchain)
- [ ] Smart contract deployed to testnet
- [ ] Revenue split works correctly
- [ ] Can mint NFT to testnet wallet
- [ ] IPFS upload succeeds
- [ ] Gas costs < $1 per mint

### Phase 3 Success (Production)
- [ ] Diana approves and provides wallet
- [ ] First 10 real artworks generated
- [ ] All payments distributed correctly
- [ ] No security issues
- [ ] Positive user feedback

## Risk Mitigation

### Technical Risks

**Risk:** CSS generation produces ugly results
**Mitigation:** Start with curated presets, iterate based on feedback

**Risk:** Smart contract bugs
**Mitigation:** Use OpenZeppelin templates, testnet first, audit before mainnet

**Risk:** IPFS upload fails
**Mitigation:** Retry logic, fallback to Arweave, local backup

### Business Risks

**Risk:** Diana says no
**Mitigation:** Have fallback plan (different art style, different creator)

**Risk:** No user demand
**Mitigation:** Validate with MVP before spending on blockchain

**Risk:** Legal issues
**Mitigation:** Terms of service, proper licensing, consult lawyer

### Timeline Risks

**Risk:** Takes longer than expected
**Mitigation:** MVP first, add features incrementally

**Risk:** Blockchain complexity
**Mitigation:** Use existing templates, start simple

## Let's Start Building!

I'll now create:
1. Project structure
2. Next.js app with TypeScript
3. Basic generator UI
4. Parameter system
5. CSS generation
6. Preview functionality

We'll build incrementally and test as we go!
