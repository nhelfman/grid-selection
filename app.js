
if ('paintWorklet' in CSS) {
    CSS.paintWorklet.addModule('highlight.js');
} else {
    console.warn("no paintWorkler - ensure running from http://localhost or https context");
}

const blockSize = 2000;
const cellSize = 20;

const selectionHighlight = init();

let isSelecting = false;

const selectionState = {
    offsetX: 0,
    offsetY: 0,
    width: cellSize,
    height: cellSize
};

selectionHighlight.addEventListener("mousemove", e => {
    if (!isSelecting) {
        return;
    }

    selectionState.width = e.offsetX - selectionState.offsetX;
    selectionState.height = e.offsetY - selectionState.offsetY;

    updateHighlight();
});

selectionHighlight.addEventListener("mousedown", e => {
    isSelecting = true;

    selectionState.offsetX = e.offsetX;
    selectionState.offsetY = e.offsetY;
    selectionState.width = 0;
    selectionState.height = 0;

    updateHighlight();
});

selectionHighlight.addEventListener("mouseup", e => {
    isSelecting = false;
});

function init() {
    const canvas = document.getElementById("grid");
    canvas.style.width = blockSize + "px";
    canvas.style.height = blockSize + "px";
    canvas.setAttribute("width", blockSize + "px");
    canvas.setAttribute("height", blockSize + "px");
    const ctx = canvas.getContext("2d", { alpha: false });

    const selectionHighlight = document.getElementById("selectionHighlight");
    selectionHighlight.style.width = blockSize + "px";
    selectionHighlight.style.height = blockSize + "px";

    // draw grid
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, blockSize, blockSize);

    ctx.fillStyle = "black";
    ctx.strokeStyle = "gray";
    for (let i = 0; i < blockSize / cellSize; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(blockSize, i * cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, blockSize);
        ctx.stroke();

        // some cells text content
        ctx.font = "normal 18px Calibri";
        ctx.fillText("a", i * cellSize + 3, i * cellSize - 3);
    }
    
    return selectionHighlight;
}

function updateHighlight() {
    selectionHighlight.style.setProperty("--offsetX", selectionState.offsetX);
    selectionHighlight.style.setProperty("--offsetY", selectionState.offsetY);
    selectionHighlight.style.setProperty("--width", selectionState.width);
    selectionHighlight.style.setProperty("--height", selectionState.height);
}