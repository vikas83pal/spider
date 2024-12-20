let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dot = [];
let colors = ['blue', 'black', 'green', 'purple'];

// Generating random dots
for (let i = 0; i <= 500; i++) {
    dot.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

const drawDots = (mousePosition = null) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

    // Draw all the dots
    for (let i = 0; i < dot.length; i++) {
        ctx.beginPath();
        ctx.arc(dot[i].x, dot[i].y, dot[i].size, 0, Math.PI * 2); // Draw a full circle
        ctx.fillStyle = dot[i].color; // Set the fill color
        ctx.fill(); // Fill the circle
        ctx.strokeStyle = "red"; // Set the stroke color
        ctx.lineWidth = 2; // Set the stroke width
        ctx.stroke(); // Apply the stroke
    }

    // If mouse is moving, connect close dots
    if (mousePosition) {
        const { x: mouseX, y: mouseY } = mousePosition;

        // Loop through all dots to find and connect nearby dots
        for (let i = 0; i < dot.length; i++) {
            let distance = Math.sqrt(
                Math.pow(mouseX - dot[i].x, 2) + Math.pow(mouseY - dot[i].y, 2)
            );

            // If the dot is within a certain range, draw a line to it
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY); // Start line at the mouse position
                ctx.lineTo(dot[i].x, dot[i].y); // Draw line to the dot
                ctx.strokeStyle = "rgb(0, 0, 0)"; // Line color with transparency
                ctx.lineWidth = 2; // Line width
                ctx.stroke(); // Draw the line
            }
        }
    }
};

// Mousemove event listener to handle spider-web effect
canvas.addEventListener("mousemove", (e) => {
    let mousePosition = { x: e.clientX, y: e.clientY };
    drawDots(mousePosition);
});

// Mouseleave event listener to reset canvas to static dots
canvas.addEventListener("mouseleave", () => {
    drawDots(); // Redraw only the dots
});

// Initial render of the dots
drawDots();
