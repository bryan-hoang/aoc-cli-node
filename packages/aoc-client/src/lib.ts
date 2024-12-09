export class AocClient {
	constructor(builder: AocClientBuilder) {
		// this.sessionCookie = builder.sessionCookie;
		// this.year = undefined;
		// this.day = undefined;
		// this.overwriteFiles = false;
		// this.inpueFilename = 'input';
		// this.puzzleFilename = 'puzzle.md';
		// this.showHtmlMarkup = false;
	}
	static builder() {
		return new AocClientBuilder();
	}
}

export class AocClientBuilder {
	sessionCookie?: string = undefined;
	year?: number = undefined;
	day?: number = undefined;
	overwriteFiles = false;
	inpueFilename = 'input';
	puzzleFilename = 'puzzle.md';
	showHtmlMarkup = false;
	build() {
		return new AocClient(this);
	}
}
