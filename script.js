
function openTool(type) {
    const title = document.getElementById("tool-title");
    const content = document.getElementById("tool-content");

    const tools = {
        json: {
            title: "JSON Formatter",
            html: `
                <textarea id="json-input" rows="7"
                    placeholder='{"name":"Foxxy"}'></textarea>
                <button onclick="formatJSON()">Format JSON</button>
                <pre id="tool-result"></pre>
            `
        },
        color: {
            title: "Color Generator",
            html: `
                <div id="color-preview"
                    style="height:100px;border-radius:10px;background:#a66aff">
                </div>
                <p id="color-code">#A66AFF</p>
                <button onclick="generateColor()">Generate Color</button>
                <button onclick="copyColor()">Copy HEX</button>
            `
        },
        text: {
            title: "Text Counter",
            html: `
                <textarea id="text-input" rows="7"
                    placeholder="Write something..."></textarea>
                <p id="tool-result">0 characters · 0 words</p>
                <button onclick="countText()">Count Text</button>
            `
        }
    };

    title.textContent = tools[type].title;
    content.innerHTML = tools[type].html;

    document.getElementById("workspace")
        .scrollIntoView({ behavior: "smooth" });
}

function formatJSON() {
    const input = document.getElementById("json-input").value;
    const result = document.getElementById("tool-result");

    try {
        result.textContent = JSON.stringify(JSON.parse(input), null, 4);
    } catch {
        result.textContent = "Invalid JSON format!";
    }
}

function generateColor() {
    const color = "#" + Math.floor(Math.random() * 16777215)
        .toString(16).padStart(6, "0").toUpperCase();

    document.getElementById("color-preview").style.background = color;
    document.getElementById("color-code").textContent = color;
}

function copyColor() {
    const color = document.getElementById("color-code").textContent;
    navigator.clipboard.writeText(color);
}

function countText() {
    const text = document.getElementById("text-input").value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    document.getElementById("tool-result").textContent =
        `${text.length} characters · ${words} words`;
}
