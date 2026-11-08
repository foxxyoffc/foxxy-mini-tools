// ==========================================
// FOXXY DEVTOOLS - MAIN TOOL CONTROLLER
// ==========================================

function openTool(type) {
    const title = document.getElementById("tool-title");
    const content = document.getElementById("tool-content");

    const tools = {
        json: {
            title: "JSON Formatter",
            html: `
                <p>Format and validate your JSON data.</p>
                <textarea id="json-input" rows="8" placeholder='{"name":"Foxxy","version":"1.0"}'></textarea>
                <button onclick="formatJSON()">Format JSON</button>
                <button onclick="clearTool('json-input','tool-result')">Clear</button>
                <pre id="tool-result"></pre>
            `
        },

        color: {
            title: "Color Generator",
            html: `
                <p>Generate random HEX colors.</p>
                <div id="color-preview" style="height:120px;border-radius:10px;background:#a66aff;margin:15px 0;"></div>
                <p id="color-code">#A66AFF</p>
                <button onclick="generateColor()">Generate Color</button>
                <button onclick="copyColor()">Copy HEX</button>
                <p id="tool-result"></p>
            `
        },

        text: {
            title: "Text Counter",
            html: `
                <p>Count characters and words in your text.</p>
                <textarea id="text-input" rows="8" placeholder="Write something..."></textarea>
                <button onclick="countText()">Count Text</button>
                <button onclick="clearTool('text-input','tool-result')">Clear</button>
                <p id="tool-result">0 characters · 0 words</p>
            `
        },

        css: {
            title: "CSS Minifier",
            html: `
                <p>Compress your CSS by removing comments and unnecessary whitespace.</p>
                <textarea id="css-input" rows="9" placeholder="Paste your CSS code here..."></textarea>
                <button onclick="minifyCSS()">Minify CSS</button>
                <button onclick="clearTool('css-input','css-result')">Clear</button>
                <p id="css-stats"></p>
                <textarea id="css-result" rows="9" placeholder="Minified CSS will appear here..." readonly></textarea>
                <button onclick="copyResult('css-result')">Copy CSS</button>
            `
        },

        base64: {
            title: "Base64 Encoder & Decoder",
            html: `
                <p>Convert text to Base64 or decode Base64 into text.</p>
                <textarea id="base64-input" rows="8" placeholder="Enter your text or Base64 data..."></textarea>
                <button onclick="encodeBase64()">Encode</button>
                <button onclick="decodeBase64()">Decode</button>
                <button onclick="clearTool('base64-input','base64-result')">Clear</button>
                <textarea id="base64-result" rows="8" placeholder="Your result will appear here..." readonly></textarea>
                <button onclick="copyResult('base64-result')">Copy Result</button>
                <p id="base64-status"></p>
            `
        },

        encryptor: {
            title: "File Encryptor",
            html: `
                <div class="encryptor-tool">

                    <p>Protect files with encryption or transform source code with obfuscation tools.</p>

                    <div class="encrypt-tabs">
                        <button id="enc-tab-file" class="active" onclick="switchEncryptTab('file')">
                            File Encryption
                        </button>
                        <button id="enc-tab-code" onclick="switchEncryptTab('code')">
                            Code Obfuscator
                        </button>
                    </div>

                    <div id="encrypt-file-panel">

                        <h3>File Encryption</h3>
                        <p>Encrypt and decrypt files using AES-256-GCM.</p>

                        <label for="enc-file">Select file</label>
                        <input type="file" id="enc-file">

                        <label for="enc-password">Encryption password</label>
                        <input type="password" id="enc-password" placeholder="Enter a strong password">

                        <label for="enc-password-confirm">Confirm password</label>
                        <input type="password" id="enc-password-confirm" placeholder="Confirm password">

                        <label for="enc-iterations">Key derivation strength</label>
                        <select id="enc-iterations">
                            <option value="310000">Standard - 310,000 iterations</option>
                            <option value="600000" selected>Strong - 600,000 iterations</option>
                            <option value="1000000">Maximum - 1,000,000 iterations</option>
                        </select>

                        <div class="encrypt-identity">
                            <h3>Custom Encryption Identity</h3>

                            <label for="enc-name">Encryption name</label>
                            <input id="enc-name" type="text" placeholder="Foxxy Custom Encryption">

                            <label for="enc-author">Author</label>
                            <input id="enc-author" type="text" placeholder="FoxxyOffc">

                            <label for="enc-watermark">Custom watermark / text</label>
                            <input id="enc-watermark" type="text" placeholder="Encrypted by FoxxyOffc">

                            <label for="enc-prefix">Output filename prefix</label>
                            <input id="enc-prefix" type="text" placeholder="foxxy">
                        </div>

                        <div class="encrypt-actions">
                            <button onclick="encryptFile()">Encrypt File</button>
                            <button onclick="decryptFile()">Decrypt File</button>
                            <button onclick="clearEncryptor()">Clear</button>
                        </div>

                        <p id="enc-status" aria-live="polite"></p>

                        <div class="encrypt-info">
                            <strong>Encryption details</strong>
                            <p>Algorithm: AES-256-GCM</p>
                            <p>Key derivation: PBKDF2 with SHA-256</p>
                            <p>Random salt and initialization vector for every encryption.</p>
                            <p>Your password is never uploaded or stored by this tool.</p>
                        </div>
                    </div>

                    <div id="encrypt-code-panel" hidden>

                        <h3>Code Obfuscator</h3>
                        <p>Transform source code to make it less readable. This is not cryptographic encryption.</p>

                        <label for="obf-type">Source type</label>
                        <select id="obf-type">
                            <option value="javascript">JavaScript</option>
                            <option value="css">CSS</option>
                            <option value="html">HTML</option>
                        </select>

                        <label for="obf-input">Source code</label>
                        <textarea id="obf-input" rows="10" placeholder="Paste your HTML, CSS, or JavaScript code..."></textarea>

                        <label for="obf-name">Custom project name</label>
                        <input id="obf-name" type="text" placeholder="Foxxy Protected Project">

                        <label for="obf-author">Custom author</label>
                        <input id="obf-author" type="text" placeholder="FoxxyOffc">

                        <label for="obf-watermark">Custom watermark</label>
                        <input id="obf-watermark" type="text" placeholder="Protected by Foxxy DevTools">

                        <label for="obf-mode">Transformation mode</label>
                        <select id="obf-mode">
                            <option value="normal">Standard transformation</option>
                            <option value="compact">Compact output</option>
                            <option value="packed">JavaScript Base64 wrapper (uses eval)</option>
                        </select>

                        <div class="encrypt-actions">
                            <button onclick="obfuscateCode()">Transform Code</button>
                            <button onclick="clearObfuscator()">Clear</button>
                        </div>

                        <p id="obf-status" aria-live="polite"></p>

                        <label for="obf-result">Transformed output</label>
                        <textarea id="obf-result" rows="10" readonly placeholder="Your transformed code will appear here..."></textarea>

                        <button onclick="copyResult('obf-result')">Copy Output</button>
                        <button onclick="downloadObfuscated()">Download File</button>

                        <div class="encrypt-info">
                            <strong>Important</strong>
                            <p>JavaScript Base64 wrapping is reversible and not secure encryption. It uses eval and may be blocked by Content Security Policy.</p>
                            <p>HTML and CSS transformations do not hide secrets. Never put private keys or API secrets in frontend code.</p>
                        </div>
                    </div>

                </div>
            `
        }
    };

    if (!tools[type]) return;

    title.textContent = tools[type].title;
    content.innerHTML = tools[type].html;

    document.getElementById("workspace").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// JSON FORMATTER
// ==========================================

function formatJSON() {
    const input = document.getElementById("json-input").value;
    const result = document.getElementById("tool-result");

    try {
        result.textContent = JSON.stringify(JSON.parse(input), null, 4);
    } catch (error) {
        result.textContent = "Invalid JSON format!";
    }
}


// ==========================================
// COLOR GENERATOR
// ==========================================

function generateColor() {
    const color = "#" + Math.floor(Math.random() * 16777216)
        .toString(16).padStart(6, "0").toUpperCase();

    document.getElementById("color-preview").style.background = color;
    document.getElementById("color-code").textContent = color;
}

function copyColor() {
    copyResult("color-code", true);
}


// ==========================================
// TEXT COUNTER
// ==========================================

function countText() {
    const text = document.getElementById("text-input").value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    document.getElementById("tool-result").textContent =
        `${text.length} characters · ${words} words`;
}


// ==========================================
// CSS MINIFIER
// ==========================================

function minifyCSS() {
    const input = document.getElementById("css-input").value;
    const result = document.getElementById("css-result");
    const stats = document.getElementById("css-stats");

    if (!input.trim()) {
        stats.textContent = "Please enter CSS code first.";
        return;
    }

    try {
        let output = "";
        let quote = null;
        let escaped = false;
        let pendingSpace = false;
        let inComment = false;

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const next = input[i + 1];

            if (quote) {
                output += char;

                if (escaped) escaped = false;
                else if (char === "\\") escaped = true;
                else if (char === quote) quote = null;

                continue;
            }

            if (char === '"' || char === "'") {
                if (pendingSpace && output && /[\w%)\]]/.test(output.slice(-1))) {
                    output += " ";
                }

                pendingSpace = false;
                quote = char;
                output += char;
                continue;
            }

            if (char === "/" && next === "*") {
                const end = input.indexOf("*/", i + 2);
                if (end === -1) throw new Error("Unclosed CSS comment.");
                i = end + 1;
                continue;
            }

            if (/\s/.test(char)) {
                pendingSpace = true;
                continue;
            }

            if ("{}:;,>+~".includes(char)) {
                output = output.trimEnd();
                output += char;
                pendingSpace = false;
            } else {
                if (pendingSpace && output &&
                    /[\w%)\]]/.test(output.slice(-1)) &&
                    /[\w(#.-]/.test(char)) {
                    output += " ";
                }

                output += char;
                pendingSpace = false;
            }
        }

        if (quote) throw new Error("Unclosed CSS string.");

        output = output.trim();
        result.value = output;

        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([output]).size;
        const saved = originalSize
            ? ((1 - minifiedSize / originalSize) * 100).toFixed(1)
            : "0.0";

        stats.textContent =
            `Original: ${originalSize} bytes · Minified: ${minifiedSize} bytes · Saved: ${saved}%`;

    } catch (error) {
        stats.textContent = "Error: " + error.message;
        result.value = "";
    }
}


// ==========================================
// BASE64 ENCODER / DECODER
// ==========================================

function encodeBase64() {
    const input = document.getElementById("base64-input").value;
    const result = document.getElementById("base64-result");
    const status = document.getElementById("base64-status");

    try {
        const bytes = new TextEncoder().encode(input);
        let binary = "";

        bytes.forEach(byte => binary += String.fromCharCode(byte));

        result.value = btoa(binary);
        status.textContent = "Successfully encoded to Base64.";
    } catch (error) {
        result.value = "";
        status.textContent = "Encoding failed: " + error.message;
    }
}

function decodeBase64() {
    const input = document.getElementById("base64-input").value.trim();
    const result = document.getElementById("base64-result");
    const status = document.getElementById("base64-status");

    try {
        const binary = atob(input);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));

        result.value = new TextDecoder("utf-8", {
            fatal: true
        }).decode(bytes);

        status.textContent = "Successfully decoded Base64.";
    } catch (error) {
        result.value = "";
        status.textContent = "Invalid Base64 input.";
    }
}


// ==========================================
// FILE ENCRYPTOR - TAB CONTROLLER
// ==========================================

function switchEncryptTab(tab) {
    const filePanel = document.getElementById("encrypt-file-panel");
    const codePanel = document.getElementById("encrypt-code-panel");

    const fileTab = document.getElementById("enc-tab-file");
    const codeTab = document.getElementById("enc-tab-code");

    const isFile = tab === "file";

    filePanel.hidden = !isFile;
    codePanel.hidden = isFile;

    fileTab.classList.toggle("active", isFile);
    codeTab.classList.toggle("active", !isFile);
}


// ==========================================
// FILE ENCRYPTION HELPERS
// ==========================================

function bytesToBase64(bytes) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(
            ...bytes.subarray(i, i + chunkSize)
        );
    }

    return btoa(binary);
}

function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

function getEncryptionStatus(message, isError = false) {
    const status = document.getElementById("enc-status");
    if (!status) return;

    status.textContent = message;
    status.style.color = isError ? "#ff6f91" : "#61d99b";
}

function getFilePassword() {
    const password = document.getElementById("enc-password").value;
    const confirm = document.getElementById("enc-password-confirm").value;

    if (!password) throw new Error("Please enter an encryption password.");
    if (password.length < 12) throw new Error("Use a password with at least 12 characters.");

    if (password !== confirm) {
        throw new Error("Password confirmation does not match.");
    }

    return password;
}

async function deriveEncryptionKey(password, salt, iterations) {
    const passwordBytes = new TextEncoder().encode(password);

    const material = await crypto.subtle.importKey(
        "raw",
        passwordBytes,
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations,
            hash: "SHA-256"
        },
        material,
        {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function cleanFilename(value) {
    return String(value || "")
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/^\.+/, "")
        .trim()
        .slice(0, 100);
}

function getCustomIdentity() {
    return {
        name: document.getElementById("enc-name").value.trim() || "Foxxy File Encryption",
        author: document.getElementById("enc-author").value.trim() || "FoxxyOffc",
        watermark: document.getElementById("enc-watermark").value.trim() || "",
        prefix: cleanFilename(
            document.getElementById("enc-prefix").value || "foxxy"
        ) || "foxxy"
    };
}


// ==========================================
// ENCRYPT FILE - AES-256-GCM
// ==========================================

async function encryptFile() {
    try {
        if (!window.crypto || !crypto.subtle) {
            throw new Error("Web Crypto API unavailable. Open this website using HTTPS or localhost.");
        }

        const fileInput = document.getElementById("enc-file");
        const file = fileInput.files[0];

        if (!file) throw new Error("Please select a file first.");

        // Prevent excessive browser memory usage.
        const MAX_FILE_SIZE = 50 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            throw new Error("Maximum supported file size is 50 MB.");
        }

        const password = getFilePassword();
        const identity = getCustomIdentity();

        const iterations = Number(
            document.getElementById("enc-iterations").value
        );

        if (![310000, 600000, 1000000].includes(iterations)) {
            throw new Error("Invalid PBKDF2 iteration setting.");
        }

        getEncryptionStatus("Encrypting file...");

        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const key = await deriveEncryptionKey(password, salt, iterations);

        const originalData = await file.arrayBuffer();

        const encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv,
                tagLength: 128
            },
            key,
            originalData
        );

        const packageData = {
            format: "FOXXY-ENCRYPTED-FILE",
            version: 1,
            metadata: {
                encryptionName: identity.name,
                author: identity.author,
                watermark: identity.watermark,
                originalFilename: file.name,
                originalMimeType: file.type || "application/octet-stream",
                originalSize: file.size,
                createdAt: new Date().toISOString()
            },
            encryption: {
                algorithm: "AES-256-GCM",
                kdf: "PBKDF2-SHA256",
                iterations,
                salt: bytesToBase64(salt),
                iv: bytesToBase64(iv)
            },
            ciphertext: bytesToBase64(new Uint8Array(encryptedData))
        };

        const blob = new Blob(
            [JSON.stringify(packageData)],
            { type: "application/json" }
        );

        const filename = cleanFilename(file.name) || "file";
        const outputName = `${identity.prefix}_${filename}.enc`;

        downloadBlob(blob, outputName);

        getEncryptionStatus(
            `Encryption successful! ${file.name} has been encrypted.`
        );

    } catch (error) {
        getEncryptionStatus(error.message || "Encryption failed.", true);
    }
}


// ==========================================
// DECRYPT FILE
// ==========================================

async function decryptFile() {
    try {
        if (!window.crypto || !crypto.subtle) {
            throw new Error("Web Crypto API unavailable. Open this website using HTTPS or localhost.");
        }

        const fileInput = document.getElementById("enc-file");
        const file = fileInput.files[0];

        if (!file) throw new Error("Select an encrypted .enc file first.");

        if (file.size > 75 * 1024 * 1024) {
            throw new Error("Encrypted file is too large.");
        }

        const password = document.getElementById("enc-password").value;

        if (!password) throw new Error("Enter the original encryption password.");

        getEncryptionStatus("Reading encrypted file...");

        const packageData = JSON.parse(await file.text());

        if (packageData.format !== "FOXXY-ENCRYPTED-FILE") {
            throw new Error("Unsupported encrypted file format.");
        }

        if (packageData.version !== 1) {
            throw new Error("Unsupported encryption file version.");
        }

        if (
            packageData.encryption?.algorithm !== "AES-256-GCM" ||
            packageData.encryption?.kdf !== "PBKDF2-SHA256"
        ) {
            throw new Error("Unsupported encryption settings.");
        }

        const iterations = Number(packageData.encryption.iterations);

        if (!Number.isInteger(iterations) ||
            iterations < 100000 ||
            iterations > 2000000) {
            throw new Error("Invalid key derivation parameters.");
        }

        const salt = base64ToBytes(packageData.encryption.salt);
        const iv = base64ToBytes(packageData.encryption.iv);
        const ciphertext = base64ToBytes(packageData.ciphertext);

        if (salt.length !== 16 || iv.length !== 12) {
            throw new Error("Invalid encryption metadata.");
        }

        const key = await deriveEncryptionKey(password, salt, iterations);

        getEncryptionStatus("Decrypting file...");

        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv,
                tagLength: 128
            },
            key,
            ciphertext
        );

        const metadata = packageData.metadata || {};

        const originalFilename =
            cleanFilename(metadata.originalFilename) || "decrypted-file";

        const mimeType =
            metadata.originalMimeType || "application/octet-stream";

        const blob = new Blob(
            [decryptedData],
            { type: mimeType }
        );

        downloadBlob(blob, originalFilename);

        getEncryptionStatus(
            `Decryption successful! Restored ${originalFilename}.`
        );

    } catch (error) {
        const message = error.name === "OperationError"
            ? "Decryption failed. The password may be incorrect or the file may be damaged."
            : error.message || "Decryption failed.";

        getEncryptionStatus(message, true);
    }
}


// ==========================================
// CLEAR ENCRYPTOR
// ==========================================

function clearEncryptor() {
    const ids = [
        "enc-file",
        "enc-password",
        "enc-password-confirm",
        "enc-name",
        "enc-author",
        "enc-watermark",
        "enc-prefix"
    ];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });

    const status = document.getElementById("enc-status");

    if (status) {
        status.textContent = "";
    }
}


// ==========================================
// CODE OBFUSCATOR / TRANSFORMER
// ==========================================

let lastObfuscatedOutput = "";
let lastObfuscatedExtension = "txt";

function obfuscateCode() {
    const input = document.getElementById("obf-input").value;
    const type = document.getElementById("obf-type").value;
    const mode = document.getElementById("obf-mode").value;
    const result = document.getElementById("obf-result");
    const status = document.getElementById("obf-status");

    if (!input.trim()) {
        status.textContent = "Please enter source code first.";
        return;
    }

    try {
        let output = input;

        if (type === "javascript") {
            if (mode === "packed") {
                const encoded = bytesToBase64(
                    new TextEncoder().encode(input)
                );

                output = `/* Foxxy DevTools - Base64 source wrapper */\n(function(){var s=atob("${encoded}");var b=Uint8Array.from(s,function(c){return c.charCodeAt(0)});var d=new TextDecoder().decode(b);(0,eval)(d)})();`;
            } else if (mode === "compact") {
                output = compactJavaScript(input);
            } else {
                output = input;
            }

            lastObfuscatedExtension = "js";

        } else if (type === "css") {
            output = minifySourceCSS(input);
            lastObfuscatedExtension = "css";

        } else if (type === "html") {
            output = minifySourceHTML(input);
            lastObfuscatedExtension = "html";
        }

        const projectName =
            document.getElementById("obf-name").value.trim();

        const author =
            document.getElementById("obf-author").value.trim();

        const watermark =
            document.getElementById("obf-watermark").value.trim();

        const metadata = [
            projectName && `Project: ${projectName}`,
            author && `Author: ${author}`,
            watermark && `Watermark: ${watermark}`
        ].filter(Boolean);

        if (metadata.length) {
            const comment = metadata.join(" | ");

            if (type === "html") {
                output = `<!-- ${comment.replace(/--/g, "- -")} -->\n${output}`;
            } else {
                output = `/* ${comment.replace(/\*\//g, "* /")} */\n${output}`;
            }
        }

        result.value = output;
        lastObfuscatedOutput = output;

        status.textContent =
            `Transformation successful. Output: ${new Blob([output]).size} bytes.`;

    } catch (error) {
        result.value = "";
        lastObfuscatedOutput = "";
        status.textContent = "Transformation failed: " + error.message;
    }
}


// Basic CSS whitespace compaction.
// This intentionally preserves quoted strings and comments.
function minifySourceCSS(input) {
    let output = "";
    let quote = null;
    let escaped = false;
    let pendingSpace = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const next = input[i + 1];

        if (quote) {
            output += char;

            if (escaped) escaped = false;
            else if (char === "\\") escaped = true;
            else if (char === quote) quote = null;

            continue;
        }

        if (char === '"' || char === "'") {
            if (pendingSpace) output += " ";
            pendingSpace = false;
            quote = char;
            output += char;
            continue;
        }

        if (char === "/" && next === "*") {
            const end = input.indexOf("*/", i + 2);
            if (end === -1) throw new Error("Unclosed CSS comment.");
            i = end + 1;
            continue;
        }

        if (/\s/.test(char)) {
            pendingSpace = true;
            continue;
        }

        if ("{}:;,>+~".includes(char)) {
            output = output.trimEnd();
            output += char;
            pendingSpace = false;
        } else {
            if (pendingSpace && output &&
                /[\w%)\]]/.test(output.slice(-1)) &&
                /[\w(#.-]/.test(char)) {
                output += " ";
            }

            output += char;
            pendingSpace = false;
        }
    }

    if (quote) throw new Error("Unclosed CSS string.");

    return output.trim();
}


// Basic HTML compaction.
// Avoid using this on HTML containing whitespace-sensitive inline content.
function minifySourceHTML(input) {
    return input
        .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
        .replace(/>\s+</g, "><")
        .trim();
}


// JavaScript compact mode intentionally only removes full-line comments
// and trims surrounding lines. It does not perform AST-based minification.
function compactJavaScript(input) {
    return input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("//"))
        .join("\n");
}


// ==========================================
// DOWNLOAD TRANSFORMED SOURCE
// ==========================================

function downloadObfuscated() {
    if (!lastObfuscatedOutput) {
        const status = document.getElementById("obf-status");
        status.textContent = "Transform your code before downloading.";
        return;
    }

    const type = document.getElementById("obf-type").value;

    const extension = type === "javascript"
        ? "js"
        : type;

    const projectName =
        cleanFilename(
            document.getElementById("obf-name").value || "foxxy-protected"
        );

    const blob = new Blob(
        [lastObfuscatedOutput],
        { type: "text/plain;charset=utf-8" }
    );

    downloadBlob(blob, `${projectName}.${extension}`);
}


// ==========================================
// CLEAR OBFUSCATOR
// ==========================================

function clearObfuscator() {
    const ids = [
        "obf-input",
        "obf-result",
        "obf-name",
        "obf-author",
        "obf-watermark"
    ];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });

    lastObfuscatedOutput = "";

    const status = document.getElementById("obf-status");
    if (status) status.textContent = "";
}


// ==========================================
// COPY RESULT
// ==========================================

async function copyResult(elementId, isText = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = isText ? element.textContent : element.value;

    try {
        await navigator.clipboard.writeText(text);

        const status = document.getElementById(
            elementId === "base64-result"
                ? "base64-status"
                : elementId === "obf-result"
                    ? "obf-status"
                    : "css-stats"
        );

        if (status) status.textContent = "Copied successfully!";

    } catch (error) {
        element.focus();

        if (element.select) {
            element.select();
        }

        document.execCommand("copy");
    }
}


// ==========================================
// CLEAR INPUT AND OUTPUT
// ==========================================

function clearTool(inputId, outputId) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);

    if (input) input.value = "";

    if (output) {
        if ("value" in output) output.value = "";
        else output.textContent = "";
    }

    const ids = [
        "css-stats",
        "base64-status"
    ];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = "";
    });
                }
