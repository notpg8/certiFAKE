var canvas = document.getElementById('certificate-render')
const ctx = canvas.getContext('2d')

class Badge {
	constructor(ctx, color) {
		this.ctx = ctx
		this.color = color
		this.centerCoordinates = {
			xCenter: canvas.width / 2,
			yCenter: canvas.height / 2,
		}
	}

	radialGradient() {
		const ctx = this.ctx

		// Create gradient
		var grd = ctx.createRadialGradient(
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter,
			5,
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter,
			50
		)
		grd.addColorStop(0, 'red')
		grd.addColorStop(1, 'yellow')

		// Fill with gradient
		ctx.fillStyle = grd
		ctx.fill()
	}

	linearGradient() {
		const ctx = this.ctx
		// Create a linear gradient
		// The start gradient point is at x=20, y=0
		// The end gradient point is at x=220, y=0
		var gradient = ctx.createLinearGradient(20, 0, 220, 0)

		// Add three color stops
		gradient.addColorStop(0, '#FEDB37')
		gradient.addColorStop(0.4, '#FDB931')
		gradient.addColorStop(1, '#FEDB37')

		// Set the fill style and draw a rectangle
		ctx.fillStyle = gradient
		ctx.fill()
		ctx.strokeStyle = '#FDB931'
		ctx.stroke()
	}

	drawHexagon(type) {
		var numberOfSides = 6,
			size = 120,
			xCenter = this.centerCoordinates.xCenter,
			yCenter = this.centerCoordinates.yCenter

		ctx.beginPath()
		ctx.moveTo(xCenter + size * Math.cos(0), yCenter + size * Math.sin(0))

		for (var i = 1; i <= numberOfSides; i += 1) {
			ctx.lineTo(
				xCenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
				yCenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
			)
		}

		switch (type) {
			case 'linear':
				this.linearGradient()
				break
			case 'radial':
				this.radialGradient()
				break

			default:
				break
		}
	}
}

const newBadge = new Badge(ctx)
newBadge.drawHexagon('linear')
// newBadge.drawHexagon('radial')
