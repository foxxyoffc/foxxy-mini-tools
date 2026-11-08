
function openTool(type) {
    const title = document.getElementById("tool-title");
    const content = document.getElementById("tool-content");

    const tools = {
        json: {
            title: "JSON Formatter",
            html: `
                <p>Format and validate your JSON data.</p>
                <textarea id="json-input" rows="8"
                    placeholder='{"name":"Foxxy","version":"1.0"}'></textarea>
                <button onclick="formatJSON()">Format JSON</button>
                <button onclick="clearTool('json-input','tool-result')">Clear</button>
                <pre id="tool-result"></pre>
            `
        },

        color: {
            title: "Color Generator",
            html: `
                <p>Generate random HEX colors.</p>
                <div id="color-preview"
                    style="height:120px;border-radius:10px;background:#a66aff;margin:15px 0;">
                </div>
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
                <textarea id="text-input" rows="8"
                    placeholder="Write something..."></textarea>
                <button onclick="countText()">Count Text</button>
                <button onclick="clearTool('text-input','tool-result')">Clear</button>
                <p id="tool-result">0 characters · 0 words</p>
            `
        },

        css: {
            title: "CSS Minifier",
            html: `
                <p>Compress your CSS by removing comments and unnecessary whitespace.</p>
                <textarea id="css-input" rows="9"
                    placeholder="Paste your CSS code here..."></textarea>
                <button onclick="minifyCSS()">Minify CSS</button>
                <button onclick="clearTool('css-input','css-result')">Clear</button>
                <p id="css-stats"></p>
                <textarea id="css-result" rows="9"
                    placeholder="Minified CSS will appear here..." readonly></textarea>
                <button onclick="copyResult('css-result')">Copy CSS</button>
            `
        },

        base64: {
            title: "Base64 Encoder & Decoder",
            html: `
                <p>Convert text to Base64 or decode Base64 into text.</p>
                <textarea id="base64-input" rows="8"
                    placeholder="Enter your text or Base64 data..."></textarea>

                <button onclick="encodeBase64()">Encode</button>
                <button onclick="decodeBase64()">Decode</button>
                <button onclick="clearTool('base64-input','base64-result')">Clear</button>

                <textarea id="base64-result" rows="8"
                    placeholder="Your result will appear here..." readonly></textarea>

                <button onclick="copyResult('base64-result')">Copy Result</button>
                <p id="base64-status"></p>
            `
        }
    };

    if (!tools[type]) return;

    title.textContent = tools[type].title;
    content.innerHTML = tools[type].html;

    document.getElementById("workspace")
        .scrollIntoView({ behavior: "smooth" });
}


// JSON FORMATTER
function formatJSON() {
    const input = document.getElementById("json-input").value;
    const result = document.getElementById("tool-result");

    try {
        result.textContent = JSON.stringify(
            JSON.parse(input), null, 4
        );
    } catch (error) {
        result.textContent = "Invalid JSON format!";
    }
}


// COLOR GENERATOR
function generateColor() {
    const color = "#" + Math.floor(Math.random() * 16777216)
        .toString(16).padStart(6, "0").toUpperCase();

    document.getElementById("color-preview").style.background = color;
    document.getElementById("color-code").textContent = color;
}

function copyColor() {
    copyResult("color-code", true);
}


// TEXT COUNTER
function countText() {
    const text = document.getElementById("text-input").value;
    const words = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    document.getElementById("tool-result").textContent =
        `${text.length} characters · ${words} words`;
}


// CSS MINIFIER
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

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const next = input[i + 1];

            if (quote) {
                output += char;

                if (escaped) {
                    escaped = false;
                } else if (char === "\\") {
                    escaped = true;
                } else if (char === quote) {
                    quote = null;
                }

                continue;
            }

            if (char === '"' || char === "'") {
                if (pendingSpace && output &&
                    !/[{(:,>+~]/.test(output.slice(-1))) {
                    output += " ";
                }

                pendingSpace = false;
                quote = char;
                output += char;
                continue;
            }

            if (char === "/" && next === "*") {
                const end = input.indexOf("*/", i + 2);

                if (end === -1) {
                    throw new Error("Unclosed CSS comment.");
                }

                i = end + 1;
                continue;
            }

            if (/\s/.test(char)) {
                pendingSpace = true;
                continue;
            }

            const punctuation = "{}:;,>+~";

            if (punctuation.includes(char)) {
                output = output.trimEnd();
                output += char;
                pendingSpace = false;
            } else {
                if (pendingSpace && output &&
                    !/[{(:,>+~]/.test(output.slice(-1))) {
                    output += " ";
                }

                output += char;
                pendingSpace = false;
            }
        }

        if (quote) {
            throw new Error("Unclosed CSS string.");
        }

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


// BASE64 ENCODER
function encodeBase64() {
    const input = document.getElementById("base64-input").value;
    const result = document.getElementById("base64-result");
    const status = document.getElementById("base64-status");

    try {
        const bytes = new TextEncoder().encode(input);

        let binary = "";

        bytes.forEach(byte => {
            binary += String.fromCharCode(byte);
        });

        result.value = btoa(binary);
        status.textContent = "Successfully encoded to Base64.";

    } catch (error) {
        result.value = "";
        status.textContent = "Encoding failed: " + error.message;
    }
}


// BASE64 DECODER
function decodeBase64() {
    const input = document.getElementById("base64-input").value.trim();
    const result = document.getElementById("base64-result");
    const status = document.getElementById("base64-status");

    try {
        const binary = atob(input);

        const bytes = Uint8Array.from(
            binary,
            char => char.charCodeAt(0)
        );

        result.value = new TextDecoder("utf-8", {
            fatal: true
        }).decode(bytes);

        status.textContent = "Successfully decoded Base64.";

    } catch (error) {
        result.value = "";
        status.textContent = "Invalid Base64 input.";
    }
}


// COPY RESULT
async function copyResult(elementId, isText = false) {
    const element = document.getElementById(elementId);

    const text = isText
        ? element.textContent
        : element.value;

    try {
        await navigator.clipboard.writeText(text);

        const status = document.getElementById(
            elementId === "base64-result"
                ? "base64-status"
                : "css-stats"
        );

        if (status) {
            status.textContent = "Copied successfully!";
        }
    } catch (error) {
        element.focus();

        if (element.select) {
            element.select();
        }

        document.execCommand("copy");
    }
}


// CLEAR INPUT AND OUTPUT
function clearTool(inputId, outputId) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);

    if (input) {
        input.value = "";
    }

    if (output) {
        if ("value" in output) {
            output.value = "";
        } else {
            output.textContent = "";
        }
    }

    const stats = document.getElementById("css-stats");
    const base64Status = document.getElementById("base64-status");

    if (stats) stats.textContent = "";
    if (base64Status) base64Status.textContent = "";
}
