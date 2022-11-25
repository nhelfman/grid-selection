class SelectionHighlightPainter {
  static get inputProperties() { return ['--offsetX', '--offsetY', '--width', '--height']; }

  paint(ctx, geom, properties) {
    const cellSize = 20;
    
    const offsetX = parseInt(properties.get('--offsetX')[0]);
    const offsetY = parseInt(properties.get('--offsetY')[0]);
    const width = parseInt(properties.get('--width')[0]);
    const height = parseInt(properties.get('--height')[0]);

    // adjust dimensions to grid line offsets
    const adjustedX = Math.floor(offsetX / cellSize) * cellSize;
    const adjustedY = Math.floor(offsetY / cellSize) * cellSize;
    const adjustedWidth = Math.max(Math.floor(width / cellSize + 1), 1) * cellSize;
    const adjustedHeight = Math.max(Math.floor(height / cellSize + 1), 1) * cellSize;

    // selection rect
    this.drawHighlights(ctx, adjustedX, adjustedY, adjustedWidth, adjustedHeight);

    // selection range overlay filler only when not single cell
    if(adjustedHeight !== cellSize && adjustedWidth !== cellSize) {
      this.drawHighlightFill(ctx, adjustedX, adjustedY, adjustedWidth, adjustedHeight, cellSize);
    }
  }

  drawHighlightFill(ctx, adjustedX, adjustedY, width, height, cellSize) {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "gray";

    // leave the active cell within selection without filler
    ctx.fillRect(adjustedX + 2 + cellSize, adjustedY + 2, width - 2 - cellSize, height - 2);
    ctx.fillRect(adjustedX + 2, adjustedY + 2 + cellSize, cellSize, height - 2 - cellSize);
  }

  drawHighlights(ctx, adjustedX, adjustedY, width, height) {
    // green rect boundary
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(adjustedX, adjustedY, width, height);

    // row/col header selection markers
    ctx.moveTo(adjustedX, 2);
    ctx.lineTo(adjustedX + width, 2);

    ctx.moveTo(2, adjustedY);
    ctx.lineTo(2, adjustedY + height);

    ctx.stroke();

    // inner boundary
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(adjustedX + 2, adjustedY + 2, width - 3, height - 3);

    // grippie
    ctx.fillRect(adjustedX + width - 3, adjustedY + height - 3, 6, 6);
    ctx.strokeRect(adjustedX + width - 3, adjustedY + height - 3, 6, 6)
  }
}


// Register our class under a specific name
registerPaint('highlight', SelectionHighlightPainter);