const PDFGenerator = require('pdfkit')
const fs = require('fs')

class InvoiceGenerator {
    constructor(data) {
        this.data = data;
        this.leftBorder = 50;
    }

    generateHeader(doc) {
        const leftBorder = this.leftBorder;

        doc
            .fillColor('#000')
            .fontSize(24)
            .text('ВАШ РОЗРАХУНОК', leftBorder, 25, {align: 'center'})
            .fontSize(18)
            .text(`Орієнтовна загальна вартість робіт: ${this.data.totalPriceHRN} грн`, leftBorder, 75, {align: 'left'})
            .text(`Сума в доларах США за поточним курсом: ${this.data.totalPriceUSD} $`, leftBorder, 100, {align: 'left'})
            
        doc.moveTo(leftBorder, 140)
            .lineTo(550, 140)
            .stroke()
    }

    generateData(doc) {
        const leftBorder = this.leftBorder;
        const squares = this.data.squares;
        const services = this.data.services;
        const tableTop = 200;

        doc
            .fillColor('#000')
            .fontSize(18)
            .text('Площа окремих кімнат:', 50, 170, {align: 'left'})
            .fontSize(10)
            .text('Назва кімнати / Ваша площа', leftBorder, tableTop)
            .moveDown(2)

        for (let i = 0; i < squares.length; i++) {
            const item = squares[i]

            if (+item.value > 0) {
                doc
                    .fontSize(10)
                    .text(`${item.name} / ${item.value} м2`, leftBorder)
                    .moveDown(0.5);
            }
        }

        doc
            .moveDown(1)
            .fillColor('#000')
            .fontSize(18)
            .text(`Висота стелі в квартирі: ${this.data.height} м`, leftBorder);

        doc
            .moveDown(1)
            .fillColor('#000')
            .fontSize(18)
            .text('Назва необхідних робіт та актуальнi цiни:', leftBorder)
            .moveDown();

        for (let i = 0; i < services.length; i++) {
            const item = services[i]
            
            if (item.checked) {
                doc
                    .fontSize(10)
                    .text(`${item.name} : ${item.count} ${item.unit}`, leftBorder)
                    .moveDown(0.5);
            }
        }
    }

    generate() {

        if (this.data.totalPriceHRN <= 0) {
            return false;
        }

        let theOutput = new PDFGenerator();
        theOutput.registerFont('HelveticaNeueCyr', './managePdf/HelveticaNeueCyr-Roman.ttf');
        theOutput.font('HelveticaNeueCyr');

        const date = `${new Date().getFullYear()}-${new Date().getDate()}_${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;

        const fileName = `Summary_${date}.pdf`;

        theOutput.pipe(fs.createWriteStream(`./managePdf/storage/${fileName}`))
        this.generateHeader(theOutput)

        this.generateData(theOutput)

        theOutput.end();

        return `managePdf/storage/${fileName}`;
    }
}

module.exports = InvoiceGenerator