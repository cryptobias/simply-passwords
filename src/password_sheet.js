class PasswordSheet {
    constructor() {
        this.characters = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789-!?#+=";

        this.lineHeight = 12;
        this.lineSpacing = 3;

        this.rowStart = 30;
        this.columnStart = 10;
        this.columnWidth = 65;

        this.maxRows = 21;

        this.passwordLength = 16;
    }

    generate() {
        const doc = new jsPDF();

        doc.setFontSize(10);
        doc.setFont('sans-serif', 'normal');
        doc.text(
            'Please store this password sheet in a secure place that you remember, where only you and those you trust can access it.',
            this.columnStart,
            this.lineHeight
        );

        doc.text(
            'Just pick an empty row, fill in the blanks and use the pregenerated password, whenever you need a password.',
            this.columnStart,
            this.lineHeight + 5
        );

        doc.setFontSize(16);
        doc.setFont('sans-serif', 'bold');
        this._row(doc, 0, 'Service', 'Username', 'Password');

        doc.setFont('monospace', 'normal');
        for (var i = 1; i < this.maxRows; i++) {
            this._row(doc, i, '', '', this._generatePassword(this.passwordLength));
        }

        doc.setFontSize(10);
        doc.setFont('sans-serif', 'normal');
        doc.text(
            'Used all passwords? Go to https://cryptobias.github.io/simply-passwords and generate a new sheet.',
            this.columnStart,
            this.rowStart + this.maxRows * this.lineHeight + this.lineSpacing
        );

        doc.output('dataurlnewwindow');
    }

    _row(doc, number, first, second, third) {
        const yPosition = this.rowStart + number * this.lineHeight + this.lineSpacing;

        doc.text(first, this.columnStart, yPosition);
        doc.text(second, this.columnStart + this.columnWidth, yPosition);
        doc.text(third, this.columnStart + this.columnWidth * 2, yPosition);
        doc.line(this.columnStart, yPosition + this.lineSpacing, 200, yPosition + this.lineSpacing);
    }

    _generatePassword(length) {
        var password = '';

        for (var i = 0; i < length; ++i) {
            password += this.characters.charAt(Math.random() * this.characters.length);
        }

        return password;
    }
}
