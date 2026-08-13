# HandyAI Video Maker — Smart Home Repair

An automated multi-agent AI video production workspace for **Smart Home Repair** serving **Athens & Atlanta, GA** (`shomerepair.com`).

## Overview

HandyAI Video Maker orchestrates specialized video scriptwriter sub-agents, Google Veo video generation payloads (9:16 vertical), neural TTS audio synthesis, and social video publishing metadata.

### Core Features

- **Campaign Directions**:
  - `AI CAN`: Smart living automation (motorized shades, ambient bath warming, smart lighting).
  - `AI CAN'T`: Hilarious deadpan physical trade glitches (drywall melting into cheddar cheese, pipe wrenches warping into cooked spaghetti, infinite breaker box loops).
- **Trade Categories**:
  - Smart Automation, Drywall Repair, Plumbing, Electrical, Decking & Framing, Crawlspace, Gutters & Roof.
- **Visual & Audio Specs**:
  - **Google Veo 3.1** (`veo-3.1-lite-generate-001`): 9:16 vertical, 8K resolution, 60 FPS.
  - **Neural TTS & Scripture Hooks**: Integrated Proverbs 16:3 / Hebrews 3:4 quotes & local Athens/Atlanta CTA.
  - **Outro Bumper Integration**: Previews `3d-CrossBulb.mp4` 3D logo sign-off.
- **Production Queue & Embeds**:
  - Send generated payloads directly to `viral_video_production_machine/queue/`.
  - One-click copy for website vertical iframe embed code (`shomerepair.com/embed/v/...`).

## Quick Start & Local Development

```bash
# 1. Install dependencies (run once)
npm install

# 2. Start local server with Network Access enabled
npm run dev
# OR
npm run host
```

---

## 📖 How To Use HandyAI Video Maker

1. **Select Campaign Direction**:
   - Choose **`AI CAN`** for high-tech smart home automation showcases (motorized shades, ambient warming, smart lighting).
   - Choose **`AI CAN'T`** for funny, viral physical trade glitches (drywall turning to cheddar, pipe wrench turning to spaghetti).
2. **Pick a Trade Category**:
   - Select from Smart Automation, Drywall Repair, Plumbing, Electrical, Decking & Framing, Crawlspace, or Gutters & Roof.
3. **Customize Hook & Script Settings**:
   - Configure Scripture Hook options (e.g., *Proverbs 16:3*, *Hebrews 3:4*).
   - Tailor local call-to-action for Athens & Atlanta, GA (`shomerepair.com`).
4. **Generate AI Production Assets**:
   - **Google Veo 3.1 Prompt**: Formatted for 9:16 vertical video in 8K @ 60fps.
   - **Neural TTS Script**: Ready for audio synthesis voiceovers.
   - **Social Metadata**: Automated tags, titles, and descriptions.
5. **Dispatch & Embed**:
   - **Send to Production Queue**: Automatically routes payloads to `viral_video_production_machine/queue/`.
   - **Copy Embed Code**: One-click copy for `shomerepair.com` website vertical iframe embeds.

---

## 🌐 How to Share the Tool on Your Local Network (Wi-Fi / LAN)

Allow anyone on your local network (co-workers, family, secondary PCs, tablets, smartphones) to open and use the tool from their browser!

### Step 1: Start the Host Server

Open a terminal in the project directory and run:

```bash
npm run host
```
*(Or `npm run dev` since network hosting is enabled by default in `vite.config.ts`)*

### Step 2: Get Your Network Address

When the server starts, Vite will display lines similar to this:

```text
  VITE v5.4.1  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.45:5173/   <-- SHARE THIS LINK!
```

### Step 3: Access from Other Devices

1. Copy the **Network URL** (e.g., `http://192.168.1.45:5173`).
2. Share this link with anyone connected to the **same Wi-Fi or router network**.
3. They can open their browser on their phone, tablet, laptop, or desktop and use the full app instantly!

---

## 🔍 Finding Your Local IP Manually

If Vite doesn't show the IP address, you can find it manually:

- **Windows**:
  1. Open Command Prompt or PowerShell (`Win + R`, type `cmd`, press Enter).
  2. Type `ipconfig` and press Enter.
  3. Look for **IPv4 Address** (e.g., `192.168.1.45` or `10.0.0.12`).
  4. Access it via: `http://<YOUR_IP_ADDRESS>:5173`
- **Mac / Linux**:
  1. Open Terminal.
  2. Run `ifconfig` or `ip a` (or `hostname -I`).
  3. Locate your local IP address and attach `:5173`.

---

## 🛠️ Network Sharing Troubleshooting

### 1. Page won't load on another device?
- **Same Wi-Fi Connection**: Make sure both the host computer and the other device are connected to the exact same Wi-Fi network.
- **Windows Firewall Prompt**: If Windows Firewall asks to allow Node.js or Vite when running `npm run host`, click **Allow access** for *Private Networks*.
- **Allow Port in Windows Firewall (If Blocked)**:
  Run PowerShell as Administrator and execute:
  ```powershell
  New-NetFirewallRule -DisplayName "HandyAI Vite Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
  ```

---

## 🌎 Sharing Beyond Local Network (Public Internet Link)

If you need someone **outside** your local network (e.g., remote client, offsite team member) to access the tool temporarily:

1. Use **localtunnel** (no account required):
   ```bash
   npx localtunnel --port 5173
   ```
2. Copy the generated `https://xxxx.loca.lt` URL and send it to them.

# aiVideoMaker
