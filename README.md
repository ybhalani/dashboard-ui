# Getting Started with Navigation Home page
## About

This is a repo for code challange. Any references to the company are not included in this work.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions to Run This Project

# Next.js + React + Jest

## Prerequisite
 
Node.js 16.14 or later(latest Node version recommended).
 
macOS, Windows (including WSL), and Linux are supported.

## Available Scripts
- Clone the repo via HTTP or SSH:
  - HTTP = `git clone https://github.com/ybhalani/dashboard-ui.git`
  - SSH = `git clone git@github.com:ybhalani/dashboard-ui.git`
- Open a terminal
- Navigate to the project by running `cd _path_to_project_here`
- In the project directory, you can run to install all the dependencies for the display app:
 
### `npm install`
 
In the project directory, you can run:

### `npm run dev`
 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Just to make sure the internet is working and you are able to access https://amock.io/
because we are making an API call to fetch the data, not defined JSON in app
 
The page will reload in background with updated changes if you make edits.
 
### `npm run test`
 
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
 
Now to create the build folder you have to run the below command which will create the build folder in main directory of app.
 
### `npm run build`
 
After running build command you will see the build folder created at the root level of project
go into the build folder

> **Note:** Since tests can be co-located alongside other files inside the App Router, we have placed those tests in `app/` to demonstrate this behavior (which is different than `pages/`). You can still place all tests in `__tests__` if you prefer.



# PRR Meeting Script - Logging & Secrets Protection
**Duration:** 30 minutes  
**Goal:** Show how www-nextjs prevents secrets/PII from logs + confirm Titan evidence + get Director attestation

---

## 🎯 Opening (0:00–2:00)

### What to say:
> "Thanks everyone. The goal today is to show how www-nextjs prevents secrets and PII from getting into logs, and confirm our current Titan non-prod logging evidence and the plan for Production validation. After this, I'm hoping we can finalize the Director attestation for the PRR item."

> "This PRR control wants evidence that our logs follow the Security Telemetry Log Standard. Because www-nextjs is not in Production yet, we will provide an estimated date for Production Titan validation, which is end of March with go-live."

> "We already have non-prod logs in Titan, and we'll attach a screenshot showing that. Now I'll show the actual code and configuration that prevents secrets from being logged."

### What to show:
- PRR work item page (requirements list)
- Mention attachments: topology diagram, Titan DV screenshot, Nate email attestation

---

## 🔐 Part 1: Vault Secret Injection (2:00–8:00)

### What to say:
> "We use Vault injection in Kubernetes to provide secrets at runtime. Secrets are not stored in git and are not hardcoded. The container sources them at startup."

> "Example: the Azure Blob SAS token is injected into a file in the pod at `/vault/secrets/config` and the container sources that file before starting Node."

> "Sourcing a file means we load environment variables into the running process without printing them to the console."

### 📂 **FILE TO OPEN:** `config/spec.dv.yaml`

**Open:** [config/spec.dv.yaml](config/spec.dv.yaml)

**What to point out:**

1. **Lines 17-25:** Vault injection configuration
   ```yaml
   secrets:
     serviceAccountName: srv-geicodotcom-np
     vault.hashicorp.com/agent-inject: "true"
   ```

2. **Lines 36-40:** SAS Token injection template
   ```yaml
   vault.hashicorp.com/agent-inject-secret-storage: "ve_geico-dot-com-np/data/dev"
   vault.hashicorp.com/agent-inject-template-config: |
     {{- with secret "ve_geico-dot-com-np/data/dev" -}}
       export STORAGE_SAS_TOKEN="{{ .Data.data.STORAGE_SAS_TOKEN }}"
     {{- end }}
   ```

3. **Line 47:** Container sources the secret before starting Node
   ```yaml
   args:
     - ". /vault/secrets/config && export ENABLE_VISIBLE_GDS=1 && node server.js"
   ```

### Key message:
**Secrets come from Vault at runtime. They are not committed to git.**

---

## 💻 Part 2: Server-Side Environment Variables (8:00–12:00)

### What to say:
> "In code, we read the SAS token from `process.env` using a typed server environment module. This is server-side only—it's not a `NEXT_PUBLIC_*` variable, so it doesn't get shipped to the browser."

### 📂 **FILE TO OPEN:** `src/lib/env/server.ts`

**Open:** [src/lib/env/server.ts](src/lib/env/server.ts)

**What to point out:**

1. **Lines 6-8:** Comment about runtime injection
   ```typescript
   server: {
     environment: z.enum(["local", "dv", "ut", "lt", "pd"]).default("local"),
     // SAS token is injected at runtime via Vault, not available at build time
     storageSasToken: z.string().optional(),
   ```

2. **Line 23:** Reading from process.env
   ```typescript
   runtimeEnv: {
     environment: process.env.environment,
     storageSasToken: process.env.STORAGE_SAS_TOKEN,
   ```

### Key message:
**The app reads secrets from runtime env. It's server-side only, never sent to the browser.**

---

## 🛡️ Part 3A: Global Logger Redaction (12:00–16:00)

### What to say:
> "We use structured JSON logging with Pino. We have a redaction list that removes common secret-bearing fields like auth headers, cookies, API keys, token fields, passwords, and even `process.env`."

> "Importantly, it's `remove: true`, which means the secret values are not masked—they are completely deleted from the log output. This is defense-in-depth."

### 📂 **FILE TO OPEN:** `src/lib/logging/logger.ts`

**Open:** [src/lib/logging/logger.ts](src/lib/logging/logger.ts)

**What to point out:**

1. **Lines 11-37:** Redaction paths list
   ```typescript
   export const LOG_REDACT_PATHS = [
     // Common credential headers
     "req.headers.authorization",
     "req.headers.cookie",
     "req.headers.set-cookie",
     'req.headers["x-api-key"]',
     
     // Common token-bearing fields (defense-in-depth)
     "sasToken",
     "token",
     "accessToken",
     "refreshToken",
     "password",
     "secret",
     
     // If someone accidentally logs env blobs
     "process.env",
   ];
   ```

2. **Lines 75-78:** Remove configuration (not mask!)
   ```typescript
   // IMPORTANT: we prefer remove=true to ensure sensitive values never land in logs.
   redact: {
     paths: LOG_REDACT_PATHS,
     remove: true,
   },
   ```

### Key message:
**Even if someone accidentally logs a token, it is removed from output—not masked, but completely deleted.**

---

## ✅ Part 3B: Redaction Test (16:00–20:00)

### What to say:
> "We also have a test that tries to log tokens, auth headers, cookies, and API keys, then confirms they don't appear in the emitted JSON log line at all. This isn't just a guideline—it's enforced with tests."

### 📂 **FILE TO OPEN:** `tests/redaction.test.ts`

**Open:** [tests/redaction.test.ts](tests/redaction.test.ts)

**What to point out:**

1. **Lines 17-29:** Test logs sensitive fields
   ```typescript
   log.info({
     msg: "test.redaction",
     token: "should-not-appear",
     sasToken: "should-not-appear",
     req: {
       headers: {
         authorization: "Bearer should-not-appear",
         cookie: "sessionId=should-not-appear",
         "x-api-key": "should-not-appear",
       },
     },
   });
   ```

2. **Lines 37-43:** Assertions that fields are undefined
   ```typescript
   // Removed fields should be absent (remove=true).
   assert.equal(obj.token, undefined);
   assert.equal(obj.sasToken, undefined);
   assert.equal(obj?.req?.headers?.authorization, undefined);
   assert.equal(obj?.req?.headers?.cookie, undefined);
   
   // Raw secrets must not appear anywhere in the log line.
   assert.ok(!firstLine.includes("should-not-appear"));
   ```

### Key message:
**This protection is tested automatically. If someone tries to log secrets, the test will catch it.**

---

## 🔒 Part 3C: Operational Logging Example (20:00–23:00)

### What to say:
> "When we initialize blob storage, we never log the SAS token value. We only log a boolean `sasTokenPresent` so we can troubleshoot missing configuration without leaking secrets."

### 📂 **FILE TO OPEN:** `src/lib/services/blob-storage.service.ts`

**Open:** [src/lib/services/blob-storage.service.ts](src/lib/services/blob-storage.service.ts)

**What to point out:**

1. **Lines 59-68:** Never log the token
   ```typescript
   // Debug logging - only log once on first initialization
   if (!this.initialized) {
     // SECURITY: never log the SAS token (or any preview/length).
     // We only log a boolean "present" flag for operational triage.
     log.info({
       msg: "blob_storage.init_start",
       environment,
       storageAccountName,
       containerName,
       sasTokenPresent: !!sasToken,  // ← Only a boolean!
     });
   ```

### Key message:
**We only log `sasTokenPresent: true/false`, never the actual token.**

---

## 🚫 Part 4: Request Logging (23:00–26:00)

### What to say:
> "A lot of accidental leakage happens via query strings or by dumping headers. We intentionally do not log query strings. We do not log full headers—only allowlisted fields like user agent, plus `requestId` and route."

> "We use `requestId` and trace headers when present. We set `x-request-id` on response headers for correlation."

### 📂 **FILE TO OPEN:** `src/lib/logging/http-instrumentation.ts`

**Open:** [src/lib/logging/http-instrumentation.ts](src/lib/logging/http-instrumentation.ts)

**What to point out:**

1. **Lines 18-23:** Drop query strings
   ```typescript
   function safePathname(url: string | undefined): string {
     // We intentionally drop querystring from logs (common PII/secret leak vector).
     const raw = url ?? "/";
     const q = raw.indexOf("?");
     return q >= 0 ? raw.slice(0, q) : raw;
   }
   ```

2. **Lines 116-145:** Allowlist approach (never log full headers)
   ```typescript
   // Allowlist: never log full headers; only log safe, high-value fields.
   const userAgent = typeof incoming["user-agent"] === "string"
     ? incoming["user-agent"] : ...
   
   logger.info({
     msg: "http.request",
     requestId: correlation.requestId,
     method,
     route: pathname,
     status,
     durationMs,
     ...(userAgent ? { userAgent } : null),
     ...(correlation.traceparent ? { traceparent: correlation.traceparent } : null),
   });
   ```

### Key message:
**We drop query strings. We allowlist safe fields only. No full header dumps.**

---

## 📊 Part 5: Titan Evidence (26:00–28:00)

### What to say:
> "Even though we're not in Production yet, logs are already flowing to Titan in `azure-logs-np` for DV, UT, and LT environments. We use Kubernetes metadata filters like cluster, namespace, and container."

> "We'll attach a screenshot to the PRR item. For Production, we will validate Titan forwarding as part of go-live readiness by end of March."

### What to show:
**Open Titan and show this query:**
```
{cluster_name="azure-eastus-st-085-np-aks-001", namespace="paas-www-nextjs-dv-dv", container="main"}
```

**Point out:**
- One log line showing safe fields:
  - `requestId`, `method`, `route`, `status`, `durationMs`
  - NO secrets, NO headers, NO query strings

### Key message:
**Logs are flowing to Titan in non-prod. Production validation planned with go-live.**

---

## 🎯 Closing (28:00–30:00)

### What to say:
> "Does this address the concerns about tokens, API keys, and environment variables?"

> "If yes, could you reply-all with the attestation statement we drafted, and I'll attach your response screenshot to the PRR item?"

> "After that, I'll attach the topology diagram, Titan screenshot, and the PRR comment, and move the item toward Resolved."

### What to show:
**Show the exact attestation statement:**
> "I attest that www-nextjs implements appropriate controls to prevent secrets and PII from appearing in logs, including Vault injection, logger redaction with `remove: true`, test coverage, and safe request logging practices. Non-prod evidence is provided via Titan. Production validation will occur with go-live by end of March 2026."

---

## 🤔 Expected Questions + Quick Answers

### Q: "How do you prevent secrets from being logged?"
**A:** "We don't log headers or query strings. We allowlist safe fields only. We have logger-level redaction with `remove: true` and test coverage that would catch regressions."

### Q: "What about environment variables—could they leak?"
**A:** "We never log `process.env`—it's in the redaction list. Secrets are injected by Vault at runtime, not stored in the repo."

### Q: "If someone adds a new log with a token field?"
**A:** "If they log it under common names like `token`, `accessToken`, `sasToken`, the logger removes it. We also have a test that would catch regressions for common paths."

### Q: "Why not just use ArgoCD logs as evidence?"
**A:** "ArgoCD proves stdout emission. Titan proves centralized forwarding and searchability. For PRR, we attach Titan evidence because it shows the logs are properly indexed and queryable."

---

## ✅ Quick Prep Checklist (10 minutes before meeting)

**Open these 6 files in VS Code tabs (in order):**

1. [config/spec.dv.yaml](config/spec.dv.yaml) - Lines 17-47
2. [src/lib/env/server.ts](src/lib/env/server.ts) - Lines 6-23
3. [src/lib/logging/logger.ts](src/lib/logging/logger.ts) - Lines 11-78
4. [tests/redaction.test.ts](tests/redaction.test.ts) - Lines 17-43
5. [src/lib/logging/http-instrumentation.ts](src/lib/logging/http-instrumentation.ts) - Lines 18-145
6. [src/lib/services/blob-storage.service.ts](src/lib/services/blob-storage.service.ts) - Lines 59-68

**Open Titan query page**
- Query: `{cluster_name="azure-eastus-st-085-np-aks-001", namespace="paas-www-nextjs-dv-dv", container="main"}`

**Have screen share ready:**
- Share only the VS Code window
- Use Cmd+P to quickly jump between files
- Zoom in if needed (Cmd+ to increase font size)

**One sentence ready:**
> "We only log `sasTokenPresent`, never the token value."

---

## 📝 Post-Meeting To-Do

- [ ] Wait for Nate's attestation email
- [ ] Screenshot the attestation email
- [ ] Attach to PRR:
  - Topology diagram
  - Titan DV screenshot
  - Nate attestation screenshot
- [ ] Add PRR comment summarizing the evidence
- [ ] Move PRR item to "Resolved" status

---

**Good luck! You've got this! 🚀**

