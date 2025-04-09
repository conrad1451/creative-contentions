const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (optional, but good practice)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background color
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Define circle properties
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;
const fillColor = 'lightgreen';

// Draw the circle
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
ctx.fillStyle = fillColor;
ctx.fill();
ctx.closePath();
