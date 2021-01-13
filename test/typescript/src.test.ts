import named from '../../src/index';
import { obj as through } from 'through2';
import { basename, extname } from 'path';
import * as fs from 'vinyl-fs';


describe('[1] named()', () => {

	test('applies name from stream', (done) => {
		fs.src('./test/fixtures/one.js')
			.pipe(named())
			.pipe(through((file) => {
				expect(file.named).toBe('one');
				done();
			}));
	});

});


describe('[2] named((): string)', () => {

	test('applies name from transform', (done) => {
		fs.src('./test/fixtures/one.js')
			.pipe(named(() => 'pineapple'))
			.pipe(through((file) => {
				expect(file.named).toBe('pineapple');
				done();
			}));
	});

});


describe('[3] named((file): void)', () => {

	test('supplies file to transform', (done) => {
		fs.src('./test/fixtures/one.js')
			.pipe(named((file) => {
				expect(basename(file.path, extname(file.path))).toBe('one');
				done();
			}));
	});

});


describe('[4] named((this, file): void)', () => {

	test('applies custom name from transform', (done) => {
		fs.src('./test/fixtures/one.js')
			.pipe(named(function (this, file) {
				file.customName = 'strawberry';
				this.push(file);
			}))
			.pipe(through((file) => {
				expect(file.customName).toBe('strawberry');
				done();
			}));
	});

});
