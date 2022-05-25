var canvas = document.getElementById('certificate-canvas')
const ctx = canvas.getContext('2d')

class Badge {
	constructor(ctx) {
		this.ctx = ctx
		this.centerCoordinates = {
			xCenter: canvas.width / 2,
			yCenter: canvas.height / 2,
		}
		this.maxWidthField1 = this.centerCoordinates.xCenter / 2 + 90
		this.maxWidthField2 = this.centerCoordinates.xCenter / 2 + 30
	}

	linearGradient() {
		const ctx = this.ctx
		var gradient = ctx.createLinearGradient(20, 0, 220, 0)
		gradient.addColorStop(0, '#FEDB37')
		gradient.addColorStop(0.4, '#FDB931')
		gradient.addColorStop(1, '#FEDB37')
		ctx.fillStyle = gradient
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = '#FDB931'
		ctx.stroke()
	}

	drawHexagon(type, size) {
		const ctx = this.ctx
		var numberOfSides = 6,
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

			default:
				break
		}
	}

	drawSeparator(from, to, height) {
		const ctx = this.ctx

		ctx.beginPath()
		ctx.moveTo(from, height)
		ctx.lineTo(to, height)
		ctx.lineWidth = 1
		ctx.strokeStyle = '#fff'
		ctx.stroke()
	}
	drawCertified(subject) {
		const ctx = this.ctx
		ctx.font = '900 18px Arial '
		ctx.fillStyle = '#fff'
		ctx.textAlign = 'center'
		ctx.fillText(
			'CERTIFIED',
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter - 70
		)
		ctx.fillText(
			subject.toUpperCase(),
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter - 50,
			this.maxWidthField2
		)

		this.drawSeparator(120, 280, this.centerCoordinates.yCenter - 34)
	}
	drawCertiFAKE(certiFAKE, height) {
		const ctx = this.ctx
		ctx.font = 'italic 12px Arial'
		ctx.fillStyle = '#fff'
		ctx.fillText(
			certiFAKE,
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter + height
		)
	}
	drawStars(stars, height) {
		const ctx = this.ctx
		ctx.font = '500 26px Arial'
		ctx.fillStyle = '#fff'
		ctx.fillText(
			stars,
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter + height
		)
	}
	drawYear(year) {
		const ctx = this.ctx
		ctx.font = '900 50px Arial '
		ctx.fillStyle = '#fff'
		ctx.fillText(
			year,
			this.centerCoordinates.xCenter,
			this.centerCoordinates.yCenter + 20,
			this.maxWidthField1
		)
		this.drawSeparator(120, 280, this.centerCoordinates.yCenter + 37)
	}

	createBadge({ subject = 'GENIUS', year = 1991 }) {
		this.drawHexagon('linear', 120)
		this.drawCertified(`${subject}`)
		this.drawCertiFAKE('certiFAKE', 90)
		this.drawStars('★★★★★', 70)
		this.drawYear(`${year}`)
	}
}

const createCertificateButton = document.querySelector('#create-certificate')
createCertificateButton.addEventListener('click', () => {
	const newBadge = new Badge(ctx)

	const badgeProperties = {
		subject: '',
		year: '',
	}

	badgeProperties.subject = document
		.querySelector('#subject')
		.value.toUpperCase()

	badgeProperties.year = document.querySelector('#year').value.toUpperCase()

	newBadge.createBadge({ ...badgeProperties })
})
