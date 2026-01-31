
    const svg = document.getElementById("svgCanvas");
    const shapeSelect = document.getElementById("shape");
    const colorPicker = document.getElementById("color");

    let drawing = false;
    let startX, startY;
    let currentElement = null;
    let elementsStack = [];

    // Mouse Down
    svg.addEventListener("mousedown", (e) => {
        drawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        const shape = shapeSelect.value;
        const color = colorPicker.value;

        if (shape === "freehand") {
            currentElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            currentElement.setAttribute("d", `M ${startX} ${startY}`);
            currentElement.setAttribute("stroke", color);
            currentElement.setAttribute("fill", "none");
            currentElement.setAttribute("stroke-width", "2");
        }

        else if (shape === "rect") {
            currentElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            currentElement.setAttribute("x", startX);
            currentElement.setAttribute("y", startY);
            currentElement.setAttribute("width", 0);
            currentElement.setAttribute("height", 0);
            currentElement.setAttribute("stroke", color);
            currentElement.setAttribute("fill", "transparent");
            currentElement.setAttribute("stroke-width", "2");
        }

        else if (shape === "circle") {
            currentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            currentElement.setAttribute("cx", startX);
            currentElement.setAttribute("cy", startY);
            currentElement.setAttribute("r", 0);
            currentElement.setAttribute("stroke", color);
            currentElement.setAttribute("fill", "transparent");
            currentElement.setAttribute("stroke-width", "2");
        }

        svg.appendChild(currentElement);
        elementsStack.push(currentElement);
    });

    // Mouse Move
    svg.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const x = e.offsetX;
        const y = e.offsetY;
        const shape = shapeSelect.value;

        if (shape === "freehand") {
            let d = currentElement.getAttribute("d");
            currentElement.setAttribute("d", d + ` L ${x} ${y}`);
        }

        else if (shape === "rect") {
            currentElement.setAttribute("width", Math.abs(x - startX));
            currentElement.setAttribute("height", Math.abs(y - startY));
            currentElement.setAttribute("x", Math.min(x, startX));
            currentElement.setAttribute("y", Math.min(y, startY));
        }

        else if (shape === "circle") {
            const r = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            currentElement.setAttribute("r", r);
        }
    });

    // Mouse Up
    svg.addEventListener("mouseup", () => {
        drawing = false;
        currentElement = null;
    });

    // Undo Function
    function undo() {
        const last = elementsStack.pop();
        if (last) {
            svg.removeChild(last);
        }
    }
