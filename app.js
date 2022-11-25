
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
    width: cellSize/2,
    height: cellSize/2
};

// paint first selection
updateHighlight();

selectionHighlight.addEventListener("mousemove", e => {
    if (!isSelecting) {
        return;
    }
    
    const width = e.offsetX - selectionState.offsetX;
    const height = e.offsetY - selectionState.offsetY;

    const widthDistanceChange = Math.abs(width - selectionState.width);
    const heightDistanceChange = Math.abs(height - selectionState.height);

    if(widthDistanceChange && heightDistanceChange < cellSize) {
        // selection was not changed beyond current selection - avoid redundant repaint
        return;
    }

    selectionState.width = width;
    selectionState.height = height;

    updateHighlight();
});

selectionHighlight.addEventListener("mousedown", e => {
    // initiate active cell selection on the clicked location
    isSelecting = true;

    selectionState.offsetX = e.offsetX;
    selectionState.offsetY = e.offsetY;
    selectionState.width = 0;
    selectionState.height = 0;

    updateHighlight();
});

selectionHighlight.addEventListener("mouseup", _ => {
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
    // updating the properties will trigger a style-recalc which will cause a new paint
    selectionHighlight.style.setProperty("--offsetX", selectionState.offsetX);
    selectionHighlight.style.setProperty("--offsetY", selectionState.offsetY);
    selectionHighlight.style.setProperty("--width", selectionState.width);
    selectionHighlight.style.setProperty("--height", selectionState.height);
}